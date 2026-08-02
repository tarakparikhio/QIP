import type { LessonAnalogy } from '@/lib/lessonAnalogies';
import { InlineMath } from '@/components/math';

export default function AnalogyPanel({ data }: { data: LessonAnalogy }) {
  return (
    <section className="mb-12 rounded-2xl border border-accent/25 bg-accent/5 p-6 not-prose">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent">Mental model</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">{data.title}</h2>
        </div>
        <span className="rounded-full border border-accent/30 px-2.5 py-1 text-xs font-mono text-accent">Analogy + boundary</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-muted">The analogy</p>
          <p className="mt-2 leading-relaxed text-foreground/80">{data.analogy}</p>
          <p className="mt-4 text-xs font-mono uppercase tracking-widest text-muted">What it captures</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">{data.captures}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-background/40 p-4">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-300">Where it breaks</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">{data.limitations}</p>
          <p className="mt-4 text-xs font-mono uppercase tracking-widest text-primary">Formal connection</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">{data.formalConnection}</p>
          {data.formalMath && (
            <div className="mt-3 overflow-x-auto rounded-lg border border-border/40 bg-background/50 px-3 py-2 text-center">
              <InlineMath math={data.formalMath} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
