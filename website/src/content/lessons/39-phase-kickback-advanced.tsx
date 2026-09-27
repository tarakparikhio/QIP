'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson39Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Kickback, generalized">
          <NotationBox.Text>
            For an eigenstate <InlineMath math="U|u\rangle = e^{i\phi}|u\rangle" />, a controlled-<InlineMath math="U^k" /> moves the phase <InlineMath math="k\phi" /> to the control:
          </NotationBox.Text>
          <NotationBox.Formula math="\tfrac{1}{\sqrt2}(|0\rangle + |1\rangle)|u\rangle \;\mapsto\; \tfrac{1}{\sqrt2}(|0\rangle + e^{ik\phi}|1\rangle)|u\rangle" />
        </NotationBox.Item>
        <NotationBox.Item heading="Hadamard test">
          <NotationBox.Text>
            H on a control, controlled-U, H again, then measure the control. For any state <InlineMath math="|\psi\rangle" />, eigenstate or not:
          </NotationBox.Text>
          <NotationBox.Formula math="P(0) = \tfrac12\big(1 + \mathrm{Re}\,\langle\psi|U|\psi\rangle\big)" />
        </NotationBox.Item>
      </NotationBox>

      <h2>39.1 — Beyond the Eigenstate Case</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> kickback is clean only for eigenstates. For general inputs the control becomes entangled with the target, and the Hadamard test turns that into a measurable estimate of ⟨ψ|U|ψ⟩, a building block of many algorithms.
      </p>
      <p>
        Lesson 12 derived kickback when the target is an eigenstate. Now suppose the target is a superposition of two eigenstates, <InlineMath math="a|u_1\rangle + b|u_2\rangle" />, with phases <InlineMath math="\phi_1" /> and <InlineMath math="\phi_2" />. Controlled-U gives
      </p>
      <BlockMath math="\tfrac{1}{\sqrt2}\Big[\,|0\rangle(a|u_1\rangle + b|u_2\rangle) + |1\rangle(a\,e^{i\phi_1}|u_1\rangle + b\,e^{i\phi_2}|u_2\rangle)\Big]" />
      <p>
        which no longer factors unless <InlineMath math="\phi_1 = \phi_2" /> (up to a multiple of <InlineMath math="2\pi" />). The control and target are now entangled, so the control alone is partly mixed. Example: control <InlineMath math="|+\rangle" />, target <InlineMath math="|+\rangle" />, and U = Z (phases 0 and <InlineMath math="\pi" />). CZ produces <InlineMath math="(|0\rangle|+\rangle + |1\rangle|-\rangle)/\sqrt2" />, and the control is maximally mixed: a final H gives 0 or 1 with probability 1/2 each.
      </p>

      <h2>39.2 — The Hadamard Test</h2>
      <p>
        Put the control in <InlineMath math="|+\rangle" />, apply controlled-U to <InlineMath math="|\psi\rangle" />, and apply H to the control. The amplitude for control outcome 0 is <InlineMath math="\tfrac12(|\psi\rangle + U|\psi\rangle)" />, whose squared length is
      </p>
      <BlockMath math="P(0) = \tfrac14\big(2 + 2\,\mathrm{Re}\langle\psi|U|\psi\rangle\big) = \tfrac12\big(1 + \mathrm{Re}\langle\psi|U|\psi\rangle\big)" />
      <p>
        Inserting <InlineMath math="S^\dagger" /> on the control before the final H gives the imaginary part instead. Worked example: <InlineMath math="U = T" /> and <InlineMath math="|\psi\rangle = |1\rangle" /> give <InlineMath math="\langle1|T|1\rangle = e^{i\pi/4}" />, so <InlineMath math="P(0) = (1 + \cos 45^\circ)/2 \approx 0.854" />.
      </p>
      <p>
        <strong>Statistics lens:</strong> the Hadamard test is an estimator. With <InlineMath math="N" /> shots, <InlineMath math="\widehat{\mathrm{Re}} = 2\hat P(0) - 1" />, with standard error <InlineMath math="2\sqrt{P(0)(1 - P(0))/N}" />. For example, 850 zeros in 1000 shots gives <InlineMath math="0.70 \pm 0.044" /> at 95% confidence (the true value here is 0.707).
      </p>

      <h2>39.3 — Where Kickback Appears</h2>
      <ol>
        <li><strong>Deutsch–Jozsa and Bernstein–Vazirani:</strong> an ancilla in <InlineMath math="|-\rangle" /> is an eigenstate of every bit-flip oracle, so each input picks up <InlineMath math="(-1)^{f(x)}" />.</li>
        <li><strong>Grover:</strong> the oracle&apos;s sign flip is kickback onto the search register.</li>
        <li><strong>Phase estimation:</strong> controlled powers <InlineMath math="U^{2^j}" /> kick back <InlineMath math="2^j\phi" />, one binary digit per qubit.</li>
        <li><strong>Hadamard test:</strong> estimates overlaps and expectation values, used in some chemistry and linear-algebra algorithms.</li>
      </ol>

      <TryIt heading="39.4 — Try It: Eigenstate Versus Superposition">
        <p>
          On two qubits, build X on q1, H on q0, CZ, H on q0: q0 reads 1 with certainty (eigenstate, clean kickback). Now replace the X on q1 with H, so the target is <InlineMath math="|+\rangle" />. Predict q0&apos;s probabilities, then check the per-qubit Bloch panel: q0 has moved to the center of the sphere, the signature of entanglement.
        </p>
      </TryIt>
    </>
  );
}
