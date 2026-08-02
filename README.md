# QCML

QCML is a quantum-computing learning platform built to make difficult material structured, visual, and approachable for software engineers. The main deliverable is the static-exportable Next.js website in `website/`.

The result is a productized learning system with 35 lessons, interactive circuit and state-vector tools, quizzes, equation explanations, Qiskit examples, and a clear explanation of simulator limitations.

## Why This Project Matters

Most quantum learning material fails in one of two ways: it is either too hand-wavy to trust or too formal to navigate. QCML is an attempt to close that gap.

This repo shows work across curriculum design, technical writing, React/TypeScript engineering, quantum-state simulation, mathematical visualization, validation, and static deployment.

For a recruiter or reviewer, this repo demonstrates product thinking, technical writing, frontend engineering, data pipeline work, and the ability to use AI as a disciplined implementation tool rather than as a blind code generator.

## What Exists Today

- 35 lessons in the curriculum
- 35 out of 35 lessons validated by the published-lesson checker
- interactive circuit builder, Bloch sphere, state vectors, probabilities, and multi-qubit views
- equation breakdowns and copyable Qiskit 2.x examples
- local quiz validation and persistent learning progress
- static-export friendly Next.js website for Firebase Hosting

## Portfolio Highlights

### 1. Audit-driven technical correction
The project includes an audit trail for mathematical and pedagogical risks in the visualization layer.

That audit led to:
- Pauli-Y matrix correction to the proper complex form
- Born-rule-based measurement instead of hardcoded 50/50 behavior
- Bloch-sphere convention fixes
- widget splits where one component was incorrectly reused for different concepts
- rewrites of the highest-risk algorithm demos including QFT, Phase Estimation, VQE, QAOA, and Phase Kickback

### 2. Product architecture, not just page-building
The website is organized as a maintainable system:
- lesson routes are driven by structured metadata and typed content components
- shared lesson UI renders quizzes, equations, and code examples consistently
- the simulator engine and gate definitions are separated from presentation
- automated validation checks lesson files, routes, metadata, quizzes, snippets, and KaTeX expressions

### 3. Source transparency
The project distinguishes educational explanations, simulator behavior, and external provider documentation. Qiskit and IBM Quantum are examples used for familiarity, not an exclusive or affiliated platform relationship.

## Repository Structure

- `website/`: live Next.js application
- `website/src/app/`: routes, pages, layout, and interactive client screens
- `website/src/components/`: reusable lesson, circuit, math, and visualization components
- `website/src/content/lessons/`: the 35 published lesson components
- `website/src/lib/`: lesson metadata, quiz data, quantum engine, equation data, and Qiskit snippets
- `website/scripts/`: lesson coverage and KaTeX validation
- `QC/`: source lesson material retained for reference

## Website Architecture

See [website/README.md](website/README.md) for setup and deployment details. At a high level:

1. Typed lesson metadata in `website/src/lib/lessons.ts` defines the curriculum.
2. Lesson components in `website/src/content/lessons/` provide the teaching content.
3. Dynamic lesson routes map slugs to those components.
4. Shared lesson UI adds quizzes, equations, Qiskit snippets, and navigation.
5. The local TypeScript quantum engine powers the interactive simulator.

## Learning and source boundaries

AI-assisted implementation was used as an engineering aid, not as an authority. Quantum explanations should be checked against standard references and provider documentation. The simulator is an ideal state-vector model; real hardware adds sampling, noise, calibration, connectivity, transpilation, and queue constraints. Advanced algorithm examples may intentionally simplify an oracle, resource count, or hardware workflow.

## Project Stages

### Stage 1. Curriculum and content
- define a progressive 35-lesson path
- write structured explanations, equations, quizzes, and exercises

### Stage 2. Interactive website
- build the App Router website and local quantum engine
- add circuit editing, visualizations, progress, and responsive navigation

### Stage 3. Accuracy and portfolio hardening
- audit high-risk quantum visualizations and algorithm explanations
- add lesson, route, quiz, snippet, and KaTeX validation
- document scope, limitations, provider attribution, and deployment

## Commands

From the repository root:

```bash
npm --prefix website install
npm --prefix website run dev
npm --prefix website run typecheck
npm --prefix website run lint
npm --prefix website run check:lessons
npm --prefix website run build
```

Open `http://localhost:3000` after starting the dev server.

## Validation

The release checks currently pass:
- TypeScript typecheck
- Next.js lint
- 35-lesson coverage and KaTeX validation
- production static build

## For Recruiters

The fastest path through the project is:

1. Read this file.
2. Open the live website and try the lessons, playground, and gate reference.
3. Read [website/README.md](website/README.md) for the implementation details.
4. Inspect `website/src/lib/quantum-engine/` and `website/src/components/` for the core technical work.

This project is strongest as evidence of product design, interactive frontend work, technical writing, quantum-software learning, and disciplined AI-assisted development.
