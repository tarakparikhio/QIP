'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson31Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="QAOA"><NotationBox.Text>QAOA alternates a problem-dependent cost evolution with a mixer evolution.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="State"><NotationBox.Code><NotationBox.Row math="|\psi(\boldsymbol{\gamma},\boldsymbol{\beta})\rangle=\prod_j e^{-i\beta_jB}e^{-i\gamma_jC}|+\rangle^{\otimes n}" label="variational state" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>31.1 — Encoding an optimization problem</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> QAOA encodes the objective in a cost Hamiltonian and uses a mixer to explore candidate bit strings.</p>
      <p>Computational-basis states represent candidate solutions. The cost Hamiltonian assigns phases according to the objective, while the mixer creates transitions between candidates. A classical optimizer tunes the angles γ and β.</p>
      <BlockMath math="\min_{\gamma,\beta}\langle\psi(\gamma,\beta)|C|\psi(\gamma,\beta)\rangle" />
      <h2>31.2 — Worked Example: Cutting a Single Edge</h2>
      <p>
        MaxCut splits a graph&apos;s nodes into two groups to cut as many edges as possible. Take the smallest case: two nodes joined by one edge. Put each node on a qubit, with the bit value naming its group. The cost counts cut edges:
      </p>
      <BlockMath math="C=\tfrac12\,(I-Z_0Z_1)" />
      <p>
        <InlineMath math="C" /> is 1 for <InlineMath math="|01\rangle" /> and <InlineMath math="|10\rangle" /> (the edge is cut) and 0 for <InlineMath math="|00\rangle" /> and <InlineMath math="|11\rangle" />. Use the mixer <InlineMath math="B=X_0+X_1" /> and depth <InlineMath math="p=1" />:
      </p>
      <ol>
        <li><strong>Start:</strong> <InlineMath math="|{+}{+}\rangle" />, a uniform guess. Its expected cost is <InlineMath math="\langle C\rangle=\tfrac12" />, the same as a random cut.</li>
        <li><strong>Cost layer <InlineMath math="e^{-i\gamma C}" />:</strong> adds a phase <InlineMath math="e^{-i\gamma}" /> to the two cut states only. Probabilities do not change yet.</li>
        <li><strong>Mixer layer <InlineMath math="e^{-i\beta B}" />:</strong> makes the four bit strings interfere so that the phase difference becomes a probability difference.</li>
        <li><strong>Tune:</strong> at <InlineMath math="\gamma=\pi/2" /> and <InlineMath math="\beta=\pi/8" />, the state is <InlineMath math="\tfrac{1}{\sqrt2}(|01\rangle+|10\rangle)" /> up to phases, and <InlineMath math="\langle C\rangle=1" />. Every measurement returns an optimal cut.</li>
      </ol>
      <p>
        Two useful checks: with <InlineMath math="\gamma=0" />, no angle <InlineMath math="\beta" /> helps, because the mixer alone has nothing to amplify. With <InlineMath math="\beta=3\pi/8" /> instead, interference goes the wrong way and the output is always an uncut 00 or 11. The classical optimizer&apos;s job is to find the good angles.
      </p>

      <h2>31.3 — It is approximate</h2>
      <p>Increasing the circuit depth p can make the ansatz more expressive, but it also increases optimization difficulty and hardware exposure. QAOA does not guarantee the optimal answer at small depth.</p>
      <p>A single edge is special because p=1 already solves it exactly. For MaxCut on 3-regular graphs, p=1 is guaranteed to reach at least about 69% of the best cut on average. That beats a random cut (50%) but falls short of the classical Goemans–Williamson algorithm (about 88%). Doing better generally needs larger p and more classical tuning.</p>
      <TryIt heading="31.4 — Try It: Separate the roles"><p>Which operation knows about the problem graph, and which operation helps move between candidate bit strings? Explain why a cost phase alone cannot explore alternatives.</p></TryIt>
    </>
  );
}
