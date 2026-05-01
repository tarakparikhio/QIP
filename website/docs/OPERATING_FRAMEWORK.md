# QCML Website Operating Framework

## Purpose
Build a long-term, concrete operating system for QCML that supports:
- high quality quantum education,
- reliable platform delivery,
- measurable product improvement,
- sustainable monetization via Patreon.

## North Star
- Product mission: Make quantum learning interactive, rigorous, and progressively deep.
- Business mission: Keep fundamentals free and monetize advanced value responsibly.
- Decision rule: Every change must improve at least one of: learning outcomes, reliability, or revenue readiness.

## Pillars
1. Learning Layer
- Structured pathways from foundation to advanced.
- Every lesson includes objective, intuition, formalism, interaction, and checkpoint.

2. Simulation Layer
- Correct quantum math and deterministic state updates.
- Visuals that explain state, phase, probability, and multi-qubit behavior.

3. Content Operations Layer
- Repeatable authoring, review, release, and update flow.
- Prerequisite graph consistency and metadata validation.

4. Platform Operations Layer
- Performance budgets, observability, release process, and incident handling.

5. Monetization Layer
- Free core curriculum.
- Paid depth: advanced labs, office hours, supporter features, and premium study assets.

## Build Rules
1. Curriculum Rules
- Each lesson must define: objective, prerequisites, math, physics mapping, interactive task, and interview-ready summary.

2. Feature Rules
- No feature ships without:
  - success metric,
  - rollback plan,
  - owner and due date.

3. UX Rules
- Mobile and desktop parity for core flows.
- Accessibility baseline for navigation, contrast, and keyboard access.

4. Engineering Rules
- No breaking API changes without migration notes.
- Any quantum-engine behavior change requires test updates.

5. Quality Rules
- Changes touching state evolution, rendering, or lesson flow require full validation.

6. Monetization Rules
- Do not paywall fundamentals.
- Monetize depth, guidance, and convenience.

## Delivery Stages
### Stage A: Foundation Stabilization (0 to 6 weeks)
- Resolve lint debt and establish quality baseline.
- Standardize lesson metadata and validation.
- Add analytics for lesson engagement and simulator usage.
- Establish weekly release cadence.

### Stage B: Multi-Qubit Visualization Framework (6 to 14 weeks)
- Implement per-qubit reduced-state Bloch representation.
- Add horizontal-scrolling Bloch cards for up to 10 qubits.
- Add advanced overlay mode for compact comparison.
- Define performance guardrails and rendering fallback behavior.

### Stage C: Advanced Learning System (14 to 26 weeks)
- Add challenge engine and skill diagnostics.
- Add progression checkpoints and retention loops.
- Add deeper algorithm tracks.

### Stage D: Monetization Activation (26 to 40 weeks)
- Launch Patreon tiers with clear value ladder.
- Add premium release pipeline and supporter benefits.
- Publish roadmap and transparency updates.

### Stage E: Scale (40+ weeks)
- Add guest educator workflow and partner-friendly content bundles.
- Add external collaboration programs.

## Support Model
### Free Users
- Full access to foundational and core lessons.
- Public updates and bug fixes.

### Patreon Supporters
- Early access to advanced lessons.
- Premium practice packs and cohort sessions.
- Roadmap influence and deeper support.

## Limits and Boundaries
- Current multi-qubit engine constraints must be documented before promising large-scale simulation.
- Single-sphere Bloch visuals are single-qubit only unless reduced-state projection is used.
- Avoid overpromising research-scale simulation before architecture upgrades.

## Testing Framework
1. Unit Tests
- Complex math, gate application, normalization, and probability conservation.

2. Property Tests
- Sum of probabilities near 1.
- Reversibility/invariance checks where applicable.

3. Integration Tests
- Circuit builder interactions.
- Store recalculation and lesson page rendering.

4. Visual Regression Tests
- Bloch visual components and chart rendering across breakpoints.

5. End-to-End Tests
- Lesson traversal, interactions, progress persistence.

6. Content QA Tests
- Metadata schema checks.
- Prerequisite graph validation.
- Equation rendering sanity checks.

## Metrics
### Learning Metrics
- Lesson completion rate.
- Challenge completion rate.
- Retention at day 7 and day 30.

### Product Metrics
- Render frame stability and page interaction latency.
- Build success and deployment frequency.

### Business Metrics
- Patreon conversion and churn.
- Revenue per supporter.
- Supporter retention.

## Governance Cadence
- Weekly: triage, metrics review, release.
- Biweekly: feature and curriculum review.
- Monthly: roadmap checkpoint.
- Quarterly: strategic reset and scope cleanup.
