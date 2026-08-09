'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson32Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Annealing"><NotationBox.Text>Quantum annealing uses a slowly changing Hamiltonian to seek low-energy configurations.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Path"><NotationBox.Code><NotationBox.Row math="H(s)=(1-s)H_0+sH_P" label="interpolation" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>32.1 — A different model of computation</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> annealing is a continuous-time optimization model, not simply a gate-based circuit running slowly.</p>
      <p>The initial Hamiltonian H0 has an easy-to-prepare ground state. The problem Hamiltonian HP encodes an objective. If the interpolation is slow relative to the relevant spectral gap, the adiabatic theorem suggests the system can remain near the instantaneous ground state.</p>
      <BlockMath math="H(0)=H_0,\qquad H(1)=H_P" />
      <h2>32.2 — Important distinctions</h2>
      <p>Quantum annealing, adiabatic quantum computation, and gate-model algorithms are related but not interchangeable terms. Their performance depends on gaps, control precision, thermal effects, and how the problem is encoded.</p>
      <TryIt heading="32.3 — Try It: Identify the assumptions"><p>Why does a small spectral gap make an annealing schedule harder? What kinds of noise can cause the system to leave the intended low-energy path?</p></TryIt>
    </>
  );
}
