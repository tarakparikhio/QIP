'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson26Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The output distribution">
          <NotationBox.Text>
            With <InlineMath math="t" /> counting qubits, outcome <InlineMath math="y" /> estimates <InlineMath math="\varphi" /> as <InlineMath math="y/2^t" />. Writing <InlineMath math="\delta = \varphi - y/2^t" />:
          </NotationBox.Text>
          <NotationBox.Formula math="P(y) = \frac{\sin^2(\pi 2^t\delta)}{4^t\,\sin^2(\pi\delta)}" note="Equal to 1 when δ = 0; at least 4/π² ≈ 0.405 for the nearest grid point." />
        </NotationBox.Item>
        <NotationBox.Item heading="Resource counts">
          <NotationBox.List items={[
            { term: 'Total uses of U', description: <><InlineMath math="1 + 2 + 4 + \cdots + 2^{t-1} = 2^t - 1" /> controlled applications, unless powers of <InlineMath math="U" /> have a shortcut.</> },
            { term: 'Resolution', description: <><InlineMath math="1/2^t" />.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>26.1 — What Precision Costs</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> each extra digit of precision doubles the number of times U must be applied. In exchange, the error shrinks like 1/(total uses of U), much faster than the 1/√N of simple repeated sampling.
      </p>
      <p>
        Qubit <InlineMath math="j" /> controls <InlineMath math="U^{2^j}" />. Unless <InlineMath math="U^{2^j}" /> can be implemented directly, it means applying <InlineMath math="U" /> <InlineMath math="2^j" /> times. The total is <InlineMath math="2^t - 1" /> applications:
      </p>
      <ol>
        <li><InlineMath math="t = 4" />: 15 applications, resolution <InlineMath math="1/16" />.</li>
        <li><InlineMath math="t = 8" />: 255 applications, resolution <InlineMath math="1/256" />.</li>
      </ol>
      <p>
        So going from 4 to 8 counting qubits doubles the qubit count but multiplies the work by 17. The circuit depth is dominated by those controlled powers. Shor&apos;s algorithm is feasible because modular exponentiation has a shortcut: <InlineMath math="a^{2^j} \bmod N" /> can be computed by repeated squaring, so <InlineMath math="U^{2^j}" /> costs about the same as <InlineMath math="U" />.
      </p>

      <h2>26.2 — The Shape of the Output</h2>
      <p>
        Summing the geometric series from the previous lesson gives the formula in the notation box. Three consequences:
      </p>
      <ol>
        <li>If <InlineMath math="\varphi" /> is exactly a <InlineMath math="t" />-bit fraction, <InlineMath math="\delta = 0" /> for the right <InlineMath math="y" />, and the output is certain.</li>
        <li>Otherwise, the nearest grid point still appears with probability at least <InlineMath math="4/\pi^2 \approx 0.405" />, whatever <InlineMath math="\varphi" /> is.</li>
        <li>The distribution has tails: outcomes far from <InlineMath math="\varphi" /> are unlikely but possible.</li>
      </ol>
      <p>
        Worked example: <InlineMath math="\varphi = 0.3" />, <InlineMath math="t = 3" />. The outcome 010 has <InlineMath math="\delta = 0.05" /> and probability about 0.58; 011 has <InlineMath math="\delta = -0.075" /> and probability about 0.26; the other six outcomes share the remaining 16%.
      </p>

      <h2>26.3 — Buying Reliability With Extra Qubits</h2>
      <p>
        To get the first <InlineMath math="n" /> bits right with probability at least <InlineMath math="1 - \varepsilon" />, use
      </p>
      <BlockMath math="t = n + \left\lceil \log_2\!\left(2 + \frac{1}{2\varepsilon}\right)\right\rceil" />
      <p>
        counting qubits. For <InlineMath math="n = 4" /> and <InlineMath math="\varepsilon = 0.1" />, that is <InlineMath math="4 + \lceil\log_2 7\rceil = 7" />. The extra qubits push the tails of the distribution further from the answer.
      </p>

      <h2>26.4 — Inputs That Are Not Eigenstates</h2>
      <p>
        If the input is a superposition of eigenstates, <InlineMath math="\sum_j c_j|u_j\rangle" />, phase estimation outputs an estimate of <InlineMath math="\varphi_j" /> with probability <InlineMath math="|c_j|^2" />, and leaves the second register in (approximately) <InlineMath math="|u_j\rangle" />. It samples from a mixture distribution.
      </p>
      <p>
        This is how phase estimation finds ground-state energies in chemistry: prepare a trial state with overlap <InlineMath math="|c_0|^2" /> with the ground state, run phase estimation, and you land on the ground energy with probability <InlineMath math="|c_0|^2" />. The expected number of runs is <InlineMath math="1/|c_0|^2" /> (a geometric distribution), so preparing a good trial state matters.
      </p>

      <h2>26.5 — Statistics Lens: Two Ways to Estimate a Phase</h2>
      <p>
        The one-qubit circuit of the previous lesson gives <InlineMath math="P(0) = \cos^2(\pi\varphi)" />. Repeating it <InlineMath math="N" /> times estimates <InlineMath math="\varphi" /> with error shrinking like <InlineMath math="1/\sqrt N" />, the usual rate for averaging independent samples. Full phase estimation, using <InlineMath math="T = 2^t - 1" /> coherent applications of <InlineMath math="U" />, achieves error around <InlineMath math="1/T" />. Using the resource coherently, instead of in independent repetitions, is what gives the quadratically better scaling. Physicists call the <InlineMath math="1/\sqrt N" /> rate the standard quantum limit and the <InlineMath math="1/T" /> rate the Heisenberg limit.
      </p>

      <TryIt heading="26.6 — Try It: Budget a Phase Estimate">
        <p>
          You need <InlineMath math="\varphi" /> to within <InlineMath math="1/64" /> with at least 90% confidence. How many counting qubits do you need (use <InlineMath math="n = 6" /> and the formula in 26.3), and how many applications of <InlineMath math="U" /> does that cost? Compare with the number of independent repetitions of the one-qubit circuit you would need for similar precision.
        </p>
      </TryIt>
    </>
  );
}
