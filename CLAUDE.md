# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint (flat config, eslint-config-next)
```

No test framework is configured.

## Architecture

**Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript** gym website for Nexo CrossFit Valencia.

### Routing & i18n

- Uses `next-intl` with `[locale]` dynamic segment: `app/[locale]/...`
- Locales: `es` (default), `en` — prefix always shown (`localePrefix: "always"`)
- i18n config: `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`
- Translation files: `messages/es.json`, `messages/en.json`
- `app/layout.tsx` is a passthrough; the real layout is `app/[locale]/layout.tsx`
- `next.config.ts` has extensive redirect rules mapping old Spanish URLs to new locale-prefixed paths

### Pages (under `app/[locale]/`)

`page.tsx` (home), `about-us/`, `class/` (crossfit, hyrox subpages), `contact/`, `on-ramp/`, `plans/`, `privacy/`, `team/`

### Components

- `components/` — shared components (`Navbar`, `Footer`, `PageHero`, `OptimizedImage`, etc.)
- `components/{page}/` — page-specific components (e.g., `components/contact/ContactForm.tsx`)
- `components/templates/` — React Email templates (`ClassEmailTemplate`, `ContactEmailTemplate`, `OnRampEmailTemplate`)

### API Routes

- `app/api/send/{class,contact,onramp}/` — email sending endpoints using Resend

### Key Patterns

- **RSC by default** — only add `"use client"` where state/interactivity is needed
- **CSS-only interactivity** — mobile menu and carousels use `:has()` selector + hidden checkbox inputs (no JS)
- **Fonts** — Zalando Sans Expanded (`--font-zalando`, `font-heading`) + Public Sans (`--font-public-sans`, `font-body`), loaded via `next/font/google`
- **Theme colors** — defined in `@theme` block in `globals.css`: `nexo-orange` (#E94F1D), `nexo-dark` (#1E1E1E), `nexo-gray`, `nexo-light-gray`
- **Forms** — `react-hook-form` + `zod` validation; client components that redirect to `/confirm` subpages on submit
- **Images** — use `OptimizedImage` wrapper around `next/image`
- **Path alias** — `@/*` maps to project root

### SEO

- Each page exports `metadata` or `generateMetadata`
- Base URL: `https://www.nexocrossfit.es`
- `app/sitemap.ts` and `app/robots.ts` at app root (outside locale segment)
- Confirm pages have `robots: { index: false }`

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
