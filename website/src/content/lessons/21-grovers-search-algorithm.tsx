'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox } from '@/components/lesson';

export default function Lesson37Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The search problem">
          <NotationBox.Text>
            Grover&apos;s algorithm searches an unstructured list when a reversible oracle can recognize a marked answer. It increases the marked answer&apos;s probability rather than checking every item one by one.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="The two repeated steps">
          <NotationBox.List items={[
            { term: 'Oracle', description: 'Adds a phase of minus one to the marked state.' },
            { term: 'Diffusion', description: 'Reflects amplitudes around their average and amplifies the marked state.' },
            { term: 'Iteration count', description: 'For N items and one marked item, about pi/4 times square root of N iterations is optimal.' },
          ]} />
        </NotationBox.Item>
        <NotationBox.Item heading="Boundary of the claim">
          <NotationBox.Text>
            The quadratic query improvement assumes an unstructured search, a usable oracle, and a known or controlled number of marked solutions. It is not a universal speedup for all search or optimization tasks.
          </NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>37.1 - Start with equal candidates</h2>
      <p>
        Applying H to every qubit creates an equal superposition over the computational basis. For <InlineMath math="n" /> qubits, there are <InlineMath math="N=2^n" /> candidate bit strings.
      </p>
      <BlockMath math="|s\rangle=\frac{1}{\sqrt{N}}\sum_{x=0}^{N-1}|x\rangle" />
      <p>
        At this point every candidate has the same probability. The algorithm has not found anything yet; it has prepared a balanced starting point for interference.
      </p>

      <h2>37.2 - Mark, then reflect</h2>
      <p>
        The oracle marks a solution by changing its phase. Because a global phase cannot be observed by itself, the oracle is followed by the diffusion operator, which compares amplitudes against their average.
      </p>
      <BlockMath math="G=(2|s\rangle\langle s|-I)O" />
      <p>
        Repeating <InlineMath math="G" /> rotates the state toward the marked subspace. The measurement probability rises and then falls if the iterations continue too long, so amplification must be stopped at the right time.
      </p>

      <h2>37.3 - What the advantage means</h2>
      <p>
        Classical black-box search needs order <InlineMath math="N" /> oracle queries in the worst case. Grover&apos;s algorithm needs order <InlineMath math="\sqrt{N}" /> queries under its oracle model. The quantum circuit still needs an oracle implementation, gates, and measurement repetitions.
      </p>
      <p>
        This is a quadratic query improvement, not an exponential improvement. The result is valuable, but it does not make arbitrary database lookup instant or remove the cost of loading and verifying data.
      </p>

      <h2>37.4 - Why this playground stops at the idea</h2>
      <p>
        The current playground can show H, X, Z, and CNOT patterns, but it does not provide a general phase oracle, multi-qubit diffusion operator, or repeated shot sampling. A small fixed circuit would illustrate interference, not a complete Grover search, so this lesson keeps the algorithmic boundary explicit.
      </p>
    </>
  );
}
