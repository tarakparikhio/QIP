'use client';
import type { LessonExperiment } from '@/lib/lessonExperiments';

type ExperimentGuideProps = {
  lessonId: number;
  experiment: LessonExperiment;
};

export default function ExperimentGuide({ lessonId, experiment }: ExperimentGuideProps) {
  const isRunnable = experiment.mode === 'circuit';

  return (
    <section className="mb-6 rounded-xl border border-border/50 bg-card/40 p-5" aria-labelledby="experiment-guide-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-mono uppercase tracking-widest text-primary">Lesson {lessonId} experiment guide</p>
          <h3 id="experiment-guide-heading" className="text-xl font-bold text-foreground">{experiment.title}</h3>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-mono uppercase tracking-wide ${
          isRunnable
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
        }`}>
          {isRunnable ? 'Runnable circuit' : 'Conceptual experiment'}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground/80">{experiment.purpose}</p>

      <ol className="mt-5 grid gap-3 md:grid-cols-2">
        {experiment.steps.map((step, index) => (
          <li key={step.label} className="border-l-2 border-primary/40 pl-3">
            <p className="text-sm font-semibold text-foreground">
              <span className="mr-2 font-mono text-primary">{String(index + 1).padStart(2, '0')}</span>
              {step.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-4 border-t border-border/40 pt-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">What to observe</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{experiment.observe}</p>
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">Scope of this simulator</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{experiment.boundary}</p>
        </div>
      </div>
    </section>
  );
}
