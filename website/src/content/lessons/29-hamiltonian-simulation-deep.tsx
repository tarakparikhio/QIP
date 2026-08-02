'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson29Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Evolution"><NotationBox.Text>Simulation approximates U(t) = exp(-iHt) for a Hamiltonian H.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Product formula"><NotationBox.Code><NotationBox.Row math="e^{-i(A+B)t}\approx(e^{-iA t/r}e^{-iB t/r})^r" label="Trotter step" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>29.1 — Decomposing dynamics</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> a complicated evolution can be approximated by alternating evolutions under simpler Hamiltonian terms.</p>
      <p>If H is a sum of local terms, each term may map to a short Pauli rotation. Trotter-Suzuki formulas alternate these pieces many times; the number of repetitions controls the approximation error and circuit cost.</p>
      <BlockMath math="H=\sum_j h_jP_j" />
      <h2>29.2 — The real resource question</h2>
      <p>Simulation cost depends on locality, norm, evolution time, desired precision, and hardware connectivity. A mathematically correct decomposition may still be impractical if it creates too many two-qubit gates.</p>
      <TryIt heading="29.3 — Try It: Compare errors"><p>What happens when the number of Trotter steps increases? Separate the approximation error from hardware noise and explain why the best step count is not always the largest one.</p></TryIt>
    </>
  );
}
