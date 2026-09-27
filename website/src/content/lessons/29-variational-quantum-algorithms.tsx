'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';
import EnergyLab from '@/components/labs/EnergyLab';

export default function Lesson29Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The hybrid loop">
          <NotationBox.Text>
            A parameterized circuit prepares <InlineMath math="|\psi(\boldsymbol\theta)\rangle" />. The quantum device estimates a cost from measurements; a classical optimizer updates <InlineMath math="\boldsymbol\theta" />.
          </NotationBox.Text>
          <NotationBox.Formula math="\boldsymbol\theta^* = \arg\min_{\boldsymbol\theta}\; C(\boldsymbol\theta), \qquad C(\boldsymbol\theta) = \langle\psi(\boldsymbol\theta)|H|\psi(\boldsymbol\theta)\rangle" note="Each evaluation of C is itself a statistical estimate." />
        </NotationBox.Item>
        <NotationBox.Item heading="Key terms">
          <NotationBox.List items={[
            { term: 'Ansatz', description: 'The chosen circuit shape, with adjustable rotation angles.' },
            { term: 'Parameter-shift rule', description: <>An exact gradient from two shifted cost evaluations: <InlineMath math="\partial_\theta C = \tfrac12[C(\theta + \tfrac\pi2) - C(\theta - \tfrac\pi2)]" /> for rotation gates.</> },
            { term: 'Barren plateau', description: 'A landscape so flat that gradients are exponentially small in the number of qubits.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>29.1 — Why a Hybrid Loop?</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> variational algorithms run short circuits many times and let a classical optimizer tune them. Every cost and gradient is estimated from shots, so training is stochastic optimization, with the same trade-offs as noisy gradient descent.
      </p>
      <p>
        Current devices can run only shallow circuits before noise wins. Variational algorithms accept that limit: keep the circuit short, and move as much work as possible to a classical computer. The quantum device does one thing well, preparing a state and measuring it, and the optimizer does the rest.
      </p>

      <h2>29.2 — A One-Parameter Example</h2>
      <p>
        Take one qubit, the ansatz <InlineMath math="R_Y(\theta)|0\rangle = \cos\tfrac\theta2|0\rangle + \sin\tfrac\theta2|1\rangle" />, and the cost <InlineMath math="H = Z + 0.5X" />. Then <InlineMath math="\langle Z\rangle = \cos\theta" /> and <InlineMath math="\langle X\rangle = \sin\theta" />, so
      </p>
      <BlockMath math="C(\theta) = \cos\theta + 0.5\sin\theta" />
      <p>
        On hardware, <InlineMath math="\langle Z\rangle" /> is estimated by measuring and averaging <InlineMath math="\pm1" /> outcomes, and <InlineMath math="\langle X\rangle" /> by applying H first. Each average has standard error <InlineMath math="\sqrt{(1 - \langle P\rangle^2)/N}" />, so the optimizer sees a noisy version of the curve. The lab below lets you feel this directly.
      </p>
      <EnergyLab />

      <h2>29.3 — Exact Gradients From Two Measurements</h2>
      <p>
        For gates of the form <InlineMath math="e^{-i\theta P/2}" /> with <InlineMath math="P" /> a Pauli operator, the cost is a sinusoid in <InlineMath math="\theta" />: <InlineMath math="C(\theta) = a\cos\theta + b\sin\theta + c" />. Then
      </p>
      <BlockMath math="\frac{C(\theta + \frac\pi2) - C(\theta - \frac\pi2)}{2} = -a\sin\theta + b\cos\theta = \frac{dC}{d\theta}" />
      <p>
        exactly, not as a finite-difference approximation. For the example, at <InlineMath math="\theta = \pi/3" /> with <InlineMath math="C = \cos\theta" /> alone, the shift rule gives <InlineMath math="-\sin(\pi/3) \approx -0.866" />. With <InlineMath math="m" /> parameters, a full gradient needs <InlineMath math="2m" /> cost estimates, each from many shots. That makes training a form of stochastic gradient descent: the gradients are unbiased but noisy, and more shots buy less noise at a <InlineMath math="1/\sqrt N" /> rate.
      </p>

      <h2>29.4 — Barren Plateaus and Other Obstacles</h2>
      <p>
        For deep, randomly initialized circuits on many qubits, the gradient&apos;s variance across the landscape shrinks exponentially with the number of qubits (McClean and colleagues, 2018). Gradients are then so small that estimating their sign needs exponentially many shots, since the standard error must fall below the signal. That is a barren plateau. Mitigations include shallow or problem-inspired ansätze, local cost functions, and careful initialization.
      </p>
      <p>
        Noise adds a second problem: it biases estimates and flattens the landscape further. And there is no general guarantee that the optimizer reaches the global minimum. Variational methods are practical tools for near-term experiments, not guaranteed speedups.
      </p>

      <TryIt heading="29.5 — Try It: Train With Noisy Measurements">
        <p>
          In the energy lab, start at <InlineMath math="\theta \approx 34^\circ" /> and take gradient steps. Then set the shots to 20 and re-measure a few times: the energy estimate jumps around, even though the gradient steps (computed exactly here) still head downhill. How many shots would you need before the error bar is smaller than the remaining gap to the ground energy?
        </p>
      </TryIt>
    </>
  );
}
