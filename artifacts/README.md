# Artifacts

This folder contains active pipeline outputs, not general metadata.

## What This Folder Does
- `raw_lessons/`: extracted lesson text batches from the source PDFs
- `content/`: structured lesson JSON and readable review outputs
- `web_preview/`: simple preview output for manual review

In other words: `artifacts/` is the working content pipeline workspace.

## What Was Moved Out
Descriptive and provenance-oriented files were moved to `/_metadata/source-context/`:
- lesson-to-PDF index
- source inventory
- enrichment rules
- analogy reference material

Project audit, planning, AI handoff, and source-context metadata now live under `/_metadata/`.
