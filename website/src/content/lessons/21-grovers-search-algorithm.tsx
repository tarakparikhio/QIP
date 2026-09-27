'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox } from '@/components/lesson';

export default function Lesson21Content() {
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

      <h2>21.1 - Start with equal candidates</h2>
      <p>
        Applying H to every qubit creates an equal superposition over the computational basis. For <InlineMath math="n" /> qubits, there are <InlineMath math="N=2^n" /> candidate bit strings.
      </p>
      <BlockMath math="|s\rangle=\frac{1}{\sqrt{N}}\sum_{x=0}^{N-1}|x\rangle" />
      <p>
        At this point every candidate has the same probability. The algorithm has not found anything yet; it has prepared a balanced starting point for interference.
      </p>

      <h2>21.2 - Mark, then reflect</h2>
      <p>
        The oracle marks a solution by flipping the sign of its amplitude: <InlineMath math="O|x\rangle=-|x\rangle" /> for the marked <InlineMath math="x" /> and <InlineMath math="O|x\rangle=|x\rangle" /> otherwise. This is a <em>relative</em> phase between the marked state and the rest, so it is physically real, but it does not change any computational-basis probability yet. Measuring right after the oracle would still give every candidate with equal probability.
      </p>
      <p>
        The diffusion operator turns that hidden sign difference into a probability difference. It reflects every amplitude about the average amplitude: a value <InlineMath math="a" /> becomes <InlineMath math="2\bar a-a" />. Because the marked amplitude is now negative, it sits far below the average and is reflected far above it.
      </p>
      <BlockMath math="G=(2|s\rangle\langle s|-I)O" />
      <p>
        Repeating <InlineMath math="G" /> rotates the state toward the marked subspace. The measurement probability rises and then falls if the iterations continue too long, so amplification must be stopped at the right time.
      </p>

      <h2>21.3 - Worked example: search four items with two qubits</h2>
      <p>
        With <InlineMath math="n=2" /> qubits there are <InlineMath math="N=4" /> candidates. Suppose the marked item is <InlineMath math="|11\rangle" />. Track the four amplitudes in the order <InlineMath math="|00\rangle,|01\rangle,|10\rangle,|11\rangle" />:
      </p>
      <ol>
        <li><strong>H on both qubits:</strong> <InlineMath math="(\tfrac12,\tfrac12,\tfrac12,\tfrac12)" />. Every probability is <InlineMath math="\tfrac14" />.</li>
        <li><strong>Oracle = CZ:</strong> CZ multiplies only <InlineMath math="|11\rangle" /> by <InlineMath math="-1" />, giving <InlineMath math="(\tfrac12,\tfrac12,\tfrac12,-\tfrac12)" />. Probabilities are still all <InlineMath math="\tfrac14" />.</li>
        <li><strong>Diffusion:</strong> the average amplitude is <InlineMath math="\bar a=\tfrac14" />. Reflecting each value, <InlineMath math="2\bar a-a" />, gives <InlineMath math="(0,0,0,1)" />.</li>
        <li><strong>Measure:</strong> the result is <InlineMath math="11" /> with probability 1.</li>
      </ol>
      <p>
        One iteration is exactly right for <InlineMath math="N=4" />. Geometrically, the start state makes an angle <InlineMath math="\theta" /> with the unmarked subspace where <InlineMath math="\sin\theta=1/\sqrt N=\tfrac12" />, so <InlineMath math="\theta=30^\circ" />. Each iteration rotates by <InlineMath math="2\theta" />, and <InlineMath math="30^\circ+60^\circ=90^\circ" /> lands exactly on the marked state.
      </p>
      <p>
        The diffusion step uses only gates in this playground: <strong>H on both → X on both → CZ → X on both → H on both</strong>. The middle <strong>X, CZ, X</strong> block flips the sign of <InlineMath math="|00\rangle" />, which equals <InlineMath math="-(2|00\rangle\langle00|-I)" />. The extra overall minus sign is a <em>global</em> phase, so it has no observable effect; this is exactly where the global-versus-relative distinction matters.
      </p>
      <p>
        Build the full circuit in the playground below and watch the state vector after each block. Then mark a different item: to mark <InlineMath math="|01\rangle" /> (qubit 0 is <InlineMath math="0" />, qubit 1 is <InlineMath math="1" />), surround the oracle CZ with X on q0 so that CZ acts on the pattern you want.
      </p>

      <h2>21.4 - What the advantage means</h2>
      <p>
        Classical black-box search needs order <InlineMath math="N" /> oracle queries in the worst case. Grover&apos;s algorithm needs order <InlineMath math="\sqrt{N}" /> queries under its oracle model. The quantum circuit still needs an oracle implementation, gates, and measurement repetitions.
      </p>
      <p>
        This is a quadratic query improvement, not an exponential improvement. The result is valuable, but it does not make arbitrary database lookup instant or remove the cost of loading and verifying data.
      </p>

      <h2>21.5 - Beyond two qubits</h2>
      <p>
        For larger <InlineMath math="N" />, the optimal number of iterations is about <InlineMath math="\frac{\pi}{4}\sqrt N" />, and the success probability is high but usually not exactly 1. Larger searches need multi-controlled phase gates for both the oracle and the diffusion step, which this playground does not provide as single gates.
      </p>
      <p>
        The oracle is the non-trivial problem-specific part: it must recognize a marked input reversibly and encode that answer as a phase without measuring the search register. In the two-qubit example, CZ happens to be the oracle for <InlineMath math="|11\rangle" />; for a real problem, building that oracle is where most of the cost lives.
      </p>
    </>
  );
}
