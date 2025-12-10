import { Job } from "@/data/jobs";

type MuseJob = {
  id: number;
  name: string;
  company: { name: string };
  locations: { name: string }[];
  refs: { landing_page: string };
  publication_date: string;
  contents: string;
  type: string;
  levels: { name: string }[];
  categories: { name: string }[];
};

type MuseResponse = {
  page: number;
  page_count: number;
  results: MuseJob[];
};

export async function getMuseJobs(limit = 10): Promise<Job[]> {
  try {
    const params = new URLSearchParams({
      page: "1",
      descending: "true",
      level: "Mid Level,Senior Level",
      page_size: String(limit),
    });
    const response = await fetch(`https://www.themuse.com/api/public/jobs?${params}`, {
      next: { revalidate: 1800 },
    });
    if (!response.ok) {
      console.error("The Muse fetch failed", response.status, response.statusText);
      return [];
    }
    const data = (await response.json()) as MuseResponse;
    return data.results.slice(0, limit).map(toJob);
  } catch (error) {
    console.error("The Muse fetch error", error);
    return [];
  }
}

function toJob(job: MuseJob): Job {
  const location =
    job.locations?.[0]?.name?.replace("Greater ", "") || "Remote / Hybrid";
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
    lastSeen: new Date(job.publication_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    source: "The Muse",
    applyUrl: job.refs?.landing_page ?? "#",
    salary: undefined,
    publishedAt: job.publication_date,
  };
}

function inferRemoteType(location: string): Job["remoteType"] {
  const lower = location.toLowerCase();
  if (lower.includes("remote")) return "Remote";
  if (lower.includes("hybrid")) return "Hybrid";
  return "Optional Remote";
}

function strip(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
