'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson15Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The Reduction">
          <NotationBox.Text>
            To factor <InlineMath math="N" />, choose <InlineMath math="a" /> coprime to <InlineMath math="N" /> and find the period <InlineMath math="r" /> of <InlineMath math="a^x \bmod N" />.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Factor Extraction">
          <NotationBox.Code>
            <NotationBox.Row math="a^r\equiv1\pmod N" label="period condition" />
            <NotationBox.Row math="\gcd(a^{r/2}-1,N),\ \gcd(a^{r/2}+1,N)" label="candidate factors" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Playground Gates">
          <NotationBox.Text>H, X, Z, CNOT</NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>15.1 — Factoring Becomes Period Finding</h2>
      <p>
        Shor&apos;s algorithm does not try divisors one at a time. It turns factoring into the task of finding the period of modular exponentiation: <InlineMath math="f(x)=a^x\bmod N" />. This function repeats, and quantum interference makes that period accessible efficiently.
      </p>
      <p>
        First compute <InlineMath math="\gcd(a,N)" />. If it is not 1, you already found a factor. Otherwise, use the quantum portion to seek a period <InlineMath math="r" />.
      </p>

      <h2>15.2 — The Quantum Fourier Transform Idea</h2>
      <p>
        Prepare many values of <InlineMath math="x" /> in superposition and compute <InlineMath math="a^x\bmod N" /> into a second register. Values with the same result form a regularly spaced pattern in the first register. The inverse quantum Fourier transform changes that regular spacing into sharp peaks near multiples of the reciprocal period.
      </p>
      <BlockMath math="\frac{1}{\sqrt{Q}}\sum_{x=0}^{Q-1}|x\rangle|a^x\bmod N\rangle \xrightarrow{\mathrm{QFT}^{-1}} \text{peaks at multiples of }Q/r" />

      <h2>15.3 — Finish with Classical Arithmetic</h2>
      <p>
        The measured peak gives a fraction related to <InlineMath math="k/r" />. Continued fractions recover a candidate <InlineMath math="r" />. When <InlineMath math="r" /> is even and <InlineMath math="a^{r/2}\not\equiv-1\pmod N" />, the two greatest-common-divisor calculations reveal nontrivial factors.
      </p>
      <BlockMath math="a^r-1=(a^{r/2}-1)(a^{r/2}+1)" />
      <p>
        Some choices of <InlineMath math="a" /> or measurements fail the checks, so the algorithm is repeated. Its speedup comes from period finding, not from making every individual run succeed.
      </p>

      <h2>15.4 — A Tiny Period-Finding Skeleton</h2>
      <p>
        Full modular exponentiation and the QFT need more qubits than this introductory playground provides. The example <strong>H on q0 → CNOT to q1 → H on q0</strong> is a two-wire interference skeleton: create periodic correlation, then use a Hadamard as the smallest Fourier-like basis change to expose it.
      </p>

      <TryIt heading="15.5 — Try It: Interference Is the Resource">
        <p>
          Load the example, run it, and then remove the final H on q0. The final basis change is what turns hidden phase and correlation into a readable probability pattern—the same role played by the inverse QFT in Shor&apos;s full algorithm.
        </p>
      </TryIt>
    </>
  );
}
