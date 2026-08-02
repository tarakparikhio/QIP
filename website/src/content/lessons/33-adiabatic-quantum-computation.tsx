'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson33Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Adiabatic principle"><NotationBox.Text>Slow evolution can preserve a system&apos;s instantaneous eigenstate when the spectral gap stays sufficiently open.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Schedule"><NotationBox.Code><NotationBox.Row math="H(s(t))" label="time-dependent Hamiltonian" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>33.1 — Computation by evolution</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> adiabatic computation encodes the answer in the ground state of a final Hamiltonian and reaches it by controlled evolution.</p>
      <p>The initial problem is chosen for a known ground state. The Hamiltonian is then changed according to a schedule until it represents the target computation. The final measurement reads information about the final low-energy state.</p>
      <BlockMath math="T\gg \frac{\max_s\|\partial_sH(s)\|}{\Delta_{\min}^2}" />
      <h2>33.2 — Relationship to gate models</h2>
      <p>Under broad conditions, adiabatic quantum computation and gate-based quantum computation are computationally equivalent. Their implementations and resource bottlenecks can still be very different.</p>
      <TryIt heading="33.3 — Try It: Reason about the gap"><p>Why does the minimum spectral gap appear in the runtime condition? Describe what happens if the schedule changes too quickly near an avoided crossing.</p></TryIt>
    </>
  );
}
