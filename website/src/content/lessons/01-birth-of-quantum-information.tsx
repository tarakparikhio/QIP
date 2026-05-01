import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson01Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50 not-prose">
        <h2 className="text-base font-semibold mb-4 text-primary font-mono uppercase tracking-widest">Background & Notation</h2>

        <div className="space-y-5 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Dirac (Bra-Ket) Notation</h3>
            <p className="text-foreground/75 mb-3 leading-relaxed">
              Quantum states are written using <strong>ket</strong> vectors. A ket <InlineMath math="|v\rangle" /> denotes a column vector in a complex Hilbert space. Its conjugate transpose, a <strong>bra</strong> <InlineMath math="\langle v|" />, is a row vector.
            </p>
            <div className="bg-background/60 rounded p-3 space-y-2 border border-border/30">
              <div className="flex items-center gap-3 text-xs font-mono">
                <InlineMath math="|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}" />
                <span className="text-muted">— ground state (classical 0)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <InlineMath math="|1\rangle = \begin{pmatrix}0\\1\end{pmatrix}" />
                <span className="text-muted">— excited state (classical 1)</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Complex Numbers & Probability</h3>
            <p className="text-foreground/75 mb-2 leading-relaxed">
              A complex number <InlineMath math="z = a + bi" /> has magnitude <InlineMath math="|z| = \sqrt{a^2 + b^2}" /> and phase <InlineMath math="\theta = \arctan(b/a)" />. The <strong>probability rule</strong> (Born Rule) states:
            </p>
            <BlockMath math="P(\text{outcome}) = |\text{amplitude}|^2" />
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Key Terms</h3>
            <ul className="space-y-1.5 text-foreground/70 text-xs">
              <li><strong className="text-foreground">Amplitude:</strong> A complex number <InlineMath math="\alpha \in \mathbb{C}" /> weighting a basis state. Not a probability.</li>
              <li><strong className="text-foreground">Normalization:</strong> Amplitudes satisfy <InlineMath math="|\alpha|^2 + |\beta|^2 = 1" />, ensuring total probability = 1.</li>
              <li><strong className="text-foreground">Phase:</strong> The angle <InlineMath math="\theta" /> of a complex amplitude. Unobservable alone, but creates interference between states.</li>
            </ul>
          </div>
        </div>
      </section>

      <h2>1.1 — From Classical Bits to Qubits</h2>
      <p>
        A classical bit encodes exactly one of two values: 0 or 1. Physically, this might be a voltage level, a magnetic orientation, or the charge on a capacitor. The defining property is that at any moment, the bit is in exactly one definite state.
      </p>
      <p>
        A <strong>qubit</strong> (quantum bit) obeys quantum mechanics. Its state is a <strong>linear superposition</strong> of the two basis states <InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" />:
      </p>
      <BlockMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \quad \alpha, \beta \in \mathbb{C}" />
      <p>
        The coefficients <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> are <strong>complex amplitudes</strong>. They are not probabilities, but their squared magnitudes give measurement probabilities. The normalization constraint ensures these probabilities sum to 1:
      </p>
      <BlockMath math="|\alpha|^2 + |\beta|^2 = 1" />

      <h2>1.2 — Why Amplitudes Are Not Probabilities</h2>
      <p>
        This distinction is fundamental. Consider two qubits, both with 50% probability for <InlineMath math="|0\rangle" /> and 50% for <InlineMath math="|1\rangle" />. Classically, these are identical. Quantum mechanically, they may be completely different:
      </p>
      <BlockMath math="|\psi_1\rangle = \frac{1}{\sqrt{2}}|0\rangle + \frac{1}{\sqrt{2}}|1\rangle" />
      <BlockMath math="|\psi_2\rangle = \frac{1}{\sqrt{2}}|0\rangle - \frac{1}{\sqrt{2}}|1\rangle" />
      <p>
        Both have <InlineMath math="|\alpha|^2 = |\beta|^2 = \frac{1}{2}" />, so both yield 50/50 outcomes when measured. Yet their <strong>relative phase</strong> (the sign between terms) is opposite, and this difference is physically meaningful: it determines how the qubit behaves under subsequent gates.
      </p>

      <h2>1.3 — The Role of Phase</h2>
      <p>
        The <strong>global phase</strong> of a state is unobservable — multiplying <InlineMath math="|\psi\rangle" /> by <InlineMath math="e^{i\phi}" /> does not change any measurement outcome. However, the <strong>relative phase</strong> between <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> is physically significant.
      </p>
      <p>
        Step-by-step, here is how phase affects a two-gate sequence:
      </p>
      <ol>
        <li>Start: <InlineMath math="|\psi\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)" /> — equal amplitudes, zero relative phase.</li>
        <li>Apply a Z gate (flips sign of <InlineMath math="|1\rangle" />): <InlineMath math="|\psi'\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)" /></li>
        <li>Apply a second H gate: amplitudes interfere. The <InlineMath math="|1\rangle" /> component cancels out.</li>
        <li>Result: <InlineMath math="|\psi''\rangle = |0\rangle" /> — the qubit returns to the ground state deterministically.</li>
      </ol>
      <p>
        Without phase, interference is impossible. Without interference, quantum computing has no advantage over classical.
      </p>

      <h2>1.4 — Try It: Build Your First Circuit</h2>
      <p>
        Apply a <strong>Hadamard (H)</strong> gate to the qubit in the playground below. Observe how the state probabilities change from <InlineMath math="|0\rangle = 100\%" /> to an equal superposition of 50/50. The Bloch sphere vector moves from the north pole to the equator.
      </p>
      <p>
        The Hadamard gate acts as follows, step by step:
      </p>
      <ol>
        <li>Input: <InlineMath math="|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}" /></li>
        <li>Gate matrix: <InlineMath math="H = \frac{1}{\sqrt{2}}\begin{pmatrix}1 & 1\\1 & -1\end{pmatrix}" /></li>
        <li>Output: <InlineMath math="H|0\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\end{pmatrix} = \frac{|0\rangle + |1\rangle}{\sqrt{2}} = |{+}\rangle" /></li>
      </ol>
    </>
  );
}
