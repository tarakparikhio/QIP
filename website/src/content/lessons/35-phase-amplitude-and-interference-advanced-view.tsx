'use client';
import { BlockMath, InlineMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson35Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="Full state picture"><NotationBox.Text>Quantum algorithms control amplitudes and relative phases so that measurement probabilities become useful.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Interference"><NotationBox.Code><NotationBox.Row math="p(x)=|\langle x|U|\psi\rangle|^2" label="measured probability" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>35.1 — One model, three ideas</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> amplitudes describe the state, phase controls how paths combine, and interference turns that structure into a measurable distribution.</p>
      <p>Amplitude alone is not enough: two paths with equal magnitude can reinforce or cancel depending on their relative phase. Gates are useful because they transform both quantities coherently before measurement discards phase information.</p>
      <BlockMath math="|\psi\rangle=\sum_x\alpha_x|x\rangle,\qquad p(x)=|\alpha_x|^2" />
      <h2>35.2 — The algorithmic loop</h2>
      <p>Prepare a state, apply structured transformations, create phase differences, and interfere paths so desired answers gain probability. This pattern appears in amplitude amplification, period finding, phase estimation, and variational circuits.</p>
      <p>The final probability distribution is classical, but the route to it depends on coherent complex amplitudes. That is the conceptual bridge between the introductory lessons and advanced algorithms.</p>
      <TryIt heading="35.3 — Try It: Give the explanation"><p>Explain why a quantum speedup cannot be summarized as “trying every answer at once.” Which operation makes useful answers interfere differently from unhelpful ones?</p></TryIt>
    </>
  );
}
