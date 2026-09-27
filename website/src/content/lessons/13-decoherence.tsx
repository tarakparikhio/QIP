'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';
import InterferenceLab from '@/components/labs/InterferenceLab';

export default function Lesson13Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Coherence lives off the diagonal">
          <NotationBox.Text>
            For <InlineMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />, the density matrix <InlineMath math="\rho = |\psi\rangle\langle\psi|" /> keeps the probabilities on its diagonal and the phase relationship off it.
          </NotationBox.Text>
          <NotationBox.Formula math="\rho = \begin{pmatrix} |\alpha|^2 & \alpha\beta^* \\ \alpha^*\beta & |\beta|^2 \end{pmatrix}" note="Diagonal: populations. Off-diagonal: coherences." />
        </NotationBox.Item>
        <NotationBox.Item heading="Two clocks">
          <NotationBox.List items={[
            { term: 'T₁ (relaxation)', description: <>Time scale for <InlineMath math="|1\rangle" /> to decay to <InlineMath math="|0\rangle" /> by losing energy: <InlineMath math="P_1(t) = P_1(0)\,e^{-t/T_1}" />.</> },
            { term: 'T₂ (dephasing)', description: <>Time scale for the off-diagonal coherence to fade: <InlineMath math="|\rho_{01}(t)| = |\rho_{01}(0)|\,e^{-t/T_2}" />.</> },
            { term: 'Bound', description: <>Relaxation also destroys phase, so <InlineMath math="T_2 \le 2T_1" />.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>13.1 — What Decoherence Does</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> decoherence is the loss of phase information to the environment. Probabilities can survive while the ability to interfere disappears.
      </p>
      <p>
        A qubit is never perfectly isolated. Stray fields, vibrations, and neighboring systems interact with it and become correlated with its state. From the qubit&apos;s point of view, part of its information has leaked into a place we cannot measure. Mathematically, the off-diagonal entries of <InlineMath math="\rho" /> shrink toward zero, and a superposition slowly turns into a classical mixture:
      </p>
      <BlockMath math="\frac12\begin{pmatrix}1 & 1\\ 1 & 1\end{pmatrix} \;\xrightarrow{\;\text{dephasing}\;}\; \frac12\begin{pmatrix}1 & c\\ c & 1\end{pmatrix} \;\xrightarrow{\;c\,\to\,0\;}\; \frac12\begin{pmatrix}1 & 0\\ 0 & 1\end{pmatrix}" />
      <p>
        At every stage the Z-basis probabilities are 50/50. What changes is whether the state still behaves like <InlineMath math="|+\rangle" /> under a Hadamard.
      </p>

      <h2>13.2 — A Statistics Model: Averaging Over Random Phases</h2>
      <p>
        Here is a simple and accurate way to picture dephasing. Suppose each run of the experiment picks up a small random phase <InlineMath math="\varphi" />, so the qubit is <InlineMath math="(|0\rangle + e^{i\varphi}|1\rangle)/\sqrt2" />, with <InlineMath math="\varphi" /> different each time. Averaging the density matrix over runs multiplies the coherence by the average of <InlineMath math="e^{i\varphi}" />:
      </p>
      <BlockMath math="\rho_{01} \;\to\; \tfrac12\,\mathbb{E}\big[e^{-i\varphi}\big]" />
      <p>
        If <InlineMath math="\varphi" /> is normally distributed with mean 0 and variance <InlineMath math="\sigma^2" />, then <InlineMath math="\mathbb{E}[e^{i\varphi}] = e^{-\sigma^2/2}" /> (this is the normal distribution&apos;s characteristic function). If the phase noise accumulates like a random walk, <InlineMath math="\sigma^2" /> grows in proportion to time, and the coherence decays exponentially: that is the <InlineMath math="e^{-t/T_2}" /> law. Averaging many random phases is exactly what the lab below does.
      </p>
      <InterferenceLab />

      <h2>13.3 — Measuring T₂: the Ramsey Experiment</h2>
      <p>
        To see coherence, convert it back into probability. Apply H to <InlineMath math="|0\rangle" />, wait a time <InlineMath math="t" />, apply H again, and measure. With coherence <InlineMath math="c(t) = e^{-t/T_2}" /> remaining (and no frequency offset):
      </p>
      <BlockMath math="P(0) = \frac{1 + c(t)}{2} = \frac{1 + e^{-t/T_2}}{2}" />
      <ol>
        <li>At <InlineMath math="t = 0" />: <InlineMath math="P(0) = 1" />. Perfect interference.</li>
        <li>At <InlineMath math="t = T_2/2" />: <InlineMath math="c = e^{-0.5} \approx 0.607" />, so <InlineMath math="P(0) \approx 0.803" />.</li>
        <li>At <InlineMath math="t \gg T_2" />: <InlineMath math="P(0) \to 0.5" />. A fair coin: all phase information is gone.</li>
      </ol>
      <p>
        Experimenters repeat this at many waiting times, estimate each <InlineMath math="P(0)" /> from many shots, and fit an exponential to extract <InlineMath math="T_2" />. It is ordinary curve fitting with binomial error bars.
      </p>

      <h2>13.4 — Relaxation Versus Dephasing</h2>
      <p>
        <InlineMath math="T_1" /> and <InlineMath math="T_2" /> describe different damage. Relaxation changes populations: an excited qubit drifts to <InlineMath math="|0\rangle" />, like a decaying atom, with half-life <InlineMath math="T_1\ln 2" />. Dephasing changes only coherences. Since relaxation also scrambles phase, the two combine as
      </p>
      <BlockMath math="\frac{1}{T_2} = \frac{1}{2T_1} + \frac{1}{T_\varphi}" />
      <p>
        where <InlineMath math="T_\varphi" /> is the pure-dephasing time. Useful computation must finish well inside these windows: if gates take tens of nanoseconds and <InlineMath math="T_2" /> is around 100 microseconds, a circuit has room for thousands of sequential operations before coherence is badly degraded. Real limits also include gate errors, covered next.
      </p>

      <h2>13.5 — What the Playground Can Show</h2>
      <p>
        The simulator evolves pure states, so it cannot decohere. It can show the related reversible effect: a fixed phase error. Compare <strong>H → H</strong> (returns to <InlineMath math="|0\rangle" />) with <strong>H → Z → H</strong> (ends in <InlineMath math="|1\rangle" />). A known Z can be undone by another Z. Decoherence is the case where the phase is random and unknown on every run, so no single correction can undo it; on average it produces the mixed state above.
      </p>

      <TryIt heading="13.6 — Try It: From Phase Error to Decoherence">
        <p>
          Build H → Z → H and H → H and compare. Then, in the lab above, set equal routes at 0° and average over random phases. The probability drops from 1 toward 0.5, the same fading you would see in a Ramsey experiment as waiting time grows.
        </p>
      </TryIt>
    </>
  );
}
