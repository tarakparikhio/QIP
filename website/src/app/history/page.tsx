import type { Metadata } from 'next';
import Link from 'next/link';
import { getDisplayLessonNumber, getLessonBySlug, ORDERED_LESSONS } from '@/lib/lessons';
import { COMPARISON, ERAS, milestoneId, type Era, type Milestone } from './data';
import { firstPersonFor } from './people';
import YearTracker from './YearTracker';

export const metadata: Metadata = {
  title: 'From Bits to Qubits: A Short History',
  description: 'A plain-language timeline from binary arithmetic and the first computers to qubits, quantum algorithms, and today’s quantum hardware.',
};

type Tone = Era['tone'];

const TONES: Record<Tone, { name: string; text: string; chip: string; node: string; wire: string; dot: string; year: string }> = {
  classical: {
    name: 'Classical computing',
    text: 'text-sky-300',
    chip: 'border-sky-400/40 bg-sky-400/10 text-sky-300',
    node: 'border-sky-400/70 bg-[#0b1626] text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.35)]',
    wire: 'from-sky-400/70 to-sky-400/20',
    dot: 'bg-sky-400',
    year: 'text-sky-400/15',
  },
  physics: {
    name: 'Quantum physics',
    text: 'text-amber-300',
    chip: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
    node: 'border-amber-400/70 bg-[#1d160a] text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.3)]',
    wire: 'from-amber-400/70 to-amber-400/20',
    dot: 'bg-amber-400',
    year: 'text-amber-400/15',
  },
  bridge: {
    name: 'Where the two meet',
    text: 'text-emerald-300',
    chip: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
    node: 'border-emerald-400/70 bg-[#0a1c16] text-emerald-200 shadow-[0_0_18px_rgba(52,211,153,0.3)]',
    wire: 'from-emerald-400/70 to-emerald-400/20',
    dot: 'bg-emerald-400',
    year: 'text-emerald-400/15',
  },
  quantum: {
    name: 'Quantum computing',
    text: 'text-primary',
    chip: 'border-primary/40 bg-primary/10 text-primary',
    node: 'border-primary/70 bg-[#12122a] text-indigo-200 shadow-[0_0_18px_hsl(var(--primary)/0.4)]',
    wire: 'from-primary/70 to-primary/20',
    dot: 'bg-primary',
    year: 'text-primary/15',
  },
};

type Row = { milestone: Milestone; tone: Tone; side: 'left' | 'right' };

type Section = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  tone: Tone;
  columns?: [Tone, Tone];
  rows: Row[];
};

function firstYear(milestone: Milestone) {
  return Number(milestone.year.slice(0, 4));
}

/**
 * Chapters 1 and 2 happened at the same time, so they share one section:
 * computing on the left wire, physics on the right, sorted by year. Later
 * chapters alternate sides along a single wire.
 */
function buildSections(): Section[] {
  const [logic, physics, ...rest] = ERAS;
  const parallel: Row[] = [
    ...logic.milestones.map((milestone) => ({ milestone, tone: logic.tone, side: 'left' as const })),
    ...physics.milestones.map((milestone) => ({ milestone, tone: physics.tone, side: 'right' as const })),
  ].sort((a, b) => firstYear(a.milestone) - firstYear(b.milestone));

  return [
    {
      id: logic.id,
      eyebrow: 'Chapters 1 and 2 · 1703 to 1937',
      title: 'Two stories, running side by side',
      intro: 'While mathematicians learned to reason with 0s and 1s, physicists discovered that tiny things like electrons and light do not behave like little marbles. Neither group knew the other’s work would one day merge.',
      tone: logic.tone,
      columns: [logic.tone, physics.tone],
      rows: parallel,
    },
    ...rest.map((era) => ({
      id: era.id,
      eyebrow: `${era.label} · ${era.span}`,
      title: era.title,
      intro: era.intro,
      tone: era.tone,
      rows: era.milestones.map((milestone, index) => ({ milestone, tone: era.tone, side: index % 2 === 0 ? ('left' as const) : ('right' as const) })),
    })),
  ];
}

const SECTIONS = buildSections();
const ALL_ROWS = SECTIONS.flatMap((section) => section.rows);

/* ---------- Hero: two wires (bits and quanta) merging into one qubit wire ---------- */

function wavePath(fromX: number, toX: number, y: number, amplitude: number, wavelength: number) {
  const points: string[] = [];
  for (let x = fromX; x <= toX; x += 4) {
    points.push(`${x},${(y + amplitude * Math.sin(((x - fromX) / wavelength) * Math.PI * 2)).toFixed(1)}`);
  }
  return `M${points.join(' L')}`;
}

function HeroWires() {
  return (
    <svg viewBox="0 0 800 220" className="h-auto w-full" role="img" aria-labelledby="hero-wires-title">
      <title id="hero-wires-title">Two wires, one carrying classical bits and one carrying quantum waves, merge into a single qubit wire.</title>
      <defs>
        <linearGradient id="merge" x1="0" x2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
      </defs>

      {/* Bits wire */}
      <text x="8" y="46" className="fill-sky-300 font-mono text-[13px]">BITS</text>
      <path d="M60 60 H400 C450 60 460 110 500 110" fill="none" stroke="#38bdf8" strokeWidth="2.5" className="history-flow" />
      {[{ x: 120, label: '1' }, { x: 160, label: '0' }, { x: 200, label: '1' }].map((bit) => (
        <g key={bit.x}>
          <circle cx={bit.x} cy={60} r={11} fill="#0b1626" stroke="#38bdf8" strokeWidth="1.5" />
          <text x={bit.x} y={64.5} textAnchor="middle" className="fill-sky-200 font-mono text-[12px]">{bit.label}</text>
        </g>
      ))}
      {[{ x: 255, label: 'AND' }, { x: 325, label: 'NOT' }].map((gate) => (
        <g key={gate.x}>
          <rect x={gate.x - 24} y={46} width={48} height={28} rx={6} fill="#0b1626" stroke="#38bdf8" strokeWidth="1.5" />
          <text x={gate.x} y={64.5} textAnchor="middle" className="fill-sky-200 font-mono text-[11px]">{gate.label}</text>
        </g>
      ))}

      {/* Quanta wire */}
      <text x="8" y="186" className="fill-amber-300 font-mono text-[13px]">QUANTA</text>
      <path d={`${wavePath(60, 400, 160, 9, 40)} C450 160 460 110 500 110`} fill="none" stroke="#fbbf24" strokeWidth="2.5" className="history-flow" />
      <text x="240" y="205" textAnchor="middle" className="fill-amber-200/70 font-mono text-[11px]">energy in packets · waves · probability</text>

      {/* Merged qubit wire */}
      <path d="M500 110 H790" fill="none" stroke="url(#merge)" strokeWidth="3" className="history-flow" />
      <circle cx="500" cy="110" r="6" fill="#34d399" />
      <rect x="566" y="92" width="36" height="36" rx="7" fill="#12122a" stroke="hsl(var(--primary))" strokeWidth="1.8" />
      <text x="584" y="115" textAnchor="middle" className="fill-indigo-200 font-mono text-[15px] font-semibold">H</text>
      <text x="690" y="116" textAnchor="middle" className="fill-indigo-200 font-mono text-[18px]">|ψ⟩</text>
      <text x="792" y="86" textAnchor="end" className="fill-primary font-mono text-[13px]">QUBITS</text>
    </svg>
  );
}

/* ---------- Overview ribbon: every milestone on one bar ---------- */

const RIBBON_TICKS = [1700, 1800, 1900, 1950, 2000, 2025];

/** Piecewise scale: the quiet 1700s and 1800s get a fifth of the width, the busy 20th century the rest. */
function ribbonX(year: number) {
  if (year < 1900) return ((year - 1700) / 200) * 20;
  return 20 + ((Math.min(year, 2025) - 1900) / 125) * 80;
}

function EraRibbon() {
  return (
    <div className="mt-10">
      <p className="text-xs font-mono uppercase tracking-widest text-muted">Every milestone at a glance</p>
      <div className="relative mt-5 h-16">
        <div className="absolute inset-x-0 top-5 h-1 rounded-full bg-gradient-to-r from-sky-400/60 via-amber-400/60 via-55% to-primary/70" />
        {ALL_ROWS.map(({ milestone, tone }, index) => (
          <a
            key={milestoneId(milestone)}
            href={`#${milestoneId(milestone)}`}
            title={`${milestone.year} · ${milestone.title}`}
            aria-label={`${milestone.year}: ${milestone.title}`}
            className={`absolute h-3 w-3 -translate-x-1/2 rounded-full ring-2 ring-background transition before:absolute before:-inset-1.5 before:content-[''] hover:scale-150 ${TONES[tone].dot}`}
            style={{ left: `${ribbonX(firstYear(milestone))}%`, top: index % 2 === 0 ? '0.75rem' : '1.5rem' }}
          />
        ))}
        {RIBBON_TICKS.map((year) => (
          <span key={year} className="absolute top-10 -translate-x-1/2 font-mono text-[11px] text-muted" style={{ left: `${ribbonX(year)}%` }}>
            {year}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Timeline rows ---------- */

function LessonLink({ slug }: { slug: string }) {
  const lesson = getLessonBySlug(slug);
  if (!lesson || lesson.upcoming) return null;
  return (
    <Link href={`/lessons/${lesson.slug}`} className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition hover:border-primary/60 hover:text-foreground">
      Lesson {getDisplayLessonNumber(lesson.id)}: {lesson.title} <span aria-hidden="true">→</span>
    </Link>
  );
}

function MilestoneCard({ row, showTrack }: { row: Row; showTrack: boolean }) {
  const { milestone, tone } = row;
  const style = TONES[tone];
  const personId = firstPersonFor(milestone);
  return (
    <article className="history-reveal group relative rounded-2xl border border-border/50 bg-card/40 p-5 transition hover:-translate-y-0.5 hover:border-border hover:bg-card/60">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`font-mono text-sm font-semibold ${style.text}`}>{milestone.year}</span>
        {showTrack && <span className={`rounded-full border px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider ${style.chip}`}>{style.name}</span>}
      </div>
      <h3 className="mt-1 text-lg font-semibold leading-snug text-foreground">{milestone.title}</h3>
      <p className="mt-0.5 text-xs text-muted">
        {personId ? (
          <Link href={`/history/people#${personId}`} className="underline decoration-border underline-offset-4 transition hover:text-foreground">{milestone.people}</Link>
        ) : (
          milestone.people
        )}
      </p>
      <p className="mt-3 leading-relaxed text-foreground/85">{milestone.what}</p>
      <p className="mt-3 border-l-2 border-border pl-3 text-sm leading-relaxed text-foreground/75">
        <strong className="text-foreground">Why it matters:</strong> {milestone.why}
      </p>
      {milestone.lessonSlug && <LessonLink slug={milestone.lessonSlug} />}
    </article>
  );
}

function TimelineRow({ row, showTrack }: { row: Row; showTrack: boolean }) {
  const { milestone, tone, side } = row;
  const style = TONES[tone];
  const node = (
    <div className={`relative z-10 flex h-11 min-w-11 items-center justify-center rounded-lg border-2 px-1.5 font-mono text-[11px] font-semibold ${style.node}`} aria-hidden="true">
      {milestone.glyph}
    </div>
  );
  const ghostYear = (
    <span className={`history-reveal hidden select-none font-mono text-6xl font-bold tabular-nums md:block lg:text-7xl ${style.year} ${side === 'left' ? 'text-left' : 'text-right'}`} aria-hidden="true">
      {milestone.year.slice(0, 4)}
    </span>
  );

  return (
    <li
      id={milestoneId(milestone)}
      data-milestone
      data-year={milestone.year}
      data-title={milestone.title}
      data-tone={tone}
      className="grid scroll-mt-24 grid-cols-[44px_1fr] items-start gap-x-4 md:grid-cols-[1fr_56px_1fr] md:items-center md:gap-x-6"
    >
      <div className="col-start-1 row-start-1 flex justify-center pt-4 md:col-start-2 md:pt-0">{node}</div>
      <div className={`col-start-2 row-start-1 ${side === 'left' ? 'md:col-start-1' : 'md:col-start-3'}`}>
        <MilestoneCard row={row} showTrack={showTrack} />
      </div>
      <div className={`hidden md:row-start-1 md:block ${side === 'left' ? 'md:col-start-3' : 'md:col-start-1'}`}>{ghostYear}</div>
    </li>
  );
}

function TimelineSection({ section, index }: { section: Section; index: number }) {
  const style = TONES[section.tone];
  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-20">
      <div className="history-reveal relative mx-auto max-w-3xl py-10 text-center">
        <span className="pointer-events-none absolute inset-x-0 top-0 -z-0 select-none font-mono text-[7rem] font-bold leading-none text-foreground/[0.03] sm:text-[10rem]" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className={`relative inline-flex rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] ${style.chip}`}>{section.eyebrow}</p>
        <h2 id={`${section.id}-heading`} className="relative mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">{section.title}</h2>
        <p className="relative mx-auto mt-3 max-w-2xl leading-relaxed text-muted">{section.intro}</p>
      </div>

      {section.columns && (
        <div className="mb-6 hidden grid-cols-[1fr_56px_1fr] gap-x-6 md:grid">
          {[section.columns[0], null, section.columns[1]].map((tone, i) =>
            tone ? (
              <p key={tone} className={`rounded-xl border px-4 py-2 text-center text-xs font-mono uppercase tracking-widest ${TONES[tone].chip}`}>
                {i === 0 ? '← Computing with 0s and 1s' : 'Physics gets strange →'}
              </p>
            ) : (
              <span key="spacer" />
            ),
          )}
        </div>
      )}

      <div className="relative">
        <span className={`absolute bottom-0 left-[22px] top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b md:left-1/2 ${style.wire}`} aria-hidden="true" />
        {section.columns && (
          <span className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 translate-x-[6px] bg-gradient-to-b from-amber-400/60 to-amber-400/20 md:block" aria-hidden="true" />
        )}
        <ol className="relative space-y-8 md:space-y-10">
          {section.rows.map((row) => (
            <TimelineRow key={milestoneId(row.milestone)} row={row} showTrack={Boolean(section.columns)} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function HistoryPage() {
  const firstLesson = ORDERED_LESSONS[0];

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.08),transparent_40%),radial-gradient(circle_at_60%_70%,hsl(var(--primary)/0.10),transparent_45%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <header>
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">A short history</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            From <span className="text-sky-300">bits</span> to <span className="text-primary">qubits</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Quantum computing did not appear out of nowhere. It grew from two stories running side by side: people learning to compute with 0s and 1s, and physicists discovering that nature at small scales follows very different rules. Follow both wires until they meet.
          </p>
          <p className="mt-3 text-sm text-muted/80">No math needed · about 10 minutes · {ALL_ROWS.length} milestones</p>
          <Link href="/history/people" className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary hover:text-foreground">
            Meet the people behind it <span aria-hidden="true">→</span>
          </Link>

          <div className="mt-10 rounded-3xl border border-border/50 bg-card/30 p-4 sm:p-6">
            <HeroWires />
          </div>

          <EraRibbon />

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            {(Object.keys(TONES) as Tone[]).map((tone) => (
              <li key={tone} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${TONES[tone].dot}`} /> {TONES[tone].name}
              </li>
            ))}
          </ul>

          <nav aria-label="Chapters" className="mt-6 flex flex-wrap gap-2">
            {SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`rounded-full border px-3 py-1 text-xs transition hover:text-foreground ${TONES[section.tone].chip}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </header>

        <div id="timeline" className="mt-10">
          {SECTIONS.map((section, index) => (
            <TimelineSection key={section.id} section={section} index={index} />
          ))}
        </div>

        <section aria-labelledby="compare-heading" className="mt-24">
          <div className="history-reveal text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Where the wires meet</p>
            <h2 id="compare-heading" className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">Bits and qubits, side by side</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted">
              A quantum computer is not a faster laptop. It is a different kind of machine that works alongside classical computers and helps on particular problems.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {(['classical', 'quantum'] as const).map((kind) => (
              <div key={kind} className={`history-reveal rounded-2xl border p-6 ${kind === 'classical' ? 'border-sky-400/30 bg-sky-400/5' : 'border-primary/30 bg-primary/5'}`}>
                <p className={`font-mono text-sm font-semibold uppercase tracking-widest ${kind === 'classical' ? 'text-sky-300' : 'text-primary'}`}>
                  {kind === 'classical' ? 'Bit · 0 or 1' : 'Qubit · α|0⟩ + β|1⟩'}
                </p>
                <dl className="mt-4 space-y-3">
                  {COMPARISON.map((row) => (
                    <div key={row.aspect}>
                      <dt className="text-xs font-mono uppercase tracking-wider text-muted">{row.aspect}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-foreground/85">{kind === 'classical' ? row.classical : row.quantum}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/40 to-accent/10 p-8 text-center" aria-labelledby="next-heading">
          <h2 id="next-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Now write the next chapter yourself</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">Lesson 1 starts exactly where this history ends: what changes when a bit becomes a qubit.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/lessons/${firstLesson.slug}`} className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 glow-primary">Start lesson 1</Link>
            <Link href="/history/people" className="inline-flex items-center justify-center rounded-lg border border-border/60 px-6 py-3 text-sm font-semibold text-foreground/85 transition hover:border-primary/50">Meet the people</Link>
            <Link href="/roadmap" className="inline-flex items-center justify-center rounded-lg border border-border/60 px-6 py-3 text-sm font-semibold text-foreground/85 transition hover:border-primary/50">See the learning roadmap</Link>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-xs text-muted">
            Dates are simplified to the year an idea was first published or demonstrated. The <Link href="/sources" className="text-primary hover:underline">sources page</Link> lists the primary papers behind the lessons.
          </p>
        </section>
      </div>

      <YearTracker total={ALL_ROWS.length} />
    </div>
  );
}
