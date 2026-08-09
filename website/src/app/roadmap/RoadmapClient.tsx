'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDisplayLessonNumber, ORDERED_LESSONS } from '@/lib/lessons';

const CHECKLIST_STORAGE_KEY = 'qcpath-roadmap-checklist';

type RoadmapTask = {
  id: string;
  label: string;
};

type RoadmapPhase = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  goal: string;
  lessonStart: number;
  lessonEnd: number;
  topics: string[];
  tasks: RoadmapTask[];
  evidence: string[];
};

const PHASES: RoadmapPhase[] = [
  {
    id: 'mental-model',
    number: '01',
    eyebrow: 'Foundation',
    title: 'Build the mental model',
    goal: 'Describe qubits, amplitudes, probability, phase, measurement, and entanglement without relying on vague “quantum magic” language.',
    lessonStart: 0,
    lessonEnd: 9,
    topics: ['What information a qubit stores', 'Why measurement is probabilistic', 'How gates change amplitudes and phase', 'What the Bloch sphere can and cannot show', 'Why multi-qubit state spaces grow quickly'],
    tasks: [
      { id: 'mental-model-explain', label: 'Explain a qubit to a software engineer using amplitudes and measurement probabilities.' },
      { id: 'mental-model-circuit', label: 'Build a one-qubit circuit, predict its output, and compare the result with the simulator.' },
      { id: 'mental-model-math', label: 'Read a state vector and verify that its probabilities add up to 1.' },
    ],
    evidence: ['You can distinguish a superposition from a classical random bit.', 'You can explain why a global phase is not directly observable and relative phase matters.'],
  },
  {
    id: 'reasoning-tools',
    number: '02',
    eyebrow: 'Core skills',
    title: 'Reason about circuits and noise',
    goal: 'Use the basic formal tools of quantum computing to analyze a circuit, explain its limitations, and discuss what real hardware changes.',
    lessonStart: 9,
    lessonEnd: 18,
    topics: ['Teleportation and no-cloning', 'Phase kickback and interference', 'Decoherence and noise', 'Density matrices and mixed states', 'Measurement theory, universal gates, and error correction'],
    tasks: [
      { id: 'reasoning-tools-derive', label: 'Trace a small circuit one gate at a time using state vectors or matrices.' },
      { id: 'reasoning-tools-noise', label: 'Describe at least three ways real hardware differs from an ideal simulator.' },
      { id: 'reasoning-tools-compare', label: 'Compare a universal gate set with a hardware-native gate set.' },
    ],
    evidence: ['You can explain an entanglement protocol without claiming that information travels faster than light.', 'You can identify when a pure-state model is insufficient and a density matrix is more appropriate.'],
  },
  {
    id: 'first-algorithms',
    number: '03',
    eyebrow: 'Algorithms',
    title: 'Understand the first quantum speedups',
    goal: 'Read and explain small quantum algorithms as sequences of oracle, interference, and measurement steps.',
    lessonStart: 18,
    lessonEnd: 21,
    topics: ['Deutsch-Jozsa and promise problems', 'Simon’s hidden-period structure', 'Grover’s oracle and diffusion operator', 'What “speedup” means under an idealized model'],
    tasks: [
      { id: 'first-algorithms-oracle', label: 'Describe what an oracle does and what assumptions an algorithm makes about it.' },
      { id: 'first-algorithms-interference', label: 'Show where interference removes unhelpful outcomes in one algorithm.' },
      { id: 'first-algorithms-caveat', label: 'Write a short explanation separating query complexity from total hardware cost.' },
    ],
    evidence: ['You can explain one algorithm on a whiteboard without treating the circuit as a black box.', 'You can state the problem model and the limitation behind the claimed advantage.'],
  },
  {
    id: 'fourier-phase',
    number: '04',
    eyebrow: 'Formal methods',
    title: 'Use Fourier and phase tools',
    goal: 'Connect the quantum Fourier transform, phase estimation, and period finding to the mathematics of amplitudes and interference.',
    lessonStart: 21,
    lessonEnd: 28,
    topics: ['The QFT as a basis change', 'QFT interference and circuit decomposition', 'Eigenphases and controlled powers', 'Precision, sampling, and phase estimation', 'Shor’s algorithm and complexity boundaries'],
    tasks: [
      { id: 'fourier-phase-basis', label: 'Explain why changing basis can reveal periodic structure.' },
      { id: 'fourier-phase-circuit', label: 'Identify Hadamard, controlled-phase, inverse-QFT, and swap operations in a circuit.' },
      { id: 'fourier-phase-precision', label: 'Discuss how qubit count and noise affect phase-estimation precision.' },
    ],
    evidence: ['You can follow the input, transformation, and measurement stages of phase estimation.', 'You can distinguish an algorithmic idea from the engineering resources required to run it.'],
  },
  {
    id: 'hybrid-systems',
    number: '05',
    eyebrow: 'Near-term practice',
    title: 'Connect algorithms to workflows',
    goal: 'Understand how variational algorithms, Hamiltonian methods, and optimization workflows combine quantum circuits with classical computation.',
    lessonStart: 28,
    lessonEnd: 35,
    topics: ['Variational algorithms and parameter optimization', 'VQE and expected energy', 'QAOA cost and mixer layers', 'Hamiltonian simulation', 'Annealing and adiabatic computation', 'Complexity and the boundary of quantum advantage'],
    tasks: [
      { id: 'hybrid-workflows-loop', label: 'Draw the classical-quantum-classical loop of a variational algorithm.' },
      { id: 'hybrid-workflows-measure', label: 'Explain why expectation values require repeated measurements.' },
      { id: 'hybrid-workflows-evaluate', label: 'List the practical costs that can make a near-term quantum workflow ineffective.' },
    ],
    evidence: ['You can explain what the quantum circuit contributes and what the classical optimizer contributes.', 'You can discuss noise, sampling, barren plateaus, and measurement cost as practical concerns.'],
  },
  {
    id: 'professional-entry',
    number: '06',
    eyebrow: 'Professional entry',
    title: 'Build a credible starting portfolio',
    goal: 'Move from reading concepts to discussing hardware, security, compilation, and a small body of work you can show to a mentor or hiring team.',
    lessonStart: 35,
    lessonEnd: 40,
    topics: ['BB84 and incompatible measurement bases', 'Superconducting, trapped-ion, neutral-atom, and photonic platforms', 'Native gates, connectivity, routing, and scheduling', 'Phase and amplitude as an advanced synthesis', 'How to communicate simulator limits honestly'],
    tasks: [
      { id: 'professional-entry-project', label: 'Publish one small circuit experiment with a prediction, result, and explanation.' },
      { id: 'professional-entry-hardware', label: 'Compare two hardware platforms using qubits, connectivity, control, readout, and error tradeoffs.' },
      { id: 'professional-entry-compiler', label: 'Explain how an abstract circuit becomes a hardware-aware circuit.' },
      { id: 'professional-entry-portfolio', label: 'Write a README that documents your assumptions, results, limitations, and next experiment.' },
      { id: 'professional-entry-next', label: 'Choose a next specialization: quantum software, algorithms, error correction, hardware, education, or tooling.' },
    ],
    evidence: ['You have a small, reproducible project that demonstrates both quantum understanding and software practice.', 'You can begin an entry-level conversation about quantum computing roles without overstating your experience.'],
  },
];

export default function RoadmapClient() {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) setCheckedTasks(JSON.parse(saved) as Record<string, boolean>);
    } catch {
      // The roadmap remains usable when browser storage is unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checkedTasks));
    } catch {
      // The checklist still works for the current session without storage.
    }
  }, [checkedTasks, hydrated]);

  const totalTasks = PHASES.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  function toggleTask(taskId: string) {
    setCheckedTasks((current) => ({ ...current, [taskId]: !current[taskId] }));
  }

  function clearChecklist() {
    setCheckedTasks({});
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="border-b border-border/60 pb-8">
        <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">Self-paced learning roadmap</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-foreground">Learn quantum computing by capability, not by calendar.</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
          Work through the phases in order, pause when a concept needs more practice, and return to any section when your project raises a new question. The target is a strong beginner-to-entry-level foundation: enough theory, coding practice, and vocabulary to start contributing to quantum software, education, research support, or tooling work.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted/80">
          This is not a job guarantee. Professional readiness comes from pairing these lessons with Python, linear algebra, version control, clear writing, and a small reproducible portfolio.
        </p>
      </header>

      <div className="mt-8 border-y border-border/50 py-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted">Your roadmap checklist</p>
            <p className="mt-1 text-sm text-foreground">{completedTasks} of {totalTasks} practice goals complete</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-primary">{completionPercent}%</span>
            <button type="button" onClick={clearChecklist} className="text-xs text-muted underline decoration-border underline-offset-4 transition hover:text-foreground">
              clear checklist
            </button>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-border/50" aria-hidden="true">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${completionPercent}%` }} />
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {PHASES.map((phase) => {
          const phaseLessons = ORDERED_LESSONS.slice(phase.lessonStart, phase.lessonEnd);
          const phaseCompleted = phase.tasks.filter((task) => checkedTasks[task.id]).length;

          return (
            <details key={phase.id} className="group rounded-2xl border border-border/50 bg-card/30">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 marker:hidden [&::-webkit-details-marker]:hidden sm:px-6">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-mono text-primary">{phase.number}</span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.16em] text-primary">{phase.eyebrow}</p>
                    <h2 className="mt-1 text-lg font-semibold text-foreground">{phase.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{phase.goal}</p>
                  </div>
                </div>
                <span className="mt-1 shrink-0 text-xl text-muted transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>

              <div className="border-t border-border/40 px-5 py-6 sm:px-6">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-muted">Practice checklist</h3>
                      <span className="text-xs font-mono text-muted">{phaseCompleted}/{phase.tasks.length}</span>
                    </div>
                    <div className="mt-3 space-y-3">
                      {phase.tasks.map((task) => (
                        <label key={task.id} className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/30 px-3 py-3 text-sm leading-relaxed text-foreground/85">
                          <input
                            type="checkbox"
                            checked={Boolean(checkedTasks[task.id])}
                            onChange={() => toggleTask(task.id)}
                            className="mt-1 h-4 w-4 shrink-0 accent-primary"
                          />
                          <span className={checkedTasks[task.id] ? 'text-muted line-through decoration-primary/60' : ''}>{task.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-7">
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-muted">Topics to discuss</h3>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        {phase.topics.map((topic) => <li key={topic} className="flex gap-2"><span className="text-primary">/</span><span>{topic}</span></li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-muted">You are ready to continue when</h3>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        {phase.evidence.map((item) => <li key={item} className="flex gap-2"><span className="text-emerald-400">+</span><span>{item}</span></li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-border/40 pt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted">Lessons in this phase</h3>
                    <span className="text-xs font-mono text-muted">{phaseLessons.length} lessons</span>
                  </div>
                  <div className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {phaseLessons.map((lesson) => (
                      <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="flex gap-3 border-b border-border/30 py-2 text-sm text-foreground/80 transition hover:border-primary/40 hover:text-primary">
                        <span className="w-6 shrink-0 font-mono text-xs text-primary">{String(getDisplayLessonNumber(lesson.id)).padStart(2, '0')}</span>
                        <span>{lesson.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          );
        })}
      </div>

      <footer className="mt-10 border-t border-border/60 pt-6 text-sm leading-relaxed text-muted">
        The strongest next step after this roadmap is a small public project: reproduce one circuit, document what the simulator assumes, compare ideal probabilities with finite-shot samples, and explain one limitation honestly.
      </footer>
    </div>
  );
}
