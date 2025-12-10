import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[50vh] flex-col items-start justify-center gap-4 text-slate-100">
      <h1 className="font-display text-3xl text-white">Not found</h1>
      <p className="text-slate-300">
        The page or job you are looking for is not available yet. It may be a placeholder
        until live data is connected.
      </p>
      <Link
        href="/"
        className="pill border-slate-700 bg-slate-900 text-slate-100 hover:border-amber-300 hover:text-amber-100"
      >
        Return home
      </Link>
    </main>
  );
}
