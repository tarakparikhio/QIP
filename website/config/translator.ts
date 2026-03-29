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
];
