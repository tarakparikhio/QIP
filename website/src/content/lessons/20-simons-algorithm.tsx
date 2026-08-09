'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson14Content() {
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

      <h2>14.1 — The Hidden Period Is an XOR</h2>
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

      <h2>14.2 — Query in Superposition</h2>
      <p>
        Apply Hadamards to the input register and query the oracle. If the output register is measured, the input register collapses to a pair of inputs with the same oracle value:
      </p>
      <BlockMath math="\frac{|x\rangle+|x\oplus s\rangle}{\sqrt{2}}" />
      <p>
        You do not need to know which pair was selected. A second layer of Hadamards extracts information common to every pair.
      </p>

      <h2>14.3 — Why the Answers Are Useful</h2>
      <p>
        After the second Hadamards, measuring the input yields a string <InlineMath math="y" /> satisfying <InlineMath math="y\cdot s=0\pmod 2" />. Each run gives one linear equation over binary arithmetic. After collecting enough independent equations, solve them to find <InlineMath math="s" />.
      </p>
      <BlockMath math="(H^{\otimes n})(|x\rangle+|x\oplus s\rangle) \quad\Rightarrow\quad y\cdot s=0\pmod 2" />

      <h2>14.4 — A One-Bit Toy Oracle</h2>
      <p>
        The playground cannot represent a full Simon oracle, but it can show the interference pattern behind it. Build <strong>H on q0 → CNOT from q0 to q1 → H on q0</strong>. The CNOT correlates the two wires; the last Hadamard converts the correlation into a measurement-basis pattern.
      </p>
      <p>
        In the full algorithm, the measured output register selects a two-term input superposition, and the final input measurement supplies an equation rather than the secret directly.
      </p>

      <TryIt heading="14.5 — Try It: See Correlation Become Interference">
        <p>
          Load the example and compare it with <strong>H → H</strong> on q0 alone. The controlled operation creates correlations that change what the final Hadamard can reveal. This small circuit is the building block for Simon&apos;s larger hidden-XOR experiment.
        </p>
      </TryIt>
    </>
  );
}
