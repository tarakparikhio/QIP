'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson06Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Unitary Operators">
          <NotationBox.Text>
            A matrix <InlineMath math="U" /> is <strong>unitary</strong> if its conjugate transpose equals its inverse: <InlineMath math="U^\dagger U = UU^\dagger = I" />. Unitarity is the defining constraint on all quantum gates.
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="U^\dagger = (U^*)^T" label="conjugate transpose" />
            <NotationBox.Row math="\det(U) = e^{i\theta}" label="unit complex determinant" />
            <NotationBox.Row math="\|U|\psi\rangle\| = \||\psi\rangle\|" label="norm-preserving" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Pauli Matrices">
          <NotationBox.Text>
            The three Pauli matrices form the basis of all single-qubit gates. Each squares to the identity and has eigenvalues <InlineMath math="\pm 1" />.
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="X = \begin{pmatrix}0&1\\1&0\end{pmatrix}" label="bit flip" />
            <NotationBox.Row math="Y = \begin{pmatrix}0&-i\\i&0\end{pmatrix}" label="bit + phase flip" />
            <NotationBox.Row math="Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}" label="phase flip" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Gate Composition">
          <NotationBox.List items={[
            { term: 'Sequential', description: 'Applying gate A then B gives BA|ψ⟩ — right-to-left matrix multiplication.' },
            { term: 'Inverse', description: <>Since <InlineMath math="U^\dagger U = I" />, every quantum gate is reversible: the inverse is <InlineMath math="U^\dagger" />.</> },
            { term: 'Closure', description: 'The product of two unitary matrices is unitary. Gate sequences are always valid quantum operations.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>6.1 — Why Quantum Gates Must Be Unitary</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> quantum gates preserve probability, so they must be unitary and therefore reversible.
      </p>
      <p>
        Quantum evolution must preserve the total probability of all measurement outcomes. For a state <InlineMath math="|\psi\rangle" />, the normalization condition requires <InlineMath math="\langle\psi|\psi\rangle = 1" /> to hold after every operation.
      </p>
      <p>
        If a gate <InlineMath math="U" /> acts on <InlineMath math="|\psi\rangle" />, the transformed state <InlineMath math="U|\psi\rangle" /> must also have norm 1:
      </p>
      <BlockMath math="\langle\psi|U^\dagger U|\psi\rangle = \langle\psi|\psi\rangle = 1 \implies U^\dagger U = I" />
      <p>
        This derivation shows unitarity is not an assumption but a logical consequence of probability conservation. Any linear map that violates <InlineMath math="U^\dagger U = I" /> would allow total probability to be created or destroyed, making measurement outcomes inconsistent.
      </p>
      <p>
        A second consequence of unitarity is <strong>reversibility</strong>. Since <InlineMath math="U^{-1} = U^\dagger" />, every gate has an inverse that is also a valid gate. Quantum computation (excluding measurement) is therefore fundamentally reversible. This distinguishes it from classical irreversible logic gates like AND and OR.
      </p>

      <h2>6.2 — The Pauli Gates</h2>
      <p>
        The three Pauli gates — X, Y, Z — are the most fundamental single-qubit operations. Each is both Hermitian (<InlineMath math="U = U^\dagger" />) and unitary (<InlineMath math="U^2 = I" />), meaning they are self-inverse.
      </p>
      <p>
        <strong>The X gate</strong> (Pauli-X, bit flip) swaps the <InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" /> amplitudes:
      </p>
      <BlockMath math="X|\psi\rangle = X(\alpha|0\rangle + \beta|1\rangle) = \alpha|1\rangle + \beta|0\rangle" />
      <p>
        <strong>The Z gate</strong> (Pauli-Z, phase flip) leaves <InlineMath math="|0\rangle" /> unchanged and flips the sign of <InlineMath math="|1\rangle" />:
      </p>
      <BlockMath math="Z(\alpha|0\rangle + \beta|1\rangle) = \alpha|0\rangle - \beta|1\rangle" />
      <p>
        <strong>The Y gate</strong> combines both effects, introducing an imaginary factor:
      </p>
      <BlockMath math="Y(\alpha|0\rangle + \beta|1\rangle) = i\alpha|1\rangle - i\beta|0\rangle" />
      <p>
        Note that <InlineMath math="Y = iXZ" /> — the Y gate is not independent but follows from the Pauli algebra relation <InlineMath math="XYZ = iI" />.
      </p>

      <h2>6.3 — Phase Gates: S and T</h2>
      <p>
        Phase gates leave <InlineMath math="|0\rangle" /> unchanged and multiply <InlineMath math="|1\rangle" /> by a phase factor. They do not change measurement probabilities in the computational basis but alter the relative phase between amplitudes.
      </p>
      <p>
        The <strong>S gate</strong> applies a quarter-turn phase:
      </p>
      <BlockMath math="S = \begin{pmatrix}1&0\\0&i\end{pmatrix}, \quad S|1\rangle = i|1\rangle" />
      <p>
        The <strong>T gate</strong> (also called <InlineMath math="\pi/8" /> gate) applies an eighth-turn phase:
      </p>
      <BlockMath math="T = \begin{pmatrix}1&0\\0&e^{i\pi/4}\end{pmatrix}, \quad T = S^{1/2}" />
      <p>
        Together, <InlineMath math="\{H, T\}" /> form a <strong>universal gate set</strong> for single-qubit operations: any single-qubit unitary can be approximated to arbitrary precision using only H and T gates (Solovay–Kitaev theorem).
      </p>

      <h2>6.4 — The Hadamard Gate as a Basis Change</h2>
      <p>
        The Hadamard gate is a rotation by <InlineMath math="\pi" /> about the <InlineMath math="(\hat{x}+\hat{z})/\sqrt{2}" /> axis on the Bloch sphere. Its matrix is:
      </p>
      <BlockMath math="H = \frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}" />
      <p>
        H is both unitary and Hermitian: <InlineMath math="H = H^\dagger" /> and <InlineMath math="H^2 = I" />. Its key role is to transform between the computational basis <InlineMath math="\{|0\rangle, |1\rangle\}" /> and the Hadamard (Fourier) basis <InlineMath math="\{|+\rangle, |-\rangle\}" />:
      </p>
      <BlockMath math="H|0\rangle = |{+}\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}, \qquad H|1\rangle = |{-}\rangle = \frac{|0\rangle-|1\rangle}{\sqrt{2}}" />
      <p>
        This basis-change property is the foundation of almost every quantum algorithm: operations that are difficult in the computational basis become simple in the Hadamard basis, and vice versa. The circuit <InlineMath math="H \to Z \to H" /> is equivalent to the X gate: <InlineMath math="HZH = X" />.
      </p>

      <TryIt heading="6.5 — Try It: Gate Sequences and Self-Inverse">
        <p>
          Apply <strong>X</strong> to qubit 0, then apply <strong>X</strong> again. Observe that the state returns to <InlineMath math="|0\rangle" /> — confirming <InlineMath math="X^2 = I" />.
        </p>
        <p>
          Then try the sequence <strong>H → Z → H</strong>. The probability bars should match the result of applying a single <strong>X</strong> gate — verifying the identity <InlineMath math="HZH = X" /> experimentally.
        </p>
        <ol>
          <li>Start: <InlineMath math="|0\rangle" /> — 100% probability on <InlineMath math="|0\rangle" /></li>
          <li>Apply H: <InlineMath math="|{+}\rangle" /> — 50/50 superposition</li>
          <li>Apply Z: <InlineMath math="|{-}\rangle" /> — 50/50, opposite phase</li>
          <li>Apply H: <InlineMath math="|1\rangle" /> — 100% probability on <InlineMath math="|1\rangle" /></li>
        </ol>
      </TryIt>
    </>
  );
}
