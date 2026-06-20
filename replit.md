# TODU — Your Productivity Companion

A habits, tasks, and goals tracker app built with React + Vite, migrated from Base44 to the Replit pnpm_workspace stack with Clerk auth.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000 / $PORT)
- `pnpm --filter @workspace/productivity-app run dev` — run the frontend (port $PORT)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind v3 (PostCSS), framer-motion, wouter
- Auth: Clerk (Replit-managed whitelabel)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (schema TBD — app is currently static/local data)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/productivity-app/` — React + Vite frontend
  - `src/App.tsx` — main entry: ClerkProvider + Wouter routing
  - `src/pages/` — Welcome, Home, Habits, Tasks, TaskProjects, Goals
  - `src/components/layout/` — AppLayout (children prop), BottomNav (wouter Link)
  - `src/components/home/` — UserGreeting (Clerk useUser), DailyGoalIcons, HabitCard, TaskBoard
  - `src/index.css` — Tailwind base + Google Fonts (Inter)
- `artifacts/api-server/` — Express 5 API server with Clerk proxy middleware
- `artifacts/productivity-app/public/logo.svg` — TODU bear mascot logo

## Architecture decisions

- **Wouter instead of react-router-dom** — lighter, simpler; `useLocation()` returns `[pathname, setLocation]` array
- **AppLayout takes `children` prop** — wouter has no `<Outlet>` equivalent; routes pass page components as children
- **Clerk whitelabel auth** — Replit-managed Clerk; sign-in/sign-up at `/sign-in` and `/sign-up`; signed-in users auto-redirect to `/home`
- **Tailwind v3 via PostCSS** — `vite.config.ts` uses `css.postcss.plugins` (tailwindcss + autoprefixer), NOT `@tailwindcss/vite`
- **Static data** — no DB schema for productivity data yet; all data is local/in-component

## Product

TODU is a mobile-first productivity companion with:
- **Home** — daily greeting with user's real name/avatar (Clerk), habit progress, task board
- **Habits** — habit tracking with streak banners and time tabs
- **Tasks** — daily task list + project management
- **Goals** — goal grid with stats
- **Bottom nav** — floating dark pill with lime-green active indicators

## Color theme

- Lime green: `#C5D86D`
- Dark: `#1a1a1a`
- Background: `#f0f0eb`

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Vite Tailwind: use PostCSS plugin config, NOT `@tailwindcss/vite` plugin
- wouter `useLocation()` returns array `[pathname, setLocation]`, not an object
- AppLayout must receive `children` prop (no Outlet)
- Clerk env vars: `VITE_CLERK_PUBLISHABLE_KEY` for frontend, `CLERK_SECRET_KEY` + `CLERK_PUBLISHABLE_KEY` for API server

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `clerk-auth` skill for Clerk configuration and customization
