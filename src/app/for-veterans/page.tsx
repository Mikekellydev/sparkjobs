import Link from "next/link";
import { veteranResources } from "@/data/jobs";

export default function ForVeteransPage() {
  return (
    <main className="space-y-8 text-slate-100">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          For Veterans
        </p>
        <h1 className="font-display text-3xl text-white">
          Clarity, resources, and remote-friendly filters
        </h1>
        <p className="text-slate-300">
          Translate your experience, target remote/hybrid roles, and prep for interviews with
          vetted resources that stay current for service members, spouses, and transitioning
          veterans.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {veteranResources.map((item) => (
          <article key={item.title} className="card space-y-2 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              {item.title}
            </p>
            <p className="text-sm text-slate-200">{item.copy}</p>
            {item.url ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
              >
                {item.action} ↗
              </Link>
            ) : (
              <span className="text-sm text-amber-200">{item.action}</span>
            )}
          </article>
        ))}
      </div>

      <div className="card space-y-3 p-5">
        <h2 className="font-display text-2xl text-white">How to search fast</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>
            • Start with <strong className="text-white">Remote</strong> or{" "}
            <strong className="text-white">Hybrid</strong>, then layer time zone and
            clearance filters. Save your search string for reuse.
          </li>
          <li>
            • Use the <strong className="text-white">Remote Type</strong> and{" "}
            <strong className="text-white">Employment Type</strong> filters first; add
            skills/keywords last to avoid missing matches.
          </li>
          <li>
            • Keep the source link open in a new tab to confirm authenticity and apply
            through the original employer when possible.
          </li>
        </ul>
        <Link
          href="/jobs"
          className="text-sm text-amber-200 underline-offset-4 hover:text-amber-100 hover:underline"
        >
          Browse curated roles
        </Link>
      </div>
    </main>
  );
}
