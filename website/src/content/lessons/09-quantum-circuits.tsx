'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson09Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Circuit Diagram Conventions">
          <NotationBox.Code>
            <NotationBox.Row math="\text{wire} \longrightarrow" label="qubit evolving in time (left to right)" />
            <NotationBox.Row math="\boxed{U}" label="gate U applied to one or more qubits" />
            <NotationBox.Row math="\bullet\!\!-\!\!\oplus" label="CNOT: filled dot = control, ⊕ = target" />
          </NotationBox.Code>
          <NotationBox.Text>
            Gates applied to the same qubit wire in sequence are composed right-to-left in matrix notation: the leftmost gate in the circuit is the rightmost factor in the matrix product.
          </NotationBox.Text>
        </NotationBox.Item>

        <NotationBox.Item heading="CNOT Gate">
          <NotationBox.Text>
            The controlled-NOT (CNOT) gate flips the target qubit if and only if the control qubit is <InlineMath math="|1\rangle" />.
          </NotationBox.Text>
          <NotationBox.Formula math="\text{CNOT} = \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}" note="Basis order: |00⟩, |01⟩, |10⟩, |11⟩" />
        </NotationBox.Item>

        <NotationBox.Item heading="Gate Composition">
          <NotationBox.List items={[
            { term: 'Sequential gates', description: <>Circuit A then B corresponds to matrix product <InlineMath math="BA" /> (B applied after A).</> },
            { term: 'Parallel gates', description: <>Gates on independent qubits compose as tensor product <InlineMath math="U_1 \otimes U_2" />.</> },
            { term: 'Circuit depth', description: 'The number of sequential layers (time steps), where parallel gates count as one layer.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>9.1 — Reading Quantum Circuits</h2>
      <p>
        A quantum circuit is a directed acyclic graph where each horizontal wire represents one qubit, and boxes on the wire represent gates applied at specific time steps. Time flows left to right.
      </p>
      <p>
        The mathematical object computed by a circuit is the matrix product of all gates, read right-to-left:
      </p>
      <BlockMath math="|\psi_{\text{out}}\rangle = G_n \cdots G_2 G_1 |\psi_{\text{in}}\rangle" />
      <p>
        where <InlineMath math="G_1" /> is the leftmost gate in the circuit and <InlineMath math="G_n" /> is the rightmost. This right-to-left convention for matrix multiplication is standard in linear algebra and matches the order in which operators act on kets.
      </p>
      <p>
        <strong>Gates acting on separate qubits at the same time step</strong> are combined via tensor product. In this playground&apos;s ordering (qubit 0 is the left tensor factor), a circuit layer with gate <InlineMath math="A" /> on qubit 0 and gate <InlineMath math="B" /> on qubit 1 corresponds to the 4×4 matrix <InlineMath math="A \otimes B" />.
      </p>

      <h2>9.2 — The CNOT Gate</h2>
      <p>
        The CNOT (Controlled-NOT) gate is the canonical two-qubit entangling gate. It has a control qubit and a target qubit. Its action on the computational basis is:
      </p>
      <BlockMath math="\text{CNOT}|c, t\rangle = |c,\, t \oplus c\rangle" />
      <p>
        where <InlineMath math="\oplus" /> denotes XOR (addition mod 2). In full:
      </p>
      <ol>
        <li><InlineMath math="|00\rangle \to |00\rangle" /> — control is 0, target unchanged</li>
        <li><InlineMath math="|01\rangle \to |01\rangle" /> — control is 0, target unchanged</li>
        <li><InlineMath math="|10\rangle \to |11\rangle" /> — control is 1, target flipped</li>
        <li><InlineMath math="|11\rangle \to |10\rangle" /> — control is 1, target flipped</li>
      </ol>
      <p>
        The CNOT gate is entangling: when applied to a superposition, it creates correlations between qubits that cannot be factored. The Bell state construction is the canonical example:
      </p>
      <BlockMath math="\text{CNOT}\left(\frac{|0\rangle+|1\rangle}{\sqrt{2}} \otimes |0\rangle\right) = \frac{|00\rangle + |11\rangle}{\sqrt{2}}" />

      <h2>9.3 — Building the Bell State Circuit</h2>
      <p>
        The Bell state <InlineMath math="|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)" /> is constructed by a two-gate circuit:
      </p>
      <ol>
        <li><strong>Step 1</strong>: Apply H to qubit 0 (control). Result: <InlineMath math="\frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) \otimes |0\rangle = \frac{|00\rangle + |10\rangle}{\sqrt{2}}" /></li>
        <li><strong>Step 2</strong>: Apply CNOT (control = qubit 0, target = qubit 1). The <InlineMath math="|10\rangle" /> term has control=1, so the target flips: <InlineMath math="|10\rangle \to |11\rangle" />. The <InlineMath math="|00\rangle" /> term has control=0, so the target stays: <InlineMath math="|00\rangle \to |00\rangle" />.</li>
        <li><strong>Result</strong>: <InlineMath math="\frac{|00\rangle + |11\rangle}{\sqrt{2}} = |\Phi^+\rangle" /></li>
      </ol>
      <p>
        The circuit depth is 2 (H layer, then CNOT layer). Circuit width is 2 qubits. Gate count is 2 (one H, one CNOT).
      </p>

      <h2>9.4 — The No-Cloning Theorem</h2>
      <p>
        Classical bits can be copied freely (fan-out). Quantum mechanics forbids the analogous operation for unknown quantum states. The <strong>no-cloning theorem</strong> states:
      </p>
      <p>
        <em>There is no unitary operation <InlineMath math="U" /> such that <InlineMath math="U(|\psi\rangle \otimes |0\rangle) = |\psi\rangle \otimes |\psi\rangle" /> for all <InlineMath math="|\psi\rangle" />.</em>
      </p>
      <p>
        Proof by contradiction. Suppose such <InlineMath math="U" /> exists. Apply it to two states <InlineMath math="|\psi\rangle" /> and <InlineMath math="|\phi\rangle" />, then take the inner product:
      </p>
      <BlockMath math="\langle\psi|\phi\rangle = \langle\psi|\phi\rangle^2" />
      <p>
        This equation holds only if <InlineMath math="\langle\psi|\phi\rangle = 0" /> or <InlineMath math="\langle\psi|\phi\rangle = 1" /> — meaning the cloner works only for orthogonal or identical states, not for arbitrary unknown states. The contradiction shows no universal cloner exists.
      </p>
      <p>
        The no-cloning theorem has important consequences: it prevents eavesdroppers from copying quantum keys (the basis of quantum cryptography), and it explains why quantum error correction must use redundancy without direct copying.
      </p>

      <TryIt heading="9.5 — Try It: Build the Bell State">
        <p>
          Using 2 qubits in the playground, apply <strong>H</strong> to qubit 0 (top wire), then apply <strong>CNOT</strong> with qubit 0 as control and qubit 1 as target.
        </p>
        <p>
          Observe the probability bars: only <InlineMath math="|00\rangle" /> and <InlineMath math="|11\rangle" /> should each show 50%, with <InlineMath math="|01\rangle" /> and <InlineMath math="|10\rangle" /> at 0%. This is an entangled state — no single-qubit description can explain both bars simultaneously.
        </p>
        <ol>
          <li>Initial state: <InlineMath math="|00\rangle" /> — 100% probability.</li>
          <li>After H on qubit 0: <InlineMath math="\frac{1}{\sqrt{2}}(|00\rangle + |10\rangle)" />.</li>
          <li>After CNOT: <InlineMath math="|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)" />.</li>
        </ol>
      </TryIt>
    </>
  );
}
