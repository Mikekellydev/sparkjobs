import { Job } from "@/data/jobs";

type RemotiveJob = {
  id: number;
  url: string;
  title: string;
  company_name: string;
  candidate_required_location: string;
  job_type: string;
  tags: string[];
  salary: string | null;
  publication_date: string;
  description: string;
};

type RemotiveResponse = {
  jobs: RemotiveJob[];
};

export async function getRemotiveJobs(limit = 10): Promise<Job[]> {
  try {
    const response = await fetch("https://remotive.io/api/remote-jobs", {
      next: { revalidate: 1800 },
    });
    if (!response.ok) {
      console.error("Remotive fetch failed", response.status, response.statusText);
      return [];
    }
    const data = (await response.json()) as RemotiveResponse;
    return data.jobs.slice(0, limit).map(toJob);
  } catch (error) {
    console.error("Remotive fetch error", error);
    return [];
  }
}

function toJob(job: RemotiveJob): Job {
  return {
    id: `remotive-${job.id}`,
    title: job.title,
    company: job.company_name,
    location: job.candidate_required_location || "Remote",
    remoteType: "Remote",
    employmentType: job.job_type || "Unknown",
    tags: job.tags?.slice(0, 6) ?? [],
    summary: strip(job.description).slice(0, 200) + "...",
    lastSeen: new Date(job.publication_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    source: "Remotive",
    applyUrl: job.url,
    salary: job.salary ?? undefined,
    publishedAt: job.publication_date,
  };
}

function strip(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
