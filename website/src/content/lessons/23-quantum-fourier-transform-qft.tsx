'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson26Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="QFT"><NotationBox.Text>The QFT is a unitary change of basis on an N-dimensional quantum register.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Period signal"><NotationBox.Code><NotationBox.Row math="F_N|x\rangle=\frac{1}{\sqrt N}\sum_ke^{2\pi ixk/N}|k\rangle" label="frequency basis" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>23.1 — Frequency structure</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> QFT changes representation so periodic phase patterns become concentrated measurement outcomes.</p>
      <p>The transform preserves inner products and normalization. Its algorithmic value comes from arranging interference so that frequencies associated with a hidden period receive larger amplitude.</p>
      <BlockMath math="F_N^\dagger F_N=I" />
      <h2>23.2 — Why this is not a classical FFT</h2>
      <p>A QFT circuit prepares and transforms a quantum state; it does not expose every transformed amplitude for free. Measurement gives samples, so the algorithm must be designed to extract a useful global property rather than the entire classical Fourier table.</p>
      <TryIt heading="23.3 — Try It: Follow the interference"><p>What must be true about the phases for one frequency to become more likely after the transform? Think in terms of reinforcement and cancellation.</p></TryIt>
    </>
  );
}
