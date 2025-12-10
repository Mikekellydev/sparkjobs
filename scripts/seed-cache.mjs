// Writes a local cache file with curated sample IT leadership jobs.
// Use when external feeds are blocked. The UI reads data/latest-feeds.json first.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, "..", "data", "latest-feeds.json");

const jobs = [
  {
    id: "seed-1",
    title: "Senior Cloud Platform Engineer",
    company: "Sparkwave IT Service",
    location: "Remote · US only",
    remoteType: "Remote",
    employmentType: "Full-time",
    tags: ["kubernetes", "aws", "platform", "veteran-friendly"],
    summary:
      "Lead cloud platform hardening, observability, and deployment automation for mission customers.",
    lastSeen: "today",
    source: "Seeded sample",
    applyUrl: "https://sparkwaveitservice.com/careers/cloud-platform",
    salary: "$150K–$180K",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    title: "Lead DevSecOps Engineer",
    company: "Remote Defense Analytics",
    location: "Remote · North America",
    remoteType: "Remote",
    employmentType: "Full-time",
    tags: ["devsecops", "iac", "clearance-eligible"],
    summary:
      "Own CI/CD, IaC, and security controls for multi-account workloads; mentor teams on secure delivery.",
    lastSeen: "today",
    source: "Seeded sample",
    applyUrl: "https://example.com/jobs/devsecops",
    salary: "$145K–$170K",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "seed-3",
    title: "Director of IT Operations (Hybrid)",
    company: "CivicCyber",
    location: "Hybrid · DC / Arlington",
    remoteType: "Hybrid",
    employmentType: "Full-time",
    tags: ["it-ops", "leadership", "compliance"],
    summary:
      "Lead IT operations, endpoint security, and compliance (ATO/POA&M) for federal-facing teams.",
    lastSeen: "today",
    source: "Seeded sample",
    applyUrl: "https://example.com/jobs/director-it-ops",
    salary: "$170K–$200K",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "seed-4",
    title: "Principal Security Architect",
    company: "MissionLane",
    location: "Remote · Flexible timezone",
    remoteType: "Remote",
    employmentType: "Full-time",
    tags: ["architecture", "zero-trust", "veteran-friendly"],
    summary:
      "Define zero-trust architecture, threat modeling, and security standards across cloud workloads.",
    lastSeen: "today",
    source: "Seeded sample",
    applyUrl: "https://example.com/jobs/security-architect",
    salary: "$180K–$215K",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "seed-5",
    title: "Senior Data Engineering Manager",
    company: "SignalBridge",
    location: "Remote · US",
    remoteType: "Remote",
    employmentType: "Full-time",
    tags: ["data", "spark", "lead", "manager"],
    summary:
      "Lead a small team building ingestion and quality pipelines (Spark/Python) for analytics customers.",
    lastSeen: "today",
    source: "Seeded sample",
    applyUrl: "https://example.com/jobs/data-engineering-manager",
    salary: "$160K–$190K",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "seed-6",
    title: "IT Manager, Endpoint & Identity",
    company: "VectorOps",
    location: "Hybrid · San Antonio",
    remoteType: "Hybrid",
    employmentType: "Full-time",
    tags: ["intune", "okta", "it-management"],
    summary:
      "Manage endpoint, identity, and access controls; coordinate rollouts and incident response playbooks.",
    lastSeen: "today",
    source: "Seeded sample",
    applyUrl: "https://example.com/jobs/it-manager-endpoint",
    salary: "$135K–$155K",
    publishedAt: new Date().toISOString(),
  },
];

async function main() {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    JSON.stringify({ fetchedAt: new Date().toISOString(), jobs }, null, 2),
  );
  console.log(`Seeded ${jobs.length} jobs to ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to seed cache", error);
  process.exitCode = 1;
});
