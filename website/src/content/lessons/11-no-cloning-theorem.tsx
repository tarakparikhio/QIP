'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson36Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The theorem in one sentence">
          <NotationBox.Text>
            Classical data can be copied from a known representation. An arbitrary unknown quantum state cannot be copied perfectly by one universal quantum operation.
          </NotationBox.Text>
          <NotationBox.Formula math="\text{No universal } U \text{ can map } |\psi\rangle|0\rangle \to |\psi\rangle|\psi\rangle \text{ for every } |\psi\rangle" />
        </NotationBox.Item>
        <NotationBox.Item heading="Why linearity matters">
          <NotationBox.Text>
            Quantum operations are linear. If an operation copies <InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" />, its action on a superposition is fixed by linearity too.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Key Terms">
          <NotationBox.List items={[
            { term: 'Unknown state', description: 'A state whose amplitudes are not available as classical parameters.' },
            { term: 'Copying', description: 'Creating a second system in exactly the same quantum state, including phase relationships.' },
            { term: 'No-cloning theorem', description: 'A consequence of linear quantum evolution, not a limitation of a particular device.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>36.1 - Classical copying is not quantum copying</h2>
      <p>
        A classical program can read a bit and write the same value somewhere else. A quantum state is richer: copying it would need to preserve amplitudes and relative phase without learning them first.
      </p>
      <p>
        Some quantum states can be prepared again when their description is known. The theorem concerns one universal operation that would copy every possible unknown state.
      </p>

      <h2>36.2 - The linearity proof</h2>
      <p>
        Suppose a machine copies the computational basis states:
      </p>
      <BlockMath math="U|0\rangle|0\rangle=|0\rangle|0\rangle, \qquad U|1\rangle|0\rangle=|1\rangle|1\rangle" />
      <p>
        For <InlineMath math="|+\rangle=(|0\rangle+|1\rangle)/\sqrt{2}" />, linearity requires:
      </p>
      <BlockMath math="U|+\rangle|0\rangle=\frac{|00\rangle+|11\rangle}{\sqrt{2}}" />
      <p>
        A perfect copy would instead be <InlineMath math="|+\rangle|+\rangle" />, which contains four basis terms. Those states are different, so the same universal machine cannot perform both jobs.
      </p>

      <h2>36.3 - Why the theorem matters</h2>
      <p>
        No-cloning explains why quantum teleportation needs a destructive measurement and why quantum error correction stores information in correlations instead of making ordinary backups. It also helps explain why eavesdropping can disturb quantum key-distribution signals.
      </p>
      <p>
        The theorem does not say that quantum information can never be transferred. It says that transfer and duplication are different operations, and an unknown state cannot be copied while leaving the original untouched.
      </p>

      <TryIt heading="36.4 - Try It: CNOT is not a universal copier">
        <p>
          Prepare the control qubit in <InlineMath math="|+\rangle" /> with H, then apply CNOT with the second qubit as the target. The result is an entangled Bell state, not two independent copies of <InlineMath math="|+\rangle" />.
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Start with <InlineMath math="|+\rangle|0\rangle" />.</li>
          <li>Apply CNOT to obtain <InlineMath math="(|00\rangle+|11\rangle)/\sqrt{2}" />.</li>
          <li>Compare this with the hypothetical copy <InlineMath math="|+\rangle|+\rangle" />.</li>
        </ol>
      </TryIt>
    </>
  );
}
