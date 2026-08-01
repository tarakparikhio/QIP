'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson01Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Dirac (Bra-Ket) Notation">
          <NotationBox.Text>
            Quantum states are written using <strong>ket</strong> vectors. A ket <InlineMath math="|v\rangle" /> denotes a column vector in a complex Hilbert space. Its conjugate transpose, a <strong>bra</strong> <InlineMath math="\langle v|" />, is a row vector.
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}" label="ground state (classical 0)" />
            <NotationBox.Row math="|1\rangle = \begin{pmatrix}0\\1\end{pmatrix}" label="excited state (classical 1)" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Complex Numbers & Probability">
          <NotationBox.Text>
            A complex number <InlineMath math="z = a + bi" /> has magnitude <InlineMath math="|z| = \sqrt{a^2 + b^2}" /> and phase <InlineMath math="\theta = \arctan(b/a)" />. The <strong>Born Rule</strong> bridges amplitudes to probabilities:
          </NotationBox.Text>
          <NotationBox.Formula math="P(\text{outcome}) = |\text{amplitude}|^2" />
        </NotationBox.Item>

        <NotationBox.Item heading="Key Terms">
          <NotationBox.List items={[
            { term: 'Amplitude', description: <><InlineMath math="\alpha \in \mathbb{C}" /> — a complex number weighting a basis state. Not a probability.</> },
            { term: 'Normalization', description: <><InlineMath math="|\alpha|^2 + |\beta|^2 = 1" /> — ensures total probability equals 1.</> },
            { term: 'Phase', description: <>The angle <InlineMath math="\theta" /> of a complex amplitude. Unobservable alone, but creates interference.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>1.1 — From Classical Bits to Qubits</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> a qubit is not just a two-state object; it carries complex amplitudes and phase information before measurement.
      </p>
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
      <p>Step-by-step, here is how phase affects the sequence <InlineMath math="H \to Z \to H" />:</p>
      <ol>
        <li>Start: <InlineMath math="|\psi\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)" /> — equal amplitudes, zero relative phase.</li>
        <li>Apply a Z gate (flips sign of <InlineMath math="|1\rangle" />): <InlineMath math="|\psi'\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)" /></li>
        <li>Apply a second H gate: amplitudes interfere. The <InlineMath math="|0\rangle" /> component cancels out.</li>
        <li>Result: <InlineMath math="|\psi''\rangle = |1\rangle" /> — the qubit reaches the excited state deterministically.</li>
      </ol>
      <p>
        Without phase, interference is impossible. Without interference, quantum computing has no advantage over classical.
      </p>

      <TryIt heading="1.4 — Try It: Build Your First Circuit">
        <p>
          Apply a <strong>Hadamard (H)</strong> gate to the qubit in the playground below. Observe how the state probabilities change from <InlineMath math="|0\rangle = 100\%" /> to an equal superposition of 50/50. The Bloch sphere vector moves from the north pole to the equator.
        </p>
        <p>The Hadamard gate acts as follows, step by step:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Input: <InlineMath math="|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}" /></li>
          <li>Gate matrix: <InlineMath math="H = \frac{1}{\sqrt{2}}\begin{pmatrix}1 & 1\\1 & -1\end{pmatrix}" /></li>
          <li>Output: <InlineMath math="H|0\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\end{pmatrix} = \frac{|0\rangle + |1\rangle}{\sqrt{2}} = |{+}\rangle" /></li>
        </ol>
      </TryIt>
    </>
  );
}
