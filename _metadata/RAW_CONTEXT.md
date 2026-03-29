# Raw Context

This file is the single condensed raw brief for how QCML was conceived and how the build direction evolved.

## Original content brief
Build a structured 35-lesson quantum learning system that combines:
- intuition and analogy
- mathematics and derivation
- physics grounding
- formal quantum mechanics
- circuit implementation
- interactive web visualization

The output should be directly usable by a React website.

## Original content schema intent
Each lesson was intended to carry:
- learning objective
- intuition section with analogy, story, why it works, and limits
- math section with equations, meaning, variables, and derivation
- physics mapping
- quantum mechanics formalism
- circuit implementation
- visualization type
- applications
- interview-ready explanation

## Product direction brief
The website should reduce cognitive load for software engineers moving into quantum computing.
The major product ideas were:
- an intuition mode versus rigor mode
- a curriculum atlas
- lightweight interactive widgets
- visual translation from classical software concepts into quantum concepts
- static-export friendly implementation in Next.js

## Website outcome that this context produced
Those briefs ultimately turned into a website with:
- a Next.js App Router implementation
- structured lesson browsing and per-lesson routes
- a library of lesson widgets instead of one generic visualization layer
- a separation between curriculum data, website rendering, and AI handoff metadata
- source provenance preserved directly in the website via `website/public/source-pdfs/`
- recruiter-facing showcase media in `website/public/portfolio-assets/`

## Implementation prompt direction
The build direction emphasized:
- analyze before coding
- keep widgets lightweight and 2D first
- use lesson data as the canonical curriculum source
- keep the site fast and mobile-safe
- preserve the split between intuition and rigor in presentation

## Audit-driven pivot
Later work shifted from feature-building to correctness and pedagogy cleanup.
The highest-priority changes became:
- fix mathematical errors
- split reused widgets when the lessons diverged conceptually
- replace misleading algorithm demos with conceptually accurate ones
- validate all 35 lessons after the changes

## Source context
The project is grounded in original lesson PDFs and a detailed analogy reference. Those files were initially stored at the repo root and are now part of the website under `website/public/source-pdfs/` so the source archive travels with the product.

## Present meaning of this file
This file replaces the old `prompt/raw/phase1.txt`, `phase2.txt`, and `phase3.txt` files as the single raw context reference.
