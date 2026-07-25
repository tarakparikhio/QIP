import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  completedModules: string[];
  currentUnlockedModule: string;
  totalXP: number;

  // Actions
  completeModule: (moduleId: string, nextModuleId: string, xpEarned: number) => void;
  resetProgress: () => void;
}

const INITIAL_STATE = {
  completedModules: [] as string[],
  currentUnlockedModule: 'birth-of-quantum-information',
  totalXP: 0,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      completeModule: (moduleId, nextModuleId, xpEarned) => {
        set((state) => {
          if (state.completedModules.includes(moduleId)) return state;
          return {
            completedModules: [...state.completedModules, moduleId],
            currentUnlockedModule: nextModuleId,
            totalXP: state.totalXP + xpEarned,
          };
        });
      },

      resetProgress: () => set(INITIAL_STATE),
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
