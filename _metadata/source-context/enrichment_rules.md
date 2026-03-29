# QCML Depth-Enrichment Rules

These rules turn extracted PDF lesson text into production-ready QCML lessons.

## Required Upgrades Per Lesson
- Preserve the original source analogy whenever it is still conceptually usable.
- Strengthen the original analogy with added explanation, context, and limits before considering replacement.
- Replace an analogy only when it is misleading, repetitive across too many lessons, or too weak to support the target depth.
- Add explicit `why_it_works` and `limitations` for every analogy.
- Add compact but correct LaTeX with named variables and at least one normalization or operator relation where relevant.
- Add a real physics interpretation so the lesson is not only abstract mathematics.
- Add formal quantum mechanics language:
  Hilbert space,
  state vectors or density operators where relevant,
  operators involved,
  state evolution where relevant.
- Add minimal but valid Qiskit code with imports and measurement.
- Add a concrete UI visualization choice that can be rendered on the website.
- Add interview-ready explanation and at least three meaningful common questions.

## Quality Guardrails
- Avoid coin-flip and dice analogies.
- Do not erase the author's original learning metaphors just to make them sound more technical.
- If an original analogy must be replaced, keep traceability to the source wording in a side note or source artifact.
- Human or classroom analogies can stay if they are clearly explained and bounded.
- Keep math compact, but never hand-wavy.
- Keep Qiskit examples short enough for a beginner to read in one screen.
- Preserve the original lesson topic while strengthening precision, depth, and website usefulness.

## Batch 1-5 Notes
- Lessons `1-5` are all foundation lessons and should stay beginner-friendly.
- The depth should come from clean explanations, not from excessive formalism.
- Reuse vocabulary carefully so adjacent lessons feel connected without sounding repetitive.
