'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson40Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Amplitude amplification">
          <NotationBox.Text>
            Split a state into a &ldquo;good&rdquo; part and a &ldquo;bad&rdquo; part, with <InlineMath math="\sin^2\theta = p" /> the probability of good:
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="|\psi\rangle = \sin\theta\,|\text{good}\rangle + \cos\theta\,|\text{bad}\rangle" label="start" />
            <NotationBox.Row math="P_k = \sin^2\big((2k+1)\theta\big)" label="after k iterations" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Key comparison">
          <NotationBox.List items={[
            { term: 'Classical repetition', description: <>Expected <InlineMath math="1/p" /> tries until success (geometric distribution).</> },
            { term: 'Amplification', description: <>About <InlineMath math="\frac{\pi}{4\sqrt p}" /> iterations for near-certain success.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>40.1 — One Pattern Behind Many Algorithms</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> quantum algorithms prepare amplitudes, write information into phases, and use interference to move probability onto useful answers. Amplitude amplification makes this precise and gives a quadratic speedup over classical repetition.
      </p>
      <p>
        Across the course, the same loop appears: <strong>prepare</strong> a superposition, <strong>mark</strong> information as phase (oracles, controlled powers, cost Hamiltonians), and <strong>interfere</strong> so that useful outcomes gain probability (Hadamards, the QFT, diffusion, mixers). The final measurement is classical sampling; everything before it is engineering the distribution it samples from. It is not &ldquo;trying every answer at once,&rdquo; since a uniform superposition measured directly gives a random answer.
      </p>

      <h2>40.2 — Amplitude Amplification as a Rotation</h2>
      <p>
        Suppose a procedure produces a good answer with probability <InlineMath math="p = \sin^2\theta" />. Grover&apos;s two reflections (flip the sign of the good part, then reflect about the starting state) together rotate the state by <InlineMath math="2\theta" /> in the plane spanned by <InlineMath math="|\text{good}\rangle" /> and <InlineMath math="|\text{bad}\rangle" />. After <InlineMath math="k" /> rounds the angle is <InlineMath math="(2k+1)\theta" />, which gives the formula in the notation box.
      </p>
      <p>
        Worked example, <InlineMath math="N = 16" /> with one marked item: <InlineMath math="p = 1/16" />, so <InlineMath math="\sin\theta = 1/4" /> and <InlineMath math="\theta \approx 14.48^\circ" />.
      </p>
      <ol>
        <li><InlineMath math="k = 1" />: <InlineMath math="\sin^2(43.4^\circ) \approx 0.47" />.</li>
        <li><InlineMath math="k = 2" />: <InlineMath math="\sin^2(72.4^\circ) \approx 0.91" />.</li>
        <li><InlineMath math="k = 3" />: <InlineMath math="\sin^2(101.3^\circ) \approx 0.96" />, the best choice (the formula <InlineMath math="\tfrac{\pi}{4\theta} - \tfrac12 \approx 2.6" /> rounds to 3).</li>
        <li><InlineMath math="k = 6" />: <InlineMath math="\sin^2(188.2^\circ) \approx 0.02" />. Rotating past the target undoes the gain.</li>
      </ol>

      <h2>40.3 — The Quadratic Speedup, in Statistics Terms</h2>
      <p>
        Classically, if each attempt succeeds with probability <InlineMath math="p" />, the number of attempts until success is geometric with mean <InlineMath math="1/p" />. Amplification needs about <InlineMath math="\pi/(4\theta) \approx \pi/(4\sqrt p)" /> iterations when <InlineMath math="p" /> is small. For <InlineMath math="p = 0.01" />: 100 expected classical attempts versus 7 iterations, which reach a success probability of about 0.995.
      </p>
      <BlockMath math="\underbrace{\;1/p\;}_{\text{classical}} \quad\text{versus}\quad \underbrace{\;\approx \tfrac{\pi}{4}\,p^{-1/2}\;}_{\text{amplitude amplification}}" />
      <p>
        The gain comes from adding amplitudes, which grow linearly with each rotation, instead of probabilities, which are what repeated independent tries accumulate. This is the same distinction as in the very first interference lessons, now turned into a general tool.
      </p>

      <h2>40.4 — Caveats</h2>
      <p>
        Amplification needs a coherent procedure (no measurement in the middle) and a way to recognize good answers as a phase flip. If <InlineMath math="p" /> is unknown, overshooting is a risk; randomized schedules or amplitude estimation fix this at a small constant cost. And the speedup is quadratic, not exponential: it helps most when <InlineMath math="p" /> is tiny and the procedure itself is cheap.
      </p>

      <TryIt heading="40.5 — Try It: Plan an Amplification">
        <p>
          A procedure succeeds with probability <InlineMath math="p = 1/64" />. Compute <InlineMath math="\theta" />, the best number of iterations, and the resulting success probability. Compare with the expected number of classical repetitions. Then check your prediction for <InlineMath math="N = 4" /> in the Grover lesson&apos;s playground, where one iteration gives certainty.
        </p>
      </TryIt>
    </>
  );
}
