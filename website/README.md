# Quantum Playground Website

The website is a Next.js 14 App Router application with TypeScript, Tailwind CSS, KaTeX, Framer Motion, Three.js, and Zustand.

## Local development

From the repository root:

```bash
npm --prefix website install
npm --prefix website run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm --prefix website run typecheck
npm --prefix website run lint
npm --prefix website run check:lessons
npm --prefix website run build
```

`check:lessons` verifies that all 40 lessons have content, routes, metadata, quizzes, equation breakdowns, Qiskit snippets, and valid KaTeX expressions. The numeric prefix of each content file follows the student-facing curriculum order; stable lesson IDs remain in `src/lib/lessons.ts`.

## Deployment

The site is configured for static export with Firebase Hosting. The client-side simulator and quiz validation do not require a backend. Qiskit examples are copied and run separately in a Python environment; the website does not execute Qiskit code in the browser.

The simulator is an ideal state-vector model. Real quantum hardware introduces sampling, noise, calibration, connectivity, transpilation, and provider-specific account requirements. Advanced lessons may simplify algorithmic oracles and resource estimates for teaching purposes.

## Main areas

- `src/app/`: pages, layout, lessons, playground, gates, and IBM Quantum guide
- `src/components/`: circuit, lesson, math, and quantum visualization components
- `src/content/lessons/`: the 40 lesson content components, numbered in curriculum order
- `src/lib/quantum-engine/`: gate matrices, state updates, and simulation math
- `src/lib/lessons.ts`: curriculum metadata and quiz definitions
- `src/lib/equationBreakdowns.ts`: equation explanations for the published lessons
- `src/lib/lessonQiskitSnippets.ts`: copyable Qiskit 2.x examples
- `scripts/validate-published-lessons.mjs`: published-content validation

## Project updates

The public update history is available at [/updates](/updates) and is also summarized in the repository [CHANGELOG.md](../CHANGELOG.md). The website log is a static snapshot of meaningful commits so it remains compatible with Firebase Hosting.

## Provider note

Qiskit and IBM Quantum are used because they are a familiar and accessible learning path for the author. Quantum Playground is an independent project and is not affiliated with IBM. Other ecosystems include PennyLane, Cirq, Amazon Braket, Azure Quantum, CUDA-Q, and vendor-specific SDKs.