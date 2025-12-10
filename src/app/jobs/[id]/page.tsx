import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs, getJobById } from "@/data/jobCache";

type Params = { id: string };

export function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({ id: job.id }));
}

export default function JobDetail({ params }: { params: Params }) {
  const job = getJobById(params.id);

  if (!job) return notFound();

  return (
    <main className="space-y-6 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            {job.company}
          </p>
          <h1 className="font-display text-3xl text-white">{job.title}</h1>
          <p className="text-slate-300">{job.location}</p>
        </div>
        <div className="space-y-2 text-sm text-right text-slate-200">
          <span className="pill border-amber-300/50 bg-amber-400/10 text-amber-100">
            {job.remoteType}
          </span>
          <p>Employment: {job.employmentType}</p>
          <p>Source: {job.source}</p>
          {job.clearance ? <p>Clearance: {job.clearance}</p> : null}
          {job.publishedAt ? <p>Posted: {job.publishedAt}</p> : null}
        </div>
      </div>

      <div className="card space-y-3 p-5">
        <p className="text-sm text-slate-200">
          Role details come from open feeds or the local cache. Keep original source
          links for authenticity.
        </p>
        <p className="text-sm text-slate-300">
          {job.summary} Last refreshed: {job.lastSeen || job.publishedAt || "recent"}.
          Keep the original source URL so candidates can validate authenticity:
        </p>
        <Link
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
        >
          Apply / Source ↗
        </Link>
      </div>

      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Tags
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-200">
          {job.tags.map((tag) => (
            <span key={tag} className="pill border-slate-700 bg-slate-900">
              {tag}
            </span>
          ))}
          {job.salary ? (
            <span className="pill border-slate-700 bg-slate-900">{job.salary}</span>
          ) : null}
        </div>
      </div>

      <Link
        href="/jobs"
        className="text-sm text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
      >
        ← Back to jobs
      </Link>
    </main>
  );
}
