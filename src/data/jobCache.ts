import jobsFile from "../../data/latest-feeds.json";
import type { Job } from "./jobs";

type FeedFile = {
  jobs?: Job[];
  fetchedAt?: string;
};

const feed = jobsFile as FeedFile;
const cachedJobs: Job[] = Array.isArray(feed.jobs) ? feed.jobs : [];
export const cachedFetchedAt = feed.fetchedAt;

const allowedLocations = ["auburn", "fort wayne"];

function matchesAllowedLocation(location: string | undefined) {
  if (!location) return false;
  const lower = location.toLowerCase();
  return allowedLocations.some((city) => lower.includes(city));
}

function filterAllowed(jobs: Job[]): Job[] {
  return jobs.filter((job) => matchesAllowedLocation(job.location));
}

export function getCachedJobs(): Job[] {
  return cachedJobs.length > 0 ? cachedJobs : [];
}

export function getAllJobs(): Job[] {
  return filterAllowed(cachedJobs);
}

export function getJobById(id: string): Job | undefined {
  return getAllJobs().find((job) => job.id === id);
}

const seniorSignals = [
  "senior",
  "lead",
  "principal",
  "manager",
  "director",
  "head",
  "vp",
  "executive",
  "architect",
  "staff",
];

const itSignals = [
  "it",
  "engineer",
  "engineering",
  "developer",
  "devops",
  "platform",
  "cloud",
  "security",
  "network",
  "infrastructure",
  "sre",
  "data",
  "technology",
];

export function filterMidExecIt(jobs: Job[]): Job[] {
  return jobs.filter((job) => {
    const title = job.title.toLowerCase();
    const hasSenior = seniorSignals.some((signal) => title.includes(signal));
    const hasIt = itSignals.some((signal) => title.includes(signal));
    return hasSenior && hasIt;
  });
}
