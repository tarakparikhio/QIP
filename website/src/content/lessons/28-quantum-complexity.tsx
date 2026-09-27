'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson28Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Complexity classes (decision problems)">
          <NotationBox.List items={[
            { term: 'P', description: 'Solvable by a deterministic classical computer in polynomial time.' },
            { term: 'BPP', description: 'Solvable by a randomized classical computer in polynomial time, correct with probability at least 2/3.' },
            { term: 'NP', description: 'A proposed "yes" answer can be checked in polynomial time.' },
            { term: 'BQP', description: 'Solvable by a quantum computer in polynomial time, correct with probability at least 2/3.' },
            { term: 'PSPACE', description: 'Solvable with polynomial memory, with no limit on time.' },
          ]} />
        </NotationBox.Item>
        <NotationBox.Item heading="What is proven">
          <NotationBox.Formula math="\mathrm{P} \subseteq \mathrm{BPP} \subseteq \mathrm{BQP} \subseteq \mathrm{PP} \subseteq \mathrm{PSPACE} \subseteq \mathrm{EXP}" note="None of the steps from P to PSPACE is known to be strict." />
        </NotationBox.Item>
      </NotationBox>

      <h2>28.1 — The Question Is How Cost Scales</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> complexity theory compares how resources grow with input size. Quantum computers are known to be at least as powerful as classical randomized ones, are believed to be more powerful for some structured problems, and are not believed to solve NP-complete problems efficiently.
      </p>
      <p>
        A problem is &ldquo;easy&rdquo; if its cost grows polynomially with the input length <InlineMath math="n" /> (such as <InlineMath math="n^3" />) and &ldquo;hard&rdquo; if it grows exponentially (such as <InlineMath math="2^n" />). The difference dwarfs constant factors: at <InlineMath math="n = 100" />, <InlineMath math="n^3" /> is a million, while <InlineMath math="2^{n}" /> is about <InlineMath math="10^{30}" />. A speedup matters when it changes the growth rate.
      </p>

      <h2>28.2 — Why &ldquo;Probability 2/3&rdquo; Is Enough</h2>
      <p>
        BPP and BQP allow errors, which sounds weak. It is not, because errors can be driven down by repetition. Run the algorithm <InlineMath math="k" /> times and take the majority answer. With success probability <InlineMath math="p = 2/3" /> per run:
      </p>
      <ol>
        <li><InlineMath math="k = 3" />: the majority is right with probability <InlineMath math="p^3 + 3p^2(1-p) = 20/27 \approx 0.74" />.</li>
        <li><InlineMath math="k = 101" />: the majority is wrong with probability about <InlineMath math="3 \times 10^{-4}" />.</li>
      </ol>
      <p>
        In general, Hoeffding&apos;s inequality bounds the chance that the majority is wrong by <InlineMath math="e^{-2k(p - 1/2)^2}" />, which falls exponentially in <InlineMath math="k" />. So any fixed success probability above 1/2 gives the same class. This is ordinary statistics: the average of many independent trials concentrates around its mean.
      </p>

      <h2>28.3 — Where Quantum Computers Are Believed to Help</h2>
      <p>
        Factoring and discrete logarithms are in BQP (Shor), but no polynomial-time classical algorithm is known; the best classical algorithms take time that grows faster than any polynomial in the number of digits. This is strong evidence, not proof, that BQP is larger than BPP. Note that factoring is in NP (a factor is easy to check) but is not believed to be NP-complete, so Shor&apos;s algorithm says nothing about the hardest problems in NP. Simulating quantum systems is another natural candidate.
      </p>
      <p>
        With oracles (black boxes), separations can be proven. Simon&apos;s problem needs exponentially many queries classically but only about <InlineMath math="n" /> quantum queries. For unstructured search, Grover&apos;s <InlineMath math="O(\sqrt N)" /> queries are provably optimal: no quantum algorithm can do better against a black box. That optimality is one reason NP-complete problems are not expected to be in BQP, since brute force over <InlineMath math="2^n" /> candidates would still take about <InlineMath math="2^{n/2}" /> quantum steps.
      </p>
      <BlockMath math="\text{classical brute force: } 2^{n} \qquad \text{Grover: } \approx 2^{n/2} \qquad \text{polynomial: } n^{c}" />

      <h2>28.4 — Reading Claims of Quantum Advantage</h2>
      <p>
        When you see a claimed speedup, ask three questions. Is it compared against the best known classical algorithm, including randomized and approximate ones? Is it a change in growth rate, or a constant factor that better classical hardware could erase? Does it include the cost of loading data and reading out results? Several proposed quantum machine-learning speedups, for example, were later matched by classical &ldquo;dequantized&rdquo; algorithms once the input assumptions were made equal.
      </p>

      <TryIt heading="28.5 — Try It: Compare Growth Rates">
        <p>
          For <InlineMath math="n = 20, 40," /> and <InlineMath math="80" />, compute <InlineMath math="2^n" />, <InlineMath math="2^{n/2}" />, and <InlineMath math="n^3" />. At a billion operations per second, which of these finish within a day? Use the result to explain why a quadratic speedup helps but does not turn an exponential problem into an easy one.
        </p>
      </TryIt>
    </>
  );
}
