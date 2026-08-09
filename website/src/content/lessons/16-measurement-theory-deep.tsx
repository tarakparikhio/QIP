'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson25Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Observable"><NotationBox.Text>Measurement outcomes are associated with operators whose eigenvalues are the possible recorded values.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Born rule"><NotationBox.Code><NotationBox.Row math="p(m)=\langle\psi|\Pi_m|\psi\rangle" label="projective probability" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>16.1 — Measurement is an operation</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> a measurement has a basis, probabilities, and a post-measurement state; it is not a passive peek.</p>
      <p>For projectors Πm, the probability of outcome m is given by the Born rule. After observing m, the normalized state becomes proportional to Πm|ψ⟩. This state-update equation is the projective case; a general POVM uses positive effects that sum to identity and can describe less-than-projective detectors.</p>
      <BlockMath math="|\psi\rangle \mapsto \frac{\Pi_m|\psi\rangle}{\sqrt{\langle\psi|\Pi_m|\psi\rangle}}" />
      <h2>16.2 — Basis changes</h2>
      <p>Measuring in the X or Y basis can be implemented by changing basis first and then measuring computationally. The same state therefore produces different outcome statistics under different observables.</p>
      <p>For example, measuring <InlineMath math="|+\rangle" /> in the Z basis gives 0 or 1 with equal probability 1/2, but measuring that same state in the X basis gives + with probability 1 — the physical state has not changed, only the chosen observable has.</p>
      <TryIt heading="16.3 — Try It: Choose a basis"><p>Why does measuring H|0⟩ in the computational basis differ from measuring it after another H? Describe the basis change rather than calling it a mysterious collapse.</p></TryIt>
    </>
  );
}
