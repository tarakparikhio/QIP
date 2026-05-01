'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { LessonMeta, LESSONS } from '@/lib/lessons';
import { useProgressStore } from '@/lib/store/progressStore';
import { cn } from '@/lib/utils';

const CircuitBuilder = dynamic(() => import('@/components/circuit-builder/CircuitBuilder'), { ssr: false });

type Props = {
  lesson: LessonMeta;
  children: React.ReactNode;
};

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  intermediate: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  advanced: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
};

export default function LessonPageClient({ lesson, children }: Props) {
  const { completedModules, completeModule } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isCompleted = mounted && completedModules.includes(lesson.slug);

  const nextLesson = LESSONS.find((l) => l.id === lesson.id + 1);
  const prevLesson = LESSONS.find((l) => l.id === lesson.id - 1);

  function handleComplete() {
    if (!isCompleted) {
      completeModule(lesson.slug, nextLesson?.slug ?? lesson.slug, lesson.xp);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-8 font-mono">
        <Link href="/lessons" className="hover:text-foreground transition-colors">← All Lessons</Link>
        <span>/</span>
        <span className="text-foreground/60">Lesson {lesson.id}</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={cn('text-xs px-2 py-0.5 rounded-full border font-mono', DIFFICULTY_COLOR[lesson.difficulty])}>
            {lesson.difficulty}
          </span>
          <span className="text-xs text-muted font-mono">{lesson.stage}</span>
          <span className="text-xs text-primary font-mono">+{lesson.xp} XP</span>
          {isCompleted && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono">
              ✓ Completed
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-muted text-base">{lesson.objective}</p>
      </motion.div>

      {/* MDX prose - Lesson content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="prose prose-invert prose-sm max-w-none
          prose-headings:text-foreground prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-strong:text-foreground
          prose-blockquote:border-l-primary prose-blockquote:text-muted
          prose-code:text-primary prose-code:bg-card prose-code:px-1 prose-code:rounded
          prose-pre:bg-card prose-pre:border prose-pre:border-border/50
          mb-12"
      >
        {children}
      </motion.article>

      {/* Playground section - Explicitly separated */}
      <section className="mb-12">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Interactive Playground</h2>
          <p className="text-muted text-sm">Build and test circuits with the gates available for this lesson.</p>
        </div>
        <CircuitBuilder
          allowedGates={lesson.allowedGates}
          numQubits={lesson.id >= 4 ? 2 : 1}
          title={`Playground — ${lesson.title}`}
        />
      </section>

      {/* Complete lesson button */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={handleComplete}
            className="px-8 py-3 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all glow-primary"
          >
            Mark as Complete → Unlock Next Lesson
          </button>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="mt-16 flex justify-between text-sm border-t border-border/30 pt-8">
        {prevLesson ? (
          <Link href={`/lessons/${prevLesson.slug}`} className="text-muted hover:text-foreground transition-colors">
            ← {prevLesson.title}
          </Link>
        ) : <div />}
        {nextLesson && isCompleted && (
          <Link href={`/lessons/${nextLesson.slug}`} className="text-primary hover:text-primary/80 transition-colors font-semibold">
            {nextLesson.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
