'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PracticeCard } from '@/components/lesson/MathPractice';
import { getDailyQuestion, liveStreak, localDateKey, readStreak, recordSolve, DailyQuestion as Daily } from '@/lib/daily';
import { getDisplayLessonNumber, getLessonById } from '@/lib/lessons';

/** One practice problem per day, the same for everyone on a given date, with a local streak. */
export default function DailyQuestion() {
  const [daily, setDaily] = useState<Daily | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [solvedToday, setSolvedToday] = useState(false);

  useEffect(() => {
    // Computed on the client so the question follows the visitor's own calendar date.
    const today = localDateKey();
    const saved = readStreak();
    setDaily(getDailyQuestion(today));
    setStreak(liveStreak(saved, today));
    setBest(saved.best);
    setSolvedToday(saved.lastSolved === today);
  }, []);

  function handleSolved() {
    if (!daily) return;
    const next = recordSolve(daily.dateKey);
    setStreak(next.streak);
    setBest(next.best);
    setSolvedToday(true);
  }

  const lesson = daily ? getLessonById(daily.lessonId) : undefined;
  const dateLabel = daily ? new Date(`${daily.dateKey}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : '';

  return (
    <section className="mx-auto mt-24 max-w-6xl" aria-labelledby="daily-heading">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Question of the day</p>
          <h2 id="daily-heading" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Two minutes of quantum math.</h2>
          <p className="mt-3 text-muted">A new problem every day, drawn from the 121 practice problems in the course. Solve it to keep your streak going. Your streak is stored only in this browser.</p>
          <div className="mt-5 flex gap-3">
            <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
              <p className="font-mono text-2xl text-amber-300">{streak}</p>
              <p className="text-xs font-mono uppercase tracking-wider text-muted">day streak</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
              <p className="font-mono text-2xl text-foreground">{best}</p>
              <p className="text-xs font-mono uppercase tracking-wider text-muted">best</p>
            </div>
          </div>
        </div>
        <div>
          {daily && lesson ? (
            <>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted">
                <span>{dateLabel}</span>
                <Link href={`/lessons/${lesson.slug}`} className="text-primary hover:text-foreground">From lesson {getDisplayLessonNumber(lesson.id)}: {lesson.title} →</Link>
              </div>
              {solvedToday && (
                <p className="mb-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">Solved today. Come back tomorrow for a new one.</p>
              )}
              <ol className="list-none">
                <PracticeCard key={daily.dateKey} problem={daily.problem} index={0} onSolved={handleSolved} idPrefix="daily" />
              </ol>
            </>
          ) : (
            <div className="h-48 animate-pulse rounded-xl border border-border/50 bg-card/40" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
