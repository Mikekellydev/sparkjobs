# Repository Guidelines

## Project Structure & Module Organization
- UI lives in `src/app/` (Next.js App Router). Key routes: `/` (landing), `/jobs`, `/jobs/[id]`, `/for-veterans`, `/admin`.
- Temporary mock data sits in `src/data/`; replace with Prisma queries once the database is connected.
- Prisma schema is in `prisma/schema.prisma`; generated client is written to `node_modules/@prisma/client` (default).
- Static assets go in `public/`. Configuration files (`next.config.ts`, `eslint.config.mjs`, `tailwindcss` via `globals.css`) are in the repo root.

## Build, Test, and Development Commands
- `npm run dev` — start Next.js dev server.
- `npm run build` / `npm run start` — production build and serve.
- `npm run lint` — ESLint with Next.js defaults.
- `npm run typecheck` — TypeScript no-emit check.
- `npm run prisma:generate` — generate Prisma client from `schema.prisma`.
- `npm run prisma:migrate` — create a migration from the current schema (review before applying).
- `npm run prisma:studio` — open Prisma Studio for local data inspection.
- `npm run ingest:fetch` — fetch open feeds (Remotive, The Muse) and cache to `data/latest-feeds.json` for UI fallback/inspection.
- `npm run ingest:seed` — seed curated jobs into `data/latest-feeds.json` when feeds are blocked.
- `npm run ingest:db` — ingest cached jobs into Postgres via Prisma (requires `DATABASE_URL` and generated client).
- Static export is enabled (`output: "export"`) with `basePath`/`assetPrefix` set to `/sparkjobs` for GitHub Pages. Adjust in `next.config.ts` if you fork/rename.

## Coding Style & Naming Conventions
- TypeScript strict mode is on; add explicit return types for exported functions/components.
- Use functional React components with `className` (TailwindCSS); keep JSX small and reusable.
- File naming: kebab-case for files/directories, PascalCase for components, camelCase for variables/functions.

## Testing Guidelines
- Lint and typecheck before opening PRs (`npm run lint && npm run typecheck`).
- When data access is added, keep Prisma queries in isolated functions so they can be unit-tested.
- Add integration-style tests for ingestion/normalization once adapters are introduced (mapping source fields, dedupe logic).

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages (e.g., `add prisma schema for jobs`). Keep commits scoped to one concern.
- PRs should include: summary of changes, how you validated (lint/typecheck/tests), linked issue/ticket, and any UI screenshots if applicable.
- Favor follow-up commits over rebasing after review to preserve discussion context (unless asked otherwise).

## Security, Configuration, and Deployment
- Do not commit secrets. Copy `.env.example` to `.env` and set `DATABASE_URL` for your Postgres instance.
- Secure `/admin` via NextAuth, basic auth, or your reverse proxy before exposing publicly. For static GitHub Pages, auth is not enforced; keep sensitive data out of the static build.
- Keep source URLs for all ingested jobs to preserve trust; dedupe on `sourceId + sourceJobId` as modeled in Prisma.
- Target deployment: SparkwaveITService server. Use `npm run build && npm run start` behind your preferred process manager or Docker; schedule ingestion refresh via cron.
