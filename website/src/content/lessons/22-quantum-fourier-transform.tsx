'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson21Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Purpose"><NotationBox.Text>The quantum Fourier transform changes the basis used to describe amplitudes, making periodic structure easier to detect.</NotationBox.Text></NotationBox.Item>
        <NotationBox.Item heading="Definition"><NotationBox.Code><NotationBox.Row math="\mathrm{QFT}|x\rangle = \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1}e^{2\pi i xk/N}|k\rangle" label="basis transform" /></NotationBox.Code></NotationBox.Item>
      </NotationBox>
      <h2>22.1 — A Fourier transform for amplitudes</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> the QFT does not simply Fourier-transform a classical list; it applies a unitary change of basis to a quantum state.</p>
      <p>The classical Fourier transform reveals frequencies hidden in a signal. The QFT performs the analogous operation on amplitudes. For an N-dimensional register, it maps computational basis state <InlineMath math="|x\rangle" /> to a superposition whose phases depend on x and the frequency label k.</p>
      <BlockMath math="F_N|x\rangle = \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1}e^{2\pi i xk/N}|k\rangle" />
      <h2>22.2 — Why algorithms use it</h2>
      <p>Period finding produces repeated phase patterns. Applying the inverse QFT converts those patterns into concentrated measurement probabilities, which is why the transform is central to phase estimation and Shor&apos;s algorithm.</p>
      <p>The QFT is efficient as a circuit: an exact implementation uses a quadratic number of elementary rotations, and approximate versions can omit very small-angle rotations.</p>
      <TryIt heading="22.3 — Try It: Think in bases"><p>Why can a state look unstructured in the computational basis but structured after a Fourier transform? Describe what information a basis change can reveal without changing the underlying physical state.</p></TryIt>
    </>
  );
}
