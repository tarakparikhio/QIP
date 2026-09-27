import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LESSONS, getFirstIncompleteLesson } from '../lessons';

export type LessonScore = {
  /** Best quiz credits earned for this lesson. */
  earned: number;
  /** Quiz credits available for this lesson. */
  max: number;
};

interface ProgressState {
  completedModules: string[];
  currentUnlockedModule: string;
  /** Total credits: best quiz scores plus experiment bonuses. Derived; kept for display. */
  totalXP: number;
  quizResults: Record<string, boolean>;
  lessonScores: Record<string, LessonScore>;
  experimentBonuses: Record<string, number>;

  // Actions
  recordLessonScore: (moduleId: string, earned: number, max: number) => void;
  awardExperimentBonus: (moduleId: string, credits: number) => void;
  /** Mark lessons as already known. This unlocks them but awards no credits. */
  completeSelectedModules: (moduleIds: string[]) => void;
  resetProgress: () => void;
}

const INITIAL_STATE = {
  completedModules: [] as string[],
  currentUnlockedModule: 'birth-of-quantum-information',
  totalXP: 0,
  quizResults: {} as Record<string, boolean>,
  lessonScores: {} as Record<string, LessonScore>,
  experimentBonuses: {} as Record<string, number>,
};

function sumCredits(scores: Record<string, LessonScore>, bonuses: Record<string, number>): number {
  const quiz = Object.values(scores).reduce((sum, score) => sum + score.earned, 0);
  const bonus = Object.values(bonuses).reduce((sum, credits) => sum + credits, 0);
  return quiz + bonus;
}

function withCompletion(completedModules: string[], moduleId: string) {
  const next = completedModules.includes(moduleId) ? completedModules : [...completedModules, moduleId];
  return {
    completedModules: next,
    currentUnlockedModule: getFirstIncompleteLesson(next)?.slug ?? moduleId,
  };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      recordLessonScore: (moduleId, earned, max) => {
        set((state) => {
          const previous = state.lessonScores[moduleId];
          const best = previous && previous.earned >= earned ? previous : { earned, max };
          const lessonScores = { ...state.lessonScores, [moduleId]: best };
          return {
            ...state,
            ...withCompletion(state.completedModules, moduleId),
            quizResults: { ...state.quizResults, [moduleId]: true },
            lessonScores,
            totalXP: sumCredits(lessonScores, state.experimentBonuses),
          };
        });
      },

      awardExperimentBonus: (moduleId, credits) => {
        set((state) => {
          if (state.experimentBonuses[moduleId] !== undefined || credits <= 0) return state;
          const experimentBonuses = { ...state.experimentBonuses, [moduleId]: credits };
          return { ...state, experimentBonuses, totalXP: sumCredits(state.lessonScores, experimentBonuses) };
        });
      },

      completeSelectedModules: (moduleIds) => {
        set((state) => {
          const newModules = moduleIds.filter((moduleId) => !state.completedModules.includes(moduleId));
          if (newModules.length === 0) return state;
          const completedModules = [...state.completedModules, ...newModules];
          return {
            ...state,
            completedModules,
            currentUnlockedModule: getFirstIncompleteLesson(completedModules)?.slug ?? state.currentUnlockedModule,
          };
        });
      },

      resetProgress: () => set({ ...INITIAL_STATE, quizResults: {}, lessonScores: {}, experimentBonuses: {} }),
    }),
    {
      name: 'qcpath-progress',
      storage: createJSONStorage(() => {
        // Guard for SSR — Zustand persist calls storage during hydration
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      version: 2,
      // v1 stored only a running XP total. Keep learners' earned credits by giving each
      // lesson completed under the old rules its full quiz credits.
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as Partial<ProgressState>;
        if (version < 2) {
          const completed = state.completedModules ?? [];
          const lessonScores: Record<string, LessonScore> = {};
          for (const slug of completed) {
            const lesson = LESSONS.find((item) => item.slug === slug);
            if (lesson) lessonScores[slug] = { earned: lesson.xp, max: lesson.xp };
          }
          return {
            ...INITIAL_STATE,
            ...state,
            lessonScores,
            experimentBonuses: {},
            totalXP: sumCredits(lessonScores, {}),
          } as ProgressState;
        }
        return state as ProgressState;
      },
    }
  )
);
