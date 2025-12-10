import Link from "next/link";
import { filterMidExecIt, getAllJobs } from "@/data/jobCache";

export const revalidate = false;

export default function ItJobsPage() {
  const jobs = filterMidExecIt(getAllJobs());
  return (
    <main className="space-y-8 text-slate-100">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          IT Leadership
        </p>
        <h1 className="font-display text-3xl text-white">
          Mid-to-executive IT roles for transitioning service members
        </h1>
        <p className="text-slate-300">
          Curated senior roles across cloud, security, data, and platform. Built to help
          transitioning service members target leadership tracks in remote and hybrid teams.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-200">
          {["Senior", "Lead", "Manager", "Director", "Principal", "Architect"].map((pill) => (
            <span key={pill} className="pill border-slate-700 bg-slate-900">
              {pill}
            </span>
          ))}
          {["Cloud", "Security", "DevOps", "Data"].map((pill) => (
            <span key={pill} className="pill border-amber-300/50 bg-amber-400/10 text-amber-100">
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <article key={job.id} className="card flex flex-col gap-3 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  {job.company}
                </p>
                <h2 className="font-display text-2xl text-white">{job.title}</h2>
                <p className="text-sm text-slate-400">{job.location}</p>
              </div>
              <div className="text-right text-sm text-slate-200">
                <div className="pill border-amber-300/50 bg-amber-400/10 text-amber-100 text-xs">
                  {job.remoteType}
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  {job.publishedAt ? `Posted ${job.publishedAt}` : job.lastSeen || ""}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-200 line-clamp-3">{job.summary}</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-200">
              <span className="pill border-slate-700 bg-slate-900">{job.employmentType}</span>
              {job.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="pill border-slate-700 bg-slate-900">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Source: {job.source}</span>
              <div className="flex items-center gap-3">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
                >
                  View details
                </Link>
                <Link
                  href={job.applyUrl}
                  className="text-slate-100 underline-offset-4 hover:text-white hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply ↗
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="card space-y-3 p-5">
        <h3 className="font-display text-lg text-white">How we pick these</h3>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>• Titles must include senior/lead/manager/director-level signals plus IT/engineering focus.</li>
          <li>• Feeds: Remotive + The Muse (open APIs); falls back to cached data or curated samples.</li>
          <li>• Next step: replace heuristics with structured levels/categories from Prisma + admin approvals.</li>
        </ul>
        <Link
          href="/admin"
          className="text-sm text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
        >
          Manage approvals in Admin →
        </Link>
      </div>
    </main>
  );
}
