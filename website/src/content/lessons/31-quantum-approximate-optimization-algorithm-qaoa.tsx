'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson31Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="QAOA"><NotationBox.Text>QAOA alternates a problem-dependent cost evolution with a mixer evolution.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="State"><NotationBox.Code><NotationBox.Row math="|\psi(\boldsymbol{\gamma},\boldsymbol{\beta})\rangle=\prod_j e^{-i\beta_jB}e^{-i\gamma_jC}|+\rangle^{\otimes n}" label="variational state" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>31.1 — Encoding an optimization problem</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> QAOA encodes the objective in a cost Hamiltonian and uses a mixer to explore candidate bit strings.</p>
      <p>Computational-basis states represent candidate solutions. The cost Hamiltonian assigns phases according to the objective, while the mixer creates transitions between candidates. A classical optimizer tunes the angles γ and β.</p>
      <BlockMath math="\min_{\gamma,\beta}\langle\psi(\gamma,\beta)|C|\psi(\gamma,\beta)\rangle" />
      <h2>31.2 — It is approximate</h2>
      <p>Increasing the circuit depth p can make the ansatz more expressive, but it also increases optimization difficulty and hardware exposure. QAOA does not guarantee the optimal answer at small depth.</p>
      <p>For example, at p=1 (one cost-mixer round) QAOA on Max-Cut is only proven to beat a uniformly random cut by a small, graph-dependent margin; reaching near-optimal cuts generally needs larger p and more classical tuning.</p>
      <TryIt heading="31.3 — Try It: Separate the roles"><p>Which operation knows about the problem graph, and which operation helps move between candidate bit strings? Explain why a cost phase alone cannot explore alternatives.</p></TryIt>
    </>
  );
}
