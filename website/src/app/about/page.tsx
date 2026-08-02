import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'How Quantum Playground teaches quantum computing and what its simulator represents.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">About Quantum Playground</p>
      <h1 className="text-4xl font-bold mb-5">A practical starting point for quantum computing.</h1>
      <p className="text-muted leading-relaxed text-lg mb-10">
        Quantum Playground is a free, growing learning project for people who want to build intuition before diving into a full quantum-computing textbook or SDK.
      </p>

      <div className="space-y-7 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">How to use it</h2>
          <p>Start with the lessons, use the supplied circuit example, then alter one gate at a time and observe the resulting state and probabilities. New lessons are planned in small batches, so the path can grow without making the foundation feel rushed.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">What the simulator shows</h2>
          <p>The playground is an ideal state-vector simulator. Its probability bars are exact theoretical probabilities in the computational basis; real devices return sampled measurements and are affected by noise, calibration, and hardware limits.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Scope</h2>
          <p>Lessons prioritize accurate intuition, core mathematics, and small circuits. Algorithm demonstrations are intentionally scaled down where a complete oracle, quantum Fourier transform, or error model would require more qubits and infrastructure than this beginner playground provides.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Sources and independence</h2>
          <p>This is an independent learning project, not an IBM, Qiskit, or hardware-provider product. The teaching material draws on standard quantum-information notation and publicly available documentation from the wider ecosystem. Use the linked provider documentation for current SDK behavior, account requirements, hardware availability, and pricing.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">About the creator</h2>
          <p>I&apos;m Tarak Parikh, quietly learning quantum computing and building this project as I go. The site is a place to turn that learning into clear explanations, small experiments, and useful notes for other people starting out.</p>
          <a href="https://www.linkedin.com/in/tarakparikhio/" target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-primary hover:underline">Connect on LinkedIn</a>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Feedback</h2>
          <p>If something is unclear or mathematically misleading, please share it through the project&apos;s repository. Specific examples—lesson number, circuit, and expected outcome—are especially helpful.</p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/lessons" className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">Browse lessons</Link>
        <Link href="/roadmap" className="px-5 py-2.5 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 text-sm transition-colors">View 30-day roadmap</Link>
        <Link href="/playground" className="px-5 py-2.5 rounded-xl border border-border hover:border-primary/40 text-muted hover:text-foreground text-sm transition-colors">Open playground</Link>
        <Link href="/gates" className="px-5 py-2.5 rounded-xl border border-border hover:border-primary/40 text-muted hover:text-foreground text-sm transition-colors">Browse gate reference</Link>
        <Link href="/run-on-ibm" className="px-5 py-2.5 rounded-xl border border-accent/40 bg-accent/10 text-accent hover:border-accent/70 hover:text-foreground text-sm transition-colors">Run Qiskit on IBM</Link>
      </div>
    </div>
  );
}
