'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson28Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Eigenphase"><NotationBox.Text>Phase estimation recovers φ when U|ψ⟩ = exp(2πiφ)|ψ⟩.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Decoder"><NotationBox.Code><NotationBox.Row math="\mathrm{QFT}^{\dagger}" label="inverse Fourier transform" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>28.1 — Precision from powers</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> controlled powers of U turn a continuous phase into binary information in a counting register.</p>
      <p>With t counting qubits, the circuit applies controlled U, U², U⁴, and so on. The binary digits of the phase determine relative phases across the counting register. The inverse QFT decodes those relationships into a computational-basis estimate.</p>
      <BlockMath math="U^{2^j}|\psi\rangle=e^{2\pi i2^j\phi}|\psi\rangle" />
      <h2>28.2 — What can go wrong</h2>
      <p>Finite precision produces a distribution rather than a guaranteed exact answer. If the input is not an eigenstate, phase estimation samples an eigenphase according to the input state&apos;s overlap with each eigenvector.</p>
      <TryIt heading="28.3 — Try It: Explain precision"><p>Why does adding a counting qubit improve phase resolution? What cost does that improvement impose on controlled powers and circuit depth?</p></TryIt>
    </>
  );
}
