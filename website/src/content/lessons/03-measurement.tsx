'use client';
import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson03Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50 not-prose">
        <h2 className="text-base font-semibold mb-4 text-primary font-mono uppercase tracking-widest">Background & Notation</h2>

        <div className="space-y-5 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">The Born Rule</h3>
            <p className="text-foreground/75 mb-3 leading-relaxed">
              Given state <InlineMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />, measuring in the computational basis yields outcome <InlineMath math="k" /> with probability:
            </p>
            <BlockMath math="P(k) = |\langle k|\psi\rangle|^2" />
            <div className="bg-background/60 rounded p-3 space-y-1.5 border border-border/30 text-xs">
              <div><InlineMath math="P(0) = |\alpha|^2 = \alpha^*\alpha" /></div>
              <div><InlineMath math="P(1) = |\beta|^2 = \beta^*\beta" /></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Wave Function Collapse</h3>
            <p className="text-foreground/75 leading-relaxed">
              After measurement yields outcome <InlineMath math="k" />, the state instantly collapses:
            </p>
            <BlockMath math="|\psi\rangle \xrightarrow{\text{measure}} |k\rangle" />
            <p className="text-foreground/60 text-xs mt-1">This is irreversible — the superposition is destroyed.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Key Properties</h3>
            <ul className="space-y-1.5 text-foreground/70 text-xs">
              <li><strong className="text-foreground">Non-deterministic:</strong> Quantum measurement outcomes cannot be predicted individually, only probabilistically.</li>
              <li><strong className="text-foreground">Basis-dependent:</strong> The probabilities depend on which basis you measure in, not just the state.</li>
              <li><strong className="text-foreground">Destructive:</strong> Measuring a qubit destroys its superposition and entanglement.</li>
            </ul>
          </div>
        </div>
      </section>

      <h2>3.1 — Measurement as Projection</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> measurement turns amplitudes into classical outcomes and irreversibly collapses the quantum state.
      </p>
      <p>
        Measuring a qubit in the computational basis is mathematically a <strong>projection</strong> of the state vector onto one of the basis states. The probability of each outcome is determined by the Born Rule:
      </p>
      <BlockMath math="P(0) = |\langle 0|\psi\rangle|^2 = |\alpha|^2, \quad P(1) = |\langle 1|\psi\rangle|^2 = |\beta|^2" />
      <p>
        Immediately after measurement, the state collapses to the observed outcome. If the outcome is 0, the post-measurement state is <InlineMath math="|0\rangle" />, regardless of the previous amplitudes.
      </p>

      <h2>3.2 — Step-by-Step: Measuring a Superposition</h2>
      <p>
        Suppose we apply H to <InlineMath math="|0\rangle" />, then measure. Here is the complete process:
      </p>
      <ol>
        <li>Initial state: <InlineMath math="|\psi_0\rangle = |0\rangle" /></li>
        <li>Apply H: <InlineMath math="|\psi_1\rangle = H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)" /></li>
        <li>Probabilities: <InlineMath math="P(0) = \left|\frac{1}{\sqrt{2}}\right|^2 = \frac{1}{2}" />, <InlineMath math="P(1) = \frac{1}{2}" /></li>
        <li>Measurement outcome: randomly 0 or 1, each with probability <InlineMath math="\frac{1}{2}" /></li>
        <li>Post-measurement state: <InlineMath math="|0\rangle" /> or <InlineMath math="|1\rangle" /> (depending on outcome)</li>
      </ol>

      <h2>3.3 — Measurement is Basis-Dependent</h2>
      <p>
        The state <InlineMath math="|{+}\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)" /> gives 50/50 when measured in the computational basis. But measured in the <strong>Hadamard basis</strong> <InlineMath math="\{|{+}\rangle, |{-}\rangle\}" />, it gives outcome <InlineMath math="|{+}\rangle" /> with certainty.
      </p>
      <p>
        Step-by-step in the Hadamard basis:
      </p>
      <ol>
        <li>State: <InlineMath math="|\psi\rangle = |{+}\rangle" /></li>
        <li>Compute <InlineMath math="P(+) = |\langle {+}|\psi\rangle|^2 = |\langle {+}|{+}\rangle|^2 = 1" /></li>
        <li>Compute <InlineMath math="P(-) = |\langle {-}|{+}\rangle|^2 = 0" /></li>
        <li>Result: certain outcome, no randomness — the state was already a basis state in this measurement basis.</li>
      </ol>

      <h2>3.4 — The No-Cloning Theorem</h2>
      <p>
        It is <strong>impossible to copy an arbitrary unknown quantum state</strong> with one universal physical operation. If a unitary could map <InlineMath math="|\psi\rangle|0\rangle" /> to <InlineMath math="|\psi\rangle|\psi\rangle" /> for every <InlineMath math="|\psi\rangle" />, it would fail to preserve inner products. This is the No-Cloning Theorem; it is a consequence of linearity and unitarity, not merely of measurement disturbance.
      </p>

      <h2>3.5 — Try It: Measure After H</h2>
      <p>
        Apply <strong>H</strong> to the qubit, then observe the probability bars. The circuit simulator shows the theoretical probabilities. In a real quantum computer, each run produces a single outcome; only averaging many shots recovers the distribution.
      </p>
      <p>
        Then try <strong>H → Z → H</strong>. The Z gate flips the phase of <InlineMath math="|1\rangle" />. After the second H, the qubit reaches <InlineMath math="|1\rangle" /> deterministically — destructive interference eliminates the <InlineMath math="|0\rangle" /> outcome.
      </p>
    </>
  );
}
