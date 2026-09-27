'use client';
import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson08Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50 not-prose">
        <h2 className="text-base font-semibold mb-4 text-primary font-mono uppercase tracking-widest">Background & Notation</h2>

        <div className="space-y-5 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Multi-Qubit State Space</h3>
            <p className="text-foreground/75 mb-3 leading-relaxed">
              Two qubits together span a 4-dimensional Hilbert space <InlineMath math="\mathcal{H} = \mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4" /> with computational basis:
            </p>
            <div className="bg-background/60 rounded p-3 space-y-1 border border-border/30 text-xs font-mono">
              <div><InlineMath math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" /></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Product vs. Entangled States</h3>
            <ul className="space-y-2 text-foreground/70 text-xs">
              <li>
                <strong className="text-foreground">Product (separable):</strong>{' '}
                <InlineMath math="|\psi\rangle = |\psi_A\rangle \otimes |\psi_B\rangle" /> — can be described independently.
              </li>
              <li>
                <strong className="text-foreground">Entangled:</strong>{' '}
                <InlineMath math="|\psi\rangle \neq |\psi_A\rangle \otimes |\psi_B\rangle" /> — joint state, no independent description.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">CNOT Gate</h3>
            <p className="text-foreground/75 mb-2">
              The Controlled-NOT gate flips the <em>target</em> qubit if and only if the <em>control</em> qubit is <InlineMath math="|1\rangle" />:
            </p>
            <div className="bg-background/60 rounded p-3 border border-border/30 text-xs">
              <InlineMath math="\text{CNOT}|00\rangle = |00\rangle,\quad \text{CNOT}|01\rangle = |01\rangle" />
              <br />
              <InlineMath math="\text{CNOT}|10\rangle = |11\rangle,\quad \text{CNOT}|11\rangle = |10\rangle" />
            </div>
          </div>
        </div>
      </section>

      <h2>8.1 — What Is Entanglement?</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> entanglement creates correlations that cannot be explained by separate local descriptions of the qubits.
      </p>
      <p>
        Two qubits are <strong>entangled</strong> when their joint quantum state cannot be written as a product of two independent single-qubit states. Entanglement can produce correlations stronger than any classical local model allows. For the Bell state below, measurements in the same computational basis are perfectly correlated; these correlations cannot be used to send information faster than light.
      </p>
      <p>
        The canonical example is the <strong>Bell state</strong> <InlineMath math="|\Phi^+\rangle" />:
      </p>
      <BlockMath math="|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}" />
      <p>
        This state has no product form: there are no single-qubit states <InlineMath math="|\psi_A\rangle" /> and <InlineMath math="|\psi_B\rangle" /> such that <InlineMath math="|\psi_A\rangle \otimes |\psi_B\rangle = |\Phi^+\rangle" />.
      </p>

      <h2>8.2 — Creating a Bell State: Step-by-Step</h2>
      <p>
        A Bell state is created by applying H to the first qubit, then CNOT with qubit 0 as control and qubit 1 as target:
      </p>
      <ol>
        <li>Start: <InlineMath math="|00\rangle = |0\rangle_0 \otimes |0\rangle_1" /></li>
        <li>Apply H to qubit 0: <InlineMath math="\frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)_0 \otimes |0\rangle_1 = \frac{1}{\sqrt{2}}(|00\rangle + |10\rangle)" /></li>
        <li>Apply CNOT (control=0, target=1):
          <ul>
            <li><InlineMath math="|00\rangle \to |00\rangle" /> (control is 0, no flip)</li>
            <li><InlineMath math="|10\rangle \to |11\rangle" /> (control is 1, target flips)</li>
          </ul>
        </li>
        <li>Result: <InlineMath math="|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)" /></li>
      </ol>

      <h2>8.3 — Why Entanglement Is Not Classical Correlation</h2>
      <p>
        A classical analogy might be: &ldquo;one glove is left-handed, the other right-handed — when I see one, I know the other.&rdquo; But this classical correlation exists because the gloves were always in definite states. Entangled qubits are not: before measurement, neither qubit has a definite value.
      </p>
      <p>
        The four <strong>Bell states</strong> are the maximally entangled two-qubit states:
      </p>
      <BlockMath math="|\Phi^\pm\rangle = \frac{|00\rangle \pm |11\rangle}{\sqrt{2}}, \quad |\Psi^\pm\rangle = \frac{|01\rangle \pm |10\rangle}{\sqrt{2}}" />

      <h2>8.4 — Measuring What Classical Correlation Cannot Do</h2>
      <p>
        Perfect agreement in one basis is not yet proof of anything quantum: two coins glued together also always agree. The difference appears when each side can choose between two measurement settings. Measure qubit A along a direction at angle <InlineMath math="\alpha" /> in the x–z plane of the Bloch sphere, and qubit B at angle <InlineMath math="\beta" />. Each result is <InlineMath math="\pm1" />. For <InlineMath math="|\Phi^+\rangle" /> the average product of the two results is:
      </p>
      <BlockMath math="E(\alpha,\beta) = \langle A_\alpha \otimes B_\beta\rangle = \cos(\alpha-\beta)" />
      <p>
        This follows from <InlineMath math="\langle Z\otimes Z\rangle = \langle X\otimes X\rangle = 1" /> and <InlineMath math="\langle Z\otimes X\rangle = \langle X\otimes Z\rangle = 0" /> for this state, with <InlineMath math="A_\alpha = \cos\alpha\,Z + \sin\alpha\,X" />.
      </p>
      <p>
        The CHSH test combines four settings: A uses <InlineMath math="\alpha \in \{0^\circ, 90^\circ\}" /> and B uses <InlineMath math="\beta \in \{45^\circ, -45^\circ\}" />:
      </p>
      <BlockMath math="S = E(\alpha,\beta) + E(\alpha,\beta') + E(\alpha',\beta) - E(\alpha',\beta') = 3\cos 45^\circ - \cos 135^\circ = 2\sqrt2 \approx 2.83" />
      <p>
        Any model in which each qubit carries pre-set answers for both settings (like the gloves) satisfies <InlineMath math="|S| \le 2" />, whatever the correlations. The reason is short: for pre-set values <InlineMath math="a, a', b, b' = \pm1" />, <InlineMath math="ab + ab' + a'b - a'b' = a(b+b') + a'(b-b')" />, and one bracket is 0 while the other is <InlineMath math="\pm 2" />. Averaging values that are always <InlineMath math="\pm 2" /> can never exceed 2.
      </p>
      <p>
        <strong>Statistics lens:</strong> each <InlineMath math="E" /> is a sample mean of <InlineMath math="\pm1" /> products, so a real experiment estimates <InlineMath math="S" /> with a standard error. Experiments since the 1980s, and loophole-free tests in 2015, measured <InlineMath math="S" /> above 2 by many standard errors. As before, none of this sends a signal: each side alone still sees 50/50 outcomes.
      </p>

      <h2>8.5 — Try It: Build a Bell State</h2>
      <p>
        In the playground: apply <strong>H</strong> to qubit 0, then <strong>CNOT</strong>. The state probabilities will show 50% on <InlineMath math="|00\rangle" /> and 50% on <InlineMath math="|11\rangle" /> — with 0% on <InlineMath math="|01\rangle" /> and <InlineMath math="|10\rangle" />.
      </p>
      <p>
        This perfect correlation — always both-zero or both-one, never mixed — is the signature of the Bell state. The two qubits are now entangled.
      </p>
    </>
  );
}
