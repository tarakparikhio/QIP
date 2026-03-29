# QCML Website

This is the Next.js website for the QCML Quantum Intuition Platform. It presents the quantum curriculum as a product experience for learners and portfolio reviewers, not just as a raw content viewer.

## Product Story
The goal of the website is to bridge the gap between “scary physics” and “familiar software thinking.” The site uses:
- preserved analogies
- rendered mathematics
- real-world physics framing
- formal quantum mechanics structure
- guided curriculum navigation

The result is meant to feel like an interactive concept atlas rather than a static tutorial.

## Current Features
- Next.js App Router architecture
- static export support for low-cost deployment
- lesson pages generated from canonical JSON content
- searchable curriculum atlas
- light/dark mode
- KaTeX-based math rendering
- lesson navigation and structured content sections
- specialized interactive widgets for 35 lessons
- audit-driven corrections for mathematically sensitive lessons

## Source of Truth
- lesson content is maintained in `artifacts/content/json/`
- website data is generated into `website/data/lessons.json`
- project audit, plan, and raw context live in `_metadata/`
- original lesson PDFs live in `website/public/source-pdfs/`
- portfolio screenshots and demo assets live in `website/public/portfolio-assets/`

## Website Structure
- `app/`: route tree and lesson pages
- `components/lesson-widgets/`: lesson-specific interactive quantum visualizations
- `components/`: shared UI such as browser, code block, math renderer, toggles, and progress UI
- `config/`: featured paths and translator configuration
- `lib/`: lesson parsing, curriculum paths, learning mode, and progress logic
- `public/source-pdfs/`: canonical source archive served with the site
- `public/portfolio-assets/`: recruiter-facing screenshots and demo assets

## Main Files
- `app/`: routes, layout, homepage, lesson pages
- `components/`: UI pieces like theme toggle, lesson browser, and math rendering helpers
- `lib/lessons.ts`: lesson lookup helpers
- `data/lessons.json`: generated website lesson bundle
- `scripts/validate-lessons.mjs`: math validation for lesson data at build time

## Commands
From this `website/` directory:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Deployment
This project is intentionally simple to publish:
- Vercel: deploy `website/` as the Next.js app
- Firebase Hosting: deploy the static export in `website/out/`

This keeps the portfolio story straightforward and avoids unnecessary backend complexity.

## Source and Evidence
The website now carries the original source archive and portfolio artifacts inside the app workspace so the educational claims and the presentation layer can be reviewed together.

- `public/source-pdfs/`: original PDFs used to derive lesson content
- `public/portfolio-assets/screenshots/`: static product captures
- `public/portfolio-assets/demo-gifs/`: short demo loops for recruiter-facing pages

## Related Docs
- [Root README](/Users/tarak/Documents/Github/QCML/README.md)
- [_metadata/AI_CONTEXT.md](/Users/tarak/Documents/Github/QCML/_metadata/AI_CONTEXT.md)
- [_metadata/PLAN.md](/Users/tarak/Documents/Github/QCML/_metadata/PLAN.md)
