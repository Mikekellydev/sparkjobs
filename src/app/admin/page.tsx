import Link from "next/link";
import { notFound } from "next/navigation";
import { cachedFetchedAt, getAllJobs } from "@/data/jobCache";

function formatDate(iso?: string) {
  if (!iso) return "not set";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const jobs = getAllJobs();
  const previewJobs = jobs.slice(0, 6);
  const cachedCount = jobs.length > 0 ? jobs.length : 0;

  if (!previewJobs) {
    notFound();
  }

  return (
    <main className="space-y-8 text-slate-100">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Admin</p>
        <h1 className="font-display text-3xl text-white">Curation workspace</h1>
        <p className="text-slate-300">
          Secure this route (NextAuth/basic auth/reverse proxy). Monitor feed health, cached
          jobs, and upcoming ingestion. Swap sample data for Prisma writes when ready.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card space-y-3 p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Cached jobs
          </p>
          <p className="text-3xl font-display text-white">
            {cachedCount}
          </p>
          <p className="text-sm text-slate-300">
            Last fetched: {cachedFetchedAt ? formatDate(cachedFetchedAt) : "not set"}. Source file:
            <code className="ml-1 rounded bg-slate-900 px-2 py-1 text-xs text-amber-100">
              data/latest-feeds.json
            </code>
          </p>
          <p className="text-xs text-slate-400">
            Refresh with: <code className="text-amber-100">npm run ingest:fetch</code> or cron it
            every 6h.
          </p>
        </div>
        <div className="card space-y-3 p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Feed status
          </p>
          <p className="text-sm text-slate-200">
            Static build for GitHub Pages uses the cached file or samples. Run locally with
            network to refresh feeds, then commit the updated cache.
          </p>
          <p className="text-xs text-slate-400">
            Suggestion: run <code className="text-amber-100">npm run ingest:fetch</code> on a host
            with outbound access, commit `data/latest-feeds.json`, then deploy.
          </p>
        </div>
        <div className="card space-y-3 p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Ops notes
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• Add Prisma writes + moderation states to persist approvals.</li>
            <li>• Protect ingestion endpoints; rate-limit and log source URLs.</li>
            <li>• Export CSV/RSS for partners; include source and lastSeen.</li>
          </ul>
        </div>
      </div>

      <div className="card space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-white">Preview queue</h2>
          <p className="text-sm text-slate-400">
            Showing {previewJobs.length} items from the cached file (or samples if empty).
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {previewJobs.map((job) => (
            <div key={job.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {job.company}
                  </p>
                  <p className="font-display text-lg text-white">{job.title}</p>
                  <p className="text-xs text-slate-400">{job.location}</p>
                </div>
                <span className="pill border-amber-300/50 bg-amber-400/10 text-amber-100 text-xs">
                  {job.remoteType}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-200">{job.summary}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-200">
                <span className="pill border-slate-700 bg-slate-900">{job.employmentType}</span>
                {job.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="pill border-slate-700 bg-slate-900">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Source: {job.source}</span>
                <Link
                  href={job.applyUrl}
                  className="text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card space-y-3 p-5">
        <h3 className="font-display text-lg text-white">How to refresh + secure</h3>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>
            • Manual refresh: <code className="text-amber-100">npm run ingest:fetch</code> writes
            `data/latest-feeds.json`; schedule via cron every 6h.
          </li>
          <li>
            • Protect this route with NextAuth/basic auth/proxy before exposing externally.
          </li>
          <li>
            • Next step: replace file cache with Prisma writes and add approvals/notes.
          </li>
        </ul>
      </div>

      <Link
        href="/"
        className="text-sm text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
      >
        ← Back to home
      </Link>
    </main>
  );
}
