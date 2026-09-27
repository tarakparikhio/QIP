'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson24Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Decomposition"><NotationBox.Text>An n-qubit QFT uses Hadamards, controlled phase rotations, and a final bit-reversal swap pattern.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Rotation"><NotationBox.Code><NotationBox.Row math="R_k=\begin{pmatrix}1&0\\0&e^{2\pi i/2^k}\end{pmatrix}" label="controlled phase" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>24.1 — Reading the circuit</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> the QFT circuit is a structured sequence, not a black-box magic gate.</p>
      <p>Each qubit begins with a Hadamard. Controlled rotations add progressively smaller phase angles from neighboring qubits. Swaps at the end reverse the output order because the decomposition naturally produces the bits in reverse significance.</p>
      <BlockMath math="\mathrm{QFT}_n=\mathrm{SWAPS}\cdot\prod_{j=0}^{n-1}\left(H_j\prod_{k=j+1}^{n-1}\mathrm{CR}_{k-j+1}(k,j)\right)" />
      <h2>24.2 — Worked Example: The Two-Qubit QFT</h2>
      <p>
        On two qubits the QFT maps <InlineMath math="|x\rangle" /> to <InlineMath math="\tfrac12\sum_{y=0}^{3}e^{2\pi i\,xy/4}|y\rangle" />. Written as a matrix, with <InlineMath math="\omega=e^{2\pi i/4}=i" />:
      </p>
      <BlockMath math="\mathrm{QFT}_2=\frac12\begin{pmatrix}1&1&1&1\\1&i&-1&-i\\1&-1&1&-1\\1&-i&-1&i\end{pmatrix}" />
      <p>
        The circuit reaches the same matrix with four gates. Write the input as <InlineMath math="|x_1x_0\rangle" />, where <InlineMath math="x_1" /> is the more significant bit and sits on q0:
      </p>
      <ol>
        <li><strong>H on q0:</strong> q0 becomes <InlineMath math="\tfrac{1}{\sqrt2}(|0\rangle+e^{2\pi i\,(0.x_1)}|1\rangle)" />, where <InlineMath math="0.x_1" /> is a binary fraction.</li>
        <li><strong>Controlled-<InlineMath math="R_2" /> (q1 controls, q0 target):</strong> adds a quarter turn when <InlineMath math="x_0=1" />, so q0 holds <InlineMath math="e^{2\pi i\,(0.x_1x_0)}" />.</li>
        <li><strong>H on q1:</strong> q1 becomes <InlineMath math="\tfrac{1}{\sqrt2}(|0\rangle+e^{2\pi i\,(0.x_0)}|1\rangle)" />.</li>
        <li><strong>SWAP:</strong> the QFT output puts the <InlineMath math="0.x_0" /> factor on the most significant qubit, so the two wires are exchanged.</li>
      </ol>
      <p>
        Check it with input <InlineMath math="x=1" />, which is <InlineMath math="|01\rangle" />. The output is <InlineMath math="\tfrac12(|0\rangle-|1\rangle)\otimes(|0\rangle+i|1\rangle)=\tfrac12(|00\rangle+i|01\rangle-|10\rangle-i|11\rangle)" />, which is exactly the second column of the matrix. All four probabilities are <InlineMath math="\tfrac14" />: the input is now stored entirely in relative phases. That is why the QFT is only useful inside larger algorithms whose input already has periodic structure.
      </p>
      <p>
        Counting gates: <InlineMath math="n" /> qubits need <InlineMath math="n" /> Hadamards, <InlineMath math="n(n-1)/2" /> controlled rotations, and <InlineMath math="\lfloor n/2\rfloor" /> swaps. For <InlineMath math="n=8" /> that is 28 controlled rotations, the smallest of which, <InlineMath math="R_8" />, turns by only <InlineMath math="360^\circ/256\approx1.4^\circ" />.
      </p>

      <h2>24.3 — Approximation</h2>
      <p>Small-angle rotations contribute less to many applications and can be dropped in an approximate QFT. This lowers depth but introduces a controlled approximation error.</p>
      <p>For example, in an 8-qubit QFT the smallest controlled rotations turn by only a few degrees; dropping the rotations below a chosen angle threshold can noticeably shrink the gate count while changing most measured probabilities by a small, boundable amount.</p>
      <TryIt heading="24.4 — Try It: Trace two qubits"><p>For two qubits, identify the Hadamards, the controlled phase rotation, and the final swap. What information does the controlled rotation add that a separate single-qubit phase could not?</p></TryIt>
    </>
  );
}
