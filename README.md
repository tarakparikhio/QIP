# QCML

QCML is a portfolio-grade quantum computing learning platform built to make difficult material feel structured, visual, and credible to software engineers. It combines curriculum design, lesson extraction, pedagogical modeling, mathematically grounded interactive widgets, and a production-ready Next.js website.

The result is not just a content dump. It is a productized learning system with 35 lessons, specialized lesson widgets, validated lesson math, and a clear source trail from original PDFs to website output.

## Why This Project Matters

Most quantum learning material fails in one of two ways: it is either too hand-wavy to trust or too formal to navigate. QCML is an attempt to close that gap.

This repo shows work across multiple layers:
- source extraction from raw lesson PDFs
- structured lesson generation and enrichment
- curriculum design for intuition and rigor together
- React/TypeScript widget engineering for quantum concepts
- audit-driven correction of mathematically misleading demos
- portfolio-quality website presentation and deployability

For a recruiter or reviewer, this repo demonstrates product thinking, technical writing, frontend engineering, data pipeline work, and the ability to use AI as a disciplined implementation tool rather than as a blind code generator.

## What Exists Today

- 35 lessons in the curriculum
- 35 out of 35 lessons validated in the website data bundle
- specialized interactive widgets for the major quantum concepts
- corrected math in the highest-risk lessons and widgets
- static-export friendly Next.js website
- canonical AI handoff files for fast future iteration

## Portfolio Highlights

### 1. Audit-driven technical correction
The most important recent phase was not cosmetic polish. It was a system audit for mathematical and pedagogical errors in the visualization layer.

That audit led to:
- Pauli-Y matrix correction to the proper complex form
- Born-rule-based measurement instead of hardcoded 50/50 behavior
- Bloch-sphere convention fixes
- widget splits where one component was incorrectly reused for different concepts
- rewrites of the highest-risk algorithm demos including QFT, Phase Estimation, VQE, QAOA, and Phase Kickback

### 2. Product architecture, not just page-building
The website is organized as a maintainable system:
- lesson content is generated into a website-ready bundle
- lesson routes are driven by structured data
- widget selection is centrally mapped
- metadata for AI and maintenance is separated from live code

### 3. Source transparency
The original lesson PDFs and portfolio assets now live under the website so the source material and showcase assets travel with the product.

## Repository Structure

- `website/`: live Next.js application
- `website/app/`: routes, lesson pages, layout
- `website/components/lesson-widgets/`: interactive quantum widgets
- `website/data/lessons.json`: website-ready lesson bundle
- `website/public/source-pdfs/`: original PDF source archive
- `website/public/portfolio-assets/`: screenshots and demo assets for portfolio presentation
- `artifacts/`: extracted and transformed lesson content workspace
- `scripts/`: content extraction, enrichment, audit generation, and data build utilities
- `_metadata/`: canonical AI and project handoff files

## Canonical Context Files

These four files are the single source of repo context for humans and AI collaborators:

- [_metadata/AI_CONTEXT.md](/Users/tarak/Documents/Github/QCML/_metadata/AI_CONTEXT.md)
- [_metadata/PLAN.md](/Users/tarak/Documents/Github/QCML/_metadata/PLAN.md)
- [_metadata/RAW_CONTEXT.md](/Users/tarak/Documents/Github/QCML/_metadata/RAW_CONTEXT.md)
- [_metadata/AUDIT.csv](/Users/tarak/Documents/Github/QCML/_metadata/AUDIT.csv)

## Website Architecture

The live app is in [website/README.md](/Users/tarak/Documents/Github/QCML/website/README.md), but the high-level flow is:

1. Source PDFs are stored in `website/public/source-pdfs/`.
2. Extraction and enrichment scripts build structured lesson content in `artifacts/`.
3. `scripts/build_website_data.py` generates `website/data/lessons.json`.
4. The Next.js app renders lesson pages from that bundle.
5. `website/components/lesson-widgets/index.ts` maps lesson IDs to specialized widgets.

## AI Workflow

AI was used here as an engineering collaborator, not as an authority.

The pattern was:
- extract and inspect ground truth
- audit the visualization layer for mismatches
- implement focused fixes
- validate with TypeScript and lesson checks
- consolidate process context into canonical metadata

That matters because the credibility of a quantum education product depends on not letting plausible-looking UI drift away from actual mechanics.

## Project Stages

### Stage 1. Source capture
- collect and preserve the original lesson PDFs
- extract lesson text into structured intermediate artifacts

### Stage 2. Curriculum system
- define lesson schema and content structure
- build a lesson pipeline for website consumption

### Stage 3. Website productization
- build the App Router website
- add browsing, math rendering, learning modes, and widgets

### Stage 4. Audit and correction
- run a 35-lesson visualization audit
- fix mathematical errors and pedagogical mismatches
- validate full lesson coverage

### Stage 5. Portfolio hardening
- simplify repo context for AI and reviewers
- move source and presentation assets into the website
- present the work clearly for recruiters and collaborators

## Commands

From `website/`:

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm run validate:lessons
```

From the repo root:

```bash
node scripts/generate_quantum_audit_csv.mjs
python3 scripts/build_website_data.py
```

## Validation

Current verified status:
- `npm run typecheck` passes
- `npm run validate:lessons` passes
- audit generation writes to `_metadata/AUDIT.csv`

## Source Provenance

The canonical source PDFs are now stored in:
- [website/public/source-pdfs/README.md](/Users/tarak/Documents/Github/QCML/website/public/source-pdfs/README.md)

Portfolio screenshots and demo assets are stored in:
- [website/public/portfolio-assets/README.md](/Users/tarak/Documents/Github/QCML/website/public/portfolio-assets/README.md)

## For Recruiters

If you want the fastest path through the repo:

1. Read this file.
2. Open [website/README.md](/Users/tarak/Documents/Github/QCML/website/README.md).
3. Review [_metadata/AI_CONTEXT.md](/Users/tarak/Documents/Github/QCML/_metadata/AI_CONTEXT.md) for the condensed technical state.
4. Inspect `website/components/lesson-widgets/` for the core teaching logic.

This project is strongest as evidence of depth: product design, interactive frontend work, technical accuracy, content systems, and disciplined AI-assisted development.
