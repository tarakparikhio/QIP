'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { ORDERED_LESSONS, getDisplayLessonNumber, getFirstIncompleteLesson, getLessonById, LessonMeta } from '@/lib/lessons';
import { useProgressStore } from '@/lib/store/progressStore';

type Chapter = { number: string; eyebrow: string; title: string; start: number; end: number };

// Same lesson ranges as the roadmap phases, so the home page and /roadmap tell one story.
const CHAPTERS: Chapter[] = [
  { number: '01', eyebrow: 'Foundation', title: 'Build the mental model', start: 0, end: 9 },
  { number: '02', eyebrow: 'Core skills', title: 'Reason about circuits and noise', start: 9, end: 18 },
  { number: '03', eyebrow: 'Algorithms', title: 'First quantum speedups', start: 18, end: 21 },
  { number: '04', eyebrow: 'Formal methods', title: 'Fourier and phase tools', start: 21, end: 28 },
  { number: '05', eyebrow: 'Near-term practice', title: 'Algorithms meet workflows', start: 28, end: 35 },
  { number: '06', eyebrow: 'Professional entry', title: 'Hardware, security, compilers', start: 35, end: 40 },
];

const LEVEL_STYLE: Record<LessonMeta['difficulty'], string> = {
  beginner: 'border-emerald-400/30 text-emerald-300',
  intermediate: 'border-amber-400/30 text-amber-300',
  advanced: 'border-rose-400/30 text-rose-300',
};

const chapterIndexOf = (lessonId: number) => {
  const position = ORDERED_LESSONS.findIndex((lesson) => lesson.id === lessonId);
  return Math.max(0, CHAPTERS.findIndex((chapter) => position >= chapter.start && position < chapter.end));
};

/** The whole curriculum as six chapters; each chapter is an ordered path of lessons. */
export default function LessonMap() {
  const { completedModules } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const completed = mounted ? completedModules : [];
  const current = mounted ? getFirstIncompleteLesson(completedModules) : ORDERED_LESSONS[0];

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = getLessonById(selectedId ?? current?.id ?? ORDERED_LESSONS[0].id) ?? ORDERED_LESSONS[0];
  const [chapterOverride, setChapterOverride] = useState<number | null>(null);
  const chapterIndex = chapterOverride ?? chapterIndexOf(selected.id);
  const chapter = CHAPTERS[chapterIndex];
  const chapterLessons = ORDERED_LESSONS.slice(chapter.start, chapter.end);

  const needs = selected.prerequisites.map((id) => getLessonById(id)).filter((lesson): lesson is LessonMeta => Boolean(lesson));
  const unlocks = ORDERED_LESSONS.filter((lesson) => lesson.prerequisites.includes(selected.id));
  const doneCount = ORDERED_LESSONS.filter((lesson) => completed.includes(lesson.slug)).length;

  const selectLesson = (id: number) => {
    setSelectedId(id);
    setChapterOverride(null);
  };
  const selectChapter = (index: number) => {
    const target = CHAPTERS[index];
    const firstOpen = ORDERED_LESSONS.slice(target.start, target.end).find((lesson) => !completed.includes(lesson.slug));
    setSelectedId((firstOpen ?? ORDERED_LESSONS[target.start]).id);
    setChapterOverride(index);
  };

  return (
    <section className="mx-auto mt-24 max-w-6xl" aria-labelledby="lesson-map-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">The whole course</p>
          <h2 id="lesson-map-heading" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">40 lessons, one connected path.</h2>
          <p className="mt-3 max-w-2xl text-muted">
            The course runs in six chapters, from your first qubit to real hardware. Pick a chapter, then pick a lesson to see what it builds on and what it opens up next.
          </p>
        </div>
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs font-mono text-muted">
            <span>Your progress</span>
            <span><span className="text-foreground">{doneCount}</span> / {ORDERED_LESSONS.length}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/60">
            <div className="h-full rounded-full bg-emerald-400 transition-[width]" style={{ width: `${(doneCount / ORDERED_LESSONS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Chapter rail: a numbered line of six stops. */}
      <ol className="relative mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6" aria-label="Course chapters">
        <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-[22px] hidden h-px bg-gradient-to-r from-emerald-400/50 via-primary/50 to-rose-400/50 lg:block" />
        {CHAPTERS.map((item, index) => {
          const lessons = ORDERED_LESSONS.slice(item.start, item.end);
          const done = lessons.filter((lesson) => completed.includes(lesson.slug)).length;
          const isActive = index === chapterIndex;
          const isComplete = done === lessons.length;
          const hasCurrent = current ? lessons.some((lesson) => lesson.id === current.id) : false;
          return (
            <li key={item.number} className="relative">
              <button
                type="button"
                onClick={() => selectChapter(index)}
                aria-pressed={isActive}
                className={clsx(
                  'relative flex h-full w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition sm:flex-col sm:items-start sm:gap-2 sm:py-3 lg:items-center lg:text-center',
                  isActive ? 'border-primary/70 bg-primary/10' : 'border-border/60 bg-card/60 hover:border-primary/40',
                )}
              >
                <span
                  className={clsx(
                    'relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs',
                    isComplete ? 'border-emerald-400 bg-emerald-400 text-background' : isActive ? 'border-primary bg-primary text-background' : 'border-muted/50 bg-card text-muted',
                  )}
                >
                  {isComplete ? '✓' : item.number}
                </span>
                <span className="hidden text-[11px] font-mono uppercase tracking-wider text-muted sm:block">{item.eyebrow}</span>
                <span className="min-w-0 flex-1 sm:flex-none">
                  <span className="block text-sm font-semibold leading-snug text-foreground">{item.title}</span>
                  <span className="mt-0.5 block text-[11px] font-mono text-muted sm:hidden">
                    Lessons {item.start + 1}–{item.end} · {done}/{lessons.length} done
                  </span>
                </span>
                <span className="mt-auto hidden text-[11px] font-mono text-muted sm:block">Lessons {item.start + 1}–{item.end}</span>
                {hasCurrent && <span className="shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider text-primary">you are here</span>}
                <span className="hidden h-1 w-full overflow-hidden rounded-full bg-border/60 sm:block" role="progressbar" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={done} aria-label={`${done} of ${lessons.length} lessons done`}>
                  <span className="block h-full bg-emerald-400" style={{ width: `${(done / lessons.length) * 100}%` }} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Lesson path for the active chapter. */}
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-semibold text-foreground">
              <span className="font-mono text-sm text-primary">Chapter {chapter.number}</span> · {chapter.title}
            </h3>
            <span className="shrink-0 text-xs font-mono text-muted">{chapterLessons.length} lessons</span>
          </div>
          <ol className="mt-4">
            {chapterLessons.map((lesson, index) => {
              const number = getDisplayLessonNumber(lesson.id);
              const isDone = completed.includes(lesson.slug);
              const isCurrent = current?.id === lesson.id;
              const isSelected = selected.id === lesson.id;
              const isNeeded = selected.prerequisites.includes(lesson.id);
              const isUnlocked = lesson.prerequisites.includes(selected.id);
              const isLast = index === chapterLessons.length - 1;
              return (
                <li key={lesson.id} className="relative pl-12">
                  {!isLast && <span aria-hidden="true" className={clsx('absolute left-[17px] top-9 bottom-0 w-0.5', isDone ? 'bg-emerald-400/60' : 'bg-border')} />}
                  <span
                    aria-hidden="true"
                    className={clsx(
                      'absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold',
                      isDone && 'border-emerald-400 bg-emerald-400 text-background',
                      !isDone && isCurrent && 'border-primary bg-primary text-background shadow-glow-primary',
                      !isDone && !isCurrent && 'border-border bg-card text-muted',
                      isSelected && 'ring-2 ring-foreground/80 ring-offset-2 ring-offset-background',
                    )}
                  >
                    {isDone ? '✓' : number}
                  </span>
                  <button
                    type="button"
                    onClick={() => selectLesson(lesson.id)}
                    aria-expanded={isSelected}
                    className={clsx(
                      'mb-2 flex w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-3 py-2.5 text-left transition',
                      isSelected ? 'bg-primary/10' : 'hover:bg-white/5',
                    )}
                  >
                    <span className={clsx('font-medium', isDone ? 'text-foreground/70' : 'text-foreground')}>
                      <span className="sr-only">Lesson {number}: </span>{lesson.title}
                    </span>
                    {isCurrent && <Tag className="border-primary/40 text-primary">up next</Tag>}
                    {isNeeded && <Tag className="border-amber-400/40 text-amber-300">read first</Tag>}
                    {isUnlocked && <Tag className="border-accent/40 text-accent">builds on this</Tag>}
                  </button>
                  {isSelected && <div className="mb-4 lg:hidden"><LessonDetail inline lesson={selected} needs={needs} unlocks={unlocks} completed={completed} onSelect={selectLesson} /></div>}
                </li>
              );
            })}
          </ol>
          <div className="mt-2 flex justify-between gap-3 border-t border-border/50 pt-4 text-sm">
            <button type="button" onClick={() => selectChapter(chapterIndex - 1)} disabled={chapterIndex === 0} className="-my-2 py-2 text-muted transition hover:text-foreground disabled:invisible">
              <span aria-hidden="true">←</span> Chapter {CHAPTERS[chapterIndex - 1]?.number}
            </button>
            <button type="button" onClick={() => selectChapter(chapterIndex + 1)} disabled={chapterIndex === CHAPTERS.length - 1} className="-my-2 py-2 text-muted transition hover:text-foreground disabled:invisible">
              Chapter {CHAPTERS[chapterIndex + 1]?.number} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24"><LessonDetail lesson={selected} needs={needs} unlocks={unlocks} completed={completed} onSelect={selectLesson} /></div>
        </div>
      </div>
    </section>
  );
}

function Tag({ className, children }: { className: string; children: ReactNode }) {
  return <span className={clsx('rounded-full border px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider', className)}>{children}</span>;
}

function LessonDetail({ lesson, needs, unlocks, completed, onSelect, inline = false }: {
  inline?: boolean;
  lesson: LessonMeta;
  needs: LessonMeta[];
  unlocks: LessonMeta[];
  completed: string[];
  onSelect: (id: number) => void;
}) {
  const number = getDisplayLessonNumber(lesson.id);
  const chip = (item: LessonMeta, tone: string) => (
    <li key={item.id}>
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className={clsx('flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition hover:bg-white/5', tone)}
      >
        <span className="w-6 shrink-0 font-mono text-xs text-muted">{getDisplayLessonNumber(item.id)}</span>
        <span className="flex-1 text-foreground/90">{item.title}</span>
        {completed.includes(item.slug) && <span className="text-emerald-400" aria-label="completed">✓</span>}
      </button>
    </li>
  );

  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-5" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted">Lesson {number} of {ORDERED_LESSONS.length}</span>
        <Tag className={LEVEL_STYLE[lesson.difficulty]}>{lesson.difficulty}</Tag>
      </div>
      {!inline && <h4 className="mt-2 text-xl font-semibold text-foreground">{lesson.title}</h4>}
      <p className="mt-2 text-sm leading-relaxed text-muted">{lesson.objective}</p>
      <Link
        href={`/lessons/${lesson.slug}`}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background transition hover:bg-primary/90"
      >
        Open lesson {number} <span aria-hidden="true">→</span>
      </Link>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-amber-300">Read these first</p>
          {needs.length ? (
            <ul className="mt-2 space-y-1.5">{needs.map((item) => chip(item, 'border-amber-400/25'))}</ul>
          ) : (
            <p className="mt-2 text-sm text-foreground/70">Nothing. This is a starting point.</p>
          )}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">This opens up</p>
          {unlocks.length ? (
            <ul className="mt-2 space-y-1.5">{unlocks.map((item) => chip(item, 'border-accent/25'))}</ul>
          ) : (
            <p className="mt-2 text-sm text-foreground/70">Nothing else depends on it. It is a capstone.</p>
          )}
        </div>
      </div>
    </div>
  );
}
