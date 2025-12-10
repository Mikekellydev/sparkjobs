import fs from "node:fs/promises";
import path from "node:path";
import { sampleJobs, type Job } from "@/data/jobs";
import { getRemotiveJobs } from "@/lib/remotive";
import { getMuseJobs } from "@/lib/theMuse";

const CACHE_PATH = path.join(process.cwd(), "data", "latest-feeds.json");

export async function fetchOpenFeedJobs(limitPerSource = 10): Promise<Job[]> {
  const [remotive, muse] = await Promise.allSettled([
    getRemotiveJobs(limitPerSource),
    getMuseJobs(limitPerSource),
  ]);

  const jobs: Job[] = [];
  if (remotive.status === "fulfilled") jobs.push(...remotive.value);
  if (muse.status === "fulfilled") jobs.push(...muse.value);

  const deduped = dedupeById(jobs);
  if (deduped.length === 0) {
    return sampleJobs;
  }
  return deduped;
}

export async function loadCachedFeedJobs(): Promise<Job[] | null> {
  try {
    const content = await fs.readFile(CACHE_PATH, "utf8");
    const parsed = JSON.parse(content) as { jobs?: Job[] };
    if (parsed.jobs && parsed.jobs.length > 0) {
      return parsed.jobs;
    }
    return null;
  } catch {
    // Missing cache or unreadable; ignore.
    return null;
  }
}

function dedupeById(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  const result: Job[] = [];
  for (const job of jobs) {
    if (seen.has(job.id)) continue;
    seen.add(job.id);
    result.push(job);
  }
  return result;
}
