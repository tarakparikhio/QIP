'use client';

import { useEffect, useState } from 'react';
import { LESSONS } from '@/lib/lessons';
import { useProgressStore } from '@/lib/store/progressStore';

export default function HeaderProgress() {
  const { completedModules, totalXP, quizResults } = useProgressStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedCount = mounted ? completedModules.length : 0;
  const quizCount = mounted ? Object.values(quizResults).filter(Boolean).length : 0;
  const totalLessons = LESSONS.filter((lesson) => !lesson.upcoming).length;
  const totalPossibleXP = LESSONS.filter((lesson) => !lesson.upcoming).reduce(
    (sum, lesson) => sum + lesson.xp,
    0
  );
  const displayedXP = mounted ? totalXP : 0;
  const percent = totalPossibleXP > 0 ? Math.round((displayedXP / totalPossibleXP) * 100) : 0;

  return (
    <div className="hidden md:flex items-center gap-3 rounded-full border border-border/50 bg-card/60 px-3 py-1.5 text-xs text-muted">
      <div className="flex flex-col leading-none">
        <span className="font-semibold text-foreground">{completedCount}/{totalLessons} lessons</span>
        <span className="mt-1 text-[11px] text-muted/70">{quizCount} quizzes • {displayedXP}/{totalPossibleXP} credits</span>
      </div>
      <div className="w-20 rounded-full bg-border/40 h-1.5 overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
    </div>
  );
}
