import type { Metadata } from 'next';
import Link from 'next/link';
import { BlockMath } from '@/components/math';
import CodeBlock from '@/components/CodeBlock';

export const metadata: Metadata = {
  title: 'Quantum Gate Reference',
  description: 'A visual reference for the single-qubit and multi-qubit gates used throughout Quantum Playground.',
};

type Gate = {
  name: string;
  symbol: string;
  family: string;
  action: string;
  equation: string;
  qiskit: string;
};

const singleQubitGates: Gate[] = [
  { name: 'Hadamard', symbol: 'H', family: 'Basis change', action: 'Creates and recombines equal superpositions.', equation: 'H|0\\rangle=|+\\rangle,\\quad H|1\\rangle=|-\\rangle', qiskit: 'circuit.h(0)' },
  { name: 'Pauli-X', symbol: 'X', family: 'Bit flip', action: 'Swaps |0⟩ and |1⟩.', equation: 'X|0\\rangle=|1\\rangle,\\quad X|1\\rangle=|0\\rangle', qiskit: 'circuit.x(0)' },
  { name: 'Pauli-Y', symbol: 'Y', family: 'Bit + phase flip', action: 'Flips the basis state and adds an imaginary phase.', equation: 'Y|0\\rangle=i|1\\rangle,\\quad Y|1\\rangle=-i|0\\rangle', qiskit: 'circuit.y(0)' },
  { name: 'Pauli-Z', symbol: 'Z', family: 'Phase flip', action: 'Leaves |0⟩ unchanged and negates |1⟩.', equation: 'Z(\\alpha|0\\rangle+\\beta|1\\rangle)=\\alpha|0\\rangle-\\beta|1\\rangle', qiskit: 'circuit.z(0)' },
  { name: 'S', symbol: 'S', family: 'Quarter-turn phase', action: 'Adds a π/2 phase to the |1⟩ component.', equation: 'S=\\begin{pmatrix}1&0\\\\0&i\\end{pmatrix}', qiskit: 'circuit.s(0)' },
  { name: 'T', symbol: 'T', family: 'Eighth-turn phase', action: 'Adds a π/4 phase to the |1⟩ component.', equation: 'T=\\begin{pmatrix}1&0\\\\0&e^{i\\pi/4}\\end{pmatrix}', qiskit: 'circuit.t(0)' },
  { name: 'RX / RY / RZ', symbol: 'R', family: 'Continuous rotations', action: 'Rotates a qubit around one Bloch-sphere axis. In the playground these are fixed quarter turns (θ = π/2); in Qiskit you choose any angle.', equation: 'R_y(\\theta)=e^{-i\\theta Y/2}', qiskit: 'circuit.ry(0.7, 0)' },
];

const multiQubitGates: Gate[] = [
  { name: 'Controlled-NOT', symbol: 'CX', family: 'Entangling gate', action: 'Applies X to the target when the control is |1⟩.', equation: '\\mathrm{CX}|c,t\\rangle=|c,t\\oplus c\\rangle', qiskit: 'circuit.cx(0, 1)' },
  { name: 'Controlled-Z', symbol: 'CZ', family: 'Conditional phase', action: 'Adds a minus sign only to |11⟩.', equation: '\\mathrm{CZ}|11\\rangle=-|11\\rangle', qiskit: 'circuit.cz(0, 1)' },
  { name: 'SWAP', symbol: 'SWAP', family: 'Register movement', action: 'Exchanges the states of two qubits.', equation: '\\mathrm{SWAP}|a,b\\rangle=|b,a\\rangle', qiskit: 'circuit.swap(0, 1)' },
];

function GateCard({ gate }: { gate: Gate }) {
  return (
    <article className="rounded-2xl border border-border/50 bg-card/40 p-5 transition hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">{gate.family}</p>
          <h3 className="mt-2 text-lg font-semibold">{gate.name}</h3>
        </div>
        <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-lg text-primary">{gate.symbol}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{gate.action}</p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border/40 bg-background/50 px-3 py-2"><BlockMath math={gate.equation} /></div>
      <p className="mt-4 text-xs text-muted">Qiskit: <code className="text-accent">{gate.qiskit}</code></p>
    </article>
  );
}

export default function GatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">Reference lab</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Quantum gates, one operation at a time.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">Use this page as a map while working through the lessons. Each gate has an intuition, a compact equation, and the Qiskit call you can copy into a local experiment.</p>
      </div>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-mono uppercase tracking-widest text-primary">Single qubit</p><h2 className="mt-2 text-2xl font-semibold">Change amplitude and phase</h2></div><span className="text-xs text-muted">7 families</span></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{singleQubitGates.map((gate) => <GateCard key={gate.name} gate={gate} />)}</div>
      </section>

      <section className="mt-14">
        <div className="mb-5"><p className="text-xs font-mono uppercase tracking-widest text-primary">Multiple qubits</p><h2 className="mt-2 text-2xl font-semibold">Connect, condition, and move states</h2></div>
        <div className="grid gap-4 md:grid-cols-3">{multiQubitGates.map((gate) => <GateCard key={gate.name} gate={gate} />)}</div>
      </section>

      <section className="mt-14 grid gap-5 border-t border-border/60 pt-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div><p className="text-xs font-mono uppercase tracking-widest text-accent">A useful habit</p><h2 className="mt-2 text-2xl font-semibold">Predict before you run.</h2><p className="mt-3 text-sm leading-relaxed text-muted">Write down the state before and after one gate. Then use the simulator or Qiskit to check your prediction. When they disagree, inspect the basis, phase, qubit order, and measurement step before blaming the hardware.</p></div>
        <CodeBlock code={`from qiskit import QuantumCircuit\n\ncircuit = QuantumCircuit(2)\ncircuit.h(0)\ncircuit.cx(0, 1)\nprint(circuit)`} label="A two-gate experiment" />
      </section>

      <div className="mt-10 flex flex-wrap gap-3 text-sm"><Link href="/lessons" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90">Open lessons</Link><Link href="/run-on-ibm" className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-accent hover:border-accent/70">Run on IBM Quantum</Link></div>
    </div>
  );
}
