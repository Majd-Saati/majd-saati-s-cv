# Majd Saati — Portfolio

Bilingual (English / Arabic, LTR / RTL) developer portfolio built with **React 19**, **TypeScript**, **Vite**, React Router, and GSAP. A one-page home plus project and course detail pages; light/dark themes; CSS Modules, no UI or i18n libraries.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint
```

### Environment

Copy `.env.example` to `.env` and set:

| Variable        | Purpose                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| `VITE_SITE_URL` | Public URL (no trailing slash). Enables canonical, `og:url`, sitemap.xml |
| `VITE_BASE_PATH` | Sub-path the site is served from, e.g. `/my-repo/` (default `/`)       |

## Updating content

All content lives in `src/data/` — UI components never hardcode CV content.

| File            | Content                                                            |
| --------------- | ------------------------------------------------------------------ |
| `personal.ts`   | Name, role, summary, about, highlights, photo, CV file, contacts   |
| `experience.ts` | Work history (timeline). `projectIds` links roles to projects      |
| `projects.ts`   | Projects (image, demo URL, GitHub URL are optional)                |
| `skills.ts`     | Skill categories (rendered twice: a card grid and the tabbed Skills explorer) |
| `education.ts`  | Degrees; courses with optional course / certificate links          |
| `site.ts`       | Social share image, theme colors                                   |
| `sections.ts`   | Section order (drives navigation and numbering); `NAV_PARENT` maps sections without a menu item to one |
| `routes.ts`     | Page URLs (`/experience/:id`, `/projects/:id`, `/courses/:id`) and path helpers |
| `techLogos.ts`  | Technology name → brand logo ([Simple Icons](https://simpleicons.org), CC0) |

Any technology name used in the data files automatically shows its logo when it is registered in `techLogos.ts`; unknown names render without one.

Text is either a plain string (language-neutral, e.g. `'React.js'`) or a `Localized` object `{ en, ar }`. Optional fields (links, dates, images, company) are simply omitted and the UI skips them — no empty buttons are rendered.

**Placeholders to fill in**

- **Photo** — served from `public/images/majd-saati.webp` (configured in `personal.ts`). Removing `photo` falls back to a monogram. A larger source (≈800×1000) would look sharper on high-DPI screens.
- **GitHub** — set `contact.github` in `personal.ts`; it appears in the hero, contact section, footer, and JSON-LD, like LinkedIn.
- **Course links & details** — set `courseUrl` / `certificateUrl` on a course in `education.ts`. Its details page also shows an optional `description` and `topics` when you add them.
- **Company websites** — set `companyUrl` on an experience entry.
- **Project images / GitHub links** — set `image` / `sourceUrl` on a project.
- **Social share image** — add a 1200×630 image to `public/` and set `site.ogImage`.
- **CV** — replace `public/cv/majd-saati-cv.pdf`.

## Adding a language

1. Add it to `LANGUAGES` in `src/i18n/config.ts` (direction, locale).
2. Add a dictionary in `src/i18n/translations/` typed as `Dictionary` and register it in `translations/index.ts`.
3. TypeScript will now flag every `Localized` field in `src/data/` missing the new language.

## Architecture

```
src/
├── components/
│   ├── layout/       RootLayout, Header, Footer, PageHeader, scroll management
│   ├── navigation/   NavLinks, LanguageSwitcher, ThemeToggle
│   ├── sections/     One component per page section
│   └── ui/           Primitives: Section, Card, ButtonLink, TextLink, TagList, Icon…
├── data/             Portfolio content (single source of truth)
├── hooks/            useTheme, useActiveSection
├── i18n/             Language config, provider, dictionaries
├── lib/              Pure helpers (dates, contacts, SEO, scroll, storage)
├── pages/            HomePage, Experience/Project/CourseDetailsPage, NotFoundPage
├── styles/           Design tokens + global styles
└── types/            Content types
```

Key decisions:

- **Styling** — CSS Modules + design tokens (`styles/tokens.css`). Colors are theme variables switched by `data-theme` on `<html>`. Layout uses logical properties (`margin-inline-start`, `inset-inline`…), so RTL needs no duplicated components; only directional icons are mirrored.
- **No flash on load** — an inline script (generated from `lib/preferences.ts`) applies the saved/system theme and language before first paint. React reads the resulting `<html>` attributes as initial state.
- **SEO at build time** — `vite.config.ts` injects title, description, Open Graph, canonical, and JSON-LD (`Person`) from `src/data`, and emits `robots.txt` / `sitemap.xml`. Files imported by `vite.config.ts` use explicit `.ts` import extensions for Vite's native config loader.
- **Scroll & motion (GSAP)** — plugins are registered once in `lib/gsap.ts`; always import GSAP from there.
  - `ScrollToPlugin`: every in-page link (`href="#…"`) scrolls with easing, offset by the sticky header, then updates the URL hash and moves focus to the section (`hooks/useAnchorScroll.ts`, `lib/scroll.ts`). Manual scrolling cancels it.
  - `ScrollTrigger`: staggered reveals for any `[data-reveal]` element (`hooks/useRevealAnimations.ts`), active-section tracking (`hooks/useActiveSection.ts`), hero entrance + parallax, word-by-word section titles, count-up stats, skill-tile cascades, the experience rail that draws as you scroll, and the back-to-top button whose ring shows reading progress.
  - Pointer effects (`hooks/useMagnetic.ts`, `hooks/useSpotlight.ts`) use `gsap.quickTo` and run only on mouse/trackpad devices (`FINE_POINTER_MOTION_OK`).
  - Nav: a single pill slides to the active link (`navigation/NavLinks.tsx`).
  - Skills explorer (`sections/SkillsExplorer.tsx`): WAI-ARIA tabs (arrow keys incl. RTL, Home/End, roving tabindex); a GSAP indicator slides between tabs and tiles cascade in on each switch. Vertical sidebar ≥ 64rem, scrollable row below.
  - Projects: on large screens (≥ 64rem wide, ≥ 40rem tall, motion allowed) the gallery pins and scrolls horizontally with snapping, a progress bar and a counter; otherwise it's a normal grid (`sections/Projects.tsx`). It travels the other way in RTL, and focusing an off-screen card scrolls it into view. The pin is created once and re-measured on refresh — don't add dependencies that rebuild it (rebuilding a pin while other `once` triggers fire can break ScrollTrigger's refresh loop).
  - Text splitting is done in React (`ui/AnimatedText.tsx`), not with a DOM-rewriting plugin, so React keeps ownership of the markup on language change; words (never letters) keep Arabic glyphs joined, and screen readers get the unsplit text.
  - Animations use `useGSAP` for automatic cleanup and `gsap.matchMedia()` so nothing animates under `prefers-reduced-motion` (content is fully visible and anchor jumps are instant).
  - Don't add CSS `transition`s on `transform`/`opacity` for elements GSAP animates, and don't re-enable `scroll-behavior: smooth` — both fight GSAP's per-frame updates.
- **Routing** — React Router: `/` (all sections), `/experience/:id`, `/projects/:id` and `/courses/:id` (detail pages, lazy-loaded), and a 404. Every role, project and course automatically gets a details page, is linked from its card, and is listed in `sitemap.xml`. The home Experience section shows only the main facts per role; responsibilities, achievements and the role's projects are on its details page. Roles and projects are cross-linked via `projectIds` in `experience.ts`: a project's page shows its role (linked) and the CV bullets about it, derived rather than duplicated. Nav links point to `/#section` and work from any page. Layout effects reset scroll to the top **before** a new page builds its ScrollTriggers (`ScrollReset`); keep that component above `<Outlet />`.
- **Deploying** — `.github/workflows/deploy.yml` builds and deploys to **GitHub Pages** on every push to `main` (one-time setup: Settings → Pages → Source: *GitHub Actions*). The build publishes `index.html` as `404.html`, so deep links like `/projects/menwer` work on Pages. `VITE_BASE_PATH` sets the sub-path the site is served from (the workflow sets it automatically; leave it empty for a custom domain or root hosting). Other hosts: configure an SPA fallback to `index.html`.
- **Icons** — UI icons come from [Phosphor](https://phosphoricons.com) via the `Icon` component, which maps semantic names (`IconName` in `components/ui/icons.ts`) to Phosphor components; change an icon there, never at call sites. Icons use the `regular` weight (or `duotone` for large badges); `bold` and `fill` are deliberately not used, and the `Icon` prop types disallow them. Technology brand logos (Next.js, React, MySQL…) come from Simple Icons because Phosphor doesn't include them.
- **Performance** — ~200 KB gzipped JS on first load, split into cacheable vendor chunks (React + React Router ≈ 98, GSAP ≈ 46, icons + logos ≈ 37, app ≈ 20); detail pages load on demand (~1 KB each); lazy-loaded project images.
- **Accessibility** — semantic landmarks, skip link, one `h1` with ordered headings, visible focus rings, `aria-pressed` language switch, labelled icon buttons, 44px touch targets, WCAG AA color contrast in both themes.
