export const featuredPaths: Array<{
  id: string;
  label: string;
  description: string;
  targetLessonIds: number[];
  color: "accent" | "emerald" | "amber" | "rose";
  emoji: string;
}> = [
  {
    id: "start-from-zero",
    label: "Start from Zero",
    description:
      "Begin with foundational quantum concepts. Perfect for newcomers to both quantum computing and software engineering.",
    targetLessonIds: [1, 2, 3, 4, 5],
    color: "accent",
    emoji: "🚀",
  },
  {
    id: "math-first",
    label: "Math-First Path",
    description:
      "Dive into the mathematical foundations: linear algebra, eigenstates, unitary operators, and formal quantum mechanics.",
    targetLessonIds: [14, 15, 16, 17, 18, 19],
    color: "amber",
    emoji: "📐",
  },
  {
    id: "interview-prep",
    label: "Interview Prep",
    description:
      "Fast track through gates, circuits, algorithms, and real Qiskit code. Ideal for interview preparation or algorithm-focused learning.",
    targetLessonIds: [6, 7, 8, 9, 20, 21, 22, 23],
    color: "rose",
    emoji: "⚡",
  },
  {
    id: "intuition-builder",
    label: "Intuition Builder",
    description:
      "Strong on analogies and visual intuition. Learn by comparing quantum concepts to familiar classical computing ideas.",
    targetLessonIds: [1, 2, 3, 5, 11, 12, 13, 24, 25],
    color: "emerald",
    emoji: "🧠",
  },
];
