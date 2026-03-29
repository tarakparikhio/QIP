# AI Context

This is the single entry point for AI work in this repo.

## Current State

QCML is a Next.js quantum learning platform with 35 lessons. The website code is in `website/`. The active lesson widgets are in `website/components/lesson-widgets/`. The generated lesson bundle used by the website is `website/data/lessons.json`.

## Website Context

### Product shape
The website is intended to feel like an interactive concept atlas for software engineers moving into quantum computing. It is not a raw document viewer.

### Architecture
- `website/app/`: route structure and lesson pages
- `website/components/lesson-widgets/`: lesson-specific interactive demos
- `website/components/`: shared UI primitives and product-facing components
- `website/config/`: featured paths and translation/configuration files
- `website/lib/`: lesson access, progress, learning mode, and curriculum logic
- `website/data/lessons.json`: generated lesson payload consumed by the site
- `website/public/source-pdfs/`: canonical source PDF archive
- `website/public/portfolio-assets/`: screenshots and demo media for showcase usage

### Data flow
1. Source PDFs are stored in `website/public/source-pdfs/`.
2. Extraction and enrichment scripts build structured content under `artifacts/`.
3. Source provenance and reference material live under `/_metadata/source-context/`.
4. The website bundle is generated into `website/data/lessons.json`.
5. Lesson pages render from that data.
6. Widgets are assigned centrally through `website/components/lesson-widgets/index.ts`.

## What The Artifacts Folder Is For
`artifacts/` should be treated as an active content-processing workspace.

Keep in `artifacts/`:
- extracted lesson text
- structured content JSON
- review markdown
- preview outputs

Move to `/_metadata/` when a file is:
- descriptive rather than executable
- provenance or indexing information
- AI handoff context
- planning or audit context

## What Has Been Completed

### Critical correctness fixes
- Pauli-Y matrix corrected to the complex form `[[0, -i], [i, 0]]`.
- Measurement widgets now use the Born rule instead of hardcoded 50/50 outcomes.
- Bloch sphere convention text now uses `|0⟩` as the north pole.

### Widget specialization
The reused widgets that were teaching different concepts have been split so each lesson now has a properly aligned visualization.
- Lesson 3 and 25: `measurement-basic.tsx`, `measurement-deep.tsx`
- Lesson 9 and 23: `product-state-builder.tsx`, `entanglement-builder.tsx`
- Lesson 14 and 29: `hamiltonian-simulator.tsx`, `trotter-simulator.tsx`
- Lesson 20 and 24: `operator-matrix-explorer.tsx`, `universal-gate-decomposer.tsx`

### High-risk algorithm lessons reworked
- Lesson 26 QFT: now shown as a quantum basis transform on amplitudes, not a classical FFT demo.
- Lesson 28 Phase Estimation: now shows kickback plus inverse QFT and a measurement distribution.
- Lesson 30 VQE: now uses a concrete Hamiltonian, shot-based expectation, and an optimizer loop.
- Lesson 31 QAOA: now uses a MaxCut graph instance with sampled cut-value distribution.
- Lesson 34 Phase Kickback: now enforces the eigenstate requirement and shows the failure case.

## Validation Status
- `cd website && npm run typecheck` passes.
- `cd website && npm run validate:lessons` passes.
- 35 out of 35 lessons validate successfully.

## Portfolio Context
This repo is meant to be legible to recruiters and technical reviewers.
The important dimensions are:
- product thinking around difficult technical education
- frontend engineering for interactive teaching tools
- disciplined AI-assisted implementation
- audit-driven correction of misleading or mathematically weak demos
- provenance from source PDFs through generated content into a live website

## Canonical Metadata Files
- `/_metadata/AI_CONTEXT.md`: this file
- `/_metadata/PLAN.md`: the single plan and status file
- `/_metadata/RAW_CONTEXT.md`: the single condensed raw brief that produced the project direction
- `/_metadata/AUDIT.csv`: the single lesson audit source

## What To Ignore
Ignore old planning, prompt, audit, and cleanup files that were used during the build process. They have been consolidated into the four files above.

## Working Rule For Future Sessions
Start with this file, then read `/_metadata/PLAN.md` if task scope matters, and read `/_metadata/AUDIT.csv` only if you need lesson-by-lesson audit detail.
