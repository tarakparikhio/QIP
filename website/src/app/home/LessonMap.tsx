'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ORDERED_LESSONS, getDisplayLessonNumber, getFirstIncompleteLesson, getLessonById, LessonMeta } from '@/lib/lessons';
import { useProgressStore } from '@/lib/store/progressStore';

const WIDTH = 1000;
const LEVEL_Y: Record<LessonMeta['difficulty'], number> = { beginner: 70, intermediate: 165, advanced: 260 };
const LEVEL_COLOR: Record<LessonMeta['difficulty'], string> = { beginner: 'text-emerald-400', intermediate: 'text-amber-400', advanced: 'text-rose-400' };

/** A map of the whole curriculum: position = curriculum order and level, lines = prerequisites. */
export default function LessonMap() {
  const { completedModules } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const completed = mounted ? completedModules : [];
  const current = mounted ? getFirstIncompleteLesson(completedModules) : ORDERED_LESSONS[0];
  const [focusId, setFocusId] = useState<number | null>(null);
  const selected = getLessonById(focusId ?? current?.id ?? ORDERED_LESSONS[0].id) ?? ORDERED_LESSONS[0];

  const nodes = useMemo(() => ORDERED_LESSONS.map((lesson, index) => ({
    lesson,
    x: 24 + (index * (WIDTH - 48)) / (ORDERED_LESSONS.length - 1),
    y: LEVEL_Y[lesson.difficulty] + (index % 2 === 0 ? -16 : 16),
  })), []);
  const byId = useMemo(() => new Map(nodes.map((node) => [node.lesson.id, node])), [nodes]);
  const edges = useMemo(() => nodes.flatMap((node) => node.lesson.prerequisites
    .map((pre) => byId.get(pre))
    .filter((from): from is (typeof nodes)[number] => Boolean(from))
    .map((from) => ({ from, to: node }))), [nodes, byId]);

  const unlocks = ORDERED_LESSONS.filter((lesson) => lesson.prerequisites.includes(selected.id));
  const needs = selected.prerequisites.map((id) => getLessonById(id)).filter((lesson): lesson is LessonMeta => Boolean(lesson));
  const doneCount = completed.length;

  return (
    <section className="mx-auto mt-24 max-w-6xl" aria-labelledby="lesson-map-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">The whole course</p>
          <h2 id="lesson-map-heading" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">40 lessons, one connected path.</h2>
          <p className="mt-3 max-w-2xl text-muted">Each dot is a lesson; lines show which lessons build on which. Hover or tab through the map to see what each one needs and unlocks.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-mono text-muted">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> completed ({doneCount})</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> up next</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border border-muted" /> ahead</span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border/60 bg-card/40">
        <svg viewBox={`0 0 ${WIDTH} 320`} className="block min-w-[880px]" role="group" aria-label="Map of all 40 lessons">
          {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
            <g key={level}>
              <rect x="0" y={LEVEL_Y[level] - 42} width={WIDTH} height="84" fill={level === 'intermediate' ? 'hsl(var(--primary) / 0.03)' : 'transparent'} />
              <text x="10" y={LEVEL_Y[level] - 30} fontSize="11" className={`font-mono uppercase ${LEVEL_COLOR[level]}`} fill="currentColor">{level}</text>
            </g>
          ))}
          {edges.map(({ from, to }) => {
            const active = selected.id === to.lesson.id || selected.id === from.lesson.id;
            const color = selected.id === to.lesson.id ? 'hsl(45 93% 58%)' : 'hsl(var(--accent))';
            const midX = (from.x + to.x) / 2;
            return (
              <path
                key={`${from.lesson.id}-${to.lesson.id}`}
                d={`M${from.x},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`}
                fill="none"
                stroke={active ? color : 'hsl(var(--muted))'}
                strokeOpacity={active ? 0.9 : 0.12}
                strokeWidth={active ? 2 : 1}
              />
            );
          })}
          {nodes.map(({ lesson, x, y }) => {
            const isDone = completed.includes(lesson.slug);
            const isCurrent = current?.slug === lesson.slug;
            const isSelected = selected.id === lesson.id;
            const number = getDisplayLessonNumber(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.slug}`}
                aria-label={`Lesson ${number}: ${lesson.title}, ${lesson.difficulty}${isDone ? ', completed' : isCurrent ? ', up next' : ''}`}
                onMouseEnter={() => setFocusId(lesson.id)}
                onFocus={() => setFocusId(lesson.id)}
                className="outline-none"
              >
                {isCurrent && <circle cx={x} cy={y} r="15" fill="hsl(var(--primary) / 0.25)" className="motion-safe:animate-pulse" />}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 12 : 10}
                  fill={isDone ? 'hsl(142 70% 45%)' : isCurrent ? 'hsl(var(--primary))' : 'hsl(var(--card))'}
                  stroke={isSelected ? 'hsl(var(--foreground))' : isDone ? 'hsl(142 70% 45%)' : 'hsl(var(--muted) / 0.7)'}
                  strokeWidth={isSelected ? 2 : 1.2}
                />
                <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9.5" fontWeight="600" fill={isDone || isCurrent ? 'hsl(var(--background))' : 'hsl(var(--foreground))'} className="pointer-events-none font-mono">{number}</text>
              </Link>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:grid-cols-[1.2fr_1fr]" aria-live="polite">
        <div>
          <p className={`font-mono text-xs ${LEVEL_COLOR[selected.difficulty]}`}>Lesson {getDisplayLessonNumber(selected.id)} · {selected.difficulty}</p>
          <h3 className="mt-1 text-xl font-semibold text-foreground">{selected.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{selected.objective}</p>
          <Link href={`/lessons/${selected.slug}`} className="mt-3 inline-block text-sm font-semibold text-primary hover:text-foreground">Open lesson {getDisplayLessonNumber(selected.id)} <span aria-hidden="true">→</span></Link>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-amber-300">Builds on</p>
            <p className="mt-1 text-foreground/80">{needs.length ? needs.map((lesson) => `${getDisplayLessonNumber(lesson.id)}. ${lesson.title}`).join(' · ') : 'Nothing: a starting point.'}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Unlocks</p>
            <p className="mt-1 text-foreground/80">{unlocks.length ? unlocks.map((lesson) => `${getDisplayLessonNumber(lesson.id)}. ${lesson.title}`).join(' · ') : 'A capstone: nothing depends on it.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
