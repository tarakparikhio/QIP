'use client';

import { useEffect, useMemo, useState } from 'react';
import { LessonMeta, getDisplayLessonNumber, getLessonQuestions } from '@/lib/lessons';
import ShareCard from '@/components/ShareCard';
import { useProgressStore } from '@/lib/store/progressStore';
import { quizCredits, retryMultiplier } from '@/lib/credits';

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
  const questions = useMemo(() => getLessonQuestions(lesson.id), [lesson.id]);
  const { quizResults, lessonScores, recordLessonScore, completedModules } = useProgressStore();
  const [sharing, setSharing] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Per question: which shuffled options were tried wrong, and which questions are solved.
  const [wrongPicks, setWrongPicks] = useState<Record<number, number[]>>({});
  const [solved, setSolved] = useState<Record<number, number>>({});
  const [retaking, setRetaking] = useState(false);
  const [lastRun, setLastRun] = useState<number | null>(null);

  const shuffled = useMemo(
    () => questions.map((question, questionIndex) =>
      shuffleOptions(question.options.map((option, originalIndex) => ({ option, originalIndex })), lesson.id * 31 + questionIndex * 7 + 1),
    ),
    [questions, lesson.id],
  );

  if (questions.length === 0) return null;

  const share = lesson.xp / questions.length;
  const passedBefore = mounted && quizResults[lesson.slug] === true;
  const locked = passedBefore && !retaking;
  const best = mounted ? lessonScores[lesson.slug] : undefined;
  const solvedCount = locked ? questions.length : Object.keys(solved).length;

  function handleSelect(questionIndex: number, displayIndex: number) {
    if (locked || solved[questionIndex] !== undefined) return;
    const question = questions[questionIndex];
    const isCorrect = shuffled[questionIndex][displayIndex].originalIndex === getAnswerIndex(question.answer);

    if (!isCorrect) {
      setWrongPicks((current) => ({ ...current, [questionIndex]: [...(current[questionIndex] ?? []), displayIndex] }));
      return;
    }

    const nextSolved = { ...solved, [questionIndex]: displayIndex };
    setSolved(nextSolved);
    if (Object.keys(nextSolved).length === questions.length) {
      const earned = quizCredits(lesson.xp, questions.map((_, index) => (wrongPicks[index] ?? []).length));
      setLastRun(earned);
      recordLessonScore(lesson.slug, earned, lesson.xp);
      setRetaking(false);
    }
  }

  function startRetake() {
    setWrongPicks({});
    setSolved({});
    setLastRun(null);
    setRetaking(true);
  }

  const mastery = best ? Math.round((best.earned / best.max) * 100) : 0;

  return (
    <section className="mb-10 rounded-2xl border border-border/50 bg-card/40 p-6" aria-labelledby="lesson-quiz-heading">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">Lesson check</p>
          <h2 id="lesson-quiz-heading" className="text-xl font-semibold">Answer all {questions.length} questions to complete this lesson</h2>
          <p className="mt-1 text-sm text-muted">
            Each question is worth {Math.round(share)} credits on the first try, half on the second, and a quarter after that.
          </p>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-mono text-primary" aria-live="polite">
          {locked ? 'Passed · next lesson unlocked' : `${solvedCount} / ${questions.length} correct`}
        </div>
      </div>

      {locked && best && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm">
          <p className="text-emerald-300">
            {lastRun !== null && lastRun < best.earned ? `This attempt: ${lastRun} credits. ` : ''}
            Best score: <strong>{best.earned} / {best.max} credits</strong> · {mastery}% mastery
          </p>
          <div className="flex flex-wrap gap-2">
            {best.earned < best.max && (
              <button
                type="button"
                onClick={startRetake}
                className="rounded-lg border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
              >
                Retake to improve
              </button>
            )}
            <button
              type="button"
              onClick={() => setSharing((value) => !value)}
              aria-expanded={sharing}
              className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent transition hover:bg-accent/10"
            >
              {sharing ? 'Hide share card' : 'Share your result'}
            </button>
          </div>
        </div>
      )}

      {locked && best && sharing && (
        <div className="mb-6">
          <ShareCard
            onClose={() => setSharing(false)}
            data={{
              eyebrow: `Lesson ${getDisplayLessonNumber(lesson.id)} of 40 complete`,
              title: lesson.title,
              stats: [
                { value: `${mastery}%`, label: 'mastery' },
                { value: String(best.earned), label: 'credits' },
                { value: `${completedModules.length}/40`, label: 'lessons done' },
              ],
              path: `/lessons/${lesson.slug}/`,
              message: `I just completed "${lesson.title}" on Quantum Playground with ${mastery}% mastery.`,
              fileName: `quantum-playground-${lesson.slug}.png`,
            }}
          />
        </div>
      )}

      <ol className="space-y-8">
        {questions.map((question, questionIndex) => {
          const isSolved = locked || solved[questionIndex] !== undefined;
          const tried = locked ? [] : (wrongPicks[questionIndex] ?? []);
          const lastWrong = !isSolved && tried.length > 0;
          const correctDisplayIndex = shuffled[questionIndex].findIndex((entry) => entry.originalIndex === getAnswerIndex(question.answer));
          const promptId = `quiz-${lesson.id}-q${questionIndex}`;
          const nextWorth = Math.round(share * retryMultiplier(tried.length));

          return (
            <li key={promptId}>
              <p id={promptId} className="mb-3 text-base font-medium text-foreground">
                <span className="mr-2 font-mono text-sm text-muted">{questionIndex + 1}.</span>
                {question.prompt}
              </p>
              <div className="grid gap-2" role="group" aria-labelledby={promptId}>
                {shuffled[questionIndex].map(({ option, originalIndex }, displayIndex) => {
                  const isCorrectOption = displayIndex === correctDisplayIndex;
                  const wasWrong = tried.includes(displayIndex);
                  return (
                    <button
                      type="button"
                      key={`${originalIndex}-${option}`}
                      onClick={() => handleSelect(questionIndex, displayIndex)}
                      disabled={isSolved || wasWrong}
                      aria-pressed={isSolved && isCorrectOption}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                        isSolved && isCorrectOption
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : wasWrong
                            ? 'border-amber-500/30 bg-amber-500/5 text-muted line-through'
                            : isSolved
                              ? 'border-border/30 bg-background/30 text-muted'
                              : 'border-border/40 bg-background/40 hover:border-primary/30 hover:bg-card/60'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <div aria-live="polite">
                {isSolved && (
                  <p className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    Correct. {question.explanation}
                  </p>
                )}
                {lastWrong && (
                  <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                    Not quite. Revisit the lesson section on this idea, then try again. A correct answer now earns {nextWorth} credits.
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
