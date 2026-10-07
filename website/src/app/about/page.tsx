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
          <p>The course has 40 lessons in three levels, from what a qubit is to Shor&apos;s algorithm, error correction, and real hardware. Each lesson follows the same pattern:</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5">
            <li><strong className="text-foreground">Read</strong> the idea, with the math worked out step by step.</li>
            <li><strong className="text-foreground">Build</strong> the circuit in the lesson&apos;s playground, predict the result, then run it.</li>
            <li><strong className="text-foreground">Practice the math</strong> with short numeric problems. Each one connects the idea to probability and statistics you already know.</li>
            <li><strong className="text-foreground">Check yourself</strong> with a three-question quiz. Credits reward first-try answers, and you can retake a check to raise your mastery.</li>
          </ol>
          <p className="mt-3">Your progress, credits, and streaks are saved in your browser only. Nothing is sent to a server, and there is no account to create.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">What the simulator shows</h2>
          <p>The playground is an ideal state-vector simulator. Its probability bars are exact theoretical probabilities in the computational basis; real devices return sampled measurements and are affected by noise, calibration, and hardware limits.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Scope</h2>
          <p>Lessons prioritize accurate intuition, core mathematics, and small circuits. Complete small instances run directly in the playground, including teleportation, a 3-qubit error-correcting code, two-qubit Grover search, Simon&apos;s algorithm, and phase estimation. Larger algorithms, such as Shor&apos;s period finding and a multi-qubit QFT, are shown in the Qiskit code labs, which run on your own computer. Every code lab is tested against Qiskit 2.x, and every practice answer is recomputed automatically.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Sources and independence</h2>
          <p>This is an independent learning project, not an IBM, Qiskit, or hardware-provider product. Lessons link to primary papers, university notes, and maintained official documentation so you can check definitions and assumptions at the source. The full editorial method and model boundary are on the <Link href="/sources" className="text-primary hover:underline">Sources and method page</Link>.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">About the creator</h2>
          <p>I&apos;m Tarak Parikh, quietly learning quantum computing and building this project as I go. The site is a place to turn that learning into clear explanations, small experiments, and useful notes for other people starting out.</p>
          <a href="https://www.linkedin.com/in/tarakparikhio/" target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-primary hover:underline">Connect on LinkedIn</a>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Feedback</h2>
          <p>If something is unclear or mathematically misleading, please <a href="https://github.com/tarakparikhio/quantum-playground/issues/new" target="_blank" rel="noreferrer" className="text-primary hover:underline">open an issue on GitHub</a>. Every lesson also has a &ldquo;Report it on GitHub&rdquo; link that fills in the lesson for you. Specific examples, such as the lesson number, circuit, and expected outcome, are especially helpful.</p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/lessons" className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">Browse lessons</Link>
        <Link href="/roadmap" className="px-5 py-2.5 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 text-sm transition-colors">View learning roadmap</Link>
        <Link href="/playground" className="px-5 py-2.5 rounded-xl border border-border hover:border-primary/40 text-muted hover:text-foreground text-sm transition-colors">Open playground</Link>
        <Link href="/gates" className="px-5 py-2.5 rounded-xl border border-border hover:border-primary/40 text-muted hover:text-foreground text-sm transition-colors">Browse gate reference</Link>
        <Link href="/run-on-ibm" className="px-5 py-2.5 rounded-xl border border-accent/40 bg-accent/10 text-accent hover:border-accent/70 hover:text-foreground text-sm transition-colors">Run Qiskit on IBM</Link>
      </div>
    </div>
  );
}
