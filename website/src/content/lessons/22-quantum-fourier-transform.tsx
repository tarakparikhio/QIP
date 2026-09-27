'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson22Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Definition">
          <NotationBox.Text>
            On a register of dimension <InlineMath math="N = 2^n" />, with <InlineMath math="\omega = e^{2\pi i/N}" />:
          </NotationBox.Text>
          <NotationBox.Formula math="F_N|x\rangle = \frac{1}{\sqrt N}\sum_{k=0}^{N-1}\omega^{xk}|k\rangle" note="Input x sets how fast the phase turns as k increases: a frequency." />
        </NotationBox.Item>
        <NotationBox.Item heading="Key facts">
          <NotationBox.List items={[
            { term: 'Unitary', description: <><InlineMath math="F_N^\dagger F_N = I" />, so it is a valid gate and can be run in reverse.</> },
            { term: 'Smallest case', description: <>For one qubit (<InlineMath math="N = 2" />), <InlineMath math="F_2 = H" />.</> },
            { term: 'Cost', description: <>About <InlineMath math="n^2/2" /> gates for <InlineMath math="n" /> qubits.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>22.1 — A Fourier Transform on Amplitudes</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> the QFT applies the discrete Fourier transform to a state&apos;s amplitudes with only about n² gates. Measurement then samples from the result, which is powerful exactly when the answer is concentrated in a few peaks.
      </p>
      <p>
        The classical discrete Fourier transform (DFT) rewrites a list of numbers as a sum of waves of different frequencies. The QFT does the same to the list of amplitudes <InlineMath math="(a_0, \ldots, a_{N-1})" /> of a quantum state. By linearity:
      </p>
      <BlockMath math="F_N\sum_x a_x|x\rangle = \sum_k \Big(\frac{1}{\sqrt N}\sum_x a_x\,\omega^{xk}\Big)|k\rangle" />
      <p>
        The coefficient in brackets is the DFT of the amplitude list (with the <InlineMath math="+" /> sign convention and a <InlineMath math="1/\sqrt N" /> normalization that keeps the transform unitary).
      </p>

      <h2>22.2 — Worked Example: N = 4</h2>
      <p>
        With two qubits, <InlineMath math="\omega = e^{2\pi i/4} = i" />, so the matrix has entries <InlineMath math="i^{xk}/2" />:
      </p>
      <BlockMath math="F_4 = \frac12\begin{pmatrix}1&1&1&1\\1&i&-1&-i\\1&-1&1&-1\\1&-i&-1&i\end{pmatrix}" />
      <ol>
        <li><InlineMath math="F_4|0\rangle = \tfrac12(|0\rangle + |1\rangle + |2\rangle + |3\rangle)" />: a constant input has only the zero frequency, and it spreads evenly over all outputs.</li>
        <li><InlineMath math="F_4|1\rangle = \tfrac12(|0\rangle + i|1\rangle - |2\rangle - i|3\rangle)" />: the phase turns a quarter circle per step.</li>
        <li>Every output of a single basis state has probability <InlineMath math="1/4" />. All the information sits in the phases.</li>
      </ol>
      <p>
        You can check unitarity by hand: each column has squared length <InlineMath math="4 \times \tfrac14 = 1" />, and any two different columns are orthogonal because the four powers of a non-trivial root of unity sum to zero.
      </p>

      <h2>22.3 — Periodic Inputs Become Peaks</h2>
      <p>
        The QFT is useful because it turns repetition into concentration. Take <InlineMath math="N = 8" /> and the period-4 state <InlineMath math="(|0\rangle + |4\rangle)/\sqrt2" />:
      </p>
      <BlockMath math="F_8\,\frac{|0\rangle + |4\rangle}{\sqrt2} = \sum_k \frac{1 + e^{2\pi i\cdot 4k/8}}{4}\,|k\rangle = \sum_k \frac{1 + (-1)^k}{4}\,|k\rangle" />
      <p>
        Odd <InlineMath math="k" /> cancel exactly, and even <InlineMath math="k" /> each get amplitude <InlineMath math="1/2" />: the outcomes 0, 2, 4, 6 each have probability <InlineMath math="1/4" />. In general, a state spread evenly over <InlineMath math="x_0, x_0 + r, x_0 + 2r, \ldots" /> with <InlineMath math="r" /> dividing <InlineMath math="N" /> produces <InlineMath math="r" /> equal peaks at multiples of <InlineMath math="N/r" />.
      </p>
      <p>
        <strong>Statistics lens:</strong> the offset <InlineMath math="x_0" /> only changes the phases of the peaks, not their heights. This is the same shift-invariance as a periodogram in signal processing: moving a periodic signal in time does not change its power spectrum. Measurement samples from that spectrum.
      </p>

      <h2>22.4 — Fast, but Not a Free FFT</h2>
      <p>
        A classical fast Fourier transform on <InlineMath math="N = 2^n" /> numbers takes about <InlineMath math="N\log N = n2^n" /> operations. The QFT circuit uses about <InlineMath math="n^2/2" /> gates, exponentially fewer. The catch is readout: you cannot see all <InlineMath math="N" /> output amplitudes, only one sampled <InlineMath math="k" /> per run. The QFT helps only when the problem is arranged so that the sample is informative, as in period finding. The next lessons show how that works.
      </p>

      <TryIt heading="22.5 — Try It: The One-Qubit QFT">
        <p>
          On one qubit the QFT is just H. Apply H to <InlineMath math="|0\rangle" /> and to <InlineMath math="|1\rangle" /> (use X first) and compare with <InlineMath math="F_2|x\rangle = \tfrac{1}{\sqrt2}\sum_k(-1)^{xk}|k\rangle" />. For larger registers, the controlled phase rotations are shown in the Qiskit code lab below.
        </p>
      </TryIt>
    </>
  );
}
