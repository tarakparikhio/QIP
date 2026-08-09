'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getDisplayLessonNumber, getNextLesson, LESSONS, ORDERED_LESSONS } from '@/lib/lessons';
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
const DIFFICULTY_ORDER = ['beginner', 'intermediate', 'advanced'] as const;
const DIFFICULTY_LABEL: Record<(typeof DIFFICULTY_ORDER)[number], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default function LessonsClient() {
  const { completedModules, currentUnlockedModule, totalXP, quizResults, completeSelectedModules } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  useEffect(() => setMounted(true), []);

  // Use safe defaults until client hydration is complete
  const completed = mounted ? completedModules : [];
  const current = mounted ? currentUnlockedModule : 'birth-of-quantum-information';
  const displayedXP = mounted ? totalXP : 0;
  const completedQuizCount = mounted ? Object.values(quizResults).filter(Boolean).length : 0;
  const totalPossibleXP = LESSONS.filter((lesson) => !lesson.upcoming).reduce((sum, lesson) => sum + lesson.xp, 0);

  const available = ORDERED_LESSONS.filter((l) => !l.upcoming);
  const upcoming = LESSONS.filter((l) => l.upcoming);
  const availableByDifficulty = DIFFICULTY_ORDER.map((difficulty) => ({
    difficulty,
    lessons: available.filter((lesson) => lesson.difficulty === difficulty),
  })).filter((group) => group.lessons.length > 0);

  // Group upcoming by stage
  const upcomingByStage = STAGE_ORDER.reduce<Record<string, typeof LESSONS>>(
    (acc, stage) => {
      const group = upcoming.filter((l) => l.stage === stage);
      if (group.length > 0) acc[stage] = group;
      return acc;
    },
    {}
  );

  function toggleSelectedLesson(slug: string) {
    setSelectedLessons((currentSelection) => currentSelection.includes(slug)
      ? currentSelection.filter((selectedSlug) => selectedSlug !== slug)
      : [...currentSelection, slug]);
  }

  function handleCompleteSelected() {
    const selected = available.filter((lesson) => selectedLessons.includes(lesson.slug));
    if (selected.length === 0) return;

    const lastSelected = selected[selected.length - 1];
    const nextLesson = getNextLesson(lastSelected.id);
    completeSelectedModules(
      selected.map((lesson) => ({ moduleId: lesson.slug, xpEarned: lesson.xp })),
      nextLesson?.slug ?? lastSelected.slug,
    );
    setSelectedLessons([]);
    setSelectionMode(false);
    setSettingsOpen(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
          40-lesson curriculum
        </div>
        <div className="mb-3 flex items-start justify-center gap-3">
          <h1 className="text-3xl font-bold">Quantum Learning Path</h1>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((open) => !open)}
              aria-label="Open learning path settings"
              aria-expanded={settingsOpen}
              title="Learning path settings"
              className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-base text-muted transition hover:border-primary/50 hover:text-foreground"
            >
              ⚙
            </button>
            {settingsOpen && (
              <div className="absolute right-0 top-10 z-20 w-56 rounded-xl border border-border/70 bg-card p-2 text-left shadow-xl">
                <button
                  type="button"
                  onClick={() => setSelectionMode((enabled) => !enabled)}
                  className="w-full rounded-lg px-3 py-2 text-left text-xs text-foreground transition hover:bg-primary/10"
                >
                  {selectionMode ? 'finish selecting lessons' : 'select lessons to manage'}
                </button>
                <button
                  type="button"
                  disabled={selectedLessons.length === 0}
                  onClick={handleCompleteSelected}
                  className="w-full rounded-lg px-3 py-2 text-left text-xs text-foreground transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:text-muted/50"
                >
                  complete selected ({selectedLessons.length})
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-muted text-sm max-w-md mx-auto">
          Follow the concepts in order, practice with circuits, and use the checks to make each idea stick.
        </p>
        {selectionMode && (
          <p className="mt-3 text-xs font-mono text-primary/80">Select any lessons below, then use the gear menu to complete them.</p>
        )}
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

      <div className="mb-16 space-y-12">
        {availableByDifficulty.map(({ difficulty, lessons }) => (
          <section key={difficulty} aria-labelledby={`difficulty-${difficulty}`}>
            <div className="mb-4 flex items-end justify-between border-b border-border/40 pb-3">
              <div>
                <p className={cn('text-xs font-mono uppercase tracking-[0.2em]', DIFFICULTY_COLOR[difficulty])}>
                  {DIFFICULTY_LABEL[difficulty]}
                </p>
                <h2 id={`difficulty-${difficulty}`} className="mt-1 text-xl font-semibold text-foreground">
                  {difficulty === 'beginner' && 'Build the mental model'}
                  {difficulty === 'intermediate' && 'Turn intuition into algorithms'}
                  {difficulty === 'advanced' && 'Connect theory to real systems'}
                </h2>
              </div>
              <span className="text-xs font-mono text-muted">{lessons.length} lessons</span>
            </div>
            <div className="flex flex-col gap-3">
              {lessons.map((lesson, i) => {
            const isCompleted = completed.includes(lesson.slug);
            const isCurrent = lesson.slug === current;
            const isLocked = !isCompleted && !isCurrent;
            const isSelected = selectedLessons.includes(lesson.slug);

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-stretch gap-3"
              >
                {selectionMode && (
                  <label className="flex w-8 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-card/30">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectedLesson(lesson.slug)}
                      aria-label={`Select ${lesson.title}`}
                      className="h-4 w-4 accent-primary"
                    />
                  </label>
                )}
                <Link
                  href={isLocked ? '#' : `/lessons/${lesson.slug}`}
                  className={cn(
                    'relative flex min-w-0 flex-1 items-start gap-4 rounded-xl border px-4 py-4 transition-all duration-200',
                    isCompleted && 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60',
                    isCurrent && 'border-primary/50 bg-primary/5 hover:border-primary/80 glow-primary',
                    isLocked && 'border-border/30 bg-card/30 opacity-50 cursor-not-allowed',
                    isSelected && 'ring-1 ring-primary/70',
                  )}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div
                    className={cn(
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all',
                      isCompleted && 'border-emerald-500 bg-emerald-500/20 text-emerald-400',
                      isCurrent && 'border-primary bg-primary/20 text-primary animate-pulse-slow',
                      isLocked && 'border-border bg-card text-muted'
                    )}
                  >
                    {isCompleted ? '✓' : getDisplayLessonNumber(lesson.id)}
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
          </section>
        ))}
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
                      {getDisplayLessonNumber(lesson.id)}. {lesson.title}
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
