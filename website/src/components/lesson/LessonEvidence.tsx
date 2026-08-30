import Link from 'next/link';
import type { LessonExperiment } from '@/lib/lessonExperiments';
import { getLessonSources } from '@/lib/lessonSources';

type LessonEvidenceProps = {
  lessonId: number;
  experiment?: LessonExperiment;
};

export default function LessonEvidence({ lessonId, experiment }: LessonEvidenceProps) {
  const sources = getLessonSources(lessonId);

  return (
    <section className="mb-12 border-y border-border/60 py-7" aria-labelledby="lesson-evidence-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Evidence and limits</p>
          <h2 id="lesson-evidence-heading" className="mt-2 text-2xl font-semibold">Where this lesson comes from</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            These are suggested primary or official references for checking the ideas here. They are further reading, not endorsements or a claim that a small teaching circuit proves a research result.
          </p>
        </div>
        <Link href="/sources" className="text-sm font-semibold text-primary hover:text-foreground">Method and source policy <span aria-hidden="true">-&gt;</span></Link>
      </div>

      {experiment?.boundary && (
        <div className="mt-6 border-l-2 border-amber-400/70 bg-amber-400/5 px-4 py-3 text-sm leading-relaxed text-foreground/80">
          <span className="font-semibold text-amber-300">Model boundary:</span> {experiment.boundary}
        </div>
      )}

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {sources.map((source) => (
          <li key={source.url} className="border border-border/50 bg-card/30 p-4">
            <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">{source.title}</a>
            <p className="mt-1 text-xs font-mono text-muted">{source.publisher}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75">{source.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}