// Fetches open job feeds (Remotive, The Muse) and writes a combined JSON file.
// Cron example (every 6 hours):
// 0 */6 * * * cd /home/mikek/Documents/github/sparkjobs && npm run ingest:fetch >/tmp/sparkjobs-ingest.log 2>&1

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, "..", "data", "latest-feeds.json");

async function fetchRemotive(limit = 20) {
  try {
    const response = await fetch("https://remotive.io/api/remote-jobs");
    if (!response.ok) {
      console.error("Remotive fetch failed", response.status, response.statusText);
      return [];
    }
    const data = await response.json();
    return (data.jobs || []).slice(0, limit).map((job) => ({
      id: `remotive-${job.id}`,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location || "Remote",
      remoteType: "Remote",
      employmentType: job.job_type || "Unknown",
      tags: job.tags?.slice(0, 6) ?? [],
      summary: strip(job.description).slice(0, 200) + "...",
      lastSeen: job.publication_date,
      source: "Remotive",
      applyUrl: job.url,
      salary: job.salary ?? undefined,
      publishedAt: job.publication_date,
    }));
  } catch (error) {
    console.error("Remotive fetch error", error);
    return [];
  }
}

async function fetchMuse(limit = 20) {
  try {
    const params = new URLSearchParams({
      page: "1",
      descending: "true",
      level: "Mid Level,Senior Level",
      page_size: String(limit),
    });
    const response = await fetch(`https://www.themuse.com/api/public/jobs?${params}`);
    if (!response.ok) {
      console.error("The Muse fetch failed", response.status, response.statusText);
      return [];
    }
    const data = await response.json();
    return (data.results || []).slice(0, limit).map((job) => {
      const location = job.locations?.[0]?.name?.replace("Greater ", "") || "Remote / Hybrid";
      return {
        id: `muse-${job.id}`,
        title: job.name,
        company: job.company?.name || "Unknown",
        location,
        remoteType: inferRemoteType(location),
        employmentType: job.type || job.levels?.[0]?.name || "Unknown",
        tags: [
          ...(job.categories?.slice(0, 2).map((c) => c.name.toLowerCase()) ?? []),
          ...(job.levels?.slice(0, 1).map((l) => l.name.toLowerCase()) ?? []),
        ],
        summary: strip(job.contents).slice(0, 200) + "...",
        lastSeen: job.publication_date,
        source: "The Muse",
        applyUrl: job.refs?.landing_page ?? "#",
        salary: undefined,
        publishedAt: job.publication_date,
      };
    });
  } catch (error) {
    console.error("The Muse fetch error", error);
    return [];
  }
}

function dedupe(jobs) {
  const seen = new Set();
  const result = [];
  for (const job of jobs) {
    if (seen.has(job.id)) continue;
    seen.add(job.id);
    result.push(job);
  }
  return result;
}

function strip(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function inferRemoteType(location = "") {
  const lower = location.toLowerCase();
  if (lower.includes("remote")) return "Remote";
  if (lower.includes("hybrid")) return "Hybrid";
  return "Optional Remote";
}

async function main() {
  try {
    const [remotive, muse] = await Promise.all([fetchRemotive(25), fetchMuse(25)]);
    const jobs = dedupe([...remotive, ...muse]);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(
      outputPath,
      JSON.stringify({ fetchedAt: new Date().toISOString(), jobs }, null, 2),
    );
    console.log(`Saved ${jobs.length} jobs to ${outputPath}`);
  } catch (error) {
    console.error("Failed to fetch feeds", error);
    process.exitCode = 1;
  }
}

main();
