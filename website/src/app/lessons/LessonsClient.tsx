'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LESSONS } from '@/lib/lessons';
import { useProgressStore } from '@/lib/store/progressStore';
import { cn } from '@/lib/utils';

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'text-emerald-400',
  intermediate: 'text-amber-400',
  advanced: 'text-rose-400',
};

const STAGE_LABEL: Record<string, string> = {
  foundation: 'Foundation',
  core: 'Core Concepts',
  algorithms: 'Algorithms',
  advanced: 'Advanced Topics',
};

const STAGE_ORDER = ['foundation', 'core', 'algorithms', 'advanced'];

export default function LessonsClient() {
  const { completedModules, currentUnlockedModule, totalXP, quizResults } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Use safe defaults until client hydration is complete
  const completed = mounted ? completedModules : [];
  const current = mounted ? currentUnlockedModule : 'birth-of-quantum-information';
  const displayedXP = mounted ? totalXP : 0;
  const completedQuizCount = mounted ? Object.values(quizResults).filter(Boolean).length : 0;
  const totalPossibleXP = LESSONS.filter((lesson) => !lesson.upcoming).reduce((sum, lesson) => sum + lesson.xp, 0);

  const available = LESSONS.filter((l) => !l.upcoming);
  const upcoming = LESSONS.filter((l) => l.upcoming);

  // Group upcoming by stage
  const upcomingByStage = STAGE_ORDER.reduce<Record<string, typeof LESSONS>>(
    (acc, stage) => {
      const group = upcoming.filter((l) => l.stage === stage);
      if (group.length > 0) acc[stage] = group;
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4">
          Foundation Track
        </div>
        <h1 className="text-3xl font-bold mb-3">Quantum Learning Path</h1>
        <p className="text-muted text-sm max-w-md mx-auto">
          One concept at a time. Each lesson unlocks the next. Build real circuits to prove you understand.
        </p>
      </motion.div>

      <section className="mb-12 grid grid-cols-3 divide-x divide-border/40 rounded-2xl border border-primary/20 bg-primary/5 px-3 py-4 sm:px-6" aria-label="Learning progress summary">
        <div className="px-2 text-center sm:px-4">
          <p className="text-xl font-semibold text-foreground">{completed.length}<span className="text-sm text-muted">/{available.length}</span></p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted">Lessons</p>
        </div>
        <div className="px-2 text-center sm:px-4">
          <p className="text-xl font-semibold text-primary">{displayedXP}<span className="text-sm text-muted">/{totalPossibleXP}</span></p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted">Credits</p>
        </div>
        <div className="px-2 text-center sm:px-4">
          <p className="text-xl font-semibold text-emerald-400">{completedQuizCount}<span className="text-sm text-muted">/{available.length}</span></p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted">Quizzes</p>
        </div>
      </section>

      {/* ── Available lessons ── */}
      <div className="relative mb-16">
        {/* Connecting line */}
        <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

        <div className="flex flex-col gap-4">
          {available.map((lesson, i) => {
            const isCompleted = completed.includes(lesson.slug);
            const isCurrent = lesson.slug === current;
            const isLocked = !isCompleted && !isCurrent;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={isLocked ? '#' : `/lessons/${lesson.slug}`}
                  className={cn(
                    'relative flex items-start gap-4 pl-14 pr-5 py-4 rounded-xl border transition-all duration-200',
                    isCompleted && 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60',
                    isCurrent && 'border-primary/50 bg-primary/5 hover:border-primary/80 glow-primary',
                    isLocked && 'border-border/30 bg-card/30 opacity-50 cursor-not-allowed'
                  )}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  {/* Node circle */}
                  <div
                    className={cn(
                      'absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all',
                      isCompleted && 'border-emerald-500 bg-emerald-500/20 text-emerald-400',
                      isCurrent && 'border-primary bg-primary/20 text-primary animate-pulse-slow',
                      isLocked && 'border-border bg-card text-muted'
                    )}
                  >
                    {isCompleted ? '✓' : lesson.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('text-xs font-mono', DIFFICULTY_COLOR[lesson.difficulty])}>
                        {lesson.difficulty}
                      </span>
                      <span className="text-xs text-muted/50">·</span>
                      <span className="text-xs text-muted/70 font-mono">{lesson.xp} XP</span>
                    </div>
                    <h3 className={cn(
                      'font-semibold text-sm',
                      isLocked ? 'text-muted' : 'text-foreground'
                    )}>
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-muted/70 mt-0.5 line-clamp-2">{lesson.objective}</p>
                    {isCurrent && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs text-primary font-medium">Continue here</span>
                      </div>
                    )}
                  </div>

                  {!isLocked && (
                    <div className="text-muted/40 text-lg self-center">→</div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Upcoming lessons ── */}
      <div className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border/30" />
          <span className="text-xs font-mono text-muted/50 uppercase tracking-widest">Coming Soon</span>
          <div className="flex-1 h-px bg-border/30" />
        </div>

        {Object.entries(upcomingByStage).map(([stage, lessons]) => (
          <div key={stage}>
            <div className="text-xs font-mono text-muted/50 uppercase tracking-widest mb-3 ml-1">
              {STAGE_LABEL[stage] ?? stage}
            </div>
            <div className="flex flex-col gap-3">
              {lessons.map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  className="relative flex items-start gap-4 pl-5 pr-5 py-3.5 rounded-xl border border-border/20 bg-card/20 cursor-not-allowed select-none"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={cn('text-xs font-mono', DIFFICULTY_COLOR[lesson.difficulty])}>
                        {lesson.difficulty}
                      </span>
                      <span className="text-xs text-muted/50">·</span>
                      <span className="text-xs text-muted/70 font-mono">{lesson.xp} XP</span>
                      <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                        upcoming
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-muted/60">
                      {lesson.id}. {lesson.title}
                    </h3>
                    <p className="text-xs text-muted/40 mt-0.5 line-clamp-1">{lesson.objective}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
