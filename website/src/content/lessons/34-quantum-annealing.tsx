'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson34Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Annealing"><NotationBox.Text>Quantum annealing uses a slowly changing Hamiltonian to seek low-energy configurations.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Path"><NotationBox.Code><NotationBox.Row math="H(s)=(1-s)H_0+sH_P" label="interpolation" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>34.1 — A different model of computation</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> annealing is a continuous-time optimization model, not simply a gate-based circuit running slowly.</p>
      <p>The initial Hamiltonian H0 has an easy-to-prepare ground state. The problem Hamiltonian HP encodes an objective. If the interpolation is slow relative to the relevant spectral gap, the adiabatic theorem suggests the system can remain near the instantaneous ground state.</p>
      <BlockMath math="H(0)=H_0,\qquad H(1)=H_P" />
      <h2>34.2 — Worked Example: Two Spins</h2>
      <p>
        Annealers solve Ising problems: choose spins <InlineMath math="s_i=\pm1" /> to minimize an energy. Take two spins with an antiferromagnetic coupling and a small bias on spin 0:
      </p>
      <BlockMath math="E(s_0,s_1)=s_0s_1+0.5\,s_0" />
      <p>
        Checking all four configurations: <InlineMath math="(+,+)\to1.5" />, <InlineMath math="(+,-)\to-0.5" />, <InlineMath math="(-,+)\to-1.5" />, <InlineMath math="(-,-)\to0.5" />. The minimum is <InlineMath math="s_0=-1,\,s_1=+1" /> with energy <InlineMath math="-1.5" />. Mapping <InlineMath math="+1\to|0\rangle" /> and <InlineMath math="-1\to|1\rangle" />, this energy becomes <InlineMath math="H_P=Z_0Z_1+0.5\,Z_0" />, whose ground state is <InlineMath math="|10\rangle" />.
      </p>
      <ol>
        <li><strong>Start:</strong> the driver <InlineMath math="H_0=-(X_0+X_1)" /> has the easy ground state <InlineMath math="|{+}{+}\rangle" />, an equal mix of all four answers.</li>
        <li><strong>Interpolate:</strong> slowly move <InlineMath math="s" /> from 0 to 1 in <InlineMath math="H(s)=(1-s)H_0+sH_P" />.</li>
        <li><strong>Watch the gap:</strong> for this problem, the smallest gap between the ground state and the first excited state is about 0.66, near <InlineMath math="s\approx0.63" />.</li>
        <li><strong>Read out:</strong> if the sweep was slow enough, measuring gives 10, the optimal assignment.</li>
      </ol>
      <p>
        Now weaken the bias from 0.5 to 0.1. The answer is the same, but the minimum gap shrinks to about 0.18. Because the required anneal time grows roughly as <InlineMath math="1/\Delta_{\min}^2" />, the sweep must be about 14 times slower. With no bias at all, 01 and 10 tie, and the problem has two equally good answers.
      </p>

      <h2>34.3 — Important distinctions</h2>
      <p>Quantum annealing, adiabatic quantum computation, and gate-model algorithms are related but not interchangeable terms. Their performance depends on gaps, control precision, thermal effects, and how the problem is encoded.</p>
      <p>For example, if a problem&apos;s spectral gap shrinks as the number of variables N grows, the required annealing time can grow much faster than N itself — gap scaling, not just problem size, is what determines practical runtime.</p>
      <TryIt heading="34.4 — Try It: Identify the assumptions"><p>Why does a small spectral gap make an annealing schedule harder? What kinds of noise can cause the system to leave the intended low-energy path?</p></TryIt>
    </>
  );
}
