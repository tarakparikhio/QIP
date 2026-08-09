'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson22Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Goal"><NotationBox.Text>Estimate the phase associated with an eigenvalue of a unitary operator.</NotationBox.Text></NotationBox.Item>
        <NotationBox.Item heading="Eigenvalue"><NotationBox.Code><NotationBox.Row math="U|\psi\rangle = e^{2\pi i\phi}|\psi\rangle" label="unknown phase" /></NotationBox.Code></NotationBox.Item>
      </NotationBox>
      <h2>25.1 — Turning phase into data</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> phase estimation uses controlled powers of a unitary and an inverse QFT to write an eigenphase into a measurement register.</p>
      <p>If a state is an eigenstate of U, applying U changes only its phase. That phase is invisible to a direct measurement of the eigenstate, but controlled applications of U let a separate register accumulate a measurable relative phase.</p>
      <BlockMath math="U|\psi\rangle = e^{2\pi i\phi}|\psi\rangle \quad \Longrightarrow \quad \text{estimate } \phi" />
      <h2>25.2 — The circuit pattern</h2>
      <p>Hadamards prepare a superposition in the counting register. Controlled-U, controlled-U², and larger powers imprint increasingly precise phase information. The inverse QFT then performs the decoding step before measurement.</p>
      <p>Accuracy depends on the number of counting qubits and on whether the input is an exact eigenstate. With t counting qubits, the ideal binary grid has spacing about <InlineMath math="2^{-t}" />; more qubits improve resolution but require more controlled powers and deeper circuits. For a superposition of eigenstates, the result samples one of the corresponding phases.</p>
      <TryIt heading="25.3 — Try It: Explain the registers"><p>What is the role of the eigenstate register, and what is the role of the counting register? Why is a controlled operation needed instead of applying U directly?</p></TryIt>
    </>
  );
}
