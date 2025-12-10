import Link from "next/link";
import { getAllJobs } from "@/data/jobCache";
import { veteranResources } from "@/data/jobs";

const remoteFilters = [
  "Remote",
  "Hybrid",
  "Optional remote",
  "TS/SCI-friendly",
  "Clearance not required",
];

export default function Home() {
  const jobs = getAllJobs().slice(0, 4);
  const hasJobs = jobs.length > 0;
  return (
    <main className="space-y-12 text-slate-100">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 shadow-lg shadow-slate-900/50">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Open-source · SparkwaveITService.com · Veteran-first
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              SparkJobs
            </p>
            <h1 className="font-display text-4xl leading-tight text-white md:text-5xl">
              Remote and hybrid roles curated for veterans and mission-driven
              teams.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Search remote/hybrid/optional-remote jobs, surface clearance-friendly
              roles, and keep source links intact for trust. Built to run on your
              SparkwaveITService server.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="pill bg-amber-400 text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Browse curated roles
              </Link>
              <Link
                href="/for-veterans"
                className="pill border-slate-700 bg-slate-900 text-amber-200 transition hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-300"
              >
                For Veterans resources
              </Link>
              <Link
                href="/admin"
                className="pill border-slate-700 bg-slate-900 text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-500"
              >
                Admin & curation
              </Link>
            </div>
          </div>
          <div className="card max-w-xs space-y-3 p-4 text-sm text-slate-300">
            <div className="flex items-center justify-between text-slate-200">
              <span>Fresh postings</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-200">
                +8 today
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Veteran-friendly</span>
              <span className="font-semibold text-amber-200">86%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Clearance required</span>
              <span className="font-semibold text-slate-100">12 roles</span>
            </div>
            <p className="text-xs text-slate-400">
              Keep sources in sync. Deduplicate by source + job id; mark
              employer-verified when confirmed.
            </p>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Filters ready to ship
          </span>
          {remoteFilters.map((filter) => (
            <span
              key={filter}
              className="pill bg-slate-900 text-slate-200 transition hover:border-amber-300 hover:text-amber-100"
            >
              {filter}
            </span>
          ))}
        </div>
        {hasJobs ? (
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <article key={job.id} className="card flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      {job.company}
                    </p>
                    <h3 className="font-display text-2xl text-white">{job.title}</h3>
                    <p className="text-sm text-slate-400">{job.location}</p>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <div className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-100">
                      {job.remoteType}
                    </div>
                    <p className="mt-2 text-amber-200">
                      {job.publishedAt ?? job.lastSeen ?? ""}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-200">{job.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge label={job.employmentType} />
                  {job.clearance ? <Badge label={job.clearance} tone="info" /> : null}
                  {job.salary ? <Badge label={job.salary} tone="muted" /> : null}
                  {job.tags.map((tag) => (
                    <Badge key={tag} label={tag} tone="muted" />
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Source: {job.source}</span>
                  {job.applyUrl ? (
                    <Link
                      href={job.applyUrl}
                      className="text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View role ↗
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-slate-200">
            <p className="font-display text-xl text-white">No jobs cached yet.</p>
            <p className="mt-2 text-sm text-slate-300">
              Pull real jobs with `npm run ingest:fetch`, commit `data/latest-feeds.json`, and
              redeploy so visitors can click through to real roles.
            </p>
          </div>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
        <div className="card space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-white">For Veterans</h2>
            <Link
              href="/for-veterans"
              className="text-sm text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
            >
              Resources hub
            </Link>
          </div>
          <p className="text-slate-300">
            Translate your service into clear skills, filter by clearance/time zone,
            and prep with vetted examples. Built to reduce noise and highlight
            veteran-aligned employers.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {veteranResources.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-200">{item.copy}</p>
                <span className="mt-3 inline-flex text-sm text-amber-200">
                  {item.action} →
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card space-y-4 p-6">
          <h2 className="font-display text-xl text-white">Curation & Trust</h2>
          <ol className="space-y-3 text-sm text-slate-200">
            <li>
              <strong className="text-white">Normalize:</strong> map source fields,
              keep original URLs, and tag remote type, clearance, and employment
              type.
            </li>
            <li>
              <strong className="text-white">Deduplicate:</strong> source + job id +
              title hash; mark employer-verified when confirmed.
            </li>
            <li>
              <strong className="text-white">Refresh:</strong> `lastSeen` on every
              ingest; expire quietly but keep source link for transparency.
            </li>
          </ol>
          <div className="rounded-xl border border-amber-200/20 bg-amber-400/10 p-4 text-amber-100">
            Ship next: ingestion adapters (Remotive, The Muse), admin approvals,
            and RSS/CSV export for partner orgs.
          </div>
        </div>
      </section>

      <section className="card grid gap-6 p-6 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Admin & moderation
          </p>
          <p className="text-slate-200">
            Approve employer submissions, mark featured roles, and audit changes.
            Basic auth/NextAuth stub is ready to connect to your identity provider.
          </p>
          <Link
            href="/admin"
            className="text-sm text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
          >
            Open admin workspace
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Postgres + Prisma
          </p>
          <p className="text-slate-200">
            Models for Job, Company, Location, Category, Tags, Source, and Users
            are defined. Run <code className="text-amber-100">npm run prisma:generate</code>{" "}
            after setting <code className="text-amber-100">DATABASE_URL</code>.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Deploy on your server
          </p>
          <p className="text-slate-200">
            Dockerize Next.js or run `npm run build && npm run start`. Point to
            your managed Postgres and wire a cron for ingestion.
          </p>
        </div>
      </section>
    </main>
  );
}

function Badge({
  label,
  tone = "accent",
}: {
  label: string;
  tone?: "accent" | "info" | "muted";
}) {
  const toneClasses =
    tone === "info"
      ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
      : tone === "muted"
        ? "border-slate-700 bg-slate-900 text-slate-200"
        : "border-amber-300/50 bg-amber-400/10 text-amber-100";

  return (
    <span className={`pill text-xs font-medium ${toneClasses}`}>{label}</span>
  );
}
