# Stage 1 Execution Plan

## Scope
This plan starts execution immediately for Stage A (Foundation Stabilization).

## Timebox
- Start: 2026-05-01
- Duration: 4 to 6 weeks

## Owners
- Product: Curriculum and roadmap decisions
- Engineering: Simulator, UI, quality gates
- Content: Lesson consistency and metadata quality

## Backlog
### A1. Quality Baseline
- [ ] Create and run quick CI validation on pull requests.
- [ ] Add full validation script for local/branch checks.
- [ ] Document known lint failures and assign cleanup ownership.

Definition of done:
- Quick validation runs on PRs.
- Full validation command exists and is documented.

### A2. Lesson Metadata Normalization
- [ ] Define schema for lesson metadata fields.
- [ ] Add validation script to catch missing or invalid fields.
- [ ] Ensure prerequisites graph has no missing references.

Definition of done:
- Metadata validation runs in local checks.
- Invalid lesson metadata fails check with clear messages.

### A3. Instrumentation
- [ ] Add analytics event map for lesson open, simulator interaction, and lesson complete.
- [ ] Implement client-side event hooks in lesson and simulator views.
- [ ] Add dashboard baseline report format.

Definition of done:
- Events emit consistently in dev and production.
- First weekly report template is available.

### A4. Multi-Qubit Visualization Prep
- [ ] Add architecture doc for reduced-state per-qubit Bloch vectors.
- [ ] Define API contract between quantum engine and visualization components.
- [ ] Add test cases for reduced state calculations.

Definition of done:
- Spec approved.
- API contract and tests committed.

### A5. Release Operations
- [ ] Establish weekly release checklist.
- [ ] Define rollback protocol for failed releases.
- [ ] Document issue severity levels and response expectations.

Definition of done:
- Checklist and protocol committed.
- Team can execute release with one document.

## Risks
1. Existing lint debt can block strict quality gate adoption.
Mitigation: start with quick CI (build + typecheck), then enable full gate after lint cleanup.

2. Quantum-engine architecture limits higher-qubit roadmap claims.
Mitigation: define explicit limits publicly and phase upgrades.

3. Scope drift between content and engineering goals.
Mitigation: weekly checkpoint and owner-level signoff on in-flight items.

## Success Criteria
- Quick CI validation active and green.
- Full validation command available and documented.
- Stage A backlog has owner and status for each item.
- At least one Stage B prep item completed (reduced-state spec).
