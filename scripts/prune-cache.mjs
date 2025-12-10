// Filters the existing data/latest-feeds.json to allowed locations only (Auburn, Fort Wayne).
// Use this after a fetch to remove non-local roles or to clean an old cache.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cachePath = path.join(__dirname, "..", "data", "latest-feeds.json");

const allowedLocations = ["auburn", "fort wayne"];

function locationAllowed(location = "") {
  const lower = location.toLowerCase();
  return allowedLocations.some((city) => lower.includes(city));
}

async function main() {
  const content = await fs.readFile(cachePath, "utf8").catch(() => null);
  if (!content) {
    console.error("No cache file at data/latest-feeds.json");
    process.exitCode = 1;
    return;
  }
  const parsed = JSON.parse(content);
  const jobs = Array.isArray(parsed.jobs) ? parsed.jobs : [];
  const filtered = jobs.filter((job) => locationAllowed(job.location));

  await fs.writeFile(
    cachePath,
    JSON.stringify({ ...parsed, jobs: filtered, filteredAt: new Date().toISOString() }, null, 2),
  );

  console.log(`Pruned cache to ${filtered.length} jobs (Auburn/Fort Wayne).`);
}

main().catch((error) => {
  console.error("Failed to prune cache", error);
  process.exitCode = 1;
});
