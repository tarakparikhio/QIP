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

const advancedModules = [
  ['24: Universal Gate Sets', 'universal-gate-sets'],
  ['25: Measurement Theory (Deep)', 'measurement-theory-deep'],
  ['26: Quantum Fourier Transform (QFT)', 'quantum-fourier-transform-qft'],
  ['27: QFT Circuit Implementation', 'qft-circuit-implementation'],
  ['28: Phase Estimation', 'phase-estimation-deep'],
  ['29: Hamiltonian Simulation', 'hamiltonian-simulation-deep'],
  ['30: Variational Quantum Eigensolver (VQE)', 'variational-quantum-eigensolver-vqe'],
  ['31: Quantum Approximate Optimization Algorithm (QAOA)', 'quantum-approximate-optimization-algorithm-qaoa'],
  ['32: Quantum Annealing', 'quantum-annealing'],
  ['33: Adiabatic Quantum Computation', 'adiabatic-quantum-computation'],
  ['34: Phase Kickback (Advanced)', 'phase-kickback-advanced'],
  ['35: Phase, Amplitude, and Interference (Advanced View)', 'phase-amplitude-and-interference-advanced-view'],
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
        <Link href="/lessons/birth-of-quantum-information" className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">
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

      <section className="mt-10 rounded-2xl border border-border/40 bg-card/50 p-6">
        <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Beyond the current catalog</p>
        <h2 className="mb-4 text-lg font-semibold">Advanced modules 24–35</h2>
        <div className="grid gap-x-8 gap-y-2 text-sm text-foreground/80 sm:grid-cols-2">
          {advancedModules.map(([label, slug]) => (
            <Link key={slug} href={`/lessons/${slug}`} className="border-b border-border/30 py-2 hover:text-primary transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
