# Lesson Content Dynamic Plan

## Goal
Move lesson text content from hardcoded TSX into document-style data that can be stored in JSON now and in MongoDB later.

## What Exists Today
- Lesson prose is currently in `src/content/lessons/*.tsx`.
- Reusable widgets already exist: `NotationBox`, `TryIt`, `InlineMath`, `BlockMath`.
- Metadata is in `src/lib/lessons.ts`.

## Executed This Session
- Added block schema types in `src/lib/lesson-content-schema.ts`.
- Added automated audit script: `scripts/generate-lesson-content-audit.mjs`.
- Generated JSON inventory: `src/content/lessons/lesson-content-audit.json`.

## Identified Text/Block Types (from audit)
- Headings (`h2`, `h3`)
- Paragraphs (`p`)
- Ordered and unordered lists (`ol`, `ul`, `li`)
- Inline emphasis (`strong`, `em`)
- Math blocks (`BlockMath`) and inline math (`InlineMath`)
- Structured reusable lesson widgets (`NotationBox`, `TryIt`)
- Section wrappers (`section`, `div`)

## Proposed Mongo Document Shape
```json
{
  "lessonSlug": "entanglement",
  "version": 1,
  "title": "Entanglement",
  "blocks": [
    {
      "id": "intro-1",
      "type": "paragraph",
      "content": "Two qubits are entangled when ..."
    },
    {
      "id": "eq-1",
      "type": "math-block",
      "math": "|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}"
    }
  ]
}
```

## Migration Steps
1. Build a renderer that maps `LessonBlockRecord[]` to current reusable lesson components.
2. Migrate lessons 01-05 first (foundational lessons) to JSON block docs.
3. Keep TSX fallback until each lesson slug has a JSON document.
4. Add simple validation for document schema before render.
5. When Mongo is introduced, replace static JSON loader with DB fetch by slug + version.

## Why This Is Safe
- Existing TSX lessons continue to work unchanged.
- Block schema and audit output give a deterministic migration path.
- Math is preserved in LaTeX strings under `math` fields.
