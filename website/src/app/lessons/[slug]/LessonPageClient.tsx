'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { LessonMeta, getDisplayLessonNumber, getNextLesson, getPreviousLesson } from '@/lib/lessons';
import LessonQuiz from '@/components/lesson/LessonQuiz';
import EquationBreakdown from '@/components/lesson/EquationBreakdown';
import LessonQiskitSnippet from '@/components/lesson/LessonQiskitSnippet';
import AnalogyPanel from '@/components/lesson/AnalogyPanel';
import { useProgressStore } from '@/lib/store/progressStore';
import { EQUATION_BREAKDOWNS } from '@/lib/equationBreakdowns';
import { LESSON_QISKIT_SNIPPETS } from '@/lib/lessonQiskitSnippets';
import { LESSON_ANALOGIES } from '@/lib/lessonAnalogies';
import { LESSON_EXPERIMENTS } from '@/lib/lessonExperiments';
import { LESSON_ORIENTATIONS } from '@/lib/lessonOrientations';
import { cn } from '@/lib/utils';
import ExperimentGuide from '@/components/lesson/ExperimentGuide';
import LessonOrientation from '@/components/lesson/LessonOrientation';

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
  const { completedModules, completeModule, quizResults } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isCompleted = mounted && completedModules.includes(lesson.slug);

  const nextLesson = getNextLesson(lesson.id);
  const prevLesson = getPreviousLesson(lesson.id);
  const quizPassed = lesson.quiz ? quizResults[lesson.slug] === true : true;
  const experiment = LESSON_EXPERIMENTS[lesson.id];
  const experimentOps = experiment?.mode === 'circuit' ? (experiment.ops ?? lesson.demoOps) : undefined;

  useEffect(() => {
    if (mounted && lesson.quiz && quizPassed && !isCompleted) {
      completeModule(lesson.slug, nextLesson?.slug ?? lesson.slug, lesson.xp);
    }
  }, [completeModule, isCompleted, lesson.quiz, lesson.slug, lesson.xp, mounted, nextLesson?.slug, quizPassed]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-8 font-mono">
        <Link href="/lessons" className="hover:text-foreground transition-colors">← All Lessons</Link>
        <span>/</span>
        <span className="text-foreground/60">Lesson {getDisplayLessonNumber(lesson.id)}</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={cn('text-xs px-2 py-0.5 rounded-full border font-mono', DIFFICULTY_COLOR[lesson.difficulty])}>
            {lesson.difficulty}
          </span>
          <span className="text-xs text-muted font-mono">{lesson.stage}</span>
          <span className="text-xs text-primary font-mono">+{lesson.xp} credits</span>
          {isCompleted && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono">
              ✓ Completed
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-muted text-base">{lesson.objective}</p>
      </motion.div>

      {LESSON_ORIENTATIONS[lesson.id] && (
        <LessonOrientation lessonId={getDisplayLessonNumber(lesson.id)} data={LESSON_ORIENTATIONS[lesson.id]} />
      )}

      {/* MDX prose - Lesson content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="prose prose-invert max-w-none
          prose-headings:text-foreground prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-2
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-foreground/80 prose-li:leading-relaxed
          prose-ol:my-6 prose-ol:space-y-3
          prose-ul:my-6 prose-ul:space-y-2
          prose-strong:text-foreground
          prose-blockquote:border-l-primary prose-blockquote:text-muted
          prose-code:text-primary prose-code:bg-card prose-code:px-1 prose-code:rounded
          prose-pre:bg-card prose-pre:border prose-pre:border-border/50
          mb-16"
      >
        {children}
      </motion.article>

      {LESSON_ANALOGIES[lesson.id] && (
        <AnalogyPanel data={LESSON_ANALOGIES[lesson.id]} />
      )}

      {lesson.id >= 6 && EQUATION_BREAKDOWNS[lesson.id] && (
        <EquationBreakdown data={EQUATION_BREAKDOWNS[lesson.id]} />
      )}

      {LESSON_QISKIT_SNIPPETS[lesson.id] && (
        <LessonQiskitSnippet snippet={LESSON_QISKIT_SNIPPETS[lesson.id]} />
      )}

      {/* Playground section */}
      <section className="mb-12">
        <div className="mb-4">
          <h2 className="mb-2 text-2xl font-bold">Interactive Playground</h2>
          <p className="text-sm text-muted">
            Start with an empty circuit. Follow the experiment guide, add gates yourself, and use Load Example only when you want to compare your work with the guided state.
          </p>
        </div>
        {experiment && <ExperimentGuide lessonId={getDisplayLessonNumber(lesson.id)} experiment={experiment} />}
        <CircuitBuilder
          allowedGates={lesson.allowedGates}
          numQubits={experiment?.numQubits ?? (lesson.allowedGates.includes('CNOT') ? 2 : 1)}
          title={`Playground — ${lesson.title}`}
          demoOps={experimentOps}
          experiment={experiment?.mode === 'circuit' ? experiment : undefined}
        />
      </section>

      {/* Quiz is the final lesson gate and completes the lesson automatically. */}
      {lesson.quiz && <LessonQuiz lesson={lesson} />}

      {!lesson.quiz && !isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <button
            onClick={() => completeModule(lesson.slug, nextLesson?.slug ?? lesson.slug, lesson.xp)}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold text-base transition-all',
              'bg-primary text-white hover:bg-primary/90 glow-primary'
            )}
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
