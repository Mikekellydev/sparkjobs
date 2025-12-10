# SparkJobs (SparkwaveITService.com)

Veteran-first, remote/hybrid job discovery. Built with Next.js (App Router) + TypeScript, TailwindCSS, Prisma, and PostgreSQL. Deployed on your SparkwaveITService server.

## Quick start
- Copy envs: `cp .env.example .env` and set `DATABASE_URL` for your Postgres instance.
- Install deps: `npm install`
- Generate Prisma client: `npm run prisma:generate`
- Run dev server: `npm run dev` then open http://localhost:3000

## Scripts
- `npm run dev` — start Next.js dev server
- `npm run build` / `npm run start` — production build + serve
- `npm run lint` — ESLint with Next.js defaults
- `npm run typecheck` — TypeScript no-emit check
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:migrate` — create a migration from the current schema (edit migration before applying)
- `npm run prisma:studio` — open Prisma Studio for quick data inspection
- `npm run ingest:fetch` — fetch open job feeds (Remotive, The Muse) and cache to `data/latest-feeds.json` for the UI fallback
- `npm run ingest:seed` — write curated sample jobs into `data/latest-feeds.json` (useful when outbound network is blocked)
- `npm run ingest:db` — write cached jobs from `data/latest-feeds.json` into Postgres via Prisma (run after `ingest:fetch` or `ingest:seed`)

## Project structure
- `src/app/` — App Router pages (`/`, `/jobs`, `/jobs/[id]`, `/for-veterans`, `/admin`)
- `src/data/` — temporary sample data for UI scaffolding
- `prisma/schema.prisma` — models for Job, Company, Location, Category, Tags, Source, and User
- `public/` — static assets

## Next steps
- Connect to Postgres and run `npm run prisma:migrate` to create tables.
- Swap sample data for Prisma queries; ingestion for Remotive/The Muse is scaffolded and can be cron’d via `npm run ingest:fetch` (or `ingest:seed` when offline).
- Secure `/admin` with basic auth env vars (`ADMIN_USER`/`ADMIN_PASS`) or NextAuth/reverse proxy; add moderation and export flows (CSV/RSS).
- Add deployment config for your SparkwaveITService server (Docker or systemd) and a cron for ingestion refresh.
# sparkjobs
