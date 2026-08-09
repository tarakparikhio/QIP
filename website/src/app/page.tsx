import Link from 'next/link';
import { LESSONS, ORDERED_LESSONS } from '@/lib/lessons';

export default function HomePage() {
  const firstLesson = ORDERED_LESSONS[0];
  const publishedLessons = LESSONS.filter((lesson) => !lesson.upcoming);
  const foundationLessons = publishedLessons.filter((lesson) => lesson.stage === 'foundation');

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--primary)/0.16),transparent_30%),radial-gradient(circle_at_85%_75%,hsl(var(--accent)/0.10),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_hsl(142_70%_50%/.7)]" />
            Learn by doing
          </div>
          <span className="hidden text-xs font-mono text-muted sm:block">{publishedLessons.length} lessons · ideal simulator</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <section>
            <p className="mb-5 max-w-xl text-sm font-mono uppercase tracking-[0.22em] text-primary">An interactive quantum computing course</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-7xl">
              Learn the idea.
              <span className="block text-primary">Run the circuit.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              Short lessons take you from qubits and measurement to algorithms and hardware. Make a prediction, run it in the simulator, and see where the math shows up.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/lessons/${firstLesson.slug}`} className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 glow-primary">
                Start learning
              </Link>
              <Link href="/playground" className="inline-flex items-center justify-center rounded-lg border border-accent/50 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent hover:text-foreground">
                Open the playground
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <Link href="/lessons" className="hover:text-primary">Browse all lessons <span aria-hidden="true">→</span></Link>
              <Link href="/roadmap" className="hover:text-primary">View the self-paced roadmap <span aria-hidden="true">→</span></Link>
            </div>
          </section>

          <aside className="border-l border-primary/30 pl-6 lg:mb-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">Start here</p>
            <div className="mt-4 border-y border-border/60 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-primary">01 / {String(publishedLessons.length).padStart(2, '0')}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{firstLesson.title}</h2>
                </div>
                <span className="rounded border border-border/70 px-2 py-1 text-xs text-muted">{firstLesson.difficulty}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{firstLesson.objective}</p>
              <Link href={`/lessons/${firstLesson.slug}`} className="mt-5 inline-block text-sm font-semibold text-primary hover:text-foreground">
                Open lesson 01 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-3">
          <div className="bg-background/80 p-5">
            <p className="text-3xl font-semibold text-foreground">{publishedLessons.length}</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-[0.16em] text-muted">Published lessons</p>
          </div>
          <div className="bg-background/80 p-5">
            <p className="text-3xl font-semibold text-foreground">{foundationLessons.length}</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-[0.16em] text-muted">Foundation checkpoints</p>
          </div>
          <div className="bg-background/80 p-5">
            <p className="text-3xl font-semibold text-foreground">Live</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-[0.16em] text-muted">Circuit simulator</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-border/60 pt-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-muted">The simulator is an ideal state-vector model. Use it to build intuition, then keep hardware noise and measurement limits in view.</p>
          <Link href="/gates" className="text-sm font-semibold text-primary hover:text-foreground">Check the gate reference <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}
