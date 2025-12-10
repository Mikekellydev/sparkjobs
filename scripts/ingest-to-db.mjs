// Ingests jobs from the local cache (data/latest-feeds.json) into Postgres via Prisma.
// Run after `npm run ingest:fetch` or `npm run ingest:seed`.
// Requires DATABASE_URL set and Prisma migrations applied.
//
// Example:
//   npm run ingest:seed && npm run ingest:db

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient, EmploymentType, RemoteType, SourceKind } from "@prisma/client";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cachePath = path.join(__dirname, "..", "data", "latest-feeds.json");

async function loadJobs() {
  try {
    const content = await fs.readFile(cachePath, "utf8");
    const parsed = JSON.parse(content);
    return parsed.jobs ?? [];
  } catch {
    return [];
  }
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function mapEmploymentType(input = "") {
  const val = input.toLowerCase();
  if (val.includes("part")) return EmploymentType.PART_TIME;
  if (val.includes("contract") || val.includes("freelance")) return EmploymentType.CONTRACT;
  if (val.includes("intern")) return EmploymentType.INTERN;
  if (val.includes("temp")) return EmploymentType.TEMPORARY;
  return EmploymentType.FULL_TIME;
}

function mapRemoteType(input = "") {
  const val = input.toLowerCase();
  if (val.includes("hybrid")) return RemoteType.HYBRID;
  if (val.includes("optional")) return RemoteType.OPTIONAL_REMOTE;
  if (val.includes("remote")) return RemoteType.REMOTE;
  return RemoteType.ONSITE;
}

async function upsertJob(job) {
  const company = await prisma.company.upsert({
    where: {
      name_website: {
        name: job.company || "Unknown",
        website: job.applyUrl || null,
      },
    },
    update: {
      updatedAt: new Date(),
    },
    create: {
      name: job.company || "Unknown",
      website: job.applyUrl || null,
      description: null,
    },
  });

  const source = await prisma.source.upsert({
    where: {
      name_url: {
        name: job.source || "Feed",
        url: job.applyUrl || null,
      },
    },
    update: { updatedAt: new Date() },
    create: {
      name: job.source || "Feed",
      kind: SourceKind.API_FEED,
      url: job.applyUrl || null,
    },
  });

  const slugBase = slugify(`${job.title}-${job.company}`) || `job-${Date.now()}`;
  const slug = `${slugBase}-${job.id}`.slice(0, 100);

  await prisma.job.upsert({
    where: { slug },
    update: {
      title: job.title || "Untitled role",
      description: job.summary || job.title || "No description provided.",
      employmentType: mapEmploymentType(job.employmentType),
      remoteType: mapRemoteType(job.remoteType),
      applyUrl: job.applyUrl || null,
      sourceUrl: job.applyUrl || null,
      sourceJobId: job.id,
      companyId: company.id,
      sourceId: source.id,
      postedAt: job.publishedAt ? new Date(job.publishedAt) : null,
      lastSeen: new Date(),
      salaryMin: null,
      salaryMax: null,
      salaryCurrency: null,
      featured: false,
      employerVerified: false,
      isPublished: true,
    },
    create: {
      title: job.title || "Untitled role",
      slug,
      description: job.summary || job.title || "No description provided.",
      employmentType: mapEmploymentType(job.employmentType),
      remoteType: mapRemoteType(job.remoteType),
      applyUrl: job.applyUrl || null,
      sourceUrl: job.applyUrl || null,
      sourceJobId: job.id,
      companyId: company.id,
      sourceId: source.id,
      postedAt: job.publishedAt ? new Date(job.publishedAt) : null,
      lastSeen: new Date(),
      salaryMin: null,
      salaryMax: null,
      salaryCurrency: null,
      featured: false,
      employerVerified: false,
      isPublished: true,
    },
  });
}

async function main() {
  const jobs = await loadJobs();
  if (jobs.length === 0) {
    console.error("No jobs found in data/latest-feeds.json. Run ingest:fetch or ingest:seed first.");
    return;
  }

  for (const job of jobs) {
    try {
      await upsertJob(job);
      console.log(`Upserted ${job.title} (${job.id})`);
    } catch (error) {
      console.error(`Failed to upsert ${job.id}`, error);
    }
  }
}

main()
  .catch((error) => {
    console.error("Ingestion failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
