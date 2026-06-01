---
codd:
  node_id: infra:build-deploy
  type: document
  depends_on:
  - id: design:system-overview
    relation: depends_on
    semantic: technical
  - id: governance:adr-tech-stack
    relation: constrained_by
    semantic: governance
  depended_by: []
  conventions:
  - targets:
    - infra:vercel
    reason: Vercel project must be configured for the free plan; next.config must
      not enable ISR revalidation periods or other paid-tier behaviors.
  - targets:
    - module:app
    - infra:vercel
    reason: next build must complete without errors and produce a fully static export;
      a failing build blocks all deployments.
  - targets:
    - infra:vercel
    reason: public/og-image.png must be committed to the repository; the file must
      not be in .gitignore.
  modules:
  - app
---

# Build and Deployment Setup

## 1. Overview

`portforio-v2` is built with Next.js 16 App Router and deployed to Vercel's free plan as a fully static site. `next build` compiles all TypeScript source files in `app/`, `components/`, and `data/` into static HTML, CSS, and JavaScript assets at build time. No Node.js runtime is active at request time; all requests are served from Vercel's CDN as static file responses.

Three release-blocking constraints govern every build and deployment:

1. **Static export integrity** (`module:app`, `infra:vercel`): `next build` must exit with code 0 and produce a fully static artifact. Any non-zero exit — caused by TypeScript errors, unresolved imports, or missing files — blocks all deployments.
2. **Vercel free-plan compliance** (`infra:vercel`): `next.config.ts` must not configure ISR `revalidate` periods, Edge Functions, or any feature unavailable on the Vercel free plan.
3. **OGP image committed** (`infra:vercel`): `public/og-image.png` must be committed to the repository and must not appear in `.gitignore`. Its absence at build time causes the `og:image` metadata to resolve to a missing asset, which is a release blocker (FC-03).

---

## 2. Details

### 2.1 Build Command and Output Mode

The build entry point is:

```bash
npm ci
npm run build   # executes: next build
```

`package.json` scripts:

| Script | Command |
|---|---|
| `build` | `next build` |
| `start` | `next start` |
| `type-check` | `tsc --noEmit` |

`next build` must exit with code 0. The standard output is the `.next/` directory, which is served by `next start` on port 3000. `next start` is the correct serve command for both local CI testing and Vercel production; it reads from `.next/` rather than a portable `out/` directory (see Open Questions OQ-001 for the `output: 'export'` trade-off).

### 2.2 `next.config.ts` Constraints

`next.config.ts` is a TypeScript file (`module:app` TypeScript-only constraint). The following configuration rules are release-blocking:

- **No `revalidate`**: No page or layout may export `export const revalidate = N`. ISR revalidation is a paid-tier feature on Vercel and is prohibited on the free plan.
- **No Edge Runtime**: No file may declare `export const runtime = 'edge'`. Edge Functions are unavailable on the Vercel free plan.
- **No `experimental` paid features**: `experimental.ppr`, `experimental.dynamicIO`, or any flag that enables server-side runtime behavior at request time must not be enabled.
- **No `output: 'export'` required by default**: The standard SSG pipeline produces `.next/` for `next start`. If `output: 'export'` is adopted (producing `out/`), the CI startup sequence and Vercel build settings must both be updated before merging (follow-up F-001).

A minimal compliant `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // No revalidate, no Edge runtime, no paid ISR features.
};

export default nextConfig;
```

### 2.3 TypeScript Build Gate

`tsc --noEmit` must exit with code 0 as a pre-test step (FC-08, AC-12). `tsconfig.json` enforces `strict: true`. All source files use `.ts` or `.tsx` extensions. Configuration files (`next.config.ts`, `tailwind.config.ts`) are also TypeScript. The CI pipeline must detect and reject any `.js` or `.jsx` file introduced into the source tree (follow-up F-005).

### 2.4 Static Asset Requirement: `public/og-image.png`

`public/og-image.png` must be present in the repository at all times:

- The file must not appear in `.gitignore` or `.vercelignore`.
- The file must be a valid PNG. Vercel serves it as a static asset at `/og-image.png`.
- `app/layout.tsx` references it via `metadata.openGraph.images`, which resolves to `/og-image.png` in the static HTML `<head>`.
- If the file is absent, the `og:image` `<meta>` tag either resolves to a 404 or is omitted, both of which are release blockers (FC-03).
- Concrete OGP image dimensions (recommended: 1200×630 px for Twitter/X and LinkedIn compatibility) are tracked under Open Questions OQ-004.

### 2.5 Vercel Deployment Configuration

Deployment target: Vercel free plan (the sole permitted hosting environment).

| Setting | Required Value |
|---|---|
| Framework preset | Next.js (auto-detected) |
| Build command | `npm run build` |
| Output directory | `.next` (default) or `out` if `output: 'export'` is adopted |
| Install command | `npm ci` |
| Node.js version | Compatible with Next.js 16 (Node.js 18+) |
| Edge Functions | Must be disabled / none configured |
| ISR revalidation | Must not be configured |

Before each production deployment, verify that no Edge Functions or paid-tier ISR features are active in the Vercel project dashboard (follow-up F-002). This check is a release-blocking step.

### 2.6 CI Pipeline and Server Startup

The CI pipeline for E2E tests follows this exact sequence:

```bash
npm ci
tsc --noEmit          # TypeScript gate — must exit 0 (FC-08)
npm run build         # Static build gate — must exit 0 (FC-07)
npm start &           # Serve on port 3000
npx wait-on http://localhost:3000 --timeout 30000
```

`wait-on` polls `http://localhost:3000` with a 30-second timeout. If the server does not respond within 30 seconds, the CI run fails before any test executes. The shared helper `tests/e2e/helpers/server-health.ts` exposes `waitForServer(url)`, which asserts that the first HTTP response returns `status < 500` before the test suite proceeds.

### 2.7 Release Quality Gate

A build is release-eligible only when all of the following hold simultaneously:

| Condition | Verification |
|---|---|
| `tsc --noEmit` exits 0 | CI type-check step |
| `next build` exits 0 | CI build step |
| Zero HTTP 5xx responses | Every Playwright test asserts `response.status() < 500` |
| Zero failing Playwright tests | Full test suite pass |
| Zero `test.skip()` calls | Test suite audit |
| All AC-01 through AC-13 scenarios covered | Test coverage review |
| Zero axe-core `critical` or `serious` violations | `tests/e2e/accessibility.browser.spec.ts` via `axe-runner.ts` |
| `public/og-image.png` present and reachable | `tests/e2e/static-assets.spec.ts` (FC-03) |
| All 5 OGP `<head>` metadata elements non-empty | `tests/e2e/seo-metadata.spec.ts` (FC-02) |
| `scrollWidth ≤ 375` at 375px viewport | `tests/e2e/responsive.browser.spec.ts` (FC-04) |
| Exactly 3 project cards, 3 career entries, 7 sections | Strict `=== N` assertions in respective spec files |
| No Edge Functions or paid ISR active on Vercel | Manual pre-deployment check (F-002) |

### 2.8 Content and Build-Time Data

All content for all seven sections (Hero, About, Skills, Projects, SelfLearning, Career, Contact) is embedded in TypeScript constants under `data/` or co-located in `components/`. No network requests occur during `next build`. The build process is fully offline-capable after `npm ci` completes. This guarantees deterministic, reproducible builds and satisfies the no-external-data-sources constraint (`module:app`).

### 2.9 Security and Access Control

The deployment has no authentication layer, no login flow, no API routes performing server-side mutations, and no database connections. The attack surface is limited to static file delivery via Vercel's CDN. `public/og-image.png` and all other static assets under `public/` are publicly readable, which is the intended behavior. No personally identifiable information beyond the author's name, GitHub profile URL, and the static email address in the Contact section is present in the build artifact.

---

## 3. Open Questions

| # | Question | Impact | Source |
|---|---|---|---|
| OQ-001 | Should `next.config.ts` set `output: 'export'` (producing a portable `out/` directory) or rely on standard SSG with `next start` reading from `.next/`? The CI startup sequence uses `next start`, implying `.next/` mode. Adopting `output: 'export'` requires updating both CI and Vercel output directory settings before merging. | Build pipeline, Vercel output directory configuration, CI startup command | ADR-001-A (F-001) |
| OQ-004 | `public/og-image.png` has no enforced dimensions or file-size constraint. Twitter/X and LinkedIn both recommend 1200×630 px. Should the OGP image specification be formalized with concrete dimensions and a maximum file size to ensure correct rendering across target platforms? | SEO, OGP display quality on social platforms | ADR-001-E (F-003), AC-09 |
