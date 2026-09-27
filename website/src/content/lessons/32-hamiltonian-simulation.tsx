'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson32Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Time evolution">
          <NotationBox.Text>
            A closed quantum system with Hamiltonian <InlineMath math="H" /> evolves by the unitary
          </NotationBox.Text>
          <NotationBox.Formula math="U(t) = e^{-iHt}" note="Units with ħ = 1. The eigenvalues of H are the allowed energies." />
        </NotationBox.Item>
        <NotationBox.Item heading="Exact building blocks">
          <NotationBox.List items={[
            { term: 'Single Pauli', description: <><InlineMath math="e^{-i\theta Z} = R_Z(2\theta)" />, and likewise <InlineMath math="e^{-i\theta X} = R_X(2\theta)" />.</> },
            { term: 'Two-qubit ZZ', description: <><InlineMath math="e^{-i\theta Z\otimes Z}" /> = CNOT, then <InlineMath math="R_Z(2\theta)" /> on the target, then CNOT.</> },
            { term: 'Any Pauli string', description: 'Rotate each qubit into the Z basis, apply the ZZ…Z version, rotate back.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>32.1 — Why Simulate Quantum Systems on Quantum Computers?</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> a Hamiltonian made of simple terms can be turned into a circuit, because each term&apos;s exponential is a short, exact gate sequence. The only approximation is in combining non-commuting terms, which the next lesson quantifies.
      </p>
      <p>
        Storing the state of <InlineMath math="n" /> interacting spins classically takes <InlineMath math="2^n" /> complex numbers: about 18 petabytes for 50 spins at 16 bytes per amplitude. A quantum computer holds the same state in <InlineMath math="n" /> qubits. This was Feynman&apos;s original motivation (1982), and it remains one of the most convincing applications.
      </p>

      <h2>32.2 — Exact Pieces</h2>
      <p>
        Many physical Hamiltonians are sums of Pauli strings with a few qubits each. For a single string, the exponential is exact and cheap. The key example is the interaction <InlineMath math="Z\otimes Z" />, which assigns energy <InlineMath math="+1" /> when two spins agree and <InlineMath math="-1" /> when they differ:
      </p>
      <BlockMath math="e^{-i\theta Z_0Z_1} = \text{CNOT}_{0\to1}\;\big(I\otimes R_Z(2\theta)\big)\;\text{CNOT}_{0\to1}" />
      <p>
        The first CNOT writes the parity of the two spins into qubit 1, the rotation applies a phase that depends only on that parity, and the second CNOT undoes the bookkeeping. You can verify it on each basis state: <InlineMath math="|00\rangle" /> and <InlineMath math="|11\rangle" /> get phase <InlineMath math="e^{-i\theta}" />, while <InlineMath math="|01\rangle" /> and <InlineMath math="|10\rangle" /> get <InlineMath math="e^{+i\theta}" />.
      </p>

      <h2>32.3 — Worked Example: Two Spins in a Field</h2>
      <p>
        The transverse-field Ising model on two spins has
      </p>
      <BlockMath math="H = J\,Z_0Z_1 + h\,(X_0 + X_1)" />
      <p>
        The ZZ term and the X terms do not commute, so <InlineMath math="e^{-iHt}" /> cannot simply be split. Instead, cut time into <InlineMath math="r" /> small steps <InlineMath math="\Delta t = t/r" /> and alternate:
      </p>
      <ol>
        <li>Apply <InlineMath math="e^{-iJ\Delta t\,Z_0Z_1}" />: CNOT, <InlineMath math="R_Z(2J\Delta t)" />, CNOT.</li>
        <li>Apply <InlineMath math="e^{-ih\Delta t\,X_0}" /> and <InlineMath math="e^{-ih\Delta t\,X_1}" />: <InlineMath math="R_X(2h\Delta t)" /> on each qubit (these commute with each other, so this part is exact).</li>
        <li>Repeat <InlineMath math="r" /> times. Each step costs 2 CNOTs and 3 rotations.</li>
      </ol>
      <p>
        This is a first-order Trotter circuit. As <InlineMath math="r" /> grows it converges to the exact evolution; how fast is the subject of the next lesson.
      </p>

      <h2>32.4 — What Evolution Does to Measurements</h2>
      <p>
        If <InlineMath math="H" /> is diagonal in the computational basis (only Z-type terms), evolution multiplies each basis amplitude by a phase and leaves every Z-basis probability unchanged: <InlineMath math="|+\rangle" /> under <InlineMath math="H = Z" /> stays 50/50 forever. The dynamics show up only in other bases or after interference. Non-diagonal terms, like the X field, are what actually move probability between basis states. Energy itself is conserved: <InlineMath math="\langle H\rangle" /> is the same at every time.
      </p>

      <TryIt heading="32.5 — Try It: Phases Versus Populations">
        <p>
          Apply H, then S (a phase rotation, like evolving under Z), then check the probabilities: still 50/50. Now add a final H. The phase has become a population change. Which part of the Ising Hamiltonian above behaves like the S gate, and which part moves populations directly?
        </p>
      </TryIt>
    </>
  );
}
