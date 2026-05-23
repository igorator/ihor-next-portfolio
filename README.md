![Preview](https://raw.githubusercontent.com/igorator/ihor-next-portfolio/master/app/opengraph-image.png)

# Portfolio

Personal portfolio built with Next.js 16, React 19, and TypeScript. Features a WebGL animated background, glass UI, bilingual content, and a fully filterable projects showcase.

**Live:** [igorator.site](https://igorator.site)

---

## Stack

| Layer         | Technology                                   |
| ------------- | -------------------------------------------- |
| Framework     | Next.js 16 (App Router)                      |
| UI            | React 19, TypeScript 5 strict                |
| Styling       | CSS Modules + CSS custom properties          |
| Animation     | motion/react (Framer Motion v12)             |
| WebGL         | OGL — GLSL shader                            |
| i18n          | next-intl v4 — English + Ukrainian           |
| UI Primitives | Radix UI (Select, Switch, Tooltip, Dropdown) |
| Analytics     | Vercel Analytics + Speed Insights            |
| Tooling       | ESLint, Prettier, Husky, lint-staged         |

---

## Features

- **WebGL background** — animated light-ray shader via OGL, reacts to mouse movement, adapts to light/dark theme
- **Glass UI** — two-layer glass system: SVG displacement-filter surface (`GlassSurface`) and `glass-card` utility class
- **Theme** — light / dark / system, cookie-persisted, zero FOUC via `data-theme` on `<html>`
- **i18n** — English (no prefix) and Ukrainian (`/uk/`), all content split into base + localized JSON
- **Projects** — grid/list view toggle, multi-select tech filter, sort, commercial filter, animated transitions
- **Lightbox** — keyboard navigation, video support, portal-rendered
- **Employment timeline** — scroll-driven rail animation, linked projects
- **SEO** — OpenGraph, Twitter Card, JSON-LD Person schema, per-page metadata
- **Mobile** — fixed bottom navbar, scroll-to-top, hidden menu with language/theme/socials

---

## Pages

| Route              | Description                                 |
| ------------------ | ------------------------------------------- |
| `/`                | Home — intro, skills, highlights            |
| `/projects`        | All projects with filtering and view modes  |
| `/projects/[slug]` | Project detail — gallery, tech stack, links |
| `/employment`      | Work history timeline                       |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://igorator.site
```

---

## Project Structure

```
app/                    # Next.js App Router (routes, metadata, globals)
├── [locale]/           # Locale-wrapped routes (en default, /uk)
│   ├── page.tsx        # Home
│   ├── projects/       # Projects list + detail
│   └── employment/     # Work history

views/                  # Page-level view components
widgets/                # Layout blocks (Navbar, Socials, ThemeSwitch…)
features/               # Interactive features (filters, lightbox)
shared/                 # Primitives, hooks, config, i18n

entities/
├── project/            # Project data (base JSON + en/uk localizations)
├── technology/         # Technology catalog with colors and categories
└── employment/         # Employment history data
```

---

## Data

All content lives in JSON files — no CMS, no database:

- `entities/project/data/` — `project_base.json` (slugs, dates, tech IDs) + `projects_en.json` / `projects_uk.json` (titles, descriptions)
- `entities/technology/data/technologies.json` — tech catalog with brand colors
- `entities/employment/data/` — employment base + localized roles

Data is merged server-side with `React.cache()` deduplication.

---

## Links

- [Live site](https://igorator.site)
- [GitHub](https://github.com/igorator/ihor-next-portfolio)
- [LinkedIn](https://www.linkedin.com/in/ihor-kliushnyk/)
