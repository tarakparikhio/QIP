'use client';

import { BlockMath, InlineMath } from '@/components/math';
import type { EquationBreakdownData } from '@/lib/equationBreakdowns';

export default function EquationBreakdown({ data }: { data: EquationBreakdownData }) {
  return (
    <section className="not-prose mb-12 rounded-2xl border border-border/50 bg-card/40 p-5 sm:p-6" aria-labelledby="equation-breakdown-heading">
      <div className="mb-5">
        <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">Equation breakdown</p>
        <h2 id="equation-breakdown-heading" className="text-xl font-bold text-foreground">{data.title}</h2>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 sm:px-5">
        <BlockMath math={data.equation} />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Read it piece by piece</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-foreground/75">
            {data.steps.map((step) => (
              <li key={step.symbol}>
                <strong className="text-foreground"><InlineMath math={step.symbol} /></strong>{' '}
                {step.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border/40 bg-background/40 p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Small worked example</h3>
          <p className="text-sm leading-relaxed text-foreground/75">{data.example}</p>
        </div>
      </div>

      <p className="mt-5 border-t border-border/30 pt-4 text-sm leading-relaxed text-muted">
        <strong className="text-foreground">What to remember:</strong> {data.takeaway}
      </p>
    </section>
  );
}
