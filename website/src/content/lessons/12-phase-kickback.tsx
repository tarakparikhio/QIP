'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson10Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Controlled Gates">
          <NotationBox.Text>
            A controlled-U gate applies <InlineMath math="U" /> to the target qubit if and only if the control qubit is <InlineMath math="|1\rangle" />. With the control as the first tensor factor, its matrix is:
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
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> phase kickback is a central idea behind several quantum algorithms because it moves phase information from a target to a control register.
      </p>
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

      <h2>10.4 — Reversing CNOT in the Hadamard Basis</h2>
      <p>
        Applying Hadamard gates to <strong>both</strong> qubits before and after a CNOT reverses its control and target. This identity follows from the fact that Hadamards exchange X- and Z-type behavior:
      </p>
      <BlockMath math="(H\otimes H)\,\text{CNOT}_{0\to1}\,(H\otimes H) = \text{CNOT}_{1\to0}" />
      <ol>
        <li>Apply H to qubits 0 and 1: move both wires into the Hadamard basis.</li>
        <li>Apply <InlineMath math="\text{CNOT}_{0\to1}" />: in that basis, its control and target roles are exchanged.</li>
        <li>Apply H to both qubits again: return to the computational basis.</li>
      </ol>
      <p>
        In Deutsch and Deutsch–Jozsa, the more direct use of this idea is phase kickback: preparing the target in <InlineMath math="|{-}\rangle" /> transfers the oracle&apos;s phase response to the control register.
      </p>

      <TryIt heading="10.5 — Try It: Observe Phase Kickback">
        <p>
          Prepare qubit 1 in <InlineMath math="|{-}\rangle" />, then use it as the CNOT target while qubit 0 is the control:
        </p>
        <ol>
          <li>Apply <strong>X then H</strong> to qubit 1, preparing <InlineMath math="|{-}\rangle" />.</li>
          <li>Apply H to qubit 0, creating <InlineMath math="|{+}\rangle|{-}\rangle" />.</li>
          <li>Apply CNOT with q0 as control and q1 as target. The target remains <InlineMath math="|{-}\rangle" />, while q0 becomes <InlineMath math="|{-}\rangle" /> through phase kickback.</li>
          <li>Apply H to qubit 0. It becomes <InlineMath math="|1\rangle" />, so the phase is visible in the measurement basis.</li>
        </ol>
        <p>
          For an arbitrary control state, this <strong>H → CNOT → H</strong> sequence on q0, with q1 fixed in <InlineMath math="|{-}\rangle" />, implements a Z gate on q0.
        </p>
      </TryIt>
    </>
  );
}
