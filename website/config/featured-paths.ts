export type FeaturedPath = {
  id: string;
  label: string;
  description: string;
  lessonIds: number[];
  color: "accent" | "emerald" | "amber" | "rose";
  emoji: string;
  bestFor: string;
  outcome: string;
};

export const featuredPaths: FeaturedPath[] = [
  {
    id: "start-from-zero",
    label: "Start from Zero",
    description:
      "Begin with foundational quantum concepts. Perfect for newcomers to both quantum computing and software engineering.",
    lessonIds: [1, 2, 3, 4, 5, 6],
    color: "accent",
    emoji: "🚀",
    bestFor: "First-time learners who want the cleanest linear ramp.",
    outcome: "Build stable intuition for qubits, superposition, measurement, entanglement, and gates.",
  },
  {
    id: "math-first",
    label: "Math-First Path",
    description:
      "Dive into the mathematical foundations: linear algebra, eigenstates, unitary operators, and formal quantum mechanics.",
    lessonIds: [14, 15, 16, 17, 18, 19],
    color: "amber",
    emoji: "📐",
    bestFor: "Learners who prefer equations, operators, and Hilbert-space structure early.",
    outcome: "Tighten intuition into formal reasoning about Hamiltonians, eigenstates, bras, kets, and operators.",
  },
  {
    id: "interview-prep",
    label: "Interview Prep",
    description:
      "Fast track through gates, circuits, algorithms, and real Qiskit code. Ideal for interview preparation or algorithm-focused learning.",
    lessonIds: [3, 4, 6, 11, 14, 28],
    color: "rose",
    emoji: "⚡",
    bestFor: "Engineers who need a compact review path for explanations and whiteboard conversations.",
    outcome: "Reinforce the concepts most likely to surface in interviews: measurement, entanglement, gates, noise, and phase estimation.",
  },
  {
    id: "intuition-builder",
    label: "Intuition Builder",
    description:
      "Strong on analogies and visual intuition. Learn by comparing quantum concepts to familiar classical computing ideas.",
    lessonIds: [1, 2, 3, 5, 11, 12, 13, 24, 25],
    color: "emerald",
    emoji: "🧠",
    bestFor: "People who want the analogy and systems-thinking bridge before the formalism.",
    outcome: "Create a stronger mental model for interference, noise, channels, universality, and advanced measurement ideas.",
  },
  {
    id: "advanced-algorithms",
    label: "Advanced Algorithms",
    description:
      "Jump into the algorithm-heavy end of the atlas when you already know the foundations and want the payoff layer first.",
    lessonIds: [26, 27, 28, 29, 30, 31],
    color: "accent",
    emoji: "🛰️",
    bestFor: "Returning learners who already know the basics and want QFT, QPE, simulation, VQE, and QAOA first.",
    outcome: "See how the platform connects foundations to algorithmic speedups, variational methods, and simulation workflows.",
  },
];
