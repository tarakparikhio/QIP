'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson20Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Hidden-XOR Promise">
          <NotationBox.Text>
            There is a secret bit string <InlineMath math="s" /> such that <InlineMath math="f(x)=f(y)" /> exactly when <InlineMath math="y=x\oplus s" />.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Measurement Rule">
          <NotationBox.Code>
            <NotationBox.Row math="y\cdot s = 0 \pmod 2" label="each sample is orthogonal to the secret" />
            <NotationBox.Row math="x\oplus s" label="the input paired with x by the oracle" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Playground Gates">
          <NotationBox.Text>H, X, Z, CNOT</NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>20.1 — The Hidden Period Is an XOR</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> Simon’s algorithm turns a hidden collision structure into linear equations and is an important precursor to Shor’s algorithm.
      </p>
      <p>
        Simon&apos;s problem supplies an oracle with a special collision pattern: every output has exactly two inputs, and those two inputs differ by the same unknown string <InlineMath math="s" />. The goal is to recover <InlineMath math="s" />.
      </p>
      <BlockMath math="f(x)=f(x\oplus s)" />
      <p>
        In the standard oracle-query model, a classical algorithm must search for collisions. Simon&apos;s algorithm instead turns the collision structure into linear equations about the secret.
      </p>

      <h2>20.2 — Query in Superposition</h2>
      <p>
        Apply Hadamards to the input register and query the oracle. If the output register is measured, the input register collapses to a pair of inputs with the same oracle value:
      </p>
      <BlockMath math="\frac{|x\rangle+|x\oplus s\rangle}{\sqrt{2}}" />
      <p>
        You do not need to know which pair was selected. A second layer of Hadamards extracts information common to every pair.
      </p>

      <h2>20.3 — Why the Answers Are Useful</h2>
      <p>
        After the second Hadamards, measuring the input yields a string <InlineMath math="y" /> satisfying <InlineMath math="y\cdot s=0\pmod 2" />. Each run gives one linear equation over binary arithmetic. After collecting enough independent equations, solve them to find <InlineMath math="s" />.
      </p>
      <BlockMath math="(H^{\otimes n})(|x\rangle+|x\oplus s\rangle) \quad\Rightarrow\quad y\cdot s=0\pmod 2" />

      <h2>20.4 — Worked Example: n = 2, s = 11</h2>
      <p>
        Let <InlineMath math="f(x_0x_1) = x_0 \oplus x_1" />. Then <InlineMath math="f(00) = f(11) = 0" /> and <InlineMath math="f(01) = f(10) = 1" />, so every output has exactly two inputs, and they differ by <InlineMath math="s = 11" />.
      </p>
      <ol>
        <li>Hadamards on the two input qubits, then the oracle writes <InlineMath math="f(x)" /> into an output qubit with two CNOTs.</li>
        <li>Suppose the output reads 0. The inputs collapse to <InlineMath math="(|00\rangle + |11\rangle)/\sqrt2" />, a pair differing by <InlineMath math="s" />.</li>
        <li>Hadamards on both inputs give <InlineMath math="(|00\rangle + |11\rangle)/\sqrt2" /> again. The outcomes 01 and 10 cancel.</li>
        <li>Measuring gives <InlineMath math="y = 00" /> or <InlineMath math="y = 11" />, each with probability 1/2. Both satisfy <InlineMath math="y \cdot s = 0 \pmod 2" />.</li>
        <li>The first time you see <InlineMath math="y = 11" />, the equation <InlineMath math="s_0 \oplus s_1 = 0" /> plus <InlineMath math="s \neq 00" /> forces <InlineMath math="s = 11" />.</li>
      </ol>
      <p>
        The outcome <InlineMath math="y = 00" /> carries no information, and it happens half the time, so the number of runs until a useful equation is geometric with mean 2.
      </p>

      <h2>20.5 — Why Classical Algorithms Struggle: the Birthday Problem</h2>
      <p>
        Classically, the only way to learn <InlineMath math="s" /> is to find two inputs with the same output. Among <InlineMath math="k" /> random queries there are <InlineMath math="\binom{k}{2}" /> pairs, and each collides with probability about <InlineMath math="1/2^n" />. Collisions become likely only when <InlineMath math="k^2/2 \approx 2^n" />, so a classical algorithm needs about <InlineMath math="2^{n/2}" /> queries, the birthday paradox. For <InlineMath math="n = 100" />, that is about <InlineMath math="10^{15}" />.
      </p>
      <p>
        Simon&apos;s algorithm needs about <InlineMath math="n" /> runs, each giving a random equation, plus classical linear algebra to solve them. That is an exponential separation, even against randomized algorithms, and it directly inspired Shor.
      </p>

      <h2>20.6 — Build It in the Playground</h2>
      <p>
        Use three qubits: q0 and q1 are the input register, q2 is the output. Build <strong>H on q0 and q1 → CNOT (q0 → q2) → CNOT (q1 → q2) → H on q0 and q1</strong>. The two CNOTs are the oracle <InlineMath math="f(x) = x_0 \oplus x_1" />.
      </p>
      <p>
        Read only q0 and q1 in the probability bars: the input register shows 00 or 11, never 01 or 10, exactly the strings with <InlineMath math="y \cdot s = 0" /> for <InlineMath math="s = 11" />. The output qubit q2 is left random, as expected.
      </p>

      <TryIt heading="20.7 — Try It: Read the Hidden String">
        <p>
          Load the example and confirm that only 00 and 11 appear on q0 q1. Then change the oracle: delete the CNOT from q1, so <InlineMath math="f(x) = x_0" />. Now flipping <InlineMath math="x_1" /> never changes the output, so the hidden string is <InlineMath math="s = 01" />. Predict which input strings can appear (those with <InlineMath math="y_1 = 0" />), then check: you should see only 00 and 10.
        </p>
      </TryIt>
    </>
  );
}
