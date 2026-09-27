'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson18Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The 3-qubit bit-flip code">
          <NotationBox.Text>
            One logical qubit is stored in three physical qubits. The code does not copy the state; it entangles three qubits so the information lives in their correlations.
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="\alpha|0\rangle + \beta|1\rangle \;\mapsto\; \alpha|000\rangle + \beta|111\rangle" label="encoding" />
            <NotationBox.Row math="Z_0Z_1,\; Z_1Z_2" label="parity checks (stabilizers)" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Key terms">
          <NotationBox.List items={[
            { term: 'Syndrome', description: 'The results of the parity checks. They reveal which error occurred, not what the stored state is.' },
            { term: 'Distance d', description: <>The fewest physical errors that can change one logical state into another. A distance-<InlineMath math="d" /> code corrects up to <InlineMath math="\lfloor (d-1)/2\rfloor" /> errors.</> },
            { term: 'Threshold', description: 'A physical error rate below which making the code larger makes the logical error rate smaller.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>18.1 — Redundancy Without Copying</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> quantum error correction spreads one qubit across several, measures only parities (never the data), and uses the result to undo likely errors. Below a threshold, bigger codes fail exponentially less often.
      </p>
      <p>
        Classical computers protect a bit by repetition: store 000 or 111 and take a majority vote. Quantum information seems to rule this out twice. No-cloning forbids making <InlineMath math="|\psi\rangle|\psi\rangle|\psi\rangle" />, and reading the qubits to vote would destroy the superposition.
      </p>
      <p>
        The bit-flip code avoids both problems. Two CNOTs from the data qubit q0 to fresh qubits q1 and q2 produce <InlineMath math="\alpha|000\rangle + \beta|111\rangle" />. This is not three copies: for <InlineMath math="\alpha = \beta = 1/\sqrt2" /> it is a GHZ state, whereas three copies of <InlineMath math="|+\rangle" /> would be a product of eight terms.
      </p>

      <h2>18.2 — Reading the Syndrome, Not the Data</h2>
      <p>
        Two extra qubits (ancillas) q3 and q4 record parities: CNOTs from q0 and q1 into q3 compute <InlineMath math="q_0 \oplus q_1" />, and CNOTs from q1 and q2 into q4 compute <InlineMath math="q_1 \oplus q_2" />. Each single bit flip gives a distinct syndrome:
      </p>
      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs font-mono uppercase tracking-wider text-muted">
              <th className="py-2 pr-4">Error</th><th className="py-2 pr-4">State</th><th className="py-2 pr-4">Syndrome (q3, q4)</th><th className="py-2">Fix</th>
            </tr>
          </thead>
          <tbody className="text-foreground/85">
            <tr className="border-b border-border/30"><td className="py-2 pr-4">none</td><td className="py-2 pr-4"><InlineMath math="\alpha|000\rangle+\beta|111\rangle" /></td><td className="py-2 pr-4 font-mono">0 0</td><td className="py-2">nothing</td></tr>
            <tr className="border-b border-border/30"><td className="py-2 pr-4">X on q0</td><td className="py-2 pr-4"><InlineMath math="\alpha|100\rangle+\beta|011\rangle" /></td><td className="py-2 pr-4 font-mono">1 0</td><td className="py-2">X on q0</td></tr>
            <tr className="border-b border-border/30"><td className="py-2 pr-4">X on q1</td><td className="py-2 pr-4"><InlineMath math="\alpha|010\rangle+\beta|101\rangle" /></td><td className="py-2 pr-4 font-mono">1 1</td><td className="py-2">X on q1</td></tr>
            <tr><td className="py-2 pr-4">X on q2</td><td className="py-2 pr-4"><InlineMath math="\alpha|001\rangle+\beta|110\rangle" /></td><td className="py-2 pr-4 font-mono">0 1</td><td className="py-2">X on q2</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The crucial point: in each row, <strong>both</strong> branches of the superposition have the same parities. Measuring the syndrome therefore gives a definite answer without distinguishing <InlineMath math="|000\rangle" /> from <InlineMath math="|111\rangle" />, so <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> survive untouched.
      </p>

      <h2>18.3 — How Much Does It Help? A Binomial Calculation</h2>
      <p>
        Suppose each physical qubit flips independently with probability <InlineMath math="p" />. Majority decoding fails only if two or three qubits flip:
      </p>
      <BlockMath math="p_L = \binom{3}{2}p^2(1-p) + p^3 = 3p^2 - 2p^3" />
      <ol>
        <li>At <InlineMath math="p = 0.01" />: <InlineMath math="p_L \approx 0.0003" />, about 34 times better.</li>
        <li>At <InlineMath math="p = 0.3" />: <InlineMath math="p_L = 0.216" />, still better.</li>
        <li>At <InlineMath math="p = 0.5" />: <InlineMath math="p_L = 0.5" />, break-even. Above this the code makes things worse.</li>
      </ol>
      <p>
        This is a binomial tail probability, <InlineMath math="P(X \ge 2)" /> for <InlineMath math="X \sim \mathrm{Bin}(3, p)" />. Larger codes push the same idea further: a distance-<InlineMath math="d" /> code fails at a rate that scales roughly like <InlineMath math="p^{(d+1)/2}" />, so each step up in distance multiplies the protection, provided <InlineMath math="p" /> is below the code&apos;s threshold.
      </p>

      <h2>18.4 — Phase Errors and Real Codes</h2>
      <p>
        The bit-flip code has a blind spot: a Z error on any qubit turns <InlineMath math="\alpha|000\rangle + \beta|111\rangle" /> into <InlineMath math="\alpha|000\rangle - \beta|111\rangle" />, and the parity checks do not notice. Encoding in the Hadamard basis (<InlineMath math="|{+}{+}{+}\rangle, |{-}{-}{-}\rangle" />) gives a phase-flip code with the opposite strength. Shor&apos;s 9-qubit code nests the two and corrects any single-qubit error.
      </p>
      <p>
        Modern hardware efforts favor the <strong>surface code</strong>: qubits on a 2D grid, each check involving only nearby qubits, with a threshold around 1% per operation. The price is overhead: hundreds to thousands of physical qubits per well-protected logical qubit.
      </p>

      <TryIt heading="18.5 — Try It: Detect and Fix a Bit Flip">
        <p>
          Load the example on five qubits: H on q0 (the data), two CNOTs to encode, an <strong>X error on q1</strong>, and four CNOTs that write the syndrome into q3 and q4. The probability bars show only 01011 and 10111: the code qubits still hold both branches, and the syndrome qubits read 1 1 in both. Now add X on q1. The code qubits return to 000 and 111, with the syndrome still recording which error was fixed. Try moving the error to q0 or q2 and read off the new syndrome.
        </p>
      </TryIt>
    </>
  );
}
