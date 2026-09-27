'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson14Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Noise as a random operation">
          <NotationBox.Text>
            A noise process applies one of several operations at random. Written with density matrices, it is a <strong>quantum channel</strong>:
          </NotationBox.Text>
          <NotationBox.Formula math="\mathcal{E}(\rho) = \sum_k K_k\,\rho\,K_k^\dagger, \qquad \sum_k K_k^\dagger K_k = I" note="The condition on the right guarantees probabilities still add to 1." />
        </NotationBox.Item>
        <NotationBox.Item heading="The standard single-qubit channels">
          <NotationBox.List items={[
            { term: 'Bit flip', description: <><InlineMath math="(1-p)\rho + pX\rho X" /></> },
            { term: 'Phase flip', description: <><InlineMath math="(1-p)\rho + pZ\rho Z" /></> },
            { term: 'Depolarizing', description: <><InlineMath math="(1-p)\rho + p\,\tfrac{I}{2}" />: with probability <InlineMath math="p" /> the qubit is replaced by a completely random one.</> },
            { term: 'Amplitude damping', description: <>Energy loss toward <InlineMath math="|0\rangle" /> with probability <InlineMath math="\gamma = 1 - e^{-t/T_1}" />.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>14.1 — From Random Errors to Channels</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> noise is a probability distribution over errors. Channels describe the average effect, error rates compound, and readout errors can be modeled and partly undone with ordinary probability.
      </p>
      <p>
        Suppose that on each run an X error happens with probability <InlineMath math="p" />, and otherwise nothing happens. You cannot tell which runs were hit, so the best description is the weighted average of both possibilities. That is the bit-flip channel. The same recipe describes any mixture of error operations: weight each outcome by its probability and add. It is the law of total probability applied to states.
      </p>

      <h2>14.2 — How Each Channel Moves the Bloch Vector</h2>
      <p>
        Channels are easiest to picture as shrinking the Bloch vector <InlineMath math="(x, y, z)" />:
      </p>
      <ol>
        <li><strong>Bit flip:</strong> <InlineMath math="y" /> and <InlineMath math="z" /> are multiplied by <InlineMath math="1 - 2p" />; <InlineMath math="x" /> is untouched (X errors leave <InlineMath math="|\pm\rangle" /> alone).</li>
        <li><strong>Phase flip:</strong> <InlineMath math="x" /> and <InlineMath math="y" /> are multiplied by <InlineMath math="1 - 2p" />; <InlineMath math="z" /> is untouched. This is the dephasing of the previous lesson.</li>
        <li><strong>Depolarizing:</strong> the whole vector is multiplied by <InlineMath math="1 - p" />, shrinking uniformly toward the center.</li>
        <li><strong>Amplitude damping:</strong> the vector is pulled toward the north pole <InlineMath math="|0\rangle" />; this is the only one of the four that is not symmetric.</li>
      </ol>
      <p>
        Worked example: start in <InlineMath math="|+\rangle" /> (Bloch vector <InlineMath math="(1, 0, 0)" />) and apply a phase flip with <InlineMath math="p = 0.1" />. The x-component becomes <InlineMath math="1 - 0.2 = 0.8" />, so after an H gate <InlineMath math="P(0) = (1 + 0.8)/2 = 0.9" /> instead of 1.
      </p>

      <h2>14.3 — Readout Errors: a Confusion Matrix</h2>
      <p>
        Measurement itself can misreport. Suppose a true 0 is read as 1 with probability 0.02, and a true 1 is read as 0 with probability 0.05. Collect these into a matrix that maps true probabilities to observed ones:
      </p>
      <BlockMath math="\begin{pmatrix} q_0 \\ q_1 \end{pmatrix} = \begin{pmatrix} 0.98 & 0.05 \\ 0.02 & 0.95 \end{pmatrix}\begin{pmatrix} p_0 \\ p_1 \end{pmatrix}" />
      <p>
        For <InlineMath math="|+\rangle" />, the true <InlineMath math="p_1 = 0.5" /> becomes an observed <InlineMath math="q_1 = 0.5(0.02) + 0.5(0.95) = 0.485" />. This is the same confusion matrix used for false positives and false negatives in any diagnostic test. <strong>Readout mitigation</strong> inverts it: here <InlineMath math="p_1 = (q_1 - 0.02)/(0.95 - 0.02)" />, which turns 0.485 back into 0.5. With finite shots, <InlineMath math="q_1" /> is itself an estimate, so mitigation also enlarges the error bars.
      </p>

      <h2>14.4 — Error Budgets Compound</h2>
      <p>
        If a circuit has <InlineMath math="n" /> gates and each fails independently with probability <InlineMath math="\varepsilon_i" />, the chance that none fail is
      </p>
      <BlockMath math="P(\text{no error}) = \prod_{i=1}^{n}(1 - \varepsilon_i) \approx e^{-\sum_i \varepsilon_i}" />
      <p>
        Twenty gates at 99.5% each give about <InlineMath math="0.995^{20} \approx 0.905" />; two hundred give about 0.37. This is why two-qubit gate error, usually the largest term, dominates what current devices can run, and why the next lessons turn to error correction.
      </p>

      <h2>14.5 — Circuit Example</h2>
      <p>
        The playground applies one deterministic error at a time. Compare a bit flip, <strong>X</strong>, which moves <InlineMath math="|0\rangle" /> to <InlineMath math="|1\rangle" />, with a phase flip between Hadamards, <strong>H → Z → H</strong>, which is invisible in the Z basis until the final H converts it into a bit flip. A real noisy device applies such errors only on some runs, which gives the averaged channels above.
      </p>

      <TryIt heading="14.6 — Try It: Which Errors Can You See?">
        <p>
          Apply Z to <InlineMath math="|0\rangle" /> and check the probabilities: nothing changes, because <InlineMath math="|0\rangle" /> is a Z eigenstate. Now apply H first. A phase flip only harms states that carry phase information. Which single-qubit states are immune to bit flips?
        </p>
      </TryIt>
    </>
  );
}
