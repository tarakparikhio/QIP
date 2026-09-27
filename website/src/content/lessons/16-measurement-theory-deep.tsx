'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';
import ShotLab from '@/components/labs/ShotLab';

export default function Lesson16Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Projective measurement">
          <NotationBox.Text>
            A measurement is a set of projectors <InlineMath math="\{\Pi_m\}" /> with <InlineMath math="\Pi_m^2 = \Pi_m" /> and <InlineMath math="\sum_m \Pi_m = I" />. Outcome <InlineMath math="m" /> occurs with the Born-rule probability and updates the state:
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="P(m) = \langle\psi|\Pi_m|\psi\rangle" label="probability" />
            <NotationBox.Row math="|\psi\rangle \mapsto \Pi_m|\psi\rangle / \sqrt{P(m)}" label="state after outcome m" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Observables">
          <NotationBox.Text>
            A Hermitian operator <InlineMath math="A = \sum_m a_m\Pi_m" /> assigns the value <InlineMath math="a_m" /> to outcome <InlineMath math="m" />. Its average is <InlineMath math="\langle A\rangle = \langle\psi|A|\psi\rangle = \sum_m a_m P(m)" />.
          </NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>16.1 — Measuring Part of a System</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> a measurement is specified by its projectors (or effects). It returns a random value with Born-rule probabilities, updates the state, and is estimated in practice from repeated shots.
      </p>
      <p>
        Take <InlineMath math="|\psi\rangle = \tfrac{1}{\sqrt3}(|00\rangle + |01\rangle + |11\rangle)" /> and measure only qubit 0. The projector for &ldquo;qubit 0 is 0&rdquo; is <InlineMath math="\Pi_0 = |0\rangle\langle0| \otimes I" />.
      </p>
      <ol>
        <li>Keep the terms consistent with the outcome: <InlineMath math="\Pi_0|\psi\rangle = \tfrac{1}{\sqrt3}(|00\rangle + |01\rangle)" />.</li>
        <li>Probability: the squared length of that vector, <InlineMath math="P(0) = \tfrac13 + \tfrac13 = \tfrac23" />.</li>
        <li>Renormalize: the post-measurement state is <InlineMath math="\tfrac{1}{\sqrt2}(|00\rangle + |01\rangle) = |0\rangle|+\rangle" />.</li>
      </ol>
      <p>
        Measuring one qubit changed the other: before, qubit 1 was correlated with qubit 0; afterwards it is exactly <InlineMath math="|+\rangle" />. This is the same rule as conditioning a joint probability distribution on an observed variable, except that it acts on amplitudes.
      </p>

      <h2>16.2 — Expectation Values and Their Uncertainty</h2>
      <p>
        For a Pauli observable such as Z, the outcomes are <InlineMath math="+1" /> and <InlineMath math="-1" />. So <InlineMath math="\langle Z\rangle = P(0) - P(1)" />, and each shot is a <InlineMath math="\pm1" /> random variable with variance
      </p>
      <BlockMath math="\mathrm{Var}(Z) = \langle Z^2\rangle - \langle Z\rangle^2 = 1 - \langle Z\rangle^2" />
      <p>
        Averaging <InlineMath math="N" /> shots gives an estimate with standard error <InlineMath math="\sqrt{(1 - \langle Z\rangle^2)/N}" />. Example: 30 zeros and 70 ones in 100 shots give <InlineMath math="\hat{\langle Z\rangle} = (30 - 70)/100 = -0.4" /> with standard error about <InlineMath math="\sqrt{0.84/100} \approx 0.09" />. States near an eigenstate (<InlineMath math="\langle Z\rangle \approx \pm1" />) need fewer shots; states on the equator need the most.
      </p>
      <ShotLab title="Estimate an expectation value from shots" />

      <h2>16.3 — Measuring in Other Bases</h2>
      <p>
        Hardware usually measures only in the Z basis, so other bases are reached by rotating first:
      </p>
      <ol>
        <li><strong>X basis:</strong> apply H, then measure Z. H sends <InlineMath math="|+\rangle \to |0\rangle" /> and <InlineMath math="|-\rangle \to |1\rangle" />.</li>
        <li><strong>Y basis:</strong> apply <InlineMath math="S^\dagger" />, then H, then measure Z. <InlineMath math="S^\dagger" /> sends <InlineMath math="|{+i}\rangle \to |+\rangle" />.</li>
      </ol>
      <p>
        Example: for <InlineMath math="0.6|0\rangle + 0.8|1\rangle" />, the Z basis gives <InlineMath math="P(0) = 0.36" />, but the X basis gives <InlineMath math="P(+) = (0.6 + 0.8)^2/2 = 0.98" />. The state is almost certain in one basis and quite random in another. No state is certain in every basis.
      </p>

      <h2>16.4 — Generalized Measurements (POVMs)</h2>
      <p>
        Real detectors are imperfect, and some protocols deliberately use more outcomes than dimensions. Both are described by a <strong>POVM</strong>: positive operators <InlineMath math="E_m" /> (called effects) with <InlineMath math="\sum_m E_m = I" /> and <InlineMath math="P(m) = \langle\psi|E_m|\psi\rangle" />. Projectors are the special case <InlineMath math="E_m = \Pi_m" />.
      </p>
      <p>
        A noisy Z readout that misreports 0 as 1 with probability 0.02, and 1 as 0 with probability 0.05, is the POVM
      </p>
      <BlockMath math="E_0 = 0.98\,|0\rangle\langle0| + 0.05\,|1\rangle\langle1|, \qquad E_1 = 0.02\,|0\rangle\langle0| + 0.95\,|1\rangle\langle1|" />
      <p>
        These add to <InlineMath math="I" />, so probabilities still sum to 1, but neither effect is a projector. This is the confusion matrix of the noise lesson, written as a measurement.
      </p>

      <TryIt heading="16.5 — Try It: Predict, Then Measure">
        <p>
          Build <strong>H</strong> on one qubit and predict the Z-basis result. Then add a second H and predict again: the second H turns an X-basis question into a Z-basis one. Use the sampler to compare your predictions with finite-shot counts, and check that the spread matches <InlineMath math="\sqrt{p(1-p)/N}" />.
        </p>
      </TryIt>
    </>
  );
}
