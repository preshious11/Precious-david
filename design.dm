# Precious — Design Document

Personal, editorial-style portfolio site for Precious David, a product designer based in Lagos, Nigeria. Built with the Next.js App Router, TypeScript, Tailwind CSS v4, hand-written CSS, and Framer Motion.

## 1. Purpose

Showcase product design work (case studies), a running log of side projects, informal writing, and a way to get in touch — presented with an editorial, typographic-first aesthetic rather than a typical "app-like" portfolio template.

## 2. Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`) layered with custom CSS in `app/globals.css`
- **Motion:** Framer Motion (`components/motion.tsx`), reduced-motion aware
- **Fonts:** Geist Sans, self-hosted via `next/font` (`geist` package) — no third-party font requests
- **Icons:** `lucide-react`
- **QA:** Playwright scripts in `qa/` for visual regression screenshots across breakpoints and themes
- **Tooling:** ESLint 9 (`eslint.config.mjs`), `tsc --noEmit` for type checking

Scripts: `npm run dev`, `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## 3. Site structure

```
app/
  page.tsx              → home (hero, experience, selected work, side quests, interests, writing, about, contact)
  work/page.tsx          → work index
  work/[slug]/page.tsx    → one template rendering all six case studies
  about/page.tsx
  writing/page.tsx        → writing index
  writing/[slug]/page.tsx → individual draft/article pages
  playground/page.tsx
  contact/page.tsx
  not-found.tsx
  globals.css
components/
  home.tsx           → homepage sections
  case-study.tsx      → case study block renderer
  project-media.tsx    → shared project image/media component (next/image)
  navigation.tsx        → header nav + mobile menu (native <dialog>)
  motion.tsx            → shared Framer Motion primitives
  theme-toggle.tsx      → light/dark toggle
  talk-button.tsx        → contact CTA
  social-icon.tsx, icon.tsx
data/
  portfolio.ts    → single source of truth for all content
  places.ts
```

Navigation targets: `/work`, `/about`, `/playground`, `/writing`, `/contact`.

## 4. Content model — `data/portfolio.ts`

**All personal content lives here.** Components should render this data, not hardcode copy.

- `profile` — name, role, location, timezone, availability, intro, about paragraphs, email
- `navigation` — nav labels
- `experience` — company, role, timeline, description, bullets
- `projects` (6 seeded case studies) — slug, title, subtitle, year, role, platform, timeline, tags, heroImage, description, `sections[]` (each with a title and `ContentBlock[]`)
- `ContentBlock` union — `paragraph | heading | quote | image | device | gallery | two-column | image-text | stat | video`
- `sideProjects` — name, period, description, status, timeline bar position (`start`/`length`)
- `tools` — grouped by category (Design / Build / Experiment)
- `writing` — slug, title, category, date (drafts marked `"Draft · Coming soon"`)
- `interests` — name, mark (glyph), color
- `socialLinks` — label, href (blank `href` = not yet live, rendered as pending)

### Content rule (important)

**Do not invent outcomes, metrics, or research findings.** Case studies without real content use honest placeholder copy ("Add the ___ for this project…") and projects without confirmed data use `"To be added"` / `"To be confirmed"`. Writing entries without a published article are marked `"Draft · Coming soon"`. Preserve this pattern when adding new content — placeholder ≠ fabricated.

## 5. Design tokens — `app/globals.css`

Defined on `:root`, overridden under `:root[data-theme="dark"]`:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#f2f0ea` | `#000000` | page background |
| `--ink` | `#191b18` | `#eeeee7` | primary text |
| `--muted` | `#6b6d65` | `#b0b5aa` | secondary text |
| `--line` | `#d3d3ca` | `#363c34` | borders/dividers |
| `--accent` | `#426b59` | `#a1c9b3` | links, highlights, status dot |
| `--surface` / `--hover` / `--timeline` | — | — | card/hover backgrounds, timeline bar |
| `--ease` | `cubic-bezier(.22,1,.36,1)` | | shared transition easing |

**Change `--accent` to re-theme the whole site.** Layout tokens: `--section-space` (64px desktop / 44px mobile), `--heading-gap`, `--copy-gap`.

## 6. Typography

- Font: Geist Sans (`--font-geist-sans`) → fallback `Arial, Helvetica, sans-serif`
- Headings use fluid `clamp()` sizing with tight, negative letter-spacing (editorial feel), e.g. hero `h1` up to `clamp(80px,13.65vw,198px)` on the old hero, `clamp(52px,6vw,80px)` on the current compact hero
- Body copy: `line-height: 1.5–1.6`
- `.mono` / `.eyebrow` — small caps-style labels, monospace lineage but unified to sans in the latest pass (see `--font-sans` comment in globals.css)

## 7. Layout & spacing rules

- Content width: `.wrap` / `.nav-wrap` capped at `1160px`, side padding 64px desktop → 32px (≤1100px) → 20px (≤767px)
- Section rhythm driven by `--section-space` (single source for vertical spacing between homepage sections)
- Selected-work grid: 2 columns desktop, 1 column ≤639px (`.work-grid`)
- Responsive breakpoints in use: `1600px`, `1100px`, `1023px`, `767px`, plus `pointer:coarse` and `prefers-reduced-motion` media queries
- The homepage hero is viewport-height-bound (`min-height: calc(100svh - 80px)`), keeping it dedicated to the hero beneath the sticky nav

## 8. Motion & interaction rules

- Motion respects `prefers-reduced-motion: reduce` — all animation/transition durations collapse to `.01ms`
- Hero uses a brief letter-reveal + fade-up entrance (`letter-in`, `hero-copy-in` keyframes)
- Custom cursor dot exists in CSS but is disabled on touch (`pointer:coarse`) and mobile (`≤767px`)
- Pointer-follower/magnetic cursor effects have been intentionally removed — do not reintroduce
- Hover micro-interactions: link underline sweep, project row translate + background tint, card arrow nudge — all via `--ease`, kept subtle

## 9. Theming

- Light/dark mode **follows the OS setting by default**
- An explicit toggle (`theme-toggle.tsx`) persists the choice to `localStorage` and is applied **before paint** to avoid a flash of incorrect theme
- All color logic must route through the CSS custom properties above — no hardcoded hex values in components

## 10. Accessibility

- Skip link to main content
- Visible `:focus-visible` outline (2px solid `--accent`) on all interactive elements
- Mobile menu is a native `<dialog>` — gives focus trapping and Escape-to-close for free
- Minimum 44px tap targets on interactive controls (menu toggle, theme toggle)
- Alt text and captions are required for all final media in case studies (not optional even for placeholders — write real alt text once an image is added)

## 11. Media rules

- All images live under `public/` and use the shared `project-media.tsx` component (built on `next/image`)
- No external image hosts, no third-party tracking scripts, no large 3D dependencies
- Each project's `heroImage` must be a local path; case study `ContentBlock`s of type `image`/`device`/`gallery`/`video` follow the same local-only rule

## 12. Case studies & writing

- `app/work/[slug]/page.tsx` renders **all six case studies through one shared template** driven by `data/portfolio.ts` — do not fork per-project page files
- `app/writing/[slug]/page.tsx` are **honest draft destinations**: they exist and are linkable, but state plainly that content is coming rather than faking an article
- Case study section blocks (`paragraph`, `heading`, `quote`, `image`, `device`, `gallery`, `two-column`, `image-text`, `stat`, `video`) are the only supported content shapes — extend the `ContentBlock` union in `data/portfolio.ts` before inventing a new block type in `case-study.tsx`

## 13. Contact

- The "talk" CTA composes a `mailto:` link to `profile.email` — keep `profile.email` current before treating the contact flow as live
- `socialLinks` entries with an empty `href` render as pending/inactive — fill in the URL to activate them

## 14. QA / visual regression

`qa/` contains Playwright scripts (`check.cjs`, `video.cjs`, etc.) that capture full-page and section screenshots across breakpoints (375px–1728px) and both themes, plus reduced-motion and hover states. Re-run the relevant script after layout/CSS changes to confirm no regressions before treating a visual change as done; `qa/results.json` holds the last recorded run.

## 15. Before publishing checklist (from README)

- [ ] Replace experience company names/dates with final data
- [ ] Finalize biography copy
- [ ] Fill in project years, platforms, timelines
- [ ] Write real case study content (no invented outcomes/research)
- [ ] Publish or remove draft writing entries
- [ ] Fill in remaining `socialLinks` URLs
- [ ] Set `profile.email` and confirm contact destinations work
- [ ] Replace placeholder portrait/interest compositions in `components/home.tsx` with real imagery

## 16. General guidelines

1. **Content vs. code separation** — copy changes go in `data/portfolio.ts`; visual changes go in `app/globals.css`; never inline content strings inside components.
2. **Tokens over literals** — use the CSS custom properties for color; use `--section-space`/`--heading-gap`/`--copy-gap` for vertical rhythm.
3. **No fabricated results** — placeholders stay honest until real data exists.
4. **Local-only assets** — no external fonts, images, or trackers.
5. **Motion is optional, never load-bearing** — every animated element must degrade correctly under `prefers-reduced-motion`.
6. **One template per content type** — case studies and writing entries are data-driven through a single route template each; don't create bespoke pages per slug.
