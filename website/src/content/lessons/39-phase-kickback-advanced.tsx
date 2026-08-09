'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson34Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Kickback"><NotationBox.Text>A controlled operation can place a phase on the control register when the target is in an eigenstate.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Eigenstate target"><NotationBox.Code><NotationBox.Row math="U|u\rangle=e^{i\phi}|u\rangle" label="target response" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>39.1 — The phase moves registers</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> phase kickback is not a signal traveling backward; it is the algebraic consequence of controlled evolution on an eigenstate.</p>
      <p>Suppose the control is in a superposition and the target is an eigenstate of U. The controlled-U operation leaves the target&apos;s physical state unchanged up to its eigenvalue, while the relative phase becomes attached to the control branch.</p>
      <BlockMath math="\frac{|0\rangle+|1\rangle}{\sqrt2}|u\rangle\mapsto\frac{|0\rangle+e^{i\phi}|1\rangle}{\sqrt2}|u\rangle" />
      <h2>39.2 — Why algorithms care</h2>
      <p>Phase estimation, Deutsch-Jozsa, and several oracle algorithms convert hidden function or eigenvalue information into relative phase, then use interference to make that phase measurable.</p>
      <TryIt heading="39.3 — Try It: Track the control"><p>Which register changes visibly in the equation, and why can the target still be useful even though its basis label did not flip?</p></TryIt>
    </>
  );
}
