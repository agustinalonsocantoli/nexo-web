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
