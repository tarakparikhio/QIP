import Link from 'next/link';
import { LESSONS, ORDERED_LESSONS, getLessonQuestions } from '@/lib/lessons';
import { LESSON_PRACTICE } from '@/lib/lessonPractice';
import InteractiveHero from './home/InteractiveHero';
import WaveBackground from './home/WaveBackground';
import WelcomeBack from './home/WelcomeBack';
import BlochStory from './home/BlochStory';
import LabShowcase from './home/LabShowcase';
import LessonMap from './home/LessonMap';
import DailyQuestion from './home/DailyQuestion';

export default function HomePage() {
  const firstLesson = ORDERED_LESSONS[0];
  const publishedLessons = LESSONS.filter((lesson) => !lesson.upcoming);
  const quizQuestions = publishedLessons.reduce((sum, lesson) => sum + getLessonQuestions(lesson.id).length, 0);
  const practiceProblems = Object.values(LESSON_PRACTICE).reduce((sum, problems) => sum + problems.length, 0);

  const stats = [
    { value: String(publishedLessons.length), label: 'Lessons' },
    { value: String(practiceProblems), label: 'Practice problems' },
    { value: String(quizQuestions), label: 'Check questions' },
    { value: '4', label: 'Interactive labs' },
  ];

  return (
    <div className="relative overflow-x-clip px-4 pb-20 sm:px-6 lg:px-10">
      {/* Hero */}
      <div className="relative -mx-4 overflow-hidden px-4 pb-6 pt-10 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <WaveBackground />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--primary)/0.14),transparent_35%),radial-gradient(circle_at_85%_75%,hsl(var(--accent)/0.08),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_hsl(142_70%_50%/.7)]" />
              Learn by doing
            </div>
            <span className="hidden text-xs font-mono text-muted sm:block">Free · no account · progress saved in your browser</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <section>
              <p className="mb-5 max-w-xl text-sm font-mono uppercase tracking-[0.22em] text-primary">An interactive quantum computing course</p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[3.6rem] xl:text-7xl">
                Learn the idea.
                <span className="block text-primary">Run the circuit.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                Forty short lessons take you from a single qubit to Shor&apos;s algorithm, error correction, and real hardware. Predict, build the circuit, check the math, and see where probability and statistics show up.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/lessons/${firstLesson.slug}`} className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 glow-primary">
                  Start lesson 1
                </Link>
                <Link href="/lessons" className="inline-flex items-center justify-center rounded-lg border border-accent/50 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent hover:text-foreground">
                  Browse all 40 lessons
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <Link href="/playground" className="hover:text-primary">Open the playground <span aria-hidden="true">→</span></Link>
                <Link href="/roadmap" className="hover:text-primary">See the roadmap <span aria-hidden="true">→</span></Link>
                <Link href="/history" className="hover:text-primary">New here? Read how we got from bits to qubits <span aria-hidden="true">→</span></Link>
              </div>
            </section>
            <InteractiveHero />
          </div>
        </div>
      </div>

      <WelcomeBack />

      {/* Stats */}
      <div className="mx-auto mt-12 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background/90 p-5">
            <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-[0.14em] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <BlochStory />
      <LabShowcase />
      <LessonMap />
      <DailyQuestion />

      {/* Closing */}
      <section className="mx-auto mt-24 max-w-6xl rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/40 to-accent/10 p-8 text-center sm:p-12" aria-labelledby="closing-heading">
        <h2 id="closing-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready for your first qubit?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">Lesson 1 takes about 10 to 15 minutes. Everything runs in your browser, with no sign-up.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={`/lessons/${firstLesson.slug}`} className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 glow-primary">Start lesson 1</Link>
          <Link href="/gates" className="inline-flex items-center justify-center rounded-lg border border-border/60 px-6 py-3 text-sm font-semibold text-foreground/85 transition hover:border-primary/50">Browse the gate reference</Link>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-xs text-muted">
          The simulator is an ideal state-vector model. Lessons say where real hardware differs, and the <Link href="/sources" className="text-primary hover:underline">sources page</Link> explains what is modeled and what is left out.
        </p>
      </section>
    </div>
  );
}
