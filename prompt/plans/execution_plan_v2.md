# QCML Post-V1 Execution Plan

## Summary
This plan defines the post-v1 direction for the QCML Quantum Intuition Platform. The current website and lesson system are already functional enough to serve as the base. Post-v1 work should focus first on UX clarity, portfolio readiness, and stronger curriculum discovery before moving into heavier interactive or experimental features.

The recommended implementation order is:
- make the repo and product portfolio-ready
- improve homepage structure and learner entry points
- stabilize the curriculum atlas and navigation
- add learning modes and translator-style content
- add local-first progress and quick-look flows
- only then move into richer interactive widgets and advanced presentation

The existing lesson JSON remains the canonical content source unless later phases prove that additional fields are truly necessary.

## Phase 0: Portfolio-Ready Repo Setup
- Refresh root and website documentation so the repo explains the product story, current features, deployment path, and roadmap clearly.
- Add a compact roadmap doc covering `v1`, `v1.1`, and `v2`.
- Add portfolio-facing assets placeholders:
  screenshots, demo GIF slots, and a release checklist.
- Keep deployment simple and documented for:
  Vercel or Firebase Hosting using the current static export flow.

## Phase 1: Homepage Information Architecture Refresh
- Rework the homepage into four clear zones:
  hero, why-QCML, curriculum preview, and guided entry points.
- Keep the calm futuristic design direction, but reduce visual noise.
- Use a stable value-first hero:
  clear headline, short supporting copy, two main CTAs, one visual anchor.
- Add stronger top-level homepage actions:
  `Start Learning`, `Explore Atlas`, `How It Works`, `View Sample Lesson`.
- Add a software-engineer-focused explanation layer inspired by the translator idea in `version2.txt`.
- Add a featured lesson strip with:
  beginner, intermediate, and advanced picks.

Defaults:
- no heavy 3D runtime in this phase
- reuse current Next.js and CSS architecture
- no lesson schema change

## Phase 2: Curriculum Atlas Stabilization
- Make the atlas a dependable product surface before attempting graph-style visualization.
- Redesign the atlas controls into a compact search/filter panel with:
  search, stage filter, reset, result count, and empty state.
- Strengthen lesson cards with:
  stage, difficulty, short concept framing, prerequisites, and clear open action.
- Add better navigation paths between:
  homepage, atlas, and lesson detail pages.
- Add quick curriculum paths such as:
  `Start from zero`, `Math-first`, `Interview prep`, `Advanced algorithms`.
- Add lightweight prerequisite visibility on cards or detail pages without building the full skill tree yet.

Defaults:
- keep filtering client-side
- keep the lesson bundle generated from `artifacts/content/json`
- do not build the dependency graph yet
- do not use modal routing yet

## Phase 3: Learning Modes and Translator Layer
- Add a global client-side mode switch:
  `Intuition Mode` and `Rigor Mode`.
- In `Intuition Mode`, emphasize:
  analogy, story, and softer learning framing.
- In `Rigor Mode`, emphasize:
  mathematics, physics, and formal QM sections.
- Reorder and restyle content emphasis instead of hiding major content blocks.
- Add a homepage `Classical-to-Quantum Translator` section with curated examples.
- Store translator examples in website-local config files rather than modifying lesson JSON initially.

Defaults:
- keep lesson schema unchanged
- persist selected mode in localStorage
- if one dependency is needed, prefer `framer-motion`
- avoid heavier state libraries unless complexity grows materially

## Phase 4: Progress and Quick-Look Experience
- Add local-first progress tracking:
  viewed, started, completed.
- Show progress indicators in:
  atlas cards, featured paths, and lesson navigation.
- Add lightweight lesson quick-look previews from the atlas without leaving the atlas immediately.
- Use simple modal or panel state first.
- Only consider Next.js intercepting routes later if the simpler approach proves insufficient.

Defaults:
- no auth
- no backend
- localStorage only

## Phase 5: Interactive Widgets
- Add one lightweight homepage micro-widget first:
  `H gate coin flip` or `H -> H identity`.
- Add one lesson-level interactive visualization enhancement using existing lesson concepts.
- Prefer lightweight 2D implementation:
  SVG, CSS, or canvas.
- Use this phase to prove the platform can create fast “aha” moments without heavy dependencies.

Defaults:
- do not start with React Three Fiber
- keep interactions mobile-safe and static-export friendly

## Phase 6: Advanced Presentation Layer
- Consider the interactive skill-tree atlas.
- Consider quick-look modal routing polish.
- Consider a 3D Bloch sphere or richer “Quantum Debugger” hero.
- Consider view-transition polish and chunked/streamed UX improvements.
- Treat this as enhancement work after earlier phases are stable and portfolio-ready.

Defaults:
- React Three Fiber is only allowed here unless earlier constraints change
- only add heavy visual dependencies if justified by clear UX value

## Interfaces and Data Additions
Keep the current lesson JSON as the canonical content source through the early post-v1 phases.

If new support files are needed, use:
- `website/config/translator.ts`
  curated classical-to-quantum concept mappings
- `website/config/featured-paths.ts`
  homepage picks and quick curriculum paths
- local progress storage:
  `localStorage["qcml-progress"] = { [lessonId]: "viewed" | "started" | "completed" }`
- local display mode storage:
  `localStorage["qcml-mode"] = "intuition" | "rigor"`

Do not modify lesson extraction or enrichment pipelines unless website needs cannot be satisfied from current lesson fields.

## Test Plan
- Homepage renders correctly in light and dark mode.
- Homepage communicates product value quickly and clearly.
- Atlas search/filter updates the visible lesson list correctly.
- Navigation paths exist and work:
  homepage -> atlas -> lesson pages.
- Mobile layout remains usable across homepage, atlas, and lesson detail pages.
- `Intuition Mode` and `Rigor Mode` persist after refresh.
- Progress state persists after refresh.
- Added interactions degrade gracefully if JavaScript is delayed or unavailable.
- Static export build remains successful after each phase.

## Acceptance Scenarios
- A new visitor understands the product within 10 seconds of landing.
- A learner can find a relevant lesson in under 3 interactions.
- A portfolio reviewer can understand the product direction from the repo and homepage alone.
- A learner can see a coherent path from beginner to advanced without reading every lesson first.

## Assumptions
- Post-v1 priority is UX and portfolio readiness first.
- Heavy 3D/experimental interactivity should be deferred.
- One moderate frontend dependency is acceptable if it clearly improves UX.
- The current static-export deployment model should remain the default.
- This repo is being prepared primarily as a personal portfolio project rather than a public collaborative open-source project.
