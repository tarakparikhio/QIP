# QCML Quantum Intuition Platform

QCML is a quantum computing learning platform designed to make difficult ideas feel structured, navigable, and portfolio-ready. The project combines preserved analogies, compact mathematics, real physics grounding, formal quantum mechanics, and a Next.js website that presents the curriculum as a product rather than a static document dump.

## Current Product State
- Lessons `1-35` exist in structured JSON and readable Markdown review form.
- The website is a Next.js App Router project with static export support.
- Math rendering, light/dark mode, lesson navigation, and curriculum browsing are already in place.
- The repo is split into:
  content pipeline work, prompt/planning material, and the deployable website.

## Main Folders
- `website/`: the portfolio-facing Next.js site
- `artifacts/`: generated lesson data, reviews, audits, and source extraction outputs
- `pdf/`: original lesson source PDFs
- `scripts/`: extraction, conversion, and website-data utilities
- `prompt/raw/`: source prompts and planning notes
- `prompt/plans/`: execution plans for v1 and post-v1 work
- `docs/`: roadmap, release checklist, and portfolio asset placeholders

## Content and Planning Sources
- [phase1.txt](/Users/tarak/Documents/Github/QCML/prompt/raw/phase1.txt): structured lesson generation requirements
- [phase2.txt](/Users/tarak/Documents/Github/QCML/prompt/raw/phase2.txt): website/product experience ideas
- [execution_plan.md](/Users/tarak/Documents/Github/QCML/prompt/plans/execution_plan.md): original lesson-system execution plan
- [execution_plan_v2.md](/Users/tarak/Documents/Github/QCML/prompt/plans/execution_plan_v2.md): post-v1 product roadmap

## Website and Deployment
The website is intentionally kept compatible with simple portfolio deployment:
- Vercel for easy Next.js hosting
- Firebase Hosting using the static export from `website/out/`

See:
- [website/README.md](/Users/tarak/Documents/Github/QCML/website/README.md)
- [RELEASE_CHECKLIST.md](/Users/tarak/Documents/Github/QCML/docs/RELEASE_CHECKLIST.md)

## Roadmap
The current roadmap is organized into:
- `v1`: lesson extraction, enrichment, JSON structure, and initial website
- `v1.1`: homepage, atlas, and portfolio polish
- `v2`: richer learning modes, progress, and interactive experiences

See:
- [ROADMAP.md](/Users/tarak/Documents/Github/QCML/docs/ROADMAP.md)

## Quick Start
From the `website/` directory:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Why This Repo Exists
This repository is being shaped as a personal portfolio project first. That means the codebase should be understandable to a reviewer, the product direction should be visible from the README and roadmap, and deployment should stay simple enough to demo without backend complexity.
