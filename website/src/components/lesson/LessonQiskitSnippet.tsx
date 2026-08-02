'use client';

import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import type { LessonQiskitSnippet } from '@/lib/lessonQiskitSnippets';

export default function LessonQiskitSnippet({ snippet }: { snippet: LessonQiskitSnippet }) {
  return (
    <section className="not-prose mb-12 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6" aria-labelledby="qiskit-snippet-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-accent">Code lab</p>
          <h2 id="qiskit-snippet-heading" className="text-xl font-bold text-foreground">{snippet.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{snippet.note}</p>
        </div>
        <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono text-accent">Qiskit 2.x</span>
      </div>

      <div className="mt-5">
        <CodeBlock code={snippet.code} label="Python" />
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">Run locally first, then try the same idea on IBM Quantum.</p>
        <Link href="/run-on-ibm" className="font-semibold text-accent transition hover:text-foreground">
          Run on IBM Quantum <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
