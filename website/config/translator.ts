import type { LearningMode } from "@/lib/learning-mode";

export const translatorExamples: Array<{
  id: string;
  lens: string;
  classical: string;
  quantum: string;
  explanation: string;
  bestFor: LearningMode | "both";
}> = [
  {
    id: "state-vs-variable",
    lens: "State representation",
    classical: "Variable -> current value",
    quantum: "State vector -> amplitudes with phase",
    explanation:
      "A classical variable stores one definite value, while a quantum state stores a structured distribution of amplitudes whose relative phase changes future behavior.",
    bestFor: "intuition",
  },
  {
    id: "conditional-control",
    lens: "Control flow",
    classical: "if (x === 1) { y = !y; }",
    quantum: "Controlled operation -> CNOT-style coherence",
    explanation:
      "The translator reframes branching as coherent control, where the condition can remain part of a superposed joint state rather than collapsing into a single branch immediately.",
    bestFor: "both",
  },
  {
    id: "logs-vs-measurement",
    lens: "Observability",
    classical: "Logs and output checks",
    quantum: "Measurement -> basis-dependent readout",
    explanation:
      "Measurement is not a passive debug print. It is a basis choice plus an interaction that converts quantum state information into a classical record.",
    bestFor: "intuition",
  },
  {
    id: "linear-algebra-operators",
    lens: "Mathematical structure",
    classical: "Matrix transform on a vector",
    quantum: "Unitary operator on Hilbert space",
    explanation:
      "Rigor starts when familiar linear algebra gets stricter: valid quantum evolution must preserve norm, respect complex amplitudes, and fit operator rules for the state space.",
    bestFor: "rigor",
  },
  {
    id: "optimization-loop",
    lens: "Optimization",
    classical: "Measure -> adjust -> optimize loop",
    quantum: "Variational circuit -> cost -> optimizer",
    explanation:
      "Many modern algorithms feel closest to an optimization loop, except the system you probe is a parameterized quantum state and your feedback comes through repeated measurement statistics.",
    bestFor: "rigor",
  },
  {
    id: "superposition",
    lens: "Multiplicity",
    classical: "One execution path at a time",
    quantum: "All outcomes computed in superposition",
    explanation:
      "Instead of running code on one input and getting one output, a quantum circuit simultaneously evolves all possible input combinations. Interference decides which outcomes interfere constructively or destructively.",
    bestFor: "intuition",
  },
  {
    id: "entanglement",
    lens: "Dependencies",
    classical: "Independent variables (no coupling)",
    quantum: "Entangled qubits -> correlated outcomes",
    explanation:
      "Entanglement creates correlations that can't be described by independent probability distributions. Measuring one qubit instantly defines constraints on potential outcomes for others, even across space.",
    bestFor: "intuition",
  },
  {
    id: "interference",
    lens: "Path amplitudes",
    classical: "Probability adds linearly",
    quantum: "Amplitudes add, probabilities are squared magnitudes",
    explanation:
      "Quantum amplitudes can be negative or complex, so paths can cancel out completely (destructive interference) or reinforce (constructive). This selective cancellation is the core mechanism behind quantum speedup.",
    bestFor: "rigor",
  },
  {
    id: "basis-freedom",
    lens: "Perspective",
    classical: "Data has one canonical representation",
    quantum: "Choose your measurement basis; answers change",
    explanation:
      "Every quantum state can be decomposed in infinitely many bases. Measuring in one basis gives a definite answer, but measuring in another basis would collapse to a different result. Choosing the right basis is often the key to an algorithm.",
    bestFor: "intuition",
  },
  {
    id: "reversibility",
    lens: "Information flow",
    classical: "print(x); -> information lost to console",
    quantum: "All quantum operations are reversible (unitary)",
    explanation:
      "Quantum evolution preserves information perfectly: if you know the final state and the gate sequence, you can always recover the initial state. Measurement is the only irreversible operation.",
    bestFor: "rigor",
  },
  {
    id: "parallelism",
    lens: "Computational resources",
    classical: "N bits → 2^N operations needed for exhaustive search",
    quantum: "N qubits → 2^N amplitudes evolved in parallel",
    explanation:
      "Quantum computers don't literally compute 2^N things separately. Instead, one quantum state somehow encodes all 2^N possibilities as amplitudes, and interference prunes away wrong answers.",
    bestFor: "intuition",
  },
  {
    id: "gates-as-rotations",
    lens: "Transformations",
    classical: "Logic gates flip bits deterministically",
    quantum: "Quantum gates rotate state vectors in Hilbert space",
    explanation:
      "Quantum gates are unitary matrices that rotate the state vector. Unlike classical gates that erase information, quantum gates can always be undone by applying their inverse.",
    bestFor: "rigor",
  },
];
