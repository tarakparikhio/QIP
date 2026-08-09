// Note: Requires installing 'zustand' via npm install zustand
import { create } from 'zustand';
import { CircuitRunner, GateOperation } from '../quantum-engine/run';
import { Complex, BlochVector, computeQubitBlochVectors } from '../quantum-engine/math';

interface CircuitState {
  numQubits: number;
  operations: GateOperation[];
  probabilities: number[];
  amplitudes: Complex[];
  qubitBlochVectors: BlochVector[];

  // Actions
  setNumQubits: (n: number) => void;
  addOperation: (op: GateOperation) => void;
  insertOperation: (index: number, op: GateOperation) => void;
  removeOperation: (index: number) => void;
  moveOperation: (fromIndex: number, toIndex: number) => void;
  clearCircuit: () => void;
  loadOps: (ops: GateOperation[]) => void;
  recalculate: () => void;
}

export const useCircuitStore = create<CircuitState>((set, get) => ({
  numQubits: 1,
  operations: [],
  probabilities: [1, 0], // Initial state |0>
  amplitudes: [new Complex(1, 0), new Complex(0, 0)], // Initial state |0>
  qubitBlochVectors: [{ x: 0, y: 0, z: 1, purity: 1 }], // Initial state |0⟩ → north pole

  setNumQubits: (n) => {
    set({ numQubits: n, operations: [] });
    get().recalculate();
  },

  addOperation: (op) => {
    set((state) => ({ operations: [...state.operations, op] }));
    get().recalculate();
  },

  insertOperation: (index, op) => {
    set((state) => {
      const newOps = [...state.operations];
      newOps.splice(Math.max(0, Math.min(index, newOps.length)), 0, op);
      return { operations: newOps };
    });
    get().recalculate();
  },

  removeOperation: (index) => {
    set((state) => {
      const newOps = [...state.operations];
      newOps.splice(index, 1);
      return { operations: newOps };
    });
    get().recalculate();
  },

  moveOperation: (fromIndex, toIndex) => {
    set((state) => {
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= state.operations.length || toIndex >= state.operations.length) {
        return state;
      }
      const newOps = [...state.operations];
      const [op] = newOps.splice(fromIndex, 1);
      newOps.splice(toIndex, 0, op);
      return { operations: newOps };
    });
    get().recalculate();
  },

  clearCircuit: () => {
    set({ operations: [] });
    get().recalculate();
  },

  loadOps: (ops) => {
    set({ operations: [...ops] });
    get().recalculate();
  },

  recalculate: () => {
    const { numQubits, operations } = get();
    const runner = new CircuitRunner(numQubits);
    try {
      runner.run(operations);
      const amplitudes = runner.state.amplitudes;
      set({ 
        probabilities: runner.getProbabilities(),
        amplitudes,
        qubitBlochVectors: computeQubitBlochVectors(amplitudes, numQubits),
      });
    } catch (e) {
      console.error("Failed to run circuit:", e);
    }
  }
}));
