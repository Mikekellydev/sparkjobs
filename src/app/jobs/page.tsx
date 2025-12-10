import Link from "next/link";
import { getAllJobs } from "@/data/jobCache";

export const revalidate = false;

export default function JobsPage() {
  const jobs = getAllJobs();
  const hasJobs = jobs.length > 0;
  return (
    <main className="space-y-8 text-slate-100">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Jobs
        </p>
        <h1 className="font-display text-3xl text-white">
          Remote, hybrid, and optional-remote roles
        </h1>
        <p className="text-slate-300">
          Filter by clearance, remote type, and employment type. Jobs load from the local
          cache file (`data/latest-feeds.json`). If no data is cached, nothing is shown to avoid
          misleading visitors.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-slate-200">
        {["Remote", "Hybrid", "Optional remote", "TS/SCI", "No clearance"].map(
          (filter) => (
            <span
              key={filter}
              className="pill border-slate-700 bg-slate-900 hover:border-amber-300 hover:text-amber-100"
            >
              {filter}
            </span>
          ),
        )}
      </div>

      {hasJobs ? (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <article key={job.id} className="card flex flex-col gap-3 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    {job.company}
                  </p>
                  <h2 className="font-display text-2xl text-white">{job.title}</h2>
                  <p className="text-sm text-slate-400">{job.location}</p>
                </div>
                <div className="text-sm text-amber-200">{job.remoteType}</div>
              </div>
              <p className="text-sm text-slate-200">{job.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                <span className="pill border-amber-300/50 bg-amber-400/10 text-amber-100">
                  {job.employmentType}
                </span>
                {job.tags.map((tag) => (
                  <span key={tag} className="pill border-slate-700 bg-slate-900">
                    {tag}
                  </span>
                ))}
                {job.clearance ? (
                  <span className="pill border-cyan-400/40 bg-cyan-400/10 text-cyan-100">
                    {job.clearance}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>
                  Source: {job.source}
                  {job.publishedAt ? ` · Posted ${job.publishedAt}` : ""}
                </span>
                <div className="flex items-center gap-3">
                  {job.applyUrl ? (
                    <Link
                      href={job.applyUrl}
                      className="text-slate-100 underline-offset-4 hover:text-white hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View role ↗
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card p-6 text-slate-200">
          <p className="font-display text-xl text-white">No jobs cached yet.</p>
          <p className="mt-2 text-sm text-slate-300">
            Pull real jobs with `npm run ingest:fetch` on a network with access, commit the updated
            `data/latest-feeds.json`, and redeploy to GitHub Pages.
          </p>
        </div>
      )}
    </main>
  );
}
