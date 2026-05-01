'use client';
import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson02Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50 not-prose">
        <h2 className="text-base font-semibold mb-4 text-primary font-mono uppercase tracking-widest">Background & Notation</h2>

        <div className="space-y-5 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">State Vector Representation</h3>
            <p className="text-foreground/75 mb-3 leading-relaxed">
              Any single-qubit state lives in a two-dimensional complex Hilbert space <InlineMath math="\mathcal{H} = \mathbb{C}^2" />. The computational basis <InlineMath math="\{|0\rangle, |1\rangle\}" /> forms an orthonormal set satisfying:
            </p>
            <div className="bg-background/60 rounded p-3 space-y-1.5 border border-border/30 text-xs font-mono">
              <div><InlineMath math="\langle 0 | 0 \rangle = 1, \quad \langle 1 | 1 \rangle = 1" /></div>
              <div><InlineMath math="\langle 0 | 1 \rangle = 0" /></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Superposition vs. Classical Mixture</h3>
            <ul className="space-y-1.5 text-foreground/70 text-xs">
              <li><strong className="text-foreground">Pure superposition:</strong> <InlineMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" /> — a single definite quantum state. Can interfere.</li>
              <li><strong className="text-foreground">Classical mixture:</strong> &ldquo;The qubit is 0 with probability <InlineMath math="p" />, else 1.&rdquo; No phase structure. Cannot interfere.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Bloch Sphere Parameterization</h3>
            <p className="text-foreground/75 mb-2 leading-relaxed">
              Any pure single-qubit state can be written with two real angles <InlineMath math="\theta \in [0,\pi]" /> and <InlineMath math="\phi \in [0, 2\pi)" />:
            </p>
            <BlockMath math="|\psi\rangle = \cos\!\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\!\frac{\theta}{2}|1\rangle" />
          </div>
        </div>
      </section>

      <h2>2.1 — Definition of Superposition</h2>
      <p>
        In quantum mechanics, a system is said to be in <strong>superposition</strong> when its state is a non-trivial linear combination of basis states. For a qubit:
      </p>
      <BlockMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \quad |\alpha|^2 + |\beta|^2 = 1" />
      <p>
        This is not a statement of ignorance about which basis state the qubit &ldquo;really&rdquo; is in. The qubit has no definite value prior to measurement. This is confirmed experimentally by interference: a qubit in superposition produces interference patterns that a classical mixed state cannot.
      </p>

      <h2>2.2 — The Hadamard Gate and Superposition</h2>
      <p>
        The standard way to create superposition from a known basis state is the <strong>Hadamard gate</strong>. It maps:
      </p>
      <BlockMath math="H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}} \equiv |{+}\rangle" />
      <BlockMath math="H|1\rangle = \frac{|0\rangle - |1\rangle}{\sqrt{2}} \equiv |{-}\rangle" />
      <p>
        Step-by-step matrix computation for <InlineMath math="H|0\rangle" />:
      </p>
      <ol>
        <li>Write the gate: <InlineMath math="H = \frac{1}{\sqrt{2}}\begin{pmatrix}1 & 1 \\ 1 & -1\end{pmatrix}" /></li>
        <li>Write the input: <InlineMath math="|0\rangle = \begin{pmatrix}1 \\ 0\end{pmatrix}" /></li>
        <li>Multiply: <InlineMath math="H|0\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1 \\ 1\end{pmatrix}" /></li>
        <li>Result: <InlineMath math="P(0) = \left|\frac{1}{\sqrt{2}}\right|^2 = \frac{1}{2}" />, and similarly <InlineMath math="P(1) = \frac{1}{2}" />.</li>
      </ol>

      <h2>2.3 — Superposition Is Self-Consistent</h2>
      <p>
        The Hadamard gate is its own inverse: <InlineMath math="H^2 = I" />. Applying it twice returns the qubit to its original state. This demonstrates that superposition is a coherent, structured state — not randomness.
      </p>
      <p>
        Step-by-step: start with <InlineMath math="|0\rangle" />, apply H twice:
      </p>
      <ol>
        <li><InlineMath math="H|0\rangle = |{+}\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)" /></li>
        <li><InlineMath math="H|{+}\rangle = \frac{1}{\sqrt{2}}(H|0\rangle + H|1\rangle)" /></li>
        <li>Expand: <InlineMath math="= \frac{1}{2}(|0\rangle + |1\rangle + |0\rangle - |1\rangle) = \frac{1}{2}(2|0\rangle) = |0\rangle" /></li>
      </ol>
      <p>
        The <InlineMath math="|1\rangle" /> components cancelled due to destructive interference — only possible because amplitudes carry phase information.
      </p>

      <h2>2.4 — Try It: X Gate Then H Gate</h2>
      <p>
        In the playground, apply an <strong>X gate</strong> first, then an <strong>H gate</strong>. The X gate flips <InlineMath math="|0\rangle \to |1\rangle" />, and H then maps this to <InlineMath math="|{-}\rangle" />.
      </p>
      <p>
        Notice the probability distribution is still 50/50 — but the Bloch sphere vector points in the opposite equatorial direction compared to <InlineMath math="|{+}\rangle" />. This is the relative phase difference between <InlineMath math="|{+}\rangle" /> and <InlineMath math="|{-}\rangle" /> made visible.
      </p>
    </>
  );
}
