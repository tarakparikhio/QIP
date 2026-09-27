'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson23Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Period finding">
          <NotationBox.Text>
            Given a function with <InlineMath math="f(x + r) = f(x)" /> for an unknown period <InlineMath math="r" />, find <InlineMath math="r" />. This is the core of Shor&apos;s algorithm.
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="\frac{1}{\sqrt N}\sum_x |x\rangle|f(x)\rangle" label="after one oracle call" />
            <NotationBox.Row math="\frac{1}{\sqrt M}\sum_{j=0}^{M-1}|x_0 + jr\rangle" label="after measuring the output register" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Key terms">
          <NotationBox.List items={[
            { term: 'Peak', description: <>An output <InlineMath math="k" /> near a multiple of <InlineMath math="N/r" />, where the phases add up constructively.</> },
            { term: 'Continued fractions', description: <>A classical method that recovers a fraction <InlineMath math="j/r" /> with a small denominator from a nearby decimal such as <InlineMath math="k/N" />.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>23.1 — From a Periodic Function to a Periodic State</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> after one oracle call, the input register holds an evenly spaced comb of values. The QFT turns that comb into peaks near multiples of N/r, and classical post-processing turns one peak into the period.
      </p>
      <p>
        Put the input register in a uniform superposition and compute <InlineMath math="f" /> into a second register. Measuring the second register (or just ignoring it) leaves the first register in an equal superposition of all inputs with the same output: <InlineMath math="x_0, x_0 + r, x_0 + 2r, \ldots" />. The offset <InlineMath math="x_0" /> is random, so measuring now would reveal nothing. The spacing <InlineMath math="r" /> is what we want.
      </p>

      <h2>23.2 — Why the Peaks Appear</h2>
      <p>
        Applying the QFT gives amplitude on output <InlineMath math="k" />:
      </p>
      <BlockMath math="\frac{1}{\sqrt{NM}}\sum_{j=0}^{M-1}\omega^{(x_0 + jr)k} = \frac{\omega^{x_0k}}{\sqrt{NM}}\sum_{j=0}^{M-1}\big(e^{2\pi i\,rk/N}\big)^j" />
      <p>
        The sum is a geometric series of unit-length arrows. If <InlineMath math="rk/N" /> is a whole number, every arrow points the same way and they add to <InlineMath math="M" />: a peak. Otherwise the arrows spread around the circle and largely cancel. So peaks sit where <InlineMath math="k \approx j\,N/r" />. The random offset only contributes the phase <InlineMath math="\omega^{x_0k}" />, which does not affect probabilities.
      </p>

      <h2>23.3 — Worked Example: a Period That Does Not Divide N</h2>
      <p>
        Let <InlineMath math="N = 16" /> and <InlineMath math="r = 3" />, with the register holding <InlineMath math="\{0, 3, 6, 9, 12, 15\}" />. Since 3 does not divide 16, the peaks sit near <InlineMath math="0, 16/3 \approx 5.33, 32/3 \approx 10.67" /> and spill onto neighbors. Computing the probabilities exactly:
      </p>
      <ol>
        <li><InlineMath math="P(0) \approx 0.375" />: no information about <InlineMath math="r" />.</li>
        <li><InlineMath math="P(5) = P(11) \approx 0.234" /> each: the useful peaks.</li>
        <li>About 0.11 falls on the neighbors 4, 6, 10, and 12, and the last few percent is spread thinly over the other outputs.</li>
      </ol>
      <p>
        Suppose you measure <InlineMath math="k = 11" />. Then <InlineMath math="11/16 = 0.6875" />. Its continued-fraction expansion is <InlineMath math="[0; 1, 2, 5]" />, with successive approximations <InlineMath math="0,\; 1,\; 2/3,\; 11/16" />. The approximation <InlineMath math="2/3" /> has a small denominator, which suggests <InlineMath math="r = 3" />. Check it with one classical evaluation: does <InlineMath math="f(x + 3) = f(x)" />? It does, so you are done.
      </p>

      <h2>23.4 — The Statistics of Success</h2>
      <p>
        Each run is one random sample from the peak distribution. In the example, a run lands on a useful peak (5 or 11) with probability about 0.47, so the number of runs until success is geometric with mean about <InlineMath math="1/0.47 \approx 2.1" />. In Shor&apos;s algorithm, the register size is chosen to be at least the square of the number being factored, so it is always much larger than <InlineMath math="r^2" />. That makes each peak narrow enough for continued fractions to recover <InlineMath math="r" /> reliably, after a small expected number of runs.
      </p>
      <p>
        Compare with classical period finding for modular exponentiation: no known classical method finds the period of <InlineMath math="a^x \bmod N" /> in time polynomial in the number of digits. The quantum advantage comes from making the period show up as a sharp peak in one sample.
      </p>

      <TryIt heading="23.5 — Try It: Predict the Peaks">
        <p>
          For <InlineMath math="N = 16" />, predict the peak positions for periods <InlineMath math="r = 2, 4," /> and <InlineMath math="8" />, and the probability of each peak. (Hint: <InlineMath math="r" /> equal peaks at multiples of <InlineMath math="16/r" />.) Then explain why measuring <InlineMath math="k = 0" /> never helps, whatever the period.
        </p>
      </TryIt>
    </>
  );
}
