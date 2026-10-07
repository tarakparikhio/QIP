# Changelog

All notable project changes are recorded here. Dates and commit identifiers are taken from the repository history; the `Unreleased` section describes the current release-preparation work in the working tree.

## 2.2.0 - 2026-10-08

- Add **From bits to qubits** (`/history`): a math-free, scroll-through timeline of 28 milestones in six chapters, from binary arithmetic and early quantum physics to today's hardware, with links into the matching lessons and a floating year tracker.
- Add **The people behind the leap** (`/history/people`): 39 short profiles grouped by field, each linked to its timeline milestone and Wikipedia.
- Add the **Logic lab** (`/logic`): a classical gate explorer (NOT, AND, OR, XOR, NAND, NOR, XNOR) with truth tables, a half adder, ten scored challenges stored separately from lesson credits, and a side-by-side comparison with quantum gates.
- Add an everyday analogy to all 40 lessons, each with what it captures, where it breaks down, and the formal statement; fix analogies that were attached to the wrong lessons.
- Redesign the home page lesson map as six chapters matching the roadmap, with a per-chapter lesson path, progress, and "read first" and "opens up" links for the selected lesson.
- Replace the header links with grouped Learn, Practice, and Explore menus on desktop and a full-width grouped menu on phones; Updates and Run on IBM Quantum moved from the settings menu into the navigation.
- Link the history page from the home page, roadmap, and lesson 1, and the Logic lab from the gate guide; add the new pages to the sitemap.
- Phone-width pass on the new pages: larger tap targets and no labels below 11px.

## 2.1.0 - 2026-09-27

- Accuracy pass across all 40 lessons: fixed errors in lessons 1, 4, 12, 26, and 33; rewrote or substantially deepened 25 lessons (teleportation, decoherence, noise, density matrices, measurement theory, universal gates, error correction, Simon, both QFT lessons, both phase-estimation lessons, complexity, variational algorithms, VQE, both Hamiltonian-simulation lessons, adiabatic computation, BB84, hardware, compilation, and the two advanced lessons) with worked examples and checked numbers.
- Add "Practice the math": 121 fill-in-the-number problems with hints, worked solutions, and a statistics lens that ties each idea to probability, sampling, and error bars. Every answer is recomputed by `scripts/test-practice-answers.mjs`.
- Add four interactive labs: Interference (adding amplitudes versus chances), Shot (sampling, confidence intervals, sample size), Energy (VQE with shot noise and the parameter-shift rule), and Trotter (product-formula error scaling).
- New buildable experiments: full teleportation (deferred measurement), the 3-qubit bit-flip code with syndrome qubits, a complete n = 2 Simon instance, one-qubit phase estimation, mixed reduced states, and eigenstate versus superposition kickback.
- All 40 Qiskit code labs now run under Qiskit 2.x and demonstrate what their titles claim (for example, Shor period finding for 15, a verified QFT, single-edge QAOA, and teleportation with a fidelity check).
- Make credits reflect understanding: each question pays full credit on the first try, half on the second, a quarter after that; retakes keep the best score; lesson cards and pages show mastery %; building an experiment's target state yourself pays a one-time 10% bonus. Existing learners keep their earned credits. "XP" and "credits" are now one term.
- Add "Skip for now" at the bottom of unfinished lessons (no credits; the lesson stays next in the path) and make lessons ahead of the path readable and clickable in the catalog.
- Add a live Bell-state demo to the homepage, a one-line header on phones, higher-contrast secondary text and larger small labels, and a clearer tagline.
- Add a "Report it on GitHub" link to every lesson with a prefilled issue template.
- Fix the lesson circuit builder disappearing while 3D label fonts download from a CDN (and permanently where the CDN is blocked): Bloch sphere labels now render as HTML with no network dependency.
- Explain the playground-versus-Qiskit qubit ordering in exported code, lesson code labs, and the Multi-Qubit Systems lesson; exported code prints both bit orders.
- Rewrite the Grover lesson: correct the relative-phase explanation and add a complete, runnable two-qubit Grover search with a guided experiment.
- Expand every lesson check to three questions (80 new questions, including predict-the-output items) and stop revealing the explanation before a correct answer.
- Add worked examples to Shor (factoring 15), the QFT circuit (two-qubit QFT), QAOA (single-edge MaxCut), and quantum annealing (two-spin Ising problem); correct the QAOA p=1 performance claim.
- Replace dense-matrix simulation with direct state-vector updates (10 qubits: about 1.8 s to 3 ms per recalculation).
- Derive the current lesson from completed lessons so jumping ahead by URL no longer locks earlier lessons; show missing prerequisites on lesson pages.
- Report true single-qubit purity Tr(ρ²) in the Bloch panel and keep |r| as the vector length.
- Add quantum engine tests; move CI to the repository root so it runs, and run tests, lesson validation, lint, and build in CI.
- Set the production site URL so the sitemap, canonical links, and share images are generated; add share images to lesson pages; drop the catch-all Firebase rewrite so unknown URLs return the 404 page.
- Remove unused MDX files and dependencies, the stale build log, and an unused quiz-answer map; align lesson component names with file numbers; add accessibility labels to the quiz and visualizations; correct stale "no shot sampling" statements.
- Align the 40 lesson content filenames with the student-facing curriculum order while preserving stable lesson IDs, slugs, prerequisites, quizzes, and progress keys.
- Add a static project updates page backed by meaningful commit history.
- Add finite-shot browser measurement sampling with X, Y, and Z basis support for single-qubit circuits.
- Move progress reset and selected-lesson management into the lessons settings menu.
- Organize the catalog into Beginner, Intermediate, and Advanced sections.
- Replace the fixed calendar roadmap with a self-paced capability roadmap, persistent checklist, lesson links, and entry-level readiness guidance.
- Refocus the landing page on the core lesson and simulator workflow.
- Refresh public documentation and regenerate the 40-lesson content audit.
- Correct visible lesson section numbering after the curriculum reorder, including BB84, Grover, and the advanced lessons.
- Add regression validation for display-order headings and clarify measurement, Grover, phase-estimation, VQE, and QAOA content.

## 2.0.0 - 2026-08-02

- Added validated mental models and guided circuit presets (`06d0339`).
- Completed the 35-lesson quantum learning platform milestone (`c544922`).
- Added quiz-gated lesson progress and persistent learning state (`84d9431`, `53f8949`).

## 1.0.0 - 2026-08-01

- Published lessons 1-20 and the first structured roadmap (`493c104`).
- Added lessons 11-15 and the About section (`f749afd`).

## 0.3.0 - 2026-05-01

- Rebranded the product to Quantum Playground and added the Bloch favicon, global styling, and support footer (`5e800b8`).
- Added persistent Bloch resizing, richer playground gates, and the lesson content audit (`49f0e51`).
- Added the standalone playground and quantum engine improvements (`9fed50f`).
- Added per-qubit Bloch vectors using reduced density matrices (`5f337bd`).
- Added baseline framework documentation and excluded local QC planning assets from the repository (`d9791d3`).

## 0.2.0 - 2026-03-29

- Consolidated the QCML content pipeline and site refresh (`c5c4f5b`).
- Completed a website code review covering performance, cleanup, and typography (`23482e6`).
- Added Firebase Hosting configuration hygiene (`bfc8240`).

## 0.1.0 - 2026-03-29

- Initial QCML quantum learning platform with website, scripts, and lesson content (`a4d154e`).
