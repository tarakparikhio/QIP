import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CHALLENGE_POINTS } from '../classicalLogic';
import { retryMultiplier } from '../credits';

export type ChallengeResult = { points: number; wrongAttempts: number };

interface LogicLabState {
  /** Best result per solved challenge. */
  results: Record<string, ChallengeResult>;
  /** Gates the learner has opened in the explorer. */
  exploredGates: string[];
  recordSolve: (challengeId: string, wrongAttempts: number) => void;
  markExplored: (gateId: string) => void;
  resetLab: () => void;
}

/**
 * Logic Lab progress is kept apart from lesson credits so the header's lesson
 * progress keeps meaning "how far through the quantum course am I".
 */
export const useLogicLabStore = create<LogicLabState>()(
  persist(
    (set) => ({
      results: {},
      exploredGates: [],

      recordSolve: (challengeId, wrongAttempts) => {
        set((state) => {
          const points = Math.round(CHALLENGE_POINTS * retryMultiplier(wrongAttempts));
          const previous = state.results[challengeId];
          if (previous && previous.points >= points) return state;
          return { results: { ...state.results, [challengeId]: { points, wrongAttempts } } };
        });
      },

      markExplored: (gateId) => {
        set((state) => (state.exploredGates.includes(gateId) ? state : { exploredGates: [...state.exploredGates, gateId] }));
      },

      resetLab: () => set({ results: {}, exploredGates: [] }),
    }),
    {
      name: 'qcpath-logic-lab',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
        }
        return localStorage;
      }),
      version: 1,
    }
  )
);
