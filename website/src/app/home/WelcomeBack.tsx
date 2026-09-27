'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LESSONS, ORDERED_LESSONS, getDisplayLessonNumber, getFirstIncompleteLesson, LessonMeta } from '@/lib/lessons';
import { maxLessonCredits } from '@/lib/credits';
import { useProgressStore } from '@/lib/store/progressStore';
import { liveStreak, localDateKey, readStreak } from '@/lib/daily';
import ShareCard from '@/components/ShareCard';

const LEVELS: LessonMeta['difficulty'][] = ['beginner', 'intermediate', 'advanced'];
const LEVEL_COLOR = { beginner: 'from-emerald-500 to-emerald-300', intermediate: 'from-amber-500 to-amber-300', advanced: 'from-rose-500 to-rose-300' };

/** Shown only to returning learners: where to continue, credits, mastery by level, and sharing. */
export default function WelcomeBack() {
  const { completedModules, lessonScores, totalXP } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [sharing, setSharing] = useState(false);
  useEffect(() => {
    setMounted(true);
    setStreak(liveStreak(readStreak(), localDateKey()));
  }, []);

  if (!mounted || (completedModules.length === 0 && streak === 0)) return null;

  const next = getFirstIncompleteLesson(completedModules);
  const totalCredits = LESSONS.reduce((sum, lesson) => sum + maxLessonCredits(lesson), 0);
  const done = completedModules.length;
  const finished = done >= ORDERED_LESSONS.length;

  const levels = LEVELS.map((level) => {
    const lessons = ORDERED_LESSONS.filter((lesson) => lesson.difficulty === level);
    const scored = lessons.map((lesson) => lessonScores[lesson.slug]).filter(Boolean);
    const mastery = scored.length ? scored.reduce((sum, score) => sum + score!.earned / score!.max, 0) / scored.length : 0;
    return { level, total: lessons.length, done: lessons.filter((lesson) => completedModules.includes(lesson.slug)).length, mastery };
  });
  const averageMastery = Object.values(lessonScores).length
    ? Math.round((Object.values(lessonScores).reduce((sum, score) => sum + score.earned / score.max, 0) / Object.values(lessonScores).length) * 100)
    : 0;

  return (
    <section className="relative mx-auto mt-10 max-w-6xl rounded-2xl border border-primary/30 bg-card/60 p-5 sm:p-6" aria-labelledby="welcome-back-heading">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Welcome back</p>
          <h2 id="welcome-back-heading" className="mt-2 text-2xl font-semibold">
            {finished ? 'You finished all 40 lessons.' : `${done} of 40 lessons done. Keep going.`}
          </h2>
          {next ? (
            <Link href={`/lessons/${next.slug}`} className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-primary/40 bg-primary/10 p-4 transition hover:border-primary/70">
              <div>
                <p className="font-mono text-xs text-primary">Continue with lesson {getDisplayLessonNumber(next.id)}</p>
                <p className="mt-1 font-semibold text-foreground">{next.title}</p>
                <p className="mt-1 text-sm text-muted line-clamp-1">{next.objective}</p>
              </div>
              <span className="text-2xl text-primary" aria-hidden="true">→</span>
            </Link>
          ) : (
            <p className="mt-4 text-sm text-muted">Retake any lesson check to raise your mastery, or try the daily question below.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg border border-border/60 px-3 py-1.5"><span className="font-mono text-accent">{totalXP.toLocaleString()}</span><span className="text-muted"> / {totalCredits.toLocaleString()} credits</span></span>
            <span className="rounded-lg border border-border/60 px-3 py-1.5"><span className="font-mono text-emerald-300">{averageMastery}%</span><span className="text-muted"> average mastery</span></span>
            <span className="rounded-lg border border-border/60 px-3 py-1.5"><span className="font-mono text-amber-300">{streak}</span><span className="text-muted"> day daily streak</span></span>
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">Progress by level</p>
          <div className="mt-3 space-y-3">
            {levels.map((row) => (
              <div key={row.level}>
                <div className="flex justify-between text-xs font-mono">
                  <span className="capitalize text-foreground/85">{row.level}</span>
                  <span className="text-muted">{row.done}/{row.total} done{row.done ? ` · ${Math.round(row.mastery * 100)}% mastery` : ''}</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-border/40" role="progressbar" aria-valuenow={row.done} aria-valuemin={0} aria-valuemax={row.total} aria-label={`${row.level} lessons completed`}>
                  <div className={`h-full rounded-full bg-gradient-to-r ${LEVEL_COLOR[row.level]}`} style={{ width: `${(row.done / row.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          {done > 0 && (
            <button type="button" onClick={() => setSharing((value) => !value)} aria-expanded={sharing} className="mt-4 text-sm font-semibold text-accent hover:text-foreground">
              {sharing ? 'Hide share card' : 'Share your progress'} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>

      {sharing && (
        <div className="mt-5">
          <ShareCard
            onClose={() => setSharing(false)}
            data={{
              eyebrow: finished ? 'Course complete' : 'Learning quantum computing',
              title: finished ? 'All 40 lessons of Quantum Playground' : `${done} of 40 lessons complete`,
              stats: [
                { value: `${done}/40`, label: 'lessons' },
                { value: `${averageMastery}%`, label: 'mastery' },
                { value: totalXP.toLocaleString(), label: 'credits' },
              ],
              path: '/',
              message: finished
                ? 'I finished all 40 lessons of Quantum Playground, an interactive quantum computing course.'
                : `I have completed ${done} of 40 lessons on Quantum Playground, an interactive quantum computing course.`,
              fileName: 'quantum-playground-progress.png',
            }}
          />
        </div>
      )}
    </section>
  );
}
