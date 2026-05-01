'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson10Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Controlled Gates">
          <NotationBox.Text>
            A controlled-U gate applies <InlineMath math="U" /> to the target qubit if and only if the control qubit is <InlineMath math="|1\rangle" />. In matrix form (control = qubit 1, target = qubit 0):
          </NotationBox.Text>
          <NotationBox.Formula math="C\text{-}U = \begin{pmatrix}I & 0 \\ 0 & U\end{pmatrix}" note="Upper-left block: control = |0⟩ (identity). Lower-right block: control = |1⟩ (apply U)." />
        </NotationBox.Item>

        <NotationBox.Item heading="Eigenvalue Equation">
          <NotationBox.Text>
            A state <InlineMath math="|\lambda\rangle" /> is an eigenstate of <InlineMath math="U" /> with eigenvalue <InlineMath math="e^{i\phi}" /> if:
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="U|\lambda\rangle = e^{i\phi}|\lambda\rangle" label="eigenvalue equation" />
            <NotationBox.Row math="|e^{i\phi}| = 1" label="eigenvalues of unitaries lie on the unit circle" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Key Identities">
          <NotationBox.List items={[
            { term: 'X eigenstates', description: <><InlineMath math="X|{+}\rangle = +|{+}\rangle" />, <InlineMath math="X|{-}\rangle = -|{-}\rangle" /> — eigenvalues <InlineMath math="\pm 1" />.</> },
            { term: 'Z eigenstates', description: <><InlineMath math="Z|0\rangle = +|0\rangle" />, <InlineMath math="Z|1\rangle = -|1\rangle" /> — eigenvalues <InlineMath math="\pm 1" />.</> },
            { term: 'CNOT symmetry', description: <>In the Hadamard basis: <InlineMath math="(H\otimes H)\,\text{CNOT}\,(H\otimes H) = \text{CNOT}_{\text{reversed}}" />.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>10.1 — Controlled-U Gate Mechanics</h2>
      <p>
        A controlled-U gate is a two-qubit gate acting on a control qubit <InlineMath math="|c\rangle" /> and a target qubit <InlineMath math="|t\rangle" />. Its action on the computational basis is:
      </p>
      <BlockMath math="C\text{-}U\,|c, t\rangle = \begin{cases}|0\rangle \otimes |t\rangle & \text{if } c = 0 \\|1\rangle \otimes U|t\rangle & \text{if } c = 1\end{cases}" />
      <p>
        This can be written compactly as <InlineMath math="|0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes U" />. When the control is in a superposition, the gate creates an entangled superposition of &ldquo;U applied&rdquo; and &ldquo;U not applied&rdquo; branches.
      </p>
      <p>
        The CNOT gate is the special case <InlineMath math="U = X" />. The controlled-Z (CZ) gate is the case <InlineMath math="U = Z" />.
      </p>

      <h2>10.2 — The Eigenstate Condition</h2>
      <p>
        Suppose the target qubit is in an eigenstate of <InlineMath math="U" />: <InlineMath math="U|\lambda\rangle = e^{i\phi}|\lambda\rangle" />. Apply the controlled-U gate with the control qubit in a general superposition <InlineMath math="\alpha|0\rangle + \beta|1\rangle" />:
      </p>
      <BlockMath math="C\text{-}U\,(\alpha|0\rangle + \beta|1\rangle)\otimes|\lambda\rangle = \alpha|0\rangle\otimes|\lambda\rangle + \beta|1\rangle\otimes U|\lambda\rangle" />
      <BlockMath math="= \alpha|0\rangle\otimes|\lambda\rangle + \beta|1\rangle\otimes e^{i\phi}|\lambda\rangle" />
      <BlockMath math="= \alpha|0\rangle\otimes|\lambda\rangle + \beta e^{i\phi}|1\rangle\otimes|\lambda\rangle" />
      <BlockMath math="= (\alpha|0\rangle + \beta e^{i\phi}|1\rangle)\otimes|\lambda\rangle" />
      <p>
        The target qubit is unchanged — it remains <InlineMath math="|\lambda\rangle" />. The eigenvalue <InlineMath math="e^{i\phi}" /> has been transferred as a <strong>relative phase</strong> to the control qubit&apos;s <InlineMath math="|1\rangle" /> amplitude. This is the phase kickback mechanism.
      </p>

      <h2>10.3 — Phase Kickback Derivation</h2>
      <p>
        Step-by-step derivation for the CNOT gate with the target qubit in state <InlineMath math="|{-}\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)" />, which is an eigenstate of X with eigenvalue <InlineMath math="-1" />:
      </p>
      <ol>
        <li>
          Initial state: <InlineMath math="(\alpha|0\rangle + \beta|1\rangle) \otimes |{-}\rangle" />
        </li>
        <li>
          Expand: <InlineMath math="\frac{1}{\sqrt{2}}\bigl(\alpha|0\rangle(|0\rangle-|1\rangle) + \beta|1\rangle(|0\rangle-|1\rangle)\bigr)" />
        </li>
        <li>
          Apply CNOT (flips target when control = 1):
          <BlockMath math="\frac{1}{\sqrt{2}}\bigl(\alpha|0\rangle(|0\rangle-|1\rangle) + \beta|1\rangle(|1\rangle-|0\rangle)\bigr)" />
        </li>
        <li>
          Factor out <InlineMath math="-1" /> from the second group:
          <BlockMath math="\frac{1}{\sqrt{2}}\bigl(\alpha|0\rangle(|0\rangle-|1\rangle) - \beta|1\rangle(|0\rangle-|1\rangle)\bigr)" />
        </li>
        <li>
          Factor the target qubit:
          <BlockMath math="(\alpha|0\rangle - \beta|1\rangle) \otimes |{-}\rangle" />
        </li>
      </ol>
      <p>
        Result: the target is unchanged at <InlineMath math="|{-}\rangle" />, and the control qubit has acquired a relative phase of <InlineMath math="-1" /> on its <InlineMath math="|1\rangle" /> component. The eigenvalue <InlineMath math="-1" /> of the X gate has been &ldquo;kicked back&rdquo; to the control.
      </p>

      <h2>10.4 — Application: The Identity HZH = X</h2>
      <p>
        Phase kickback gives a clean derivation of the circuit identity <InlineMath math="H \cdot \text{CNOT} \cdot H \equiv \text{CNOT}_{\text{reversed}}" />. Consider the circuit where H is applied to both qubits before and after CNOT:
      </p>
      <ol>
        <li>Apply H to control (qubit 0): transforms computational basis states to Hadamard basis.</li>
        <li>Apply CNOT: in the Hadamard basis, the roles of control and target are exchanged — the gate now flips the <em>first</em> qubit controlled on the <em>second</em>.</li>
        <li>Apply H to control again: transforms back to computational basis.</li>
      </ol>
      <p>
        Algebraically: <InlineMath math="(H \otimes I)\,\text{CNOT}_{0\to1}\,(H \otimes I) = \text{CNOT}_{1\to0}" />. Control and target are swapped.
      </p>
      <p>
        This identity is exploited in the Deutsch and Deutsch-Jozsa algorithms: placing the target qubit in <InlineMath math="|{-}\rangle" /> before querying an oracle transfers the oracle&apos;s phase response back to the control register, allowing global information about the function to be extracted in a single query.
      </p>

      <TryIt heading="10.5 — Try It: Observe Phase Kickback">
        <p>
          Construct the sequence <strong>H → CNOT → H</strong> on qubit 0 (control), with qubit 1 as target:
        </p>
        <ol>
          <li>Apply H to qubit 0: <InlineMath math="|00\rangle \to |{+}\rangle|0\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |10\rangle)" /></li>
          <li>Apply CNOT (control=0, target=1): <InlineMath math="\to \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle) = |\Phi^+\rangle" /></li>
          <li>Apply H to qubit 0 only: observe how the probability distribution changes.</li>
        </ol>
        <p>
          Alternatively, prepare qubit 1 in <InlineMath math="|{-}\rangle" /> by applying <strong>X then H</strong> to qubit 1, then apply <strong>H → CNOT → H</strong> to qubit 0. The net effect is a Z gate on qubit 0 — the phase kicked back from the oracle.
        </p>
      </TryIt>
    </>
  );
}
