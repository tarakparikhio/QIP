'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson30Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Variational principle">
          <NotationBox.Text>
            For any normalized trial state, the measured energy is at least the true ground-state energy <InlineMath math="E_0" />:
          </NotationBox.Text>
          <NotationBox.Formula math="E(\boldsymbol\theta) = \langle\psi(\boldsymbol\theta)|H|\psi(\boldsymbol\theta)\rangle \ge E_0" note="Lower is always better, and equality means you found the ground state." />
        </NotationBox.Item>
        <NotationBox.Item heading="Measuring a Hamiltonian">
          <NotationBox.Text>
            The Hamiltonian is written as a weighted sum of Pauli strings, and each term is estimated separately:
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="H = \sum_j h_j P_j" label="e.g. P_j = Z⊗Z, X⊗I, …" />
            <NotationBox.Row math="\hat E = \sum_j h_j\,\widehat{\langle P_j\rangle}" label="estimate from shot averages" />
          </NotationBox.Code>
        </NotationBox.Item>
      </NotationBox>

      <h2>30.1 — Why the Energy Can Only Be Too High</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> VQE searches over trial states for the lowest measured energy. The variational principle guarantees you never undershoot, but every energy is a statistical estimate, and reaching chemical accuracy can take millions of shots.
      </p>
      <p>
        Expand the trial state in the eigenstates of <InlineMath math="H" />: <InlineMath math="|\psi\rangle = \sum_k c_k|E_k\rangle" />. Then
      </p>
      <BlockMath math="E(\boldsymbol\theta) = \sum_k |c_k|^2 E_k" />
      <p>
        <strong>Statistics lens:</strong> this is a weighted average of the energy levels, with weights <InlineMath math="|c_k|^2" /> that form a probability distribution. A weighted average can never be smaller than the smallest value, so <InlineMath math="E(\boldsymbol\theta) \ge E_0" />. The gap <InlineMath math="E(\boldsymbol\theta) - E_0" /> shrinks as more weight moves onto the ground state.
      </p>

      <h2>30.2 — Worked Example</h2>
      <p>
        Use the one-qubit Hamiltonian from the previous lesson, <InlineMath math="H = Z + 0.5X" />. Its eigenvalues are <InlineMath math="\pm\sqrt{1 + 0.5^2} = \pm\sqrt{1.25} \approx \pm1.118" />. With the ansatz <InlineMath math="R_Y(\theta)|0\rangle" />:
      </p>
      <ol>
        <li><InlineMath math="E(\theta) = \cos\theta + 0.5\sin\theta" />.</li>
        <li>This is a sinusoid with amplitude <InlineMath math="\sqrt{1 + 0.25} = \sqrt{1.25}" />, so its minimum is exactly <InlineMath math="-\sqrt{1.25}" />: this ansatz can reach the true ground state.</li>
        <li>The minimum is at <InlineMath math="\theta = \pi + \arctan(0.5) \approx 206.6^\circ" />. A naive guess of <InlineMath math="\theta = \pi" /> gives <InlineMath math="-1" />, which is <InlineMath math="0.118" /> too high.</li>
      </ol>
      <p>
        For a real molecule, the Hamiltonian has many Pauli terms and the ansatz may not contain the exact ground state. Then VQE returns an upper bound whose quality depends on the ansatz, which is why chemistry-inspired ansätze matter.
      </p>

      <h2>30.3 — How Many Shots? A Sample-Size Calculation</h2>
      <p>
        Each Pauli term is a <InlineMath math="\pm1" /> random variable with variance <InlineMath math="1 - \langle P_j\rangle^2 \le 1" />. If term <InlineMath math="j" /> gets <InlineMath math="N_j" /> shots, the energy estimate has variance
      </p>
      <BlockMath math="\mathrm{Var}(\hat E) = \sum_j \frac{h_j^2\,\sigma_j^2}{N_j}" />
      <p>
        With a single term of weight 1 and <InlineMath math="\sigma = 1" />, a 95% margin of <InlineMath math="\varepsilon" /> needs <InlineMath math="N = (1.96/\varepsilon)^2" /> shots. Chemical accuracy, about 1.6 milli-hartree, gives <InlineMath math="N = (1.96/0.0016)^2 \approx 1.5" /> million shots for one energy estimate, and an optimization needs many estimates.
      </p>
      <p>
        With a fixed total budget, the variance above is minimized by giving each term shots in proportion to <InlineMath math="|h_j|\,\sigma_j" />. Survey statisticians know this as Neyman allocation: sample more where the weight and the spread are larger. Grouping terms that can be measured together (commuting Pauli strings) reduces the cost further.
      </p>

      <h2>30.4 — Limitations</h2>
      <p>
        Hardware noise biases each <InlineMath math="\langle P_j\rangle" />, so a noisy device can report an energy that is too high, or, after imperfect error mitigation, even below <InlineMath math="E_0" />, which should be read as a warning sign. Optimization can stall on barren plateaus or in local minima. VQE is a flexible research tool; whether it beats classical chemistry methods for useful molecules is still an open question.
      </p>

      <TryIt heading="30.5 — Try It: Hit the Ground Energy">
        <p>
          Use the energy lab in the previous lesson. Starting from <InlineMath math="\theta = 180^\circ" />, take gradient steps until the gap to the ground energy is below 0.01, and note the final angle (it should approach <InlineMath math="206.6^\circ" />). Then estimate how many shots per expectation value you would need for the error bar to be smaller than that 0.01 gap.
        </p>
      </TryIt>
    </>
  );
}
