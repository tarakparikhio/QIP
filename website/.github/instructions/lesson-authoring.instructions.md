---
applyTo: "website/src/content/lessons/**"
---

# Lesson Authoring Instructions

These instructions apply automatically when editing or creating lesson content files in `website/src/content/lessons/`.

---

## File Naming Convention

```
NN-slug-with-hyphens.tsx
```

- `NN` is zero-padded lesson number (e.g. `06`, `07`)
- Slug must match the entry in `website/src/lib/lessons.ts`
- Example: `06-quantum-gates.tsx`

---

## Required Steps When Adding a New Lesson

### 1. Register in `website/src/lib/lessons.ts`

Add a new entry to the `LESSONS` array:

```ts
{
  id: 6,
  title: 'Quantum Gates',
  slug: 'quantum-gates',
  difficulty: 'beginner',          // 'beginner' | 'intermediate' | 'advanced'
  stage: 'foundation',             // string label shown in UI
  prerequisites: [1, 2, 3],       // lesson IDs that must be completed first
  objective: 'One sentence describing what the student will understand.',
  xp: 120,
  allowedGates: ['H', 'X', 'Z'],  // gates enabled in the playground
  challengeType: 'circuit',        // 'circuit' | 'read'
}
```

### 2. Register in `website/src/app/lessons/[slug]/page.tsx`

Add the import and two entries:

```ts
import Lesson06 from '@/content/lessons/06-quantum-gates';

// In generateStaticParams():
{ slug: 'quantum-gates' },

// In LESSON_CONTENT:
'quantum-gates': Lesson06,
```

### 3. Create the content file

Use the template below.

---

## Content File Template

```tsx
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson06Content() {
  return (
    <>
      {/* ── NOTATION BOX ─────────────────────────────────────────────────── */}
      {/* Always first. 2–4 items covering the notation used in this lesson. */}
      <NotationBox>
        <NotationBox.Item heading="Key Concept Name">
          <NotationBox.Text>
            Explanation with inline math: <InlineMath math="\alpha" />.
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="U|0\rangle = ..." label="what this means" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Second Concept">
          <NotationBox.Formula
            math="U^\dagger U = I"
            note="All quantum gates are unitary."
          />
        </NotationBox.Item>

        <NotationBox.Item heading="Key Terms">
          <NotationBox.List items={[
            { term: 'Term', description: <>Definition with <InlineMath math="math" /> if needed.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      {/* ── SECTION N.1 ──────────────────────────────────────────────────── */}
      <h2>6.1 — Section Title</h2>
      <p>
        Opening paragraph. State the concept precisely. Use <InlineMath math="..." /> for
        inline equations. Avoid analogies — prefer formal definitions.
      </p>
      <BlockMath math="..." />
      <p>Follow-up paragraph explaining the equation.</p>

      {/* ── SECTION N.2 ──────────────────────────────────────────────────── */}
      <h2>6.2 — Step-by-Step Derivation</h2>
      <p>Introduce what will be derived.</p>
      <ol>
        <li>Step 1: <InlineMath math="..." /></li>
        <li>Step 2: <InlineMath math="..." /></li>
        <li>Result: <InlineMath math="..." /></li>
      </ol>
      <p>Explain the result.</p>

      {/* ── TRY IT — always last ─────────────────────────────────────────── */}
      <TryIt heading="6.N — Try It: Short Description">
        <p>
          Specific instruction: apply <strong>Gate</strong> to see <InlineMath math="..." />.
        </p>
        <p>What to observe in the probability bars / Bloch sphere.</p>
      </TryIt>
    </>
  );
}
```

---

## Writing Rules

### Content Quality
- Write in **academic textbook style**. No casual analogies, no "imagine you're doing X".
- Every claim must be mathematically precise.
- Section structure: definition → derivation → interpretation → example.
- Final section is always the **Try It** block using `<TryIt>`.

### Math Standards
- All equations shown as numbered steps in `<ol>` lists.
- Use `<BlockMath>` for display equations, `<InlineMath>` for inline.
- Show matrix multiplication **element by element** when introducing a gate for the first time.
- Always derive intermediate steps — never skip to the result.

### Section Numbering
- Sections are numbered `N.1`, `N.2`, … where `N` is the lesson number.
- Use `<h2>N.M — Title</h2>` format exactly.
- Typical structure: 4–6 sections + 1 TryIt.

### Notation Box Rules
- Always 2–4 `<NotationBox.Item>` blocks.
- Cover: the primary mathematical object, key gate matrices or operations, key terms glossary.
- Keep items short — this is a reference card, not content.
- Use `<NotationBox.Code>` + `<NotationBox.Row>` for matrix/equation rows.
- Use `<NotationBox.Formula>` for standalone equations with an optional note.
- Use `<NotationBox.List>` for 3–6 term definitions.

### Playground Connection
- The `<TryIt>` section **must** reference specific gates from `allowedGates` in the lesson metadata.
- Describe expected output: probability values, Bloch sphere position, or pattern in state vector.
- Include a step-by-step prediction so the student knows what to look for before clicking.

---

## Available Components

| Import | Usage |
|--------|-------|
| `<InlineMath math="..." />` | Inline KaTeX equation |
| `<BlockMath math="..." />` | Display KaTeX equation |
| `<NotationBox>` | Outer wrapper for the reference card |
| `<NotationBox.Item heading="...">` | A sub-section inside the card |
| `<NotationBox.Text>` | A paragraph inside an Item |
| `<NotationBox.Code>` | Monospace row container |
| `<NotationBox.Row math="..." label="..." />` | A math = label row |
| `<NotationBox.Formula math="..." note="..." />` | Standalone display equation |
| `<NotationBox.List items={[...]} />` | Term-definition bullet list |
| `<TryIt heading="N.M — Try It: ...">` | Playground callout (always last) |

---

## Checklist Before Committing

- [ ] Lesson registered in `lessons.ts` with correct `allowedGates`
- [ ] Import + slug + content added to `page.tsx` and `generateStaticParams()`
- [ ] File opens without TypeScript errors (`npm run build`)
- [ ] `<NotationBox>` is the first element
- [ ] Every section `<h2>` follows `N.M — Title` format
- [ ] No casual analogies or non-technical language
- [ ] All math shown step-by-step in `<ol>`
- [ ] `<TryIt>` is the final element, references real gate names
- [ ] Prose reads naturally at university textbook level
