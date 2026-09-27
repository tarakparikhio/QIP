import { LESSON_PRACTICE, PracticeProblem } from './lessonPractice';

export type DailyQuestion = { problem: PracticeProblem; lessonId: number; dateKey: string };

/** Local calendar date as YYYY-MM-DD. */
export function localDateKey(date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function previousDateKey(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  return localDateKey(new Date(year, month - 1, day - 1));
}

/** Same question for everyone on the same date; cycles through all practice problems. */
export function getDailyQuestion(dateKey = localDateKey()): DailyQuestion {
  const all = Object.entries(LESSON_PRACTICE).flatMap(([lessonId, problems]) => problems.map((problem) => ({ problem, lessonId: Number(lessonId) })));
  let hash = 2166136261;
  for (const char of dateKey) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  const pick = all[hash % all.length];
  return { ...pick, dateKey };
}

export type DailyStreak = { lastSolved: string | null; streak: number; best: number };
const KEY = 'qcpath-daily';

export function readStreak(): DailyStreak {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as DailyStreak;
  } catch {
    // Storage may be unavailable (private mode); fall back to an empty streak.
  }
  return { lastSolved: null, streak: 0, best: 0 };
}

/** Record today's solve and return the updated streak. */
export function recordSolve(today: string): DailyStreak {
  const current = readStreak();
  if (current.lastSolved === today) return current;
  const streak = current.lastSolved === previousDateKey(today) ? current.streak + 1 : 1;
  const next = { lastSolved: today, streak, best: Math.max(current.best, streak) };
  try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  return next;
}

/** A streak is only "alive" if the last solve was today or yesterday. */
export function liveStreak(streak: DailyStreak, today: string): number {
  return streak.lastSolved === today || streak.lastSolved === previousDateKey(today) ? streak.streak : 0;
}
