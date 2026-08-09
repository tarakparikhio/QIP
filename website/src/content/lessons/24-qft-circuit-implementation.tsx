'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson27Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Decomposition"><NotationBox.Text>An n-qubit QFT uses Hadamards, controlled phase rotations, and a final bit-reversal swap pattern.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Rotation"><NotationBox.Code><NotationBox.Row math="R_k=\begin{pmatrix}1&0\\0&e^{2\pi i/2^k}\end{pmatrix}" label="controlled phase" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>27.1 — Reading the circuit</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> the QFT circuit is a structured sequence, not a black-box magic gate.</p>
      <p>Each qubit begins with a Hadamard. Controlled rotations add progressively smaller phase angles from neighboring qubits. Swaps at the end reverse the output order because the decomposition naturally produces the bits in reverse significance.</p>
      <BlockMath math="\mathrm{QFT}_n=\mathrm{SWAPS}\cdot\prod_{j=0}^{n-1}\left(H_j\prod_{k=j+1}^{n-1}\mathrm{CR}_{k-j+1}(k,j)\right)" />
      <h2>27.2 — Approximation</h2>
      <p>Small-angle rotations contribute less to many applications and can be dropped in an approximate QFT. This lowers depth but introduces a controlled approximation error.</p>
      <TryIt heading="27.3 — Try It: Trace two qubits"><p>For two qubits, identify the Hadamards, the controlled phase rotation, and the final swap. What information does the controlled rotation add that a separate single-qubit phase could not?</p></TryIt>
    </>
  );
}
