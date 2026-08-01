import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '30-Day Quantum Refresh Plan',
  description: 'A guided one-month study path using the existing Quantum Playground lessons and curriculum.',
};

const weeks = [
  {
    title: 'Week 1 — Build the mental model',
    days: [
      'Day 1: Birth of quantum information',
      'Day 2: Superposition',
      'Day 3: Measurement',
      'Day 4: Entanglement',
      'Day 5: Interference',
      'Day 6: Quantum gates',
      'Day 7: Review and recap',
    ],
  },
  {
    title: 'Week 2 — Learn the geometry of qubits',
    days: [
      'Day 8: Single-qubit rotations',
      'Day 9: Bloch sphere',
      'Day 10: Multi-qubit systems',
      'Day 11: Tensor products',
      'Day 12: Decoherence',
      'Day 13: Quantum noise and errors',
      'Day 14: Review and recap',
    ],
  },
  {
    title: 'Week 3 — Move from intuition to formalism',
    days: [
      'Day 15: Quantum channels',
      'Day 16: Hamiltonians',
      'Day 17: Eigenstates and eigenvalues',
      'Day 18: Commutators',
      'Day 19: Unitary evolution',
      'Day 20: Dirac notation',
      'Day 21: Review and recap',
    ],
  },
  {
    title: 'Week 4 — Connect to algorithms',
    days: [
      'Day 22: States as vectors',
      'Day 23: Linear operators and quantum gates',
      'Day 24: Controlled gates and entangling operations',
      'Day 25: Universal gate sets',
      'Day 26: Measurement theory',
      'Day 27: QFT and phase estimation foundations',
      'Day 28: Practice and circuit design',
    ],
  },
  {
    title: 'Week 5 — Advanced algorithms and capstone',
    days: [
      'Day 29: Hamiltonian simulation and variational methods',
      'Day 30: QAOA, VQE, and a capstone reflection',
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">30-Day Refresh Plan</p>
        <h1 className="text-4xl font-bold mb-4">A structured path through the quantum curriculum.</h1>
        <p className="text-muted leading-relaxed max-w-3xl">
          This roadmap turns the existing lesson set into a practical one-month study journey. Each day keeps the focus narrow: one concept, one intuition, one small exercise.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <Link href="/lessons/intro-to-quantum-information" className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">
          Start with lesson 1
        </Link>
        <Link href="/lessons" className="px-5 py-2.5 rounded-xl border border-border hover:border-primary/40 text-muted hover:text-foreground text-sm transition-colors">
          Browse the lesson catalog
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {weeks.map((week) => (
          <section key={week.title} className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{week.title}</h2>
            <ul className="space-y-2 text-sm text-foreground/80">
              {week.days.map((day) => (
                <li key={day} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
                  <span>{day}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold mb-2">How to use this plan</h2>
        <p className="text-sm text-muted leading-relaxed">
          Read one lesson per day, try the simulator or a small hand calculation, and finish by writing a 3-line summary in your own words. The goal is to build momentum and make the ideas stick.
        </p>
      </div>
    </div>
  );
}
