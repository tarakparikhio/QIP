'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson20Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Hybrid Loop">
          <NotationBox.Text>
            Variational algorithms run a parameterized circuit on a quantum device and update the parameters using a classical optimizer.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Objective">
          <NotationBox.Code>
            <NotationBox.Row math="C(\theta) = \langle \psi(\theta) | H | \psi(\theta) \rangle" label="cost function" />
            <NotationBox.Row math="\theta_{new} = \theta_{old} - \eta \nabla C" label="parameter update" />
          </NotationBox.Code>
        </NotationBox.Item>
      </NotationBox>

      <h2>29.1 — The Core Idea</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> variational algorithms use a hybrid loop of quantum state preparation and classical optimization, which makes them practical for near-term hardware.
      </p>
      <p>
        Variational quantum algorithms are designed for near-term devices where full-scale fault tolerance is not yet available. A short parameterized circuit is executed, its output is evaluated by a cost function, and a classical optimizer nudges the parameters toward better values.
      </p>
      <p>
        The simulator here is only a conceptual entry point: it illustrates how a small circuit can change a state and how a cost landscape can be explored, but it does not represent the full training loop of a real variational algorithm.
      </p>

      <h2>29.2 — Why This Works</h2>
      <p>
        The circuit prepares a family of trial states <InlineMath math="|\psi(\theta)\rangle" />. By measuring expectation values, we can estimate a cost landscape and search it using classical methods. The quantum computer is used for sampling and state preparation, while the classical computer handles the optimization loop.
      </p>
      <BlockMath math="\min_\theta C(\theta) = \min_\theta \langle \psi(\theta) | H | \psi(\theta) \rangle" />

      <h2>29.3 — Where They Are Useful</h2>
      <p>
        These methods are especially relevant for chemistry, optimization, and small-scale machine learning. Their appeal is that they can make productive use of today&apos;s hardware even when circuit depth and qubit counts are limited.
      </p>

      <TryIt heading="29.4 — Try It: Think About the Loop">
        <p>
          If the cost decreases after an update, what does that suggest about the new parameter settings? Why might the optimizer need to balance exploration and exploitation when the circuit is noisy?
        </p>
      </TryIt>
    </>
  );
}
