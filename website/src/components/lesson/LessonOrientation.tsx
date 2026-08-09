'use client';
import type { LessonOrientation as LessonOrientationData } from '@/lib/lessonOrientations';

type LessonOrientationProps = {
  lessonId: number;
  data: LessonOrientationData;
};

export default function LessonOrientation({ lessonId, data }: LessonOrientationProps) {
  return (
    <section className="mb-10 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6" aria-labelledby="lesson-start-here">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-mono uppercase tracking-[0.2em] text-primary">Lesson {lessonId} · Start here</p>
          <h2 id="lesson-start-here" className="text-xl font-bold text-foreground">First, the idea</h2>
        </div>
        <span className="rounded-full border border-primary/25 bg-background/30 px-2.5 py-1 text-xs font-mono text-primary/80">Start without physics</span>
      </div>

      <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/90">{data.definition}</p>

      <div className="mt-5 grid gap-4 border-t border-primary/15 pt-5 md:grid-cols-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">If you write software</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{data.softwareLens}</p>
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">If you work with hardware</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{data.hardwareLens}</p>
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">The math bridge</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{data.mathBridge}</p>
        </div>
      </div>
    </section>
  );
}
