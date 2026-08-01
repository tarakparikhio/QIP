'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson08Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Tensor Products">
          <NotationBox.Text>
            The joint state of two independent quantum systems is formed by the tensor product of their individual states. For qubits <InlineMath math="A" /> and <InlineMath math="B" />:
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="|a\rangle \otimes |b\rangle \equiv |ab\rangle" label="shorthand notation" />
            <NotationBox.Row math="|0\rangle \otimes |1\rangle = \begin{pmatrix}1\\0\end{pmatrix} \otimes \begin{pmatrix}0\\1\end{pmatrix} = \begin{pmatrix}0\\1\\0\\0\end{pmatrix}" label="|01⟩" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Two-Qubit Computational Basis">
          <NotationBox.Code>
            <NotationBox.Row math="|00\rangle = (1,0,0,0)^T" label="both qubits zero" />
            <NotationBox.Row math="|01\rangle = (0,1,0,0)^T" label="qubit 0 zero, qubit 1 one" />
            <NotationBox.Row math="|10\rangle = (0,0,1,0)^T" label="qubit 0 one, qubit 1 zero" />
            <NotationBox.Row math="|11\rangle = (0,0,0,1)^T" label="both qubits one" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="State Space Dimension">
          <NotationBox.List items={[
            { term: 'n qubits', description: <><InlineMath math="2^n" /> basis states — exponential growth in state space dimension.</> },
            { term: 'Separable', description: <>State <InlineMath math="|\Psi\rangle = |\psi_A\rangle \otimes |\psi_B\rangle" /> — can be written as tensor product of individual states.</> },
            { term: 'Entangled', description: 'State that CANNOT be written as a tensor product of individual qubit states.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>8.1 — Tensor Products and State Space</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> multi-qubit systems grow exponentially in state-space dimension, and tensor products are the language for describing them.
      </p>
      <p>
        When two physical systems are combined, their joint state space is the tensor product of the individual spaces. For a single qubit, the state space is <InlineMath math="\mathbb{C}^2" />. For two qubits:
      </p>
      <BlockMath math="\mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4" />
      <p>
        The tensor product of two vectors is computed using the Kronecker product. For arbitrary single-qubit states:
      </p>
      <BlockMath math="(\alpha_0|0\rangle + \alpha_1|1\rangle) \otimes (\beta_0|0\rangle + \beta_1|1\rangle) = \alpha_0\beta_0|00\rangle + \alpha_0\beta_1|01\rangle + \alpha_1\beta_0|10\rangle + \alpha_1\beta_1|11\rangle" />
      <p>
        This expansion has four terms — four complex amplitudes, subject to the single normalization constraint <InlineMath math="\sum_{x \in \{00,01,10,11\}} |c_x|^2 = 1" />. For <InlineMath math="n" /> qubits, the state vector has <InlineMath math="2^n" /> complex amplitudes.
      </p>

      <h2>8.2 — The Two-Qubit Computational Basis</h2>
      <p>
        The four basis states <InlineMath math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" /> are the eigenstates of simultaneous measurement of both qubits in the computational basis. In the playground convention, the <em>left</em> index is qubit 0 and the right index is qubit 1:
      </p>
      <BlockMath math="|01\rangle \equiv \text{qubit 0 is } |0\rangle \text{ and qubit 1 is } |1\rangle" />
      <p>
        This matches binary counting: <InlineMath math="|00\rangle = 0, |01\rangle = 1, |10\rangle = 2, |11\rangle = 3" />.
      </p>
      <p>
        A general 2-qubit state is a superposition of all four basis states:
      </p>
      <BlockMath math="|\Psi\rangle = c_{00}|00\rangle + c_{01}|01\rangle + c_{10}|10\rangle + c_{11}|11\rangle, \quad \sum|c_{xy}|^2 = 1" />

      <h2>8.3 — Separable and Entangled States</h2>
      <p>
        A 2-qubit state <InlineMath math="|\Psi\rangle" /> is <strong>separable</strong> if it can be written as a tensor product <InlineMath math="|\psi_A\rangle \otimes |\psi_B\rangle" />. A separable state has no correlations between the two subsystems: measuring qubit A gives no information about qubit B.
      </p>
      <p>
        Step-by-step test for separability of <InlineMath math="|\Psi\rangle = c_{00}|00\rangle + c_{01}|01\rangle + c_{10}|10\rangle + c_{11}|11\rangle" />:
      </p>
      <ol>
        <li>Arrange the amplitudes into a <InlineMath math="2 \times 2" /> matrix <InlineMath math="M_{ij} = c_{ij}" />.</li>
        <li>Compute the determinant: <InlineMath math="\det M = c_{00}c_{11} - c_{01}c_{10}" />.</li>
        <li>If <InlineMath math="\det M = 0" />, the state is separable (rank-1 matrix = tensor product). If <InlineMath math="\det M \neq 0" />, the state is entangled.</li>
      </ol>
      <p>
        Example: the Bell state <InlineMath math="|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)" /> has amplitudes <InlineMath math="c_{00} = c_{11} = 1/\sqrt{2}" />, <InlineMath math="c_{01} = c_{10} = 0" />. Its determinant is <InlineMath math="\det M = (1/\sqrt{2})(1/\sqrt{2}) - 0 = 1/2 \neq 0" /> — entangled.
      </p>

      <h2>8.4 — Operations on Multi-Qubit Systems</h2>
      <p>
        Single-qubit gates acting on one qubit of a 2-qubit system are extended to 4×4 matrices via tensor product with the identity on the other qubit. If gate <InlineMath math="U" /> acts on qubit 1 and qubit 0 is untouched:
      </p>
      <BlockMath math="I \otimes U" />
      <p>
        For example, applying X to qubit 1 only:
      </p>
      <BlockMath math="I \otimes X = \begin{pmatrix}0&1&0&0\\1&0&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}" />
      <p>
        This maps <InlineMath math="|00\rangle \to |01\rangle" />, <InlineMath math="|10\rangle \to |11\rangle" />, etc., flipping qubit 1 while leaving qubit 0 unchanged.
      </p>

      <TryIt heading="8.5 — Try It: Build a Two-Qubit Product State">
        <p>
          In the playground, add a second qubit row. Apply <strong>X</strong> to qubit 1 only, leaving qubit 0 in <InlineMath math="|0\rangle" />.
        </p>
        <p>
          The resulting state is the product state <InlineMath math="|01\rangle = |0\rangle \otimes |1\rangle" /> — separable, with qubit 0 in the ground state and qubit 1 flipped.
        </p>
        <ol>
          <li>Initial: <InlineMath math="|00\rangle" /> — amplitude 1 on the first basis state.</li>
          <li>Apply X to qubit 1: <InlineMath math="(I \otimes X)|00\rangle = |01\rangle" />.</li>
          <li>Probability bars: 100% on <InlineMath math="|01\rangle" />, 0% elsewhere.</li>
        </ol>
      </TryIt>
    </>
  );
}
