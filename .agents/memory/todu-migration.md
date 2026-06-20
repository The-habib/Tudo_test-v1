---
name: TODU migration decisions
description: Key decisions from migrating TODU from Base44 to Replit pnpm_workspace with Clerk auth
---

## Wouter routing

wouter's `useLocation()` returns `[pathname, setLocation]` array — NOT an object.
AppLayout uses `children` prop instead of `<Outlet>` (wouter has no Outlet).
Routes defined in `App.tsx` pass page components as `<AppLayout><Page /></AppLayout>`.

**Why:** react-router-dom was replaced with wouter (lighter, no Outlet-based nesting required).

**How to apply:** Always destructure as `const [pathname] = useLocation()`. Never use `location.pathname`.

## Tailwind v3 PostCSS config

Tailwind is configured via `css.postcss.plugins` in `vite.config.ts` — NOT with `@tailwindcss/vite` plugin.

**Why:** App was migrated with Tailwind v3, which uses PostCSS. `@tailwindcss/vite` is for Tailwind v4+.

**How to apply:** If adding new Vite plugins, do not add `@tailwindcss/vite` — it will conflict.

## Clerk auth setup

- Frontend: `@clerk/react`, `@clerk/themes` — `ClerkProvider` in `App.tsx`
- Backend: `@clerk/express` proxy middleware in `artifacts/api-server/src/app.ts`
- Env vars: `VITE_CLERK_PUBLISHABLE_KEY` (frontend), `CLERK_SECRET_KEY` + `CLERK_PUBLISHABLE_KEY` (API)
- Color overrides: `colorPrimary: "#C5D86D"` matches TODU lime-green theme

## Data model

App is currently all static/local data — no DB schema for productivity data yet.
UserGreeting uses real Clerk user data (name, avatar, email).
