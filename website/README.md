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

## Source of Truth
- lesson content is maintained in `artifacts/content/json/`
- website data is generated into `website/data/lessons.json`
- prompts and plans live in `prompt/raw/` and `prompt/plans/`

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

## Related Docs
- [Root README](/Users/tarak/Documents/Github/QCML/README.md)
- [Roadmap](/Users/tarak/Documents/Github/QCML/docs/ROADMAP.md)
- [Release Checklist](/Users/tarak/Documents/Github/QCML/docs/RELEASE_CHECKLIST.md)
