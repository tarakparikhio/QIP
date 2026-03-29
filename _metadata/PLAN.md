# Plan

This is the single plan and status file for the repo.

## Objective
Deliver a production-ready, mathematically correct, pedagogically aligned quantum visualization system for all 35 lessons.

## Completed Work

### Phase 1
- Created semantic quantum CSS tokens.
- Deferred full token rollout because it was lower impact than correctness work.

### Phase 2
- Fixed Pauli-Y matrix correctness.
- Fixed Born-rule measurement behavior.
- Fixed Bloch sphere convention text.

### Phase 3
- Split reused widgets that were teaching different concepts.
- Updated widget routing so all 35 lessons map cleanly.

### Phase 4
- Reworked the five highest-risk algorithm lessons:
  - QFT
  - Phase Estimation
  - VQE
  - QAOA
  - Phase Kickback

### Phase 5
- Validated with TypeScript and lesson validation.
- Current status is production-ready.

## Remaining Optional Work
These are optional and not blocking:
- integrate semantic CSS tokens more broadly
- do visual browser spot checks
- remove or archive more pipeline artifacts if rebuild history is not needed

## Definition Of Done
- Correct math in teaching widgets
- No pedagogical widget reuse conflicts
- 35/35 lesson validation pass
- TypeScript passes

## Current Status
Complete for the audit-driven scope.
