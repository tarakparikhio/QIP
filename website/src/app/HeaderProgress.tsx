'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LESSONS } from '@/lib/lessons';
import { useProgressStore } from '@/lib/store/progressStore';
import { maxLessonCredits } from '@/lib/credits';

export default function HeaderProgress() {
  const { completedModules, totalXP } = useProgressStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedCount = mounted ? completedModules.length : 0;
  const totalLessons = LESSONS.filter((lesson) => !lesson.upcoming).length;
  const totalPossibleXP = LESSONS.filter((lesson) => !lesson.upcoming).reduce(
    (sum, lesson) => sum + maxLessonCredits(lesson),
    0
  );
  const displayedXP = mounted ? totalXP : 0;
  const percent = totalPossibleXP > 0 ? Math.round((displayedXP / totalPossibleXP) * 100) : 0;

  return (
    <Link
      href="/lessons"
      aria-label={`${completedCount} of ${totalLessons} lessons complete, ${displayedXP} of ${totalPossibleXP} credits`}
      title="View your learning progress"
      className="flex min-w-0 items-center gap-2 rounded-full border border-border/50 bg-card/60 px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground"
    >
      <div className="flex flex-col leading-none">
        <span className="font-semibold text-foreground">{completedCount}/{totalLessons}<span className="hidden sm:inline"> lessons</span></span>
      </div>
      <div className="hidden w-20 sm:block rounded-full bg-border/40 h-1.5 overflow-hidden" aria-hidden="true">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
    </Link>
  );
}
