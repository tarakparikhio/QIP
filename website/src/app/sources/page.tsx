import type { Metadata } from 'next';
import Link from 'next/link';
import { CORE_SOURCES } from '@/lib/lessonSources';

export const metadata: Metadata = {
  title: 'Sources and Method',
  description: 'The references, modeling boundaries, and editorial standards behind Quantum Playground.',
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-accent">Sources and method</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Learn what is being claimed, modeled, and left out.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Quantum Playground is an independent educational project. This page explains how the lessons use references, how the simulator works, and where a teaching example stops short of a hardware or research claim.
        </p>
      </div>

      <div className="mt-12 grid gap-5 border-y border-border/60 py-7 sm:grid-cols-3">
        <div><p className="font-mono text-primary">01</p><p className="mt-2 text-sm leading-relaxed text-muted">Start with the formal idea and its assumptions.</p></div>
        <div><p className="font-mono text-primary">02</p><p className="mt-2 text-sm leading-relaxed text-muted">Check the interactive result against the equation.</p></div>
        <div><p className="font-mono text-primary">03</p><p className="mt-2 text-sm leading-relaxed text-muted">Use the linked source for full definitions and evidence.</p></div>
      </div>

      <div className="mt-12 space-y-12">
        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Model boundary</p>
          <h2 className="text-2xl font-semibold">What the playground actually computes</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/80">
            <p>The circuit builder applies ideal gate matrices to a state vector and calculates exact computational-basis probabilities. It is useful for inspecting small circuits and building intuition about amplitudes, phase, and interference.</p>
            <p>It does not simulate a physical qubit. The optional measurement sampler adds finite-shot variation, but the model does not include relaxation, dephasing, crosstalk, calibration drift, readout error, device connectivity, transpilation, queue time, or provider-specific behavior. A displayed probability is therefore a theoretical result for the model, not a hardware measurement.</p>
            <p>Some advanced lessons intentionally reduce an algorithm to a small circuit or conceptual experiment. Their source links describe the full result; the lesson should not be read as an implementation benchmark or a security proof.</p>
          </div>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Editorial standard</p>
          <h2 className="text-2xl font-semibold">How the content is kept honest</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/80">
            <li><strong className="text-foreground">Definitions before hype:</strong> lessons introduce the state, operation, resource, or assumption before discussing possible advantage.</li>
            <li><strong className="text-foreground">Ideal versus real labels:</strong> simulator output, finite-shot sampling, and hardware behavior are described as different things.</li>
            <li><strong className="text-foreground">Primary and official reading:</strong> lesson panels link to original papers, university notes, standards-oriented public material, or maintained provider documentation where appropriate.</li>
            <li><strong className="text-foreground">Version awareness:</strong> the copyable examples target Qiskit 2.x, while provider APIs, account flows, pricing, and backend availability can change.</li>
            <li><strong className="text-foreground">Automated checks:</strong> every practice answer is recomputed independently, every Qiskit code lab is run against Qiskit 2.x, and the simulator is tested against a separate dense-matrix implementation on random circuits.</li>
            <li><strong className="text-foreground">Correction over certainty:</strong> a specific report with the lesson, equation, circuit, and expected result is more useful than a general disagreement.</li>
          </ul>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-accent">Start reading</p>
          <h2 className="text-2xl font-semibold">Core references</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {CORE_SOURCES.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="border border-border/50 bg-card/30 p-4 transition hover:border-primary/50">
                <span className="font-semibold text-primary hover:underline">{source.title}</span>
                <span className="mt-2 block text-xs font-mono text-muted">{source.publisher}</span>
                <span className="mt-3 block text-sm leading-relaxed text-foreground/75">{source.why}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="border-t border-border/60 pt-8">
          <h2 className="text-2xl font-semibold">Independence and feedback</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">Quantum Playground is not affiliated with IBM, Qiskit, or any hardware provider. Qiskit and IBM Quantum are one practical learning path; concepts can transfer to other ecosystems, but APIs and hardware behavior differ.</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">For corrections, include the lesson URL, the exact claim or equation, and a reproducible circuit or source. See the <Link href="/about" className="text-primary hover:underline">About page</Link> for project context.</p>
        </section>
      </div>
    </div>
  );
}