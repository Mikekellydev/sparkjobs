// Imports jobs from a JSON file you provide and filters to Auburn or Fort Wayne.
// Usage:
//   node scripts/import-json.js /path/to/jobs.json
// Input format (array of objects):
// [
//   {
//     "id": "ext-123",
//     "title": "Senior Network Engineer",
//     "company": "ExampleCo",
//     "location": "Fort Wayne, IN",
//     "applyUrl": "https://example.com/jobs/123",
//     "employmentType": "Full-time",
//     "remoteType": "Onsite",
//     "tags": ["networking", "senior"],
//     "summary": "Short summary",
//     "publishedAt": "2024-12-10T00:00:00Z"
//   }
// ]

import fs from "node:fs/promises";
import path from "node:path";

const allowedLocations = ["auburn", "fort wayne"];
const outputPath = path.join(process.cwd(), "data", "latest-feeds.json");

function locationAllowed(location = "") {
  const lower = location.toLowerCase();
  return allowedLocations.some((city) => lower.includes(city));
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: node scripts/import-json.js /path/to/jobs.json");
    process.exit(1);
  }

  const raw = await fs.readFile(inputPath, "utf8").catch(() => null);
  if (!raw) {
    console.error(`Could not read file: ${inputPath}`);
    process.exit(1);
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("Invalid JSON");
    process.exit(1);
  }

  const jobs = Array.isArray(parsed) ? parsed : [];
  const filtered = jobs.filter((job) => locationAllowed(job.location));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    JSON.stringify({ fetchedAt: new Date().toISOString(), jobs: filtered }, null, 2),
  );

  console.log(`Imported ${filtered.length} jobs to ${outputPath}`);
}

main().catch((error) => {
  console.error("Import failed", error);
  process.exit(1);
});
