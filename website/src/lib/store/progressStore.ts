import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  completedModules: string[];
  currentUnlockedModule: string;
  totalXP: number;
  quizResults: Record<string, boolean>;

  // Actions
  completeModule: (moduleId: string, nextModuleId: string, xpEarned: number) => void;
  markQuizResult: (moduleId: string, passed: boolean) => void;
  resetProgress: () => void;
}

const INITIAL_STATE = {
  completedModules: [] as string[],
  currentUnlockedModule: 'birth-of-quantum-information',
  totalXP: 0,
  quizResults: {} as Record<string, boolean>,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      completeModule: (moduleId, nextModuleId, xpEarned) => {
        set((state) => {
          if (state.completedModules.includes(moduleId)) return state;
          return {
            ...state,
            completedModules: [...state.completedModules, moduleId],
            currentUnlockedModule: nextModuleId,
            totalXP: state.totalXP + xpEarned,
          };
        });
      },

      markQuizResult: (moduleId, passed) => {
        set((state) => ({
          ...state,
          quizResults: {
            ...state.quizResults,
            [moduleId]: passed,
          },
        }));
      },

      resetProgress: () => set({ ...INITIAL_STATE, quizResults: {} }),
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
      version: 1,
    }
  )
);
