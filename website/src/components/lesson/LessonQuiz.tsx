'use client';

import { useMemo, useState } from 'react';
import { LessonMeta, getLessonQuiz } from '@/lib/lessons';
import { useProgressStore } from '@/lib/store/progressStore';

function getAnswerIndex(answer: 'a' | 'b' | 'c' | 'd') {
  return answer.charCodeAt(0) - 'a'.charCodeAt(0);
}

function shuffleOptions<T>(items: T[], seed: number) {
  const shuffled = [...items];
  let value = seed;

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const random = value / 233280;
    const swapIndex = Math.floor(random * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export default function LessonQuiz({ lesson }: { lesson: LessonMeta }) {
  const quiz = useMemo(() => getLessonQuiz(lesson.id), [lesson.id]);
  const { quizResults, markQuizResult } = useProgressStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const shuffledOptions = useMemo(() => {
    if (!quiz) return [];

    const indexedOptions = quiz.options.map((option, originalIndex) => ({ option, originalIndex }));
    return shuffleOptions(indexedOptions, lesson.id);
  }, [quiz, lesson.id]);

  if (!quiz) return null;

  const passed = quizResults[lesson.slug] === true;
  const correctDisplayIndex = shuffledOptions.findIndex((entry) => entry.originalIndex === getAnswerIndex(quiz.answer));

  function handleSelect(displayIndex: number) {
    if (passed || !quiz) return;

    const selectedOption = shuffledOptions[displayIndex];
    const isCorrect = selectedOption.originalIndex === getAnswerIndex(quiz.answer);
    setSelectedIndex(displayIndex);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    markQuizResult(lesson.slug, isCorrect);
  }

  return (
    <section className="mb-10 rounded-2xl border border-border/50 bg-card/40 p-6">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-2">Mini quiz</p>
          <h3 className="text-xl font-semibold">{quiz.prompt}</h3>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-mono">
          {passed ? 'Passed' : 'Required to complete'}
        </div>
      </div>

      <div className="grid gap-3">
        {shuffledOptions.map(({ option, originalIndex }, displayIndex) => {
          const isSelected = selectedIndex === displayIndex;
          const isCorrectOption = displayIndex === correctDisplayIndex;

          return (
            <button
              key={`${option}-${originalIndex}`}
              onClick={() => handleSelect(displayIndex)}
              disabled={passed}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                passed && isCorrectOption
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : isSelected
                    ? 'border-primary/50 bg-primary/10 text-foreground'
                    : 'border-border/40 bg-background/40 hover:border-primary/30 hover:bg-card/60'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${feedback === 'correct' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'}`}>
          {feedback === 'correct' ? `Correct. ${quiz.explanation}` : `Not quite. ${quiz.explanation}`}
        </div>
      )}
    </section>
  );
}
