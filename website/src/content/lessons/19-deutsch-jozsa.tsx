'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson19Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The Promise">
          <NotationBox.Text>
            The oracle computes a function <InlineMath math="f:\{0,1\}^n\to\{0,1\}" /> that is promised to be either constant or balanced. Our job is to identify which case holds.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="One-query Result">
          <NotationBox.Code>
            <NotationBox.Row math="f(x)=c\quad\text{for all }x" label="constant" />
            <NotationBox.Row math="\sum_x(-1)^{f(x)}=0" label="balanced functions cancel" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Playground Gates">
          <NotationBox.Text>H, X, Z, CNOT</NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>19.1 — A Question with a Promise</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> Deutsch–Jozsa shows how interference can solve a black-box promise problem with a single query.
      </p>
      <p>
        A function is <strong>constant</strong> when it returns the same value for every input. It is <strong>balanced</strong> when it returns 0 for exactly half of its inputs and 1 for the other half. Classically, determining which kind of function you have can require many evaluations. Deutsch–Jozsa does it with one quantum oracle query.
      </p>

      <h2>19.2 — Prepare the Query</h2>
      <p>
        Begin the input register in <InlineMath math="|0^n\rangle" /> and an ancilla in <InlineMath math="|1\rangle" />, then apply Hadamards. The ancilla becomes <InlineMath math="|{-}\rangle" />, while the input becomes an equal superposition of all possible inputs.
      </p>
      <BlockMath math="|0^n\rangle|1\rangle \xrightarrow{H^{\otimes(n+1)}} \frac{1}{\sqrt{2^n}}\sum_x |x\rangle|{-}\rangle" />

      <h2>19.3 — Phase Kickback</h2>
      <p>
        The oracle is defined by <InlineMath math="U_f|x,y\rangle=|x,y\oplus f(x)\rangle" />. Because the ancilla is <InlineMath math="|{-}\rangle" />, the oracle writes its answer as a phase on the input instead of as a visible bit.
      </p>
      <BlockMath math="U_f|x\rangle|{-}\rangle=(-1)^{f(x)}|x\rangle|{-}\rangle" />
      <p>
        A final Hadamard transform makes these phases interfere. Measuring all-zero on the input register means constant; any nonzero bit string means balanced. The promise is essential: without it, one query cannot reveal the full behavior of an arbitrary function.
      </p>

      <h2>19.4 — Two-Qubit Demo</h2>
      <p>
        On this playground, qubit 0 is the one-bit input and qubit 1 is the ancilla. Build <strong>X on q1 → H on both qubits → CNOT (q0 controls q1) → H on q0</strong>. The CNOT is an oracle for <InlineMath math="f(x)=x" />, a balanced function, so q0 ends at <InlineMath math="|1\rangle" />.
      </p>
      <p>
        For a constant-zero oracle, omit the CNOT. The final Hadamard returns q0 to <InlineMath math="|0\rangle" />.
      </p>

      <h2>19.5 — How Big Is the Advantage, Really?</h2>
      <p>
        A deterministic classical algorithm must be certain, and in the worst case the first <InlineMath math="2^{n-1}" /> inputs it checks all agree, which is still consistent with a balanced function. It needs <InlineMath math="2^{n-1} + 1" /> queries: 5 for <InlineMath math="n = 3" />, over 500 billion for <InlineMath math="n = 40" />.
      </p>
      <p>
        A <strong>randomized</strong> classical algorithm does far better. Query <InlineMath math="k" /> random inputs; if they all agree, guess &ldquo;constant.&rdquo; A balanced function makes all <InlineMath math="k" /> answers agree with probability <InlineMath math="2 \cdot (1/2)^k" />, so 10 queries already give an error chance below 0.2%, whatever <InlineMath math="n" /> is.
      </p>
      <p>
        So the honest summary is: Deutsch–Jozsa is exponentially better than <em>exact</em> classical algorithms, but only modestly better than classical algorithms that tolerate a tiny error. Its value is conceptual. It is the cleanest demonstration of phase kickback plus interference, and the same pattern powers Simon&apos;s and Shor&apos;s algorithms, where the advantage survives randomness.
      </p>

      <TryIt heading="19.6 — Try It: Constant or Balanced?">
        <p>
          Load the example, then inspect q0&apos;s final measurement probabilities. Remove the CNOT and load/run again. The q0 result changes from 1 (balanced) to 0 (constant), even though the oracle was queried just once.
        </p>
      </TryIt>
    </>
  );
}
