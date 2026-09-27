'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson15Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Definition">
          <NotationBox.Text>
            If a system is in state <InlineMath math="|\psi_i\rangle" /> with probability <InlineMath math="p_i" />, its density matrix is the probability-weighted average of projectors:
          </NotationBox.Text>
          <NotationBox.Formula math="\rho = \sum_i p_i\,|\psi_i\rangle\langle\psi_i|" note="A pure state is the special case of a single term with p = 1." />
        </NotationBox.Item>
        <NotationBox.Item heading="Rules that replace the state-vector rules">
          <NotationBox.List items={[
            { term: 'Probabilities', description: <><InlineMath math="P(k) = \langle k|\rho|k\rangle" />, the k-th diagonal entry.</> },
            { term: 'Expectation values', description: <><InlineMath math="\langle A\rangle = \mathrm{Tr}(A\rho)" />.</> },
            { term: 'Gates', description: <><InlineMath math="\rho \to U\rho U^\dagger" />.</> },
            { term: 'Purity', description: <><InlineMath math="\mathrm{Tr}(\rho^2)" />: 1 for a pure state, <InlineMath math="1/2" /> for a maximally mixed qubit.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>15.1 — Two States With Identical Z Statistics</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> a density matrix holds a probability distribution on its diagonal and quantum coherence off it. It is the right object whenever there is noise, missing information, or entanglement with something you are not measuring.
      </p>
      <p>
        Compare a superposition with a coin flip between basis states:
      </p>
      <BlockMath math="\rho_{+} = |+\rangle\langle+| = \frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}, \qquad \rho_{\text{mix}} = \tfrac12|0\rangle\langle0| + \tfrac12|1\rangle\langle1| = \frac12\begin{pmatrix}1&0\\0&1\end{pmatrix}" />
      <p>
        Both have diagonal <InlineMath math="(\tfrac12, \tfrac12)" />, so Z-basis measurements cannot tell them apart. Measure in the X basis instead:
      </p>
      <ol>
        <li><InlineMath math="P(+) = \langle+|\rho_{+}|+\rangle = 1" />: the superposition always gives +.</li>
        <li><InlineMath math="P(+) = \langle+|\rho_{\text{mix}}|+\rangle = \tfrac12" />: the mixture is a fair coin in every basis.</li>
      </ol>
      <p>
        The off-diagonal entries are what differ. They have no counterpart in ordinary probability; they are the quantitative record of coherence.
      </p>

      <h2>15.2 — The Bloch Ball</h2>
      <p>
        Every single-qubit density matrix can be written with a Bloch vector <InlineMath math="\vec r = (x, y, z)" />:
      </p>
      <BlockMath math="\rho = \frac{1}{2}\left(I + xX + yY + zZ\right), \qquad |\vec r\,| \le 1" />
      <p>
        Pure states lie on the surface (<InlineMath math="|\vec r| = 1" />), mixed states inside, and the maximally mixed state <InlineMath math="I/2" /> at the center. Purity and length are linked by <InlineMath math="\mathrm{Tr}(\rho^2) = (1 + |\vec r|^2)/2" />.
      </p>
      <p>
        Worked example: <InlineMath math="\rho = 0.7|0\rangle\langle0| + 0.3|1\rangle\langle1|" /> has <InlineMath math="z = 0.7 - 0.3 = 0.4" /> and <InlineMath math="x = y = 0" />. Its purity is <InlineMath math="0.7^2 + 0.3^2 = 0.58" />, and indeed <InlineMath math="(1 + 0.4^2)/2 = 0.58" />.
      </p>
      <p>
        <strong>Statistics lens:</strong> for a diagonal <InlineMath math="\rho" />, purity is <InlineMath math="\sum_k p_k^2" />, the probability that two independent draws give the same outcome (the Simpson or Gini concentration index). The more spread out the distribution, the lower the purity.
      </p>

      <h2>15.3 — Different Mixtures, Same Matrix</h2>
      <p>
        An equal mixture of <InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" />, and an equal mixture of <InlineMath math="|+\rangle" /> and <InlineMath math="|-\rangle" />, both give <InlineMath math="I/2" />. Since every measurement probability is computed from <InlineMath math="\rho" /> alone, no experiment can tell these preparations apart. The density matrix contains exactly the information that is physically observable, and nothing more.
      </p>

      <h2>15.4 — Entanglement Makes the Parts Mixed</h2>
      <p>
        For two qubits, the state of qubit A alone is found by the <strong>partial trace</strong>: sum over the possible states of B. For the Bell state <InlineMath math="|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt2" />:
      </p>
      <BlockMath math="\rho_A = \mathrm{Tr}_B\,|\Phi^+\rangle\langle\Phi^+| = \langle 0_B|\Phi^+\rangle\langle\Phi^+|0_B\rangle + \langle 1_B|\Phi^+\rangle\langle\Phi^+|1_B\rangle = \tfrac12|0\rangle\langle0| + \tfrac12|1\rangle\langle1| = \tfrac{I}{2}" />
      <p>
        The pair is in a pure state, yet each qubit alone is maximally mixed, with purity <InlineMath math="1/2" />. This is the statistical signature of entanglement: complete knowledge of the whole, no knowledge of the parts. In the language of distributions, the joint state is sharp while each marginal is uniform.
      </p>

      <TryIt heading="15.5 — Try It: Watch a Qubit Become Mixed">
        <p>
          On two qubits, apply H to q0 and look at the per-qubit Bloch panel: q0 is on the sphere&apos;s surface with purity 1. Now add CNOT (q0 → q1). Both Bloch vectors shrink to the center and each qubit reports purity 0.50, even though the two-qubit state is still pure.
        </p>
      </TryIt>
    </>
  );
}
