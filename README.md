# Portfolio

![Preview](https://raw.githubusercontent.com/igorator/ihor-next-portfolio/master/app/opengraph-image.png)

Personal portfolio built with Next.js 16, React 19, and TypeScript.  
Features a WebGL animated background, glass UI system, bilingual content, and a fully filterable projects showcase.

**Live:** [View site](https://igorator.site)  
**Assets repository:** [GitHub](https://github.com/igorator/portfolio-assets)

---

## Stack

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%20strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS Modules](https://img.shields.io/badge/CSS%20Modules-styling-264DE4)](https://github.com/css-modules/css-modules)
[![CSS Custom Properties](https://img.shields.io/badge/CSS-variables-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
[![motion/react](https://img.shields.io/badge/motion%2Freact-v12-0055FF?logo=framer&logoColor=white)](https://motion.dev/)
[![OGL](https://img.shields.io/badge/WebGL-OGL-000000)](https://github.com/oframe/ogl)
[![next-intl](https://img.shields.io/badge/i18n-next--intl%20v4-1A1A1A)](https://next-intl.dev/)
[![Radix UI](https://img.shields.io/badge/UI-Radix%20Primitives-000000)](https://www.radix-ui.com/)
[![Vercel Analytics](https://img.shields.io/badge/Vercel-Analytics-black?logo=vercel)](https://vercel.com/analytics)
[![Speed Insights](https://img.shields.io/badge/Speed-Insights-black?logo=vercel)](https://vercel.com/docs/speed-insights)
[![ESLint](https://img.shields.io/badge/ESLint-linting-4B32C3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-formatting-F7B93E?logo=prettier)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-git%20hooks-1F1E1E)](https://typicode.github.io/husky/)
[![lint-staged](https://img.shields.io/badge/lint--staged-automation-2E8B57)](https://github.com/lint-staged/lint-staged)

---

## Features

- WebGL animated background built with OGL shaders reacting to cursor movement and theme changes
- Glass UI system with SVG displacement filters and reusable `glass-card` utility
- Light / dark / system theme with cookie persistence and SSR-safe hydration
- Full internationalization (English + Ukrainian) with locale-based routing
- Advanced projects system: filtering by tech stack, sorting, and view modes
- Media lightbox with keyboard navigation, video support, and portal rendering
- Scroll-driven employment timeline with project linking
- SEO optimization with OpenGraph, Twitter Cards, JSON-LD schema
- Mobile-first UI with bottom navigation and adaptive layouts

---

## Pages

| Route              | Description                            |
| ------------------ | -------------------------------------- |
| `/`                | Home — intro, skills, highlights       |
| `/projects`        | Projects list with filtering and views |
| `/projects/[slug]` | Project detail — gallery and metadata  |
| `/employment`      | Work experience timeline              |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
