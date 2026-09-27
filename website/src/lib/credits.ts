import type { LessonMeta } from './lessons';
import { LESSON_EXPERIMENTS } from './lessonExperiments';

/**
 * Credit rules
 *
 * - A lesson's quiz credits (lesson.xp) are split evenly across its questions.
 * - Each question pays its full share on the first try, half on the second,
 *   and a quarter after that, so credits reflect understanding, not just completion.
 * - Lessons with a circuit experiment pay a bonus (10% of lesson.xp) once, when the
 *   learner builds the target state themselves (without loading the example).
 * - Retakes keep the best quiz score.
 */
export const RETRY_MULTIPLIERS = [1, 0.5, 0.25] as const;
export const EXPERIMENT_BONUS_RATE = 0.1;

export function retryMultiplier(wrongAttempts: number): number {
  return RETRY_MULTIPLIERS[Math.min(wrongAttempts, RETRY_MULTIPLIERS.length - 1)];
}

/** Credits earned for a quiz, given the number of wrong attempts on each question. */
export function quizCredits(lessonXp: number, wrongAttemptsPerQuestion: number[]): number {
  if (wrongAttemptsPerQuestion.length === 0) return lessonXp;
  const share = lessonXp / wrongAttemptsPerQuestion.length;
  const earned = wrongAttemptsPerQuestion.reduce((sum, wrong) => sum + share * retryMultiplier(wrong), 0);
  return Math.round(earned);
}

export function hasCircuitExperiment(lesson: LessonMeta): boolean {
  return LESSON_EXPERIMENTS[lesson.id]?.mode === 'circuit' && lesson.allowedGates.length > 0;
}

export function experimentBonusCredits(lesson: LessonMeta): number {
  return hasCircuitExperiment(lesson) ? Math.round(lesson.xp * EXPERIMENT_BONUS_RATE) : 0;
}

export function maxLessonCredits(lesson: LessonMeta): number {
  return lesson.xp + experimentBonusCredits(lesson);
}
