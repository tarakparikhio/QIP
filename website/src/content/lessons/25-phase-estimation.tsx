'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson25Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The task">
          <NotationBox.Text>
            A unitary <InlineMath math="U" /> has an eigenstate <InlineMath math="|u\rangle" /> with an unknown phase. Estimate <InlineMath math="\varphi \in [0, 1)" />:
          </NotationBox.Text>
          <NotationBox.Formula math="U|u\rangle = e^{2\pi i\varphi}|u\rangle" note="φ is written as a binary fraction: 0.101 means 1/2 + 0/4 + 1/8 = 0.625." />
        </NotationBox.Item>
        <NotationBox.Item heading="Two registers">
          <NotationBox.List items={[
            { term: 'Counting register', description: <><InlineMath math="t" /> qubits that end up holding the digits of <InlineMath math="\varphi" />.</> },
            { term: 'Eigenstate register', description: <>Holds <InlineMath math="|u\rangle" />. It is unchanged throughout; its phase is kicked back to the counting register.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>25.1 — One Counting Qubit</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> phase kickback writes an eigenvalue&apos;s phase onto a control qubit. With t control qubits and controlled powers of U, the inverse QFT reads the phase out as a t-bit binary number.
      </p>
      <p>
        Start with the smallest version: one counting qubit in <InlineMath math="|+\rangle" /> controls <InlineMath math="U" /> acting on <InlineMath math="|u\rangle" />. By phase kickback the counting qubit becomes <InlineMath math="(|0\rangle + e^{2\pi i\varphi}|1\rangle)/\sqrt2" />. A final H turns that phase into a probability:
      </p>
      <BlockMath math="P(0) = \left|\frac{1 + e^{2\pi i\varphi}}{2}\right|^2 = \cos^2(\pi\varphi)" />
      <ol>
        <li><InlineMath math="\varphi = 0" />: <InlineMath math="P(0) = 1" />, so you read 0, meaning <InlineMath math="\varphi = 0.0_2" />.</li>
        <li><InlineMath math="\varphi = 1/2" />: <InlineMath math="P(0) = 0" />, so you read 1, meaning <InlineMath math="\varphi = 0.1_2" />.</li>
        <li>Anything in between gives a biased coin, and one shot tells you little.</li>
      </ol>
      <p>
        Worked example you can build: <InlineMath math="U = Z" /> and <InlineMath math="|u\rangle = |1\rangle" />. Since <InlineMath math="Z|1\rangle = -|1\rangle = e^{2\pi i\cdot\frac12}|1\rangle" />, the phase is <InlineMath math="\varphi = 1/2" />, and controlled-Z is simply CZ. The counting qubit reads 1 with certainty.
      </p>

      <h2>25.2 — More Qubits, More Digits</h2>
      <p>
        With <InlineMath math="t" /> counting qubits, qubit <InlineMath math="j" /> controls <InlineMath math="U^{2^j}" />, which kicks back the phase <InlineMath math="2^j\varphi" />. Doubling a binary fraction shifts its digits left, so each qubit captures a different digit:
      </p>
      <BlockMath math="\frac{1}{\sqrt{2^t}}\sum_{x=0}^{2^t-1} e^{2\pi i\varphi x}|x\rangle \;\xrightarrow{\;F^\dagger\;}\; |\varphi_1\varphi_2\cdots\varphi_t\rangle \quad\text{when } \varphi = 0.\varphi_1\varphi_2\cdots\varphi_t" />
      <p>
        The left-hand state is exactly the QFT of <InlineMath math="|2^t\varphi\rangle" />, so the inverse QFT returns the binary digits. Example: <InlineMath math="U = T" /> on <InlineMath math="|1\rangle" /> has <InlineMath math="\varphi = 1/8 = 0.001_2" />, and three counting qubits read 001 every time.
      </p>

      <h2>25.3 — When the Phase Is Not a Short Binary Fraction</h2>
      <p>
        If <InlineMath math="\varphi" /> needs more digits than you have, the output is a probability distribution concentrated near the true value. For <InlineMath math="\varphi = 0.3" /> and <InlineMath math="t = 3" />, the grid points are multiples of <InlineMath math="1/8" />. The two nearest are 010 (0.25) and 011 (0.375), which occur with probabilities about 0.58 and 0.26. So the circuit returns one of the two neighbors about 84% of the time.
      </p>
      <p>
        <strong>Statistics lens:</strong> this is an estimator with a sampling distribution. The resolution is <InlineMath math="1/2^t" />, and the next lesson shows how the success probability and the cost scale with <InlineMath math="t" />.
      </p>

      <TryIt heading="25.4 — Try It: Read an Eigenphase">
        <p>
          On two qubits, prepare the eigenstate with X on q1. Then apply H on q0, CZ (q0 → q1), and H on q0. The counting qubit q0 reads 1, so <InlineMath math="\varphi = 0.1_2 = 1/2" />. Now remove the X so q1 is <InlineMath math="|0\rangle" />, an eigenstate of Z with eigenvalue +1. Predict the new reading before you run it.
        </p>
      </TryIt>
    </>
  );
}
