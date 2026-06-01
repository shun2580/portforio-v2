---
codd:
  node_id: design:system-overview
  type: design
  depends_on:
  - id: test:acceptance-criteria
    relation: constrained_by
    semantic: governance
  - id: governance:adr-tech-stack
    relation: derives_from
    semantic: governance
  depended_by:
  - id: design:component-architecture
    relation: depends_on
    semantic: technical
  - id: design:seo-accessibility-design
    relation: depends_on
    semantic: technical
  - id: design:responsive-layout-design
    relation: depends_on
    semantic: technical
  - id: infra:build-deploy
    relation: depends_on
    semantic: technical
  conventions:
  - targets:
    - module:app
    reason: SSG pipeline (next build) must produce purely static output; any page
      that requires a Node.js runtime at request time is a release blocker.
  - targets:
    - infra:vercel
    reason: Vercel free plan is the sole deployment target; architecture must not
      depend on infrastructure unavailable on that tier.
  - targets:
    - module:app
    reason: All content data is authored in TypeScript source files; no runtime data
      fetching or external CMS integration is permitted.
  modules:
  - app
  - layout
---

# System Architecture Overview

## 1. Overview

`portforio-v2` is a single-page portfolio site for backend engineer Shun Nishikawa (西川 駿), targeting hiring managers and technical interviewers. Its primary goal is to demonstrate technical skills and self-directed engineering capability through a clean, fast, and accessible static site.

The site is rendered entirely via Static Site Generation (SSG) using Next.js 16 App Router. `next build` produces a fully static artifact with no Node.js runtime dependency at request time — this is a release-blocking constraint. All content is statically embedded in TypeScript source files at build time; there is no external database, no CMS integration, and no API routes that perform server-side data mutations.

The deployment target is the Vercel free plan, which is the sole permitted hosting environment. No paid-tier features (ISR beyond free limits, Edge Functions) may be used. The site must satisfy measurable thresholds for responsiveness (375px minimum viewport width without horizontal overflow), accessibility (zero axe-core `critical` or `serious` violations), and SEO (five required `<head>` metadata elements).

---

## 2. Architecture

### 2.1 Technology Stack

| Layer | Technology | Version / Plan |
|---|---|---|
| Framework | Next.js App Router | 16 |
| Language | TypeScript | strict mode, project-wide |
| Styling | Tailwind CSS | latest stable |
| Rendering | SSG (Static Site Generation) | `next build` → static HTML |
| Deployment | Vercel | free plan |
| Image optimization | next/image | Next.js built-in |
| Content management | TypeScript source constants | no external DB |

**Release-blocking constraint — SSG only (`module:app`):** `getServerSideProps`, Route Handlers, and any server-side runtime execution at request time are prohibited. Every page must be pre-rendered to static HTML by `next build`. Any page requiring a Node.js runtime at request time is a release blocker.

**Release-blocking constraint — Vercel free plan (`infra:vercel`):** Architecture must not depend on Edge Functions or ISR beyond free-plan limits. Build artifacts must be purely static assets served via Vercel's static hosting.

**Release-blocking constraint — TypeScript only (`module:app`):** `.js` / `.jsx` source files are prohibited. `tsconfig.json` enforces `strict: true`. All configuration files (`next.config.ts`, `tailwind.config.ts`) are also TypeScript. CI must detect and reject any `.js` / `.jsx` file introduced into the source tree.

**Release-blocking constraint — No external data sources (`module:app`):** No database connections or external API calls. All content for all seven sections is embedded in TypeScript constants at build time.

### 2.2 Directory Structure

```
/
├── app/
│   ├── page.tsx          # Top page — composes all seven sections
│   ├── layout.tsx        # Shared layout, Metadata API export, globals.css import
│   └── globals.css       # Global styles (Tailwind base)
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── SelfLearning.tsx
│   ├── Career.tsx
│   └── Contact.tsx
├── data/                 # Typed content constants (no runtime fetch)
├── public/
│   └── og-image.png      # OGP image (must exist at build time)
└── tests/
    └── e2e/
        ├── helpers/      # Shared Playwright helpers
        └── *.spec.ts / *.browser.spec.ts
```

### 2.3 Module Architecture

The site is a single route (`/`) composed of seven mandatory content sections. Each section maps to a dedicated React component and must be identifiable via its `id` attribute for smooth-scroll navigation. Omitting any section is a scope violation and a release blocker.

| Module | Component | Section `id` | Content Source |
|---|---|---|---|
| `module:hero` | `Hero.tsx` | `hero` | Static TypeScript |
| `module:about` | `About.tsx` | `about` | Static TypeScript |
| `module:skills` | `Skills.tsx` | `skills` | Static TypeScript |
| `module:projects` | `Projects.tsx` | `projects` | Static TypeScript |
| `module:self_learning` | `SelfLearning.tsx` | `self-learning` | Static TypeScript |
| `module:career` | `Career.tsx` | `career` | Static TypeScript |
| `module:contact` | `Contact.tsx` | `contact` | Static TypeScript |

`app/page.tsx` renders all seven components in sequence. `app/layout.tsx` wraps all page content with global styles imported from `app/globals.css` and defines site-wide metadata.

The rendered HTML must include exactly the following semantic landmarks: one `<header>`, one `<main>`, at least seven `<section>` elements (one per content module), and one `<footer>`. Absence of any of these landmarks is a release blocker (FC-06).

### 2.4 Content Model

All content is TypeScript-typed constants. No CMS, no runtime data fetch, no network access during build. Content updates require editing the TypeScript source and redeploying.

**Hero:** Displays full name "西川 駿", a one-line self-introduction, and a hyperlink to the GitHub profile. Includes a smooth-scroll navigation element.

**About:** Renders a career summary including the career-change narrative (non-IT to IT transition) and current role overview.

**Skills:** Renders skills grouped into exactly three categories: languages/frameworks, infra/cloud, and dev tools.

**Projects:** Renders exactly 3 project cards. Each card contains overview/problem/solution/result text, technology tags, and a GitHub link. The three projects are:
1. 既存ふるさと納税サイトの ECS + Laravel へのリアーキテクチャ推進 — tags: AWS ECS, Laravel, Docker
2. シリアルコード型ふるさと納税サイト・CMS の新規開発 — tags: Next.js, Laravel, BFF
3. 開発環境のコンテナ化・標準化と DX 向上 — tags: Docker, Docker Compose

Rendering fewer or more than exactly 3 project cards is a release blocker (FC-11).

**Self-Learning:** Renders self-directed learning content (multi-agent AI development environment, multi-agent-shogun).

**Career:** Renders a timeline with exactly 3 company entries. Fewer or more than 3 is a release blocker (FC-12).

**Contact:** Renders a GitHub profile link (`href` contains `github.com`) and a visible email address (or `mailto:` link).

### 2.5 SEO and OGP

All metadata is defined statically in `app/layout.tsx` using the Next.js 16 Metadata API (`export const metadata`). Because the site is SSG, metadata is embedded in static HTML at build time and is accessible to crawlers in JavaScript-disabled environments.

The following five metadata elements are required in every rendered `<head>`. Any element that is absent, has an empty `content` value, or is duplicated is a release blocker (FC-02):

| Element | Metadata API Field |
|---|---|
| `<title>` | `metadata.title` |
| `<meta name="description">` | `metadata.description` |
| `<meta property="og:title">` | `metadata.openGraph.title` |
| `<meta property="og:description">` | `metadata.openGraph.description` |
| `<meta property="og:image">` | `metadata.openGraph.images` → `public/og-image.png` |

`public/og-image.png` must exist as a valid PNG file in the build artifact. If the file is absent or the `og:image` URL returns a non-image or 4xx/5xx response, it is a release blocker (FC-03).

Images rendered via `next/image` must specify explicit `width` and `height` to prevent Cumulative Layout Shift (CLS). All `<img>` elements must carry non-empty `alt` attributes; empty or absent `alt` on any content image is a release blocker (FC-05).

### 2.6 Responsive Layout

The minimum supported viewport width is 375px. At this viewport width:

- `document.documentElement.scrollWidth` must be `≤ 375` — measured via `page.evaluate()` in Playwright browser tests.
- No horizontal scrollbar may appear.
- Hero and Projects sections must not overflow the viewport horizontally.
- All 3 project cards must stack vertically.

Horizontal overflow at 375px is a release blocker (FC-04). Tailwind CSS breakpoints are authored mobile-first: `sm` (640px), `md` (768px), `lg` (1024px).

### 2.7 Rendering Pipeline and Deployment

```
TypeScript source (components/, data/, app/)
         │
         ▼
    next build
         │ Produces static HTML + CSS + JS assets
         ▼
    .next/ or out/
         │
         ▼
  Vercel free plan
    (static hosting)
         │
         ▼
    GET / → static HTML response
```

`next build` must exit with code 0. Any non-zero exit code — caused by TypeScript type errors, unresolved imports, or missing configuration — is a release blocker (FC-07, FC-08). `tsc --noEmit` must also exit with code 0 as a pre-test step (FC-08).

The Vercel deployment must be verified to have no Edge Functions or paid-tier ISR features enabled before each production deployment.

### 2.8 Testing Architecture

E2E tests use Playwright. Tests are split into two levels:

**API integration tests (`*.spec.ts`):** Use Playwright `request` context. Assert HTTP status codes, HTML structure parsed from response body, `<head>` metadata, and DOM element counts. Do not launch a browser.

**Browser tests (`*.browser.spec.ts`):** Use Playwright `page`. Simulate scroll, click, and viewport resize. Assert visible UI state.

Every HTTP request assertion must first assert `response.status() < 500` before checking business-logic conditions.

**Server startup (CI):**
```bash
npm ci
npm run build
npm start &
npx wait-on http://localhost:3000 --timeout 30000
```

**Playwright base configuration:**
```typescript
use: {
  baseURL: 'http://localhost:3000',
  headless: true,
  viewport: { width: 1280, height: 800 },
}
```

Responsive browser tests set `page.setViewportSize({ width: 375, height: 812 })` before loading the page.

**Test domains (non-overlapping):**

| Domain | API spec | Browser spec |
|---|---|---|
| `seo-metadata` | `tests/e2e/seo-metadata.spec.ts` | `tests/e2e/seo-metadata.browser.spec.ts` |
| `sections-presence` | `tests/e2e/sections-presence.spec.ts` | `tests/e2e/sections-presence.browser.spec.ts` |
| `hero` | `tests/e2e/hero.spec.ts` | `tests/e2e/hero.browser.spec.ts` |
| `about` | `tests/e2e/about.spec.ts` | `tests/e2e/about.browser.spec.ts` |
| `skills` | `tests/e2e/skills.spec.ts` | `tests/e2e/skills.browser.spec.ts` |
| `projects` | `tests/e2e/projects.spec.ts` | `tests/e2e/projects.browser.spec.ts` |
| `self-learning` | `tests/e2e/self-learning.spec.ts` | `tests/e2e/self-learning.browser.spec.ts` |
| `career` | `tests/e2e/career.spec.ts` | `tests/e2e/career.browser.spec.ts` |
| `contact` | `tests/e2e/contact.spec.ts` | `tests/e2e/contact.browser.spec.ts` |
| `responsive` | *(N/A)* | `tests/e2e/responsive.browser.spec.ts` |
| `accessibility` | `tests/e2e/accessibility.spec.ts` | `tests/e2e/accessibility.browser.spec.ts` |
| `static-assets` | `tests/e2e/static-assets.spec.ts` | *(N/A)* |

**Shared helpers** (`tests/e2e/helpers/`):

| File | Responsibility |
|---|---|
| `server-health.ts` | `waitForServer(url)` — asserts GET returns `< 500` before tests run |
| `html-parser.ts` | `getHead(html)`, `getMetaContent(html, name/property)` |
| `dom-assertions.ts` | `assertNoOverflow(page, selector)`, `assertAltText(page)` |
| `axe-runner.ts` | `runAxe(page)` — returns violations filtered to `critical` / `serious` |
| `viewport-presets.ts` | `MOBILE = { width: 375, height: 812 }`, `DESKTOP = { width: 1280, height: 800 }` |

**Release quality gate:** A test run is release-eligible only when all of the following hold simultaneously: zero failing tests, zero `test.skip()`, all AC-01 through AC-13 scenarios covered, AC-01 / AC-09 / AC-10 / AC-11 passing without exception, zero HTTP 5xx responses, zero axe-core `critical` or `serious` violations, `tsc --noEmit` exits 0, and `next build` exits 0.

Numeric count assertions (3 project cards, 3 career entries, 7 sections, 3 skill categories) use strict equality (`=== N`), not `>= N`.

### 2.9 Access Control and Security

The site has no authentication, no login flow, no user sessions, and no server-side data mutations. There is no backend database and no API routes. The attack surface is limited to static file delivery via Vercel's CDN.

All content is read-only and publicly accessible. No personally identifiable information beyond the author's name, GitHub profile URL, and email address is stored or processed. The email address displayed in the Contact section is static text or a `mailto:` link embedded in source at build time.

### 2.10 Compliance — Release-Blocking Constraint Summary

The following table maps each release-blocking constraint to the architectural control that enforces it:

| Constraint | Target | Architectural Control |
|---|---|---|
| SSG only — no server runtime | `module:app` | `next build` static export; no `getServerSideProps` or Route Handlers; verified by FC-07 and AC-12 |
| Vercel free plan only | `infra:vercel` | No Edge Functions, no paid ISR; verified pre-deployment per F-002 |
| TypeScript only | `module:app` | `tsconfig.json` `strict: true`; CI lint blocks `.js`/`.jsx` files; verified by FC-08 and AC-12 |
| No external data sources | `module:app` | All content in TypeScript constants; no network calls at build or runtime; verified by build isolation |
| All 7 sections present | `module:hero`…`module:contact` | AC-01, FC-01 — absence of any `id` is a release blocker |
| Full OGP metadata (5 elements) | `module:layout` | AC-09, FC-02, FC-03 — all five `<head>` elements validated |
| Responsive at 375px | `module:layout`, `module:hero`, `module:projects` | AC-10, FC-04 — `scrollWidth ≤ 375` measured by Playwright |
| alt text + semantic landmarks | `module:layout`, `module:hero`, `module:projects` | AC-11, FC-05, FC-06 — zero empty `alt`, required landmark count enforced |

---

## 3. Open Questions

| # | Question | Impact | Source |
|---|---|---|---|
| OQ-001 | Should `next.config.ts` use `output: 'export'` (full static export to `out/`) or rely on standard Next.js SSG that outputs to `.next/` with `next start`? The CI startup sequence in acceptance criteria uses `next start`, which implies `.next/` mode, but `output: 'export'` produces a more portable `out/` directory. The choice affects how Vercel detects the build output and whether `next start` is the correct serve command. | Build pipeline, Vercel deployment configuration | ADR-001-A (F-001) |
| OQ-002 | The contact section displays the author's email address as static content. Should it be encoded (e.g., HTML entity encoding or obfuscation) to reduce scraper exposure, or is plain `mailto:` acceptable given the author's preference for direct contact? | Privacy, spam risk | AC-08, FC-10 |
| OQ-003 | Self-Learning section (module:self_learning) is included in the seven mandatory sections by the acceptance criteria (FC-01 lists `#self-learning`) but the acceptance criteria document's AC tables label it separately from the six sections listed in AC-01. The canonical section count must be confirmed: is it six sections (Hero, About, Skills, Projects, Career, Contact) or seven (adding Self-Learning)? The failure criteria reference `#self-learning` as a required `id`, making seven the operative count. | Scope, test assertions for section count | AC-01, FC-01, VB-01–VB-12 |
| OQ-004 | `public/og-image.png` must exist at build time, but no dimensions, aspect ratio, or file size constraint are specified. SNS platforms (Twitter/X, LinkedIn) have specific requirements (e.g., 1200×630px for Twitter). Should the OGP image specification be formalized with concrete dimensions to avoid rendering issues on target platforms? | SEO, OGP display quality | ADR-001-E, AC-09, VB-17, VB-25 |
| OQ-005 | A contact form using Formspree is noted as out of current scope (ADR-001 F-004). If added in a future iteration, it introduces a third-party external service dependency and a `POST` action on a static page. The SSG constraint and Vercel free-plan constraint would need reassessment before that feature is merged. | Future scope gate | ADR-001 F-004 |
