---
codd:
  node_id: plan:implementation-plan
  type: plan
  depends_on:
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
  depended_by: []
  conventions:
  - targets:
    - module:app
    reason: Every implementation milestone must maintain a passing next build; no
      intermediate state may introduce a server-side runtime dependency.
  modules:
  - hero
  - about
  - skills
  - projects
  - career
  - contact
  - app
  - layout
---

# Implementation Plan

## 1. Overview

`portforio-v2` is a statically generated single-page portfolio site built on Next.js 16 App Router, deployed to Vercel's free plan. The implementation produces a fully static artifact via `next build`, served by `next start` from `.next/` with no Node.js runtime active at request time. `app/page.tsx` is the sole page entry point; no additional routes are in scope.

The site composes seven independent React Server Components — `Hero`, `About`, `Skills`, `Projects`, `SelfLearning`, `Career`, `Contact` — as sequential `<section>` siblings inside `<main>`. All content for these sections is declared as TypeScript-typed constants under `data/`; runtime data fetching via `fetch()`, `axios`, or any network I/O is prohibited and constitutes a release blocker. Styling is exclusively Tailwind CSS with a mobile-first authoring strategy targeting a 375px minimum viewport width.

**Release-blocking convention for `module:app`:** Every implementation milestone must leave `next build` passing with exit code 0 and `tsc --noEmit` passing with exit code 0. No intermediate commit may introduce a server-side runtime dependency, an ISR `revalidate` export, an Edge Function declaration, or any paid-tier Vercel feature.

**Full release quality gate — all conditions must hold simultaneously before any deployment:**

| Condition | Verification |
|---|---|
| `tsc --noEmit` exits 0 | CI type-check step (FC-08, AC-12) |
| `next build` exits 0 | CI build step (FC-07, AC-12) |
| Zero HTTP 5xx responses | Every Playwright assertion uses `response.status() < 500` |
| Zero failing Playwright tests; zero `test.skip()` | Full suite pass |
| AC-01 through AC-13 all covered | Test coverage review |
| Zero axe-core `critical` or `serious` violations | `accessibility.browser.spec.ts` via `axe-runner.ts` (AC-11, FC-09) |
| Five OGP `<head>` metadata elements present and non-empty | `seo-metadata.spec.ts` (AC-09, FC-02) |
| `og:image` URL returns `image/png` with status < 500 | `static-assets.spec.ts` (FC-03) |
| `public/og-image.png` committed and reachable | `static-assets.spec.ts` (VB-25) |
| `scrollWidth ≤ 375` at 375px viewport | `responsive.browser.spec.ts` (FC-04) |
| Exactly 3 project cards, 3 career entries, 7 `<section>` elements | Strict `=== N` assertions (FC-01, FC-06, FC-11, FC-12) |
| No Edge Functions or paid ISR active on Vercel | Manual pre-deployment check (F-002) |

---

## 2. Milestones

### Milestone 0 — Repository Scaffold (Prerequisite for all subsequent milestones)

Establish the project skeleton so that `next build` passes from the first commit onward. Every file created in this milestone must compile cleanly; no placeholder `.js` or `.jsx` files are permitted in `app/`, `components/`, or `data/`.

**Deliverables:**

- `package.json` with scripts: `build` → `next build`, `start` → `next start`, `type-check` → `tsc --noEmit`.
- `tsconfig.json` with `strict: true`, path aliases if required, and coverage of `app/`, `components/`, `data/`.
- `next.config.ts` (TypeScript): no `revalidate`, no `runtime: 'edge'`, no experimental paid features, no `output: 'export'` unless OQ-001 is resolved and CI/Vercel settings are updated in the same commit.
- `tailwind.config.ts` (TypeScript): `content` glob includes `./app/**/*.{ts,tsx}` and `./components/**/*.{ts,tsx}`; custom design tokens declared under `theme.extend` — no raw hex values in component files.
- `app/globals.css` with `@tailwind base`, `@tailwind components`, `@tailwind utilities`, and `scroll-behavior: smooth` in `@layer base` on the `html` selector.
- `app/layout.tsx`: exports `metadata: Metadata` with all five required fields non-empty (`title`, `description`, `openGraph.title`, `openGraph.description`, `openGraph.images: ['/og-image.png']`); renders `<html lang="ja">`, `<body>`, `<header>`, `{children}` wrapped in `<main>`, and `<footer>`; imports `globals.css`.
- `app/page.tsx`: imports all seven section components and renders them in sequence inside `<main>`.
- `public/og-image.png`: 1200×630px PNG committed to the repository; must not appear in `.gitignore` or `.vercelignore`.
- `data/types.ts`: exports `HeroContent`, `AboutContent`, `SkillCategory`, `Project`, `SelfLearningContent`, `CareerEntry`, `ContactContent` interfaces. `Project` includes `overview`, `problem`, `solution`, `result` (strings), `tags` (`string[]`), `githubUrl` (string). `CareerEntry` includes company name, employment period, role description. `SkillCategory` includes category name and skill name list.

**`module:app` gate:** `tsc --noEmit` and `next build` must both exit 0 before this milestone is considered complete.

---

### Milestone 1 — Data Layer (`data/`)

Populate all seven typed data constants. This milestone introduces no rendering changes; its sole purpose is to make content available as statically verifiable TypeScript constants before component authoring begins.

**Deliverables:**

- `data/heroData.ts`: exports `heroData: HeroContent` — full name "西川 駿", one-line self-introduction, GitHub profile URL.
- `data/aboutData.ts`: exports `aboutData: AboutContent` — career summary, non-IT to IT career-change narrative, current role overview.
- `data/skillsData.ts`: exports `skillsData: SkillCategory[]` with **exactly 3 elements** covering languages/frameworks, infra/cloud, and dev tools. Count enforced via `=== 3` assertion (FC-12).
- `data/projectsData.ts`: exports `projectsData: Project[]` with **exactly 3 elements**:
  1. 既存ふるさと納税サイトの ECS + Laravel へのリアーキテクチャ推進 (tags: `AWS ECS`, `Laravel`, `Docker`)
  2. シリアルコード型ふるさと納税サイト・CMS の新規開発 (tags: `Next.js`, `Laravel`, `BFF`)
  3. 開発環境のコンテナ化・標準化と DX 向上 (tags: `Docker`, `Docker Compose`)
  Count enforced via `=== 3` assertion (FC-11).
- `data/selfLearningData.ts`: exports `selfLearningData: SelfLearningContent` — multi-agent AI development environment, multi-agent-shogun content.
- `data/careerData.ts`: exports `careerData: CareerEntry[]` with **exactly 3 elements**. Count enforced via `=== 3` assertion (FC-12).
- `data/contactData.ts`: exports `contactData: ContactContent` — GitHub profile URL (containing `github.com`) and email address or `mailto:` link.

**Constraints:** No `fetch()`, database driver, or `import()` with network I/O may appear in any `data/` file. All data files are pure TypeScript modules resolvable at build time. If any Tailwind class name appears as a string value in a data constant, the `data/` directory must be added to the `content` glob in `tailwind.config.ts` or the class names added to the safelist — no dynamic class construction (e.g., `'text-' + color`).

**`module:app` gate:** `tsc --noEmit` and `next build` must both exit 0 after this milestone.

---

### Milestone 2 — Section Components

Implement all seven section components as React Server Components. Each component is a pure function receiving typed props from its corresponding data constant; no `'use client'` directive, no shared React Context across sections, no Zustand/Jotai/Redux store, no `useRef` shared between sections.

**Authoring conventions applying to all seven components:**

- Root element is `<section id="{anchor}">`, not `<div>`. Using `<div id="{anchor}">` without `role="region"` and `aria-label` is a release-blocking accessibility violation (FC-06).
- Outer layout: `w-full px-4 py-12`. Inner content: `max-w-5xl mx-auto` (or `max-w-2xl` for text-heavy sections). No fixed pixel width wider than 375px.
- All Tailwind classes authored mobile-first: base layer (no prefix) must render complete and non-overflowing at 375px; `sm:` (640px), `md:` (768px), `lg:` (1024px) enhance layout density progressively.
- Interactive elements (buttons, links) must be at minimum `min-h-[44px] min-w-[44px]` for WCAG touch target compliance.
- Heading hierarchy: `h1` appears once (in `#hero` or `<header>`); sections use `h2`–`h6`.

**Per-component deliverables:**

| Component | File | Key layout constraint |
|---|---|---|
| `Hero.tsx` | `components/Hero.tsx` | `<section id="hero">`, renders "西川 駿", self-introduction, GitHub link; navigation uses `flex-wrap` or stacks vertically at base layer; full name uses `break-words` if needed at 375px. |
| `About.tsx` | `components/About.tsx` | `<section id="about">`, `max-w-2xl mx-auto px-4`. |
| `Skills.tsx` | `components/Skills.tsx` | `<section id="skills">`, `grid grid-cols-1 gap-4 md:grid-cols-3`; skill name elements use `break-words` to prevent 375px overflow (OQ-R-005). |
| `Projects.tsx` | `components/Projects.tsx` | `<section id="projects">`, `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`; each card uses `w-full`; tag lists use `flex flex-wrap gap-2`; GitHub links use `break-all` if displayed as raw text. All 3 cards stack as single column at 375px. |
| `SelfLearning.tsx` | `components/SelfLearning.tsx` | `<section id="self-learning">`, `max-w-2xl mx-auto px-4`. |
| `Career.tsx` | `components/Career.tsx` | `<section id="career">`, timeline as `flex flex-col gap-6`; if a `border-left` connector line is used, it must be full-width-safe (no absolute positioning causing overflow). |
| `Contact.tsx` | `components/Contact.tsx` | `<section id="contact">`, `text-center px-4`; GitHub link href contains `github.com`; email rendered as `mailto:` link or visible address (OQ-005 approach documented before finalization). |

**`next/image` requirements (`module:hero`, `module:projects`):** All raster images use `<Image>` from `next/image` with explicit `width`, `height`, and non-empty descriptive `alt` props. Bare `<img>` tags are prohibited (FC-05). `alt=""` is only acceptable for purely decorative images.

**`module:app` gate:** After each component is added to `app/page.tsx`, `tsc --noEmit` and `next build` must both exit 0. No section may be committed in a state that causes a non-zero build exit.

---

### Milestone 3 — E2E Test Infrastructure

Establish the shared test helpers and CI pipeline sequence. All helper files are owned exclusively by `tests/e2e/helpers/`; no spec file may duplicate their logic.

**Deliverables:**

| File | Exports | Responsibility |
|---|---|---|
| `tests/e2e/helpers/server-health.ts` | `waitForServer(url)` | Asserts GET returns `status < 500` before suite starts |
| `tests/e2e/helpers/html-parser.ts` | `getHead(html)`, `getMetaContent(html, name/property)` | Parses static HTML `<head>` |
| `tests/e2e/helpers/dom-assertions.ts` | `assertNoOverflow(page, selector)`, `assertAltText(page)` | Overflow detection, empty-alt detection |
| `tests/e2e/helpers/axe-runner.ts` | `runAxe(page)` | Single axe-core invocation; returns violations filtered to `impact: critical` and `impact: serious` only |
| `tests/e2e/helpers/viewport-presets.ts` | `MOBILE = { width: 375, height: 812 }`, `DESKTOP = { width: 1280, height: 800 }` | Canonical viewport constants; hardcoded numeric values in spec files are prohibited |

**CI pipeline sequence (exact order required):**

```bash
npm ci
tsc --noEmit                                                    # FC-08 gate — must exit 0
npm run build                                                   # FC-07 gate — must exit 0
npm start &                                                     # serves .next/ on port 3000
npx wait-on http://localhost:3000 --timeout 30000
```

`wait-on` timeout of 30 seconds is non-negotiable; a server that does not respond within this window causes CI failure before any test runs.

**`module:app` gate:** The CI sequence above must complete without error on `module:app` source; `next build` must exit 0 in this pipeline invocation.

---

### Milestone 4 — E2E Test Suite

Implement all spec files covering AC-01 through AC-13. Each HTTP response assertion must check `response.status() < 500` before any business-logic condition.

**Spec file ownership (non-overlapping domains):**

| Spec file | Domain | Key assertions |
|---|---|---|
| `tests/e2e/sections-presence.spec.ts` | Section presence | Exactly 7 `<section>` elements with IDs: `hero`, `about`, `skills`, `projects`, `self-learning`, `career`, `contact`; one `<header>`, one `<main>`, one `<footer>` (AC-01, FC-01, FC-06) |
| `tests/e2e/seo-metadata.spec.ts` | SEO metadata (API) | Five `<head>` metadata elements present and non-empty via `getMetaContent` (AC-09, FC-02) |
| `tests/e2e/seo-metadata.browser.spec.ts` | SEO metadata (browser) | Same five elements present and non-empty in browser-rendered DOM |
| `tests/e2e/static-assets.spec.ts` | Static assets | GET `/og-image.png` returns `status < 500` and `Content-Type: image/png` (FC-03, VB-25) |
| `tests/e2e/accessibility.spec.ts` | Accessibility (structural) | Zero `<img>` with empty or absent `alt`; landmark counts; `<html lang="ja">` (AC-11, FC-05, FC-06) |
| `tests/e2e/accessibility.browser.spec.ts` | Accessibility (axe) | `runAxe(page)` returns zero violations; fails if `violations.length > 0` (AC-11, FC-09) |
| `tests/e2e/responsive.browser.spec.ts` | Responsive layout | `scrollWidth ≤ 375` at `MOBILE` viewport; `assertNoOverflow(page, 'body')`, `assertNoOverflow(page, '#hero')`, `assertNoOverflow(page, '#projects')` (FC-04) |
| `tests/e2e/projects.browser.spec.ts` | Projects section | Exactly 3 project cards (`=== 3`); all 3 stack single-column at `MOBILE` viewport (FC-11) |
| `tests/e2e/career.browser.spec.ts` | Career section | Exactly 3 career entries (`=== 3`) (FC-12) |
| `tests/e2e/contact.spec.ts` | Contact section | GitHub link href contains `github.com`; email `mailto:` or visible address present (AC-08, FC-10) |

Axe-core violation pre-emption checklist for `accessibility.browser.spec.ts`: verify `color-contrast` (WCAG AA ratio 4.5:1 for normal text), `landmark-one-main` (exactly one `<main>`), `region` (all content inside a landmark), `image-alt` (non-empty `alt` on all content images), `heading-order` (`h1` once in `#hero` or `<header>`; sections use `h2`–`h6`), `html-has-lang` (`lang="ja"` on `<html>`).

**`module:app` gate:** All spec files must be free of `test.skip()`. Every run of the full suite must exit with zero failures and zero HTTP 5xx responses.

---

### Milestone 5 — Pre-Deployment Verification

Manual and automated checks executed immediately before each production push to Vercel.

**Checklist:**

1. Run full CI pipeline locally: `npm ci && tsc --noEmit && npm run build && npm start &` — confirm `next build` exits 0.
2. Run full Playwright suite — confirm zero failures, zero skips, zero axe violations.
3. Open Vercel project dashboard — confirm no Edge Functions are active, no ISR revalidation periods are configured, no paid-tier features are enabled (F-002).
4. Confirm `output` directory in Vercel build settings matches the `next.config.ts` output mode (`.next` for default SSG; `out` only if OQ-001 is resolved and `output: 'export'` is adopted in the same deployment).
5. Confirm `public/og-image.png` is committed, not in `.gitignore`, resolves with `Content-Type: image/png`, and is 1200×630px for Twitter/X and LinkedIn compatibility (OQ-004 resolution required before first public deployment).
6. Confirm Node.js version in Vercel settings is 18 or later (Next.js 16 requirement).
7. OQ-001 resolution: confirm whether `next.config.ts` uses default `.next/` mode with `next start`, or `output: 'export'` with `out/` and a static file server. The CI startup command and Vercel output directory setting must agree before this milestone is complete.

---

## 3. Risks

### R-01 — `next build` Regression During Incremental Development (Severity: Critical)

**Description:** The `module:app` release-blocking convention requires `next build` to exit 0 at every milestone boundary. During Milestone 2 (section component authoring), it is straightforward to introduce a TypeScript type error, an unresolved import, or a data constant with a type mismatch that causes a non-zero build exit. Because all seven sections are composed in `app/page.tsx` from the scaffold, a build error in any single component blocks the full build.

**Mitigation:** Implement components in the order they appear in `app/page.tsx` and run `tsc --noEmit && next build` after each file is added. Use stub implementations (rendering the `<section>` element with placeholder text but correct TypeScript types) before filling content to maintain a green build throughout development.

---

### R-02 — Horizontal Overflow at 375px in `module:projects` (Severity: High)

**Description:** `components/Projects.tsx` renders a three-card grid that is the highest-risk source of FC-04 violations. Technology tag lists, card content strings with long English terms (e.g., "AWS Elastic Container Service"), and project title lengths in Japanese can all cause individual card elements to exceed 375px. A single overflowing element causes `scrollWidth > 375` and blocks release.

**Mitigation:** Author `Projects.tsx` at base layer with `grid-cols-1`, `w-full` cards, `flex-wrap gap-2` tag lists, and `break-words` on all text elements. Run `assertNoOverflow(page, '#projects')` locally at `MOBILE` viewport before committing. Validate at 375px in a browser before Milestone 2 is considered complete for this module.

---

### R-03 — axe-core Violations from Color Contrast or Heading Order (Severity: High)

**Description:** Zero axe-core `critical` or `serious` violations are required (FC-09). The two most common late-stage violations are `color-contrast` (Tailwind palette colors that fail WCAG AA 4.5:1 for normal text or 3:1 for large text) and `heading-order` (sections using `h2` before an `h1` has been rendered, or skipping heading levels). These are difficult to detect without running axe-core explicitly and are often introduced by design token choices made in Milestone 0 before component content is visible.

**Mitigation:** Finalize `tailwind.config.ts` color tokens with verified contrast ratios before Milestone 2 begins (OQ-R-002 resolution). Run `runAxe(page)` locally after each component is wired into `app/page.tsx`. Ensure `h1` appears exactly once in `#hero` and that all subsequent sections open with `h2`.

---

### R-04 — OQ-001 Unresolved: `output: 'export'` vs. `next start` Ambiguity (Severity: High)

**Description:** If `next.config.ts` is committed with `output: 'export'`, `next start` (the CI and Vercel serve command) is unavailable. If it is committed without `output: 'export'`, Vercel may attempt static export detection and misconfigure the output directory. Either mismatch causes CI to fail after `next build` succeeds, blocking all E2E tests and all production deployments.

**Mitigation:** Resolve OQ-001 in Milestone 0 before any component work begins. The decision must be reflected consistently in `next.config.ts`, `package.json` `start` script, and Vercel output directory settings in a single commit. The recommended path — absent a specific reason for `output: 'export'` — is to use default `.next/` mode with `next start`, which aligns with the existing CI sequence.

---

### R-05 — Missing or Incorrectly Sized `public/og-image.png` (Severity: Medium)

**Description:** `public/og-image.png` must be committed before Milestone 0 is complete (FC-03). If the file is absent, `next build` succeeds but the `og:image` meta tag resolves to a 404 in production, which is a release blocker. If the file is present but smaller than 600×314px, Twitter/X silently falls back to a summary-without-image card even though `static-assets.spec.ts` passes. OQ-004 (formal dimension specification) is unresolved.

**Mitigation:** Commit a 1200×630px PNG in Milestone 0. Resolve OQ-004 before Milestone 5 (pre-deployment verification) by confirming the committed PNG matches the recommended dimensions. If `static-assets.spec.ts` is extended to assert minimum pixel dimensions via an image-parsing library, that extension must not introduce a runtime dependency into `module:app` source.

---

### R-06 — Section Count Ambiguity (6 vs. 7) in Test Assertions (Severity: Medium)

**Description:** OQ-003 identifies a discrepancy between acceptance criteria prose listing six sections and FC-01/FC-06/AC-11 requiring seven sections (including `#self-learning`). If `sections-presence.spec.ts` uses `>= 6` instead of `=== 7`, the `Self-Learning` section could be silently omitted from the build artifact and still pass the test, constituting an undetected FC-01 violation.

**Mitigation:** All section count assertions in `sections-presence.spec.ts` and `accessibility.spec.ts` use strict equality `=== 7`. The IDs asserted are the exact set: `hero`, `about`, `skills`, `projects`, `self-learning`, `career`, `contact`. Resolve the acceptance criteria document ambiguity (OQ-003) before Milestone 4 spec files are committed so that the constant `7` is human-approved rather than inferred.

---

### R-07 — Tailwind PurgeCSS Stripping Classes from `data/` Strings (Severity: Medium)

**Description:** If any `data/*.ts` file contains Tailwind class name strings (e.g., tag color classes like `'bg-blue-100 text-blue-800'`), those classes will be purged in the production `next build` unless `data/` is included in the `tailwind.config.ts` `content` glob. This produces a build artifact where styled tags render without color in production even though local development (which does not purge unused classes) shows correct styling, and `tsc --noEmit` and `next build` both exit 0 — making the defect invisible to automated gates.

**Mitigation:** Add `./data/**/*.{ts,tsx}` to the `content` array in `tailwind.config.ts` if any data constant includes Tailwind class name strings. Alternatively, safelist all tag color classes explicitly. Review all `data/` files during Milestone 1 for embedded class name strings and update `tailwind.config.ts` before Milestone 2 component authoring begins.

---

### R-08 — Contact Email Exposure and Test Assertion Coupling (Severity: Low)

**Description:** OQ-005 is unresolved: the contact section displays the author's email address as static content, exposing it to scrapers. If the implementation later switches to HTML entity obfuscation or JavaScript-rendered display, `contact.spec.ts` assertions that match a raw `mailto:` href will false-fail, requiring simultaneous spec and component changes.

**Mitigation:** Decide the obfuscation approach before `Contact.tsx` is implemented in Milestone 2 and document it before `contact.spec.ts` is written in Milestone 4. The chosen approach — plain `mailto:`, entity-encoded display, or JS-rendered address — must be stable for the initial release. Changing it post-release requires a coordinated update to both the component and the spec.
