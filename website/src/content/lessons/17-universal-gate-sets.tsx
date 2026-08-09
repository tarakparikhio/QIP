'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson24Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Universal set"><NotationBox.Text>A gate set is universal when its gates can approximate any unitary operation to arbitrary accuracy.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Example"><NotationBox.Code><NotationBox.Row math="\{H,T,\mathrm{CNOT}\}" label="approximately universal" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>17.1 — Why gate sets matter</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> hardware does not need a physical button for every operation; a compact gate set can compile a much larger family of circuits.</p>
      <p>Compilation turns an abstract circuit into native operations while balancing approximation error, circuit depth, connectivity, and noise. A universal set must provide rich single-qubit control and at least one entangling operation.</p>
      <BlockMath math="U \approx G_mG_{m-1}\cdots G_1" />
      <h2>17.2 — Exact versus approximate</h2>
      <p>Clifford gates alone are not universal for general quantum computation. Adding a non-Clifford gate such as T supplies the missing expressive power. CNOT couples qubits; without an entangling gate, independently prepared qubits remain separable.</p>
      <TryIt heading="17.3 — Try It: Inspect the set"><p>With H, T, and CNOT, which gate changes basis, which supplies a non-Clifford phase, and which creates entanglement? Explain why removing CNOT changes the states you can prepare.</p></TryIt>
    </>
  );
}
