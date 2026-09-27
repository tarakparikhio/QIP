'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';
import TrotterLab from '@/components/labs/TrotterLab';

export default function Lesson33Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Product formulas">
          <NotationBox.Text>
            For <InlineMath math="H = A + B" /> with <InlineMath math="[A, B] \neq 0" />, split time into <InlineMath math="r" /> steps:
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="S_1 = \big(e^{-iAt/r}e^{-iBt/r}\big)^r" label="first order" />
            <NotationBox.Row math="S_2 = \big(e^{-iAt/2r}e^{-iBt/r}e^{-iAt/2r}\big)^r" label="second order (symmetric)" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Error bounds">
          <NotationBox.List items={[
            { term: 'First order', description: <><InlineMath math="\|e^{-iHt} - S_1\| \le \frac{t^2}{2r}\|[A,B]\|" /></> },
            { term: 'Second order', description: <>Error <InlineMath math="O(t^3/r^2)" />, set by nested commutators.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>33.1 — Where the Error Comes From</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> Trotter error comes from the commutator of the terms. First-order formulas need about t²/ε steps, second-order about t^1.5/√ε, and the best choice balances this mathematical error against hardware noise, which grows with every step.
      </p>
      <p>
        Expanding both sides for a short time <InlineMath math="\tau" /> shows exactly what goes wrong:
      </p>
      <BlockMath math="e^{-iA\tau}e^{-iB\tau} = e^{-i(A+B)\tau - \frac{\tau^2}{2}[A,B] + O(\tau^3)}" />
      <p>
        If the terms commuted, the split would be exact. Otherwise each step makes an error of order <InlineMath math="\tau^2\|[A,B]\|/2" />. Over <InlineMath math="r" /> steps of length <InlineMath math="\tau = t/r" />, these add up to at most <InlineMath math="r \cdot \frac{(t/r)^2}{2}\|[A,B]\| = \frac{t^2}{2r}\|[A,B]\|" />.
      </p>

      <h2>33.2 — How Many Steps? Two Scaling Rules</h2>
      <p>
        To guarantee total error at most <InlineMath math="\varepsilon" /> with a first-order formula, you need
      </p>
      <BlockMath math="r \ge \frac{t^2\,\|[A,B]\|}{2\varepsilon}" />
      <p>
        Two consequences, each worth remembering. <strong>Halving the error doubles the steps.</strong> <strong>Doubling the time, at the same total error, quadruples the steps</strong>, because <InlineMath math="r" /> grows like <InlineMath math="t^2" />. (If instead you hold the step size fixed, doubling <InlineMath math="t" /> doubles <InlineMath math="r" /> but also doubles the error.)
      </p>
      <p>
        Worked example: <InlineMath math="H = X + Z" /> has <InlineMath math="[X, Z] = -2iY" />, so <InlineMath math="\|[X,Z]\| = 2" /> and the bound is <InlineMath math="t^2/r" />. For <InlineMath math="t = 2" /> and <InlineMath math="\varepsilon = 0.01" />: <InlineMath math="r \ge 4/0.01 = 400" />. The second-order formula, with error <InlineMath math="O(t^3/r^2)" />, needs <InlineMath math="r" /> only on the order of <InlineMath math="t^{1.5}/\sqrt\varepsilon" />, far fewer.
      </p>
      <TrotterLab />
      <p>
        The lab shows two things that the bound alone does not. The slopes are right: each doubling of <InlineMath math="r" /> halves the first-order error and quarters the second-order error. But the actual error is often well below the bound, because the bound assumes the worst case. For <InlineMath math="t = 2" />, 64 first-order steps already give an error around 0.007, much less than the bound of 0.0625. Real resource estimates therefore use tighter, problem-specific error analysis.
      </p>

      <h2>33.3 — Math Error Versus Hardware Error</h2>
      <p>
        More steps reduce the Trotter error, but every step adds gates, and every gate adds hardware error. If each step contributes hardware error <InlineMath math="p" />, the total is roughly
      </p>
      <BlockMath math="\text{error}(r) \approx \frac{c\,t^2}{r} + r\,p" />
      <p>
        which is smallest near <InlineMath math="r^* = t\sqrt{c/p}" />. Beyond that, adding steps makes the result worse. It is the same bias-variance-style trade-off found throughout statistics: one error falls with effort while another grows. Advanced methods such as qubitization reach near-optimal cost, about <InlineMath math="O(t + \log(1/\varepsilon))" /> queries, for fault-tolerant machines.
      </p>

      <TryIt heading="33.4 — Try It: Find the Scaling">
        <p>
          In the lab, fix <InlineMath math="t = 1" /> and read the first-order error at <InlineMath math="r = 8" /> and <InlineMath math="r = 16" />: the ratio should be about 2. Do the same for second order: about 4. Then set <InlineMath math="t = 3" /> and <InlineMath math="r = 1" />. Why is the error so large, and roughly how many steps bring it below 0.01?
        </p>
      </TryIt>
    </>
  );
}
