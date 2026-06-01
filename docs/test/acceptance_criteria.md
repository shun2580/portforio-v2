---
codd:
  node_id: test:acceptance-criteria
  type: test
  depends_on:
  - id: req:portforio-v2-requirements
    relation: derives_from
    semantic: governance
  depended_by:
  - id: design:system-overview
    relation: constrained_by
    semantic: governance
  - id: design:seo-accessibility-design
    relation: constrained_by
    semantic: governance
  conventions:
  - targets:
    - module:hero
    - module:about
    - module:skills
    - module:projects
    - module:career
    - module:contact
    reason: All six content sections must be present and verifiable at release;
      omitting any section is a scope violation.
  - targets:
    - module:layout
    reason: og:title, og:description, og:image, title, and meta description must pass
      automated and manual checks before release.
  - targets:
    - module:layout
    - module:hero
    - module:projects
    reason: Responsive layout at 375px minimum width and semantic HTML with alt text
      are release-blocking accessibility and UX requirements.
  modules:
  - hero
  - about
  - skills
  - projects
  - career
  - contact
  - layout
---

# Acceptance Criteria

## 1. Overview

This document defines acceptance criteria, failure criteria, and E2E test generation instructions for the portfolio site (`portforio-v2`) — a Next.js 16 App Router static site for backend engineer Shun Nishikawa, deployed on Vercel.

The site is a single-page application rendered via SSG. It contains seven mandatory content sections (Hero, About, Skills, Projects, Self-Learning, Career, Contact), a shared layout with full SEO/OGP metadata, and must meet responsive and accessibility requirements as release-blocking constraints.

There is no backend database, no authentication, and no API routes that perform server-side data mutations. All content is statically embedded in source code at build time.

### Verifiable Behavior Inventory

The following behaviors are derived from `req:portforio-v2-requirements` and must each map to at least one test scenario. Any behavior without coverage is flagged as **UNCOVERED**.

| ID | Verifiable Behavior | Source |
|----|--------------------|----|
| VB-01 | `app/page.tsx` renders Hero section with name, one-line introduction, and GitHub link | requirements §Core Features / Hero |
| VB-02 | Hero section contains a smooth-scroll navigation element | requirements §Core Features / Hero |
| VB-03 | About section renders career summary text including career-change narrative | requirements §Core Features / About |
| VB-04 | Skills section renders three categories: languages/frameworks, infra/cloud, dev tools | requirements §Core Features / Skills |
| VB-05 | Projects section renders at least 1 project card | requirements §Core Features / Projects |
| VB-06 | Each project card contains: overview/points, technology tags, and GitHub link | requirements §Core Features / Projects |
| VB-07 | Project card 1 describes multi-agent AI development environment (multi-agent-shogun) | requirements §Core Features / Projects item 1 |
| VB-11 | Career section renders a timeline with entries for exactly 3 companies | requirements §Core Features / Career |
| VB-12 | Contact section renders a GitHub profile link and email address | requirements §Core Features / Contact |
| VB-13 | `<title>` tag is present and non-empty | requirements §Non-Functional / SEO |
| VB-14 | `<meta name="description">` is present and non-empty | requirements §Non-Functional / SEO |
| VB-15 | `og:title` meta tag is present and non-empty | requirements §Non-Functional / SEO |
| VB-16 | `og:description` meta tag is present and non-empty | requirements §Non-Functional / SEO |
| VB-17 | `og:image` meta tag is present and resolves to `public/og-image.png` | requirements §Non-Functional / SEO |
| VB-18 | Layout renders without error at viewport width 375px | requirements §Non-Functional / Responsive |
| VB-19 | Hero and Projects sections render without horizontal overflow at 375px | requirements §Non-Functional / Responsive |
| VB-20 | All `<img>` elements rendered via `next/image` carry non-empty `alt` attributes | requirements §Non-Functional / Accessibility |
| VB-21 | Page uses semantic HTML landmarks: `<header>`, `<main>`, `<section>`, `<footer>` | requirements §Non-Functional / Accessibility |
| VB-22 | Static build (`next build`) exits with code 0 and produces `out/` or `.next/` artifacts | requirements §Non-Functional / Rendering SSG |
| VB-23 | TypeScript compilation (`tsc --noEmit`) produces zero type errors | requirements §Non-Functional / Language |
| VB-24 | `app/layout.tsx` exists and wraps the page with global styles from `globals.css` | requirements §Directory Structure |
| VB-25 | `public/og-image.png` exists and is a valid image file | requirements §Non-Functional / SEO |

---

## 2. Acceptance Criteria

### AC-01 — All Seven Sections Present (Release-Blocking)

**Applies to:** `module:hero`, `module:about`, `module:skills`, `module:projects`, `module:self_learning`, `module:career`, `module:contact`

The rendered page at `/` must contain all six sections. Each section must be identifiable by its ARIA landmark or `id` attribute used for smooth-scroll navigation.

| Scenario | Expected Result |
|----------|----------------|
| GET `/` → parse HTML | `id="hero"` (or `<section aria-label="Hero">`) exists |
| GET `/` → parse HTML | `id="about"` exists |
| GET `/` → parse HTML | `id="skills"` exists |
| GET `/` → parse HTML | `id="projects"` exists |
| GET `/` → parse HTML | `id="career"` exists |
| GET `/` → parse HTML | `id="contact"` exists |

**Traceability:** VB-01 through VB-12.

---

### AC-02 — Hero Section Content

The Hero section must display the full name "西川 駿" (or romanized equivalent), a one-line self-introduction, and a hyperlink to the GitHub profile.

| Scenario | Expected Result |
|----------|----------------|
| Browser: load `/`, inspect Hero section | Name text visible |
| Browser: load `/`, inspect Hero section | One-line introduction text visible |
| Browser: load `/`, locate GitHub anchor in Hero | `href` contains `github.com` and is non-empty |
| Browser: click smooth-scroll nav link targeting `#about` | Page scrolls and `#about` section becomes visible |

**Traceability:** VB-01, VB-02.

---

### AC-03 — About Section Content

The About section must include a career summary that covers the career-change narrative (non-IT to IT transition) and current role overview.

| Scenario | Expected Result |
|----------|----------------|
| Browser: scroll to `#about` | Section renders visible text content |
| API: GET `/` HTML body | Contains text referencing career transition or IT転職 context (keyword assertion on static content) |

**Traceability:** VB-03.

---

### AC-04 — Skills Section — Three Categories

The Skills section must display skills grouped into at least three distinct categories: languages/frameworks, infra/cloud, and dev tools.

| Scenario | Expected Result |
|----------|----------------|
| Browser: scroll to `#skills` | Three category headings (or labeled groups) are visible |
| API: GET `/` HTML body | Contains text for all three category labels |

**Traceability:** VB-04.

---

### AC-05 — Projects Section — At Least One Card

The Projects section must render at least 1 project card. Each card contains overview/points, technology tags, and a GitHub link.

| Scenario | Expected Result |
|----------|----------------|
| Browser: scroll to `#projects` | At least 1 project card element is present in the DOM |
| Browser: inspect first card | Contains overview text, at least one tech tag, and a GitHub link |
| Browser: inspect first card | Content references multi-agent AI or マルチエージェント |
| API: GET `/` HTML | Contains text referencing multi-agent-shogun or マルチエージェント |

**Traceability:** VB-05, VB-06, VB-07.

---

### AC-07 — Career Section — Timeline with Three Entries

The Career section must render a timeline with exactly 3 company entries.

| Scenario | Expected Result |
|----------|----------------|
| Browser: scroll to `#career` | Timeline component renders with 3 company entries |
| API: GET `/` HTML | Count of timeline-entry selectors equals 3 |

**Traceability:** VB-11.

---

### AC-08 — Contact Section — GitHub Link and Email

The Contact section must display a GitHub profile link and an email address.

| Scenario | Expected Result |
|----------|----------------|
| Browser: scroll to `#contact` | GitHub link anchor with `href` containing `github.com` is visible |
| Browser: scroll to `#contact` | Email address string is visible |
| API: GET `/` HTML | Contains `mailto:` link or visible email text within the contact section |

**Traceability:** VB-12.

---

### AC-09 — SEO and OGP Metadata (Release-Blocking)

**Applies to:** `module:layout`

The rendered HTML `<head>` must contain all five required metadata elements: `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`.

| Scenario | Expected Result |
|----------|----------------|
| API: GET `/` → parse `<head>` | `<title>` tag is present and `textContent.trim().length > 0` |
| API: GET `/` → parse `<head>` | `<meta name="description" content="...">` is present and `content.trim().length > 0` |
| API: GET `/` → parse `<head>` | `<meta property="og:title" content="...">` present and non-empty |
| API: GET `/` → parse `<head>` | `<meta property="og:description" content="...">` present and non-empty |
| API: GET `/` → parse `<head>` | `<meta property="og:image" content="...">` present and non-empty |
| API: GET the `og:image` URL | Response status < 500 and `Content-Type` starts with `image/` |
| File check: `public/og-image.png` | File exists and `file` command reports a valid PNG |

**Traceability:** VB-13, VB-14, VB-15, VB-16, VB-17, VB-25.

---

### AC-10 — Responsive Layout at 375px (Release-Blocking)

**Applies to:** `module:layout`, `module:hero`, `module:projects`

The page must render without horizontal overflow at a viewport width of 375px. No element may exceed the viewport width.

| Scenario | Expected Result |
|----------|----------------|
| Browser: set viewport 375×812, load `/` | `document.documentElement.scrollWidth <= 375` |
| Browser: set viewport 375×812, scroll to `#hero` | Hero section has `offsetWidth <= 375` and is fully visible |
| Browser: set viewport 375×812, scroll to `#projects` | All 3 project cards stack vertically, none overflow the viewport |
| Browser: set viewport 375×812, scroll through all sections | No horizontal scrollbar appears |

**Traceability:** VB-18, VB-19.

---

### AC-11 — Accessibility: alt Text and Semantic HTML (Release-Blocking)

**Applies to:** `module:layout`, `module:hero`, `module:projects`

All images rendered through `next/image` must have non-empty `alt` attributes. The page must use semantic HTML landmarks.

| Scenario | Expected Result |
|----------|----------------|
| API: GET `/` → query all `<img>` | Zero `<img>` elements with empty or missing `alt` attribute |
| API: GET `/` → query landmarks | `<header>` exists once |
| API: GET `/` → query landmarks | `<main>` exists once |
| API: GET `/` → query landmarks | At least 7 `<section>` elements exist (one per content module) |
| API: GET `/` → query landmarks | `<footer>` exists once |
| Browser: run axe-core accessibility scan on `/` | Zero violations at `impact: critical` or `impact: serious` |

**Traceability:** VB-20, VB-21.

---

### AC-12 — Static Build and TypeScript Compilation

The SSG build must succeed and TypeScript must compile without errors.

| Scenario | Expected Result |
|----------|----------------|
| CI: run `npx tsc --noEmit` | Exit code 0, zero errors printed to stderr |
| CI: run `next build` | Exit code 0, `.next/` directory contains static output |
| CI: run `next build` | No unhandled exception messages in build output |

**Traceability:** VB-22, VB-23.

---

### AC-13 — Layout File and Global Styles

`app/layout.tsx` must exist, import `globals.css`, and wrap all page content.

| Scenario | Expected Result |
|----------|----------------|
| File check: `app/layout.tsx` | File exists |
| File check: `app/globals.css` | File exists |
| API: GET `/` HTML | Global styles (e.g. Tailwind base classes) are applied to `<body>` |

**Traceability:** VB-24.

---

### Traceability Matrix

| Verifiable Behavior | Acceptance Criteria | Coverage Status |
|--------------------|---------------------|----------------|
| VB-01 | AC-02 | Covered |
| VB-02 | AC-02 | Covered |
| VB-03 | AC-03 | Covered |
| VB-04 | AC-04 | Covered |
| VB-05 | AC-05 | Covered |
| VB-06 | AC-05 | Covered |
| VB-07 | AC-05 | Covered |
| VB-08 | AC-05 | Covered |
| VB-09 | AC-05 | Covered |
| VB-10 | AC-06 | Covered |
| VB-11 | AC-07 | Covered |
| VB-12 | AC-08 | Covered |
| VB-13 | AC-09 | Covered |
| VB-14 | AC-09 | Covered |
| VB-15 | AC-09 | Covered |
| VB-16 | AC-09 | Covered |
| VB-17 | AC-09 | Covered |
| VB-18 | AC-10 | Covered |
| VB-19 | AC-10 | Covered |
| VB-20 | AC-11 | Covered |
| VB-21 | AC-11 | Covered |
| VB-22 | AC-12 | Covered |
| VB-23 | AC-12 | Covered |
| VB-24 | AC-13 | Covered |
| VB-25 | AC-09 | Covered |

---

## 3. Failure Criteria

Any of the following conditions constitutes a release-blocking failure. A build or test run that triggers any item below must be rejected and not deployed to Vercel.

### FC-01 — Missing Section (Release-Blocking)

Any of the seven section IDs (`#hero`, `#about`, `#skills`, `#projects`, `#self-learning`, `#career`, `#contact`) is absent from the rendered HTML of `/`.

### FC-02 — Missing or Empty Metadata (Release-Blocking)

Any of the five required metadata elements (`<title>`, `meta description`, `og:title`, `og:description`, `og:image`) is absent, has an empty `content` attribute, or is duplicated in `<head>`.

### FC-03 — OGP Image Unreachable (Release-Blocking)

`public/og-image.png` does not exist, or the URL referenced in `og:image` returns a non-image response or a 4xx/5xx status code.

### FC-04 — Horizontal Overflow at 375px (Release-Blocking)

`document.documentElement.scrollWidth > 375` at a viewport of 375px width on any section of the page.

### FC-05 — Missing or Empty alt Text (Release-Blocking)

Any `<img>` element in the rendered page has an empty string or absent `alt` attribute. `alt=""` is permissible only for decorative images confirmed as purely decorative; all content images must have descriptive alt text.

### FC-06 — Semantic Landmark Violations (Release-Blocking)

Absence of `<header>`, `<main>`, or `<footer>` in the rendered page, or fewer than 7 `<section>` elements.

### FC-07 — Build Failure

`next build` exits with a non-zero exit code for any reason including TypeScript type errors, unresolved imports, or missing environment configuration.

### FC-08 — TypeScript Errors

`tsc --noEmit` reports one or more type errors.

### FC-09 — axe-core Critical Violations

Running axe-core on the rendered page reports any violation with `impact: critical` or `impact: serious`.

### FC-10 — Server Error on Static Page

GET `/` returns HTTP status 500 or higher.

### FC-11 — Projects Card Count Mismatch

The Projects section renders fewer or more than exactly 3 project cards.

### FC-12 — Career Timeline Mismatch

The Career section renders fewer or more than exactly 3 company timeline entries.

---

## 4. E2E Test Generation Meta-Prompt

This section is a machine-readable instruction for `codd propagate` to auto-generate E2E tests for `portforio-v2`.

---

### Runtime Environment Setup

**Project type:** Next.js 16 App Router, SSG, TypeScript, Tailwind CSS.

**Server startup sequence (local):**

```bash
npm install
npm run build       # next build — produces .next/
npm start           # next start — serves on http://localhost:3000
```

**Server startup sequence (CI):**

```bash
npm ci
npm run build
npm start &
npx wait-on http://localhost:3000 --timeout 30000
```

**Health check:** GET `http://localhost:3000/` must return HTTP status < 500 before any test is executed.

**Browser configuration (Playwright):**

```typescript
use: {
  baseURL: 'http://localhost:3000',
  headless: true,
  viewport: { width: 1280, height: 800 },
}
```

---

### MECE Domain Decomposition

Each domain owns exactly one set of test files. Domains are non-overlapping.

| Domain | Scope | API Spec File | Browser Spec File |
|--------|-------|--------------|-------------------|
| `seo-metadata` | `<head>` metadata: title, meta description, og:title, og:description, og:image | `tests/e2e/seo-metadata.spec.ts` | `tests/e2e/seo-metadata.browser.spec.ts` |
| `sections-presence` | Existence and ordering of all 7 section IDs | `tests/e2e/sections-presence.spec.ts` | `tests/e2e/sections-presence.browser.spec.ts` |
| `hero` | Hero content: name, intro, GitHub link, smooth-scroll trigger | `tests/e2e/hero.spec.ts` | `tests/e2e/hero.browser.spec.ts` |
| `about` | About section text content | `tests/e2e/about.spec.ts` | `tests/e2e/about.browser.spec.ts` |
| `skills` | Skills section three-category structure | `tests/e2e/skills.spec.ts` | `tests/e2e/skills.browser.spec.ts` |
| `projects` | Projects section: 3 cards, content, tech tags | `tests/e2e/projects.spec.ts` | `tests/e2e/projects.browser.spec.ts` |
| `self-learning` | Self-Learning section content | `tests/e2e/self-learning.spec.ts` | `tests/e2e/self-learning.browser.spec.ts` |
| `career` | Career timeline: 3 entries | `tests/e2e/career.spec.ts` | `tests/e2e/career.browser.spec.ts` |
| `contact` | Contact: GitHub link, email display | `tests/e2e/contact.spec.ts` | `tests/e2e/contact.browser.spec.ts` |
| `responsive` | Viewport 375px: no overflow across all sections | *(not applicable — browser only)* | `tests/e2e/responsive.browser.spec.ts` |
| `accessibility` | Semantic landmarks, alt text, axe-core scan | `tests/e2e/accessibility.spec.ts` | `tests/e2e/accessibility.browser.spec.ts` |
| `static-assets` | `og-image.png` existence and valid content-type | `tests/e2e/static-assets.spec.ts` | *(not applicable — API only)* |

---

### Test Level Separation Rules

**API integration tests** (`*.spec.ts`) must use Playwright `request` context (or `fetch` / `supertest`). They assert HTTP status codes, HTML structure parsed from response body, `<head>` metadata, and DOM element counts. They do not launch a browser.

**Browser tests** (`*.browser.spec.ts`) must use Playwright `page`. They simulate user interactions (scroll, click, viewport resize), assert visible UI state, and verify URL and content after navigation.

**Every HTTP request assertion** must first assert `response.status() < 500` before checking any business-logic status code. A 5xx is a server error unrelated to the feature under test.

**Responsive browser tests** must programmatically set `page.setViewportSize({ width: 375, height: 812 })` before loading the page and assert `scrollWidth <= 375` via `page.evaluate()`.

**No authentication flows exist** in this project (static site, no login). The login-redirect-render browser flow is not applicable. Browser tests begin directly with `page.goto('/')`.

---

### Scenario Derivation Rules

For each domain, `codd propagate` must derive scenarios as follows:

1. **Positive scenarios** — from acceptance criteria: the element or content specified must be present, have correct values, and be visible.
2. **Negative scenarios** — derived from failure criteria: assert that the absence of required elements or incorrect values would be caught (implemented as assertions that the element count is exactly the expected value, not "at least").
3. **Boundary scenarios** — for numeric counts (3 project cards, 3 career entries, 7 sections, 3 skill categories): assert `count === N`, not `count >= N`.
4. **Unimplemented route detection** — scan the Next.js route structure. Any route found without a rendered HTML response must be marked with `test.fixme()` and a comment referencing the missing implementation. Do not skip; do not silently pass.

---

### Shared Helpers

All generated spec files must import from `tests/e2e/helpers/`. The following helpers are mandatory:

```
tests/e2e/helpers/
├── server-health.ts      # waitForServer(url): asserts GET returns < 500 before tests run
├── html-parser.ts        # getHead(html): parses <head>; getMetaContent(html, name/property): returns content value
├── dom-assertions.ts     # assertNoOverflow(page, selector): scrollWidth check; assertAltText(page): finds all img with empty alt
├── axe-runner.ts         # runAxe(page): runs axe-core and returns violations filtered to critical/serious
└── viewport-presets.ts   # MOBILE = { width: 375, height: 812 }; DESKTOP = { width: 1280, height: 800 }
```

No duplication of auth flows, test data setup, or common assertions is permitted across spec files. All shared logic must live in `helpers/`.

---

### Generation File Headers

Every generated file must begin with:

```typescript
// @generated-from: test:acceptance-criteria
// @generated-by: codd propagate
```

Manually authored tests within generated files must be annotated with `// @manual` on the line immediately above the `test(` declaration. Manual tests must be preserved verbatim on regeneration. Generated tests surrounding them may be updated.

---

### Pass Criteria (Quality Gate)

A test run is considered passing and release-eligible only when all of the following are true:

| Gate | Requirement |
|------|-------------|
| All tests PASS | Zero failing tests across all spec files |
| Zero SKIP | No `test.skip()` in the final run; `test.fixme()` is permitted only for unimplemented routes and must be logged as a warning |
| Acceptance criteria coverage | Every AC-01 through AC-13 scenario maps to at least one passing test |
| Release-blocking constraints | AC-01 (all 7 sections), AC-09 (full OGP), AC-10 (375px responsive), AC-11 (alt text + landmarks) all pass without exception |
| No 5xx responses | Zero HTTP 500+ responses across all API integration tests |
| axe-core clean | Zero `critical` or `serious` violations in `accessibility.browser.spec.ts` |
| TypeScript compilation | `tsc --noEmit` exits 0 as a pre-test step |
| Build success | `next build` exits 0 before any test file executes |
