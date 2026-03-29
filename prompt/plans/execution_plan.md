# QCML Execution Plan

## Summary
This project transforms the existing lesson PDFs into deep, production-ready JSON lessons for the Quantum Intuition Platform. The PDFs are source material, not final output. The workflow must extract, audit, enrich, normalize, validate, and package the lessons in reviewable batches.

A core requirement is fixing vagueness. Every lesson must be strengthened so it includes meaningful intuition, compact but correct math, real physics grounding, formal quantum mechanics structure, minimal valid Qiskit, and frontend-ready visualization metadata.

## Phase 1: Source Inventory And Extraction
- Build a complete map from the PDFs in `pdf/` to lesson IDs `1-35`.
- Confirm which PDF pages correspond to which lessons.
- Extract raw lesson text into intermediate text artifacts.
- Preserve traceability from final lesson output back to source PDF content.
- Use the analogy master PDF as a supporting reference for enrichment.

## Phase 2: Lesson Audit For Vagueness And Gaps
- Review every extracted lesson against the target JSON schema in `file.txt`.
- Identify weak or missing areas:
  vague intuition,
  weak analogy,
  shallow math,
  missing physics mapping,
  incomplete quantum formalism,
  weak circuit explanation,
  underspecified visualization,
  shallow interview content.
- Produce a gap report for each lesson.
- Rate each lesson by severity so the weakest lessons get the most rewriting attention.

## Phase 3: Depth-Enrichment Rules
- Upgrade each lesson until it meets the required quality bar.
- Every lesson must include:
  a strong analogy from a real, engineering, control, or decision system,
  explicit explanation of why the analogy works,
  explicit statement of where the analogy fails,
  compact LaTeX equations with meanings and variables,
  real-world physics interpretation,
  formal quantum definition with Hilbert space and operators,
  state evolution where relevant,
  minimal valid Qiskit with imports and measurement,
  concrete visualization guidance,
  interview-ready explanation and meaningful questions.
- Enrichment should preserve the source topic while increasing depth and clarity.

## Phase 4: Curriculum Consistency Pass
- Verify lesson order, prerequisites, difficulty, and stage progression.
- Ensure foundation, intermediate, and advanced lessons scale correctly in depth.
- Remove repeated analogies and repeated explanations across lessons.
- Ensure advanced lessons only depend on concepts introduced earlier.

## Phase 5: Structured JSON Conversion
- Convert each enriched lesson into the canonical JSON schema from `file.txt`.
- Normalize:
  lesson IDs,
  titles,
  slugs,
  difficulty values,
  stage values,
  prerequisite references,
  visualization types,
  gate lists.
- Keep the result directly usable by React/Next.js and FastAPI.

## Phase 6: Batch QA And Review
- Work in batches of five lessons, matching the existing PDF grouping.
- For each batch:
  validate JSON structure,
  review technical correctness,
  review depth and clarity,
  review consistency with prior lessons,
  verify Qiskit/code/math/frontend readiness.
- Pause for review before moving to the next batch.

## Phase 7: Final Packaging
- Organize final lessons into stable output files for frontend and backend use.
- Prepare an index for deterministic loading.
- Ensure KaTeX-safe math and code-block-safe Qiskit strings.
- Keep source traceability available for future revisions.

## Initial Working Order
1. Create this Markdown file in the repo.
2. Start with lessons `1-5`.
3. Extract the first batch.
4. Audit the first batch for gaps.
5. Enrich the first batch for depth.
6. Convert the first batch to JSON.
7. Review before continuing to lessons `6-10`.

## Success Criteria
- All 35 lessons are present exactly once.
- Every lesson matches the required schema.
- Every lesson has real depth, not vague summary content.
- Physics, math, formal quantum mechanics, and circuits are all present and coherent.
- Output is ready for website integration without manual cleanup.
