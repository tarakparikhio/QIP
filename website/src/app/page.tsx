import Link from 'next/link';
import { LESSONS } from '@/lib/lessons';

export default function HomePage() {
  const firstLesson = LESSONS[0];
  const publishedLessons = LESSONS.filter((lesson) => !lesson.upcoming);
  const foundationLessons = publishedLessons.filter((lesson) => lesson.stage === 'foundation');

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--primary)/0.16),transparent_30%),radial-gradient(circle_at_85%_75%,hsl(var(--accent)/0.10),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_hsl(142_70%_50%/.7)]" />
            Guided quantum curriculum
          </div>
          <span className="hidden text-xs font-mono text-muted sm:block">{publishedLessons.length} lessons online</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <section>
            <p className="mb-5 max-w-xl text-sm font-mono uppercase tracking-[0.22em] text-primary">Quantum Computing Made Learnable</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-7xl">
              Build the intuition.
              <span className="block text-primary">Then trust the math.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              A structured path from the first qubit to real quantum algorithms, with interactive circuits and short checks that make each idea stick.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/lessons/${firstLesson.slug}`} className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 glow-primary">
                Begin with lesson 01
              </Link>
              <Link href="/lessons" className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm text-muted transition hover:border-primary/50 hover:text-foreground">
                Browse the curriculum
              </Link>
              <Link href="/gates" className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm text-muted transition hover:border-primary/50 hover:text-foreground">
                Gate reference
              </Link>
              <Link href="/run-on-ibm" className="inline-flex items-center justify-center rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm text-accent transition hover:border-accent/70 hover:text-foreground">
                Run code on IBM
              </Link>
            </div>
          </section>

          <aside className="border-l border-primary/30 pl-6 lg:mb-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">Your first checkpoint</p>
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
                Open checkpoint <span aria-hidden="true">→</span>
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
          <p className="max-w-xl text-sm leading-relaxed text-muted">Start small, make a prediction, run the circuit, and explain what changed. That is the whole loop.</p>
          <Link href="/roadmap" className="text-sm font-semibold text-primary hover:text-foreground">See the 30-day route <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}
