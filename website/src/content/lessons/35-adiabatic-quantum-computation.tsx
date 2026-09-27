'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson35Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The schedule">
          <NotationBox.Text>
            Interpolate from an easy Hamiltonian <InlineMath math="H_0" /> to a problem Hamiltonian <InlineMath math="H_P" /> whose ground state encodes the answer, over total time <InlineMath math="T" />:
          </NotationBox.Text>
          <NotationBox.Formula math="H(s) = (1-s)H_0 + sH_P, \qquad s = t/T \in [0, 1]" />
        </NotationBox.Item>
        <NotationBox.Item heading="Adiabatic condition">
          <NotationBox.Text>
            The system stays near the instantaneous ground state if the evolution is slow compared with the smallest energy gap <InlineMath math="\Delta_{\min}" />:
          </NotationBox.Text>
          <NotationBox.Formula math="T \gg \frac{\max_s \|\partial_s H(s)\|}{\Delta_{\min}^2}" note="The inverse-square dependence on the gap is what makes hard instances slow." />
        </NotationBox.Item>
      </NotationBox>

      <h2>35.1 — Computing by Slow Change</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> adiabatic computation prepares an easy ground state and slowly deforms the Hamiltonian. The runtime is set by the smallest energy gap along the way, and it is equivalent in power to the circuit model.
      </p>
      <p>
        The adiabatic theorem says that a system starting in the ground state of <InlineMath math="H(0)" /> stays close to the ground state of <InlineMath math="H(s)" /> if <InlineMath math="s" /> changes slowly enough. So prepare the easy ground state, turn the dial from <InlineMath math="H_0" /> to <InlineMath math="H_P" />, and measure: you read off the answer. &ldquo;Slowly enough&rdquo; is measured against the gap between the ground state and the first excited state.
      </p>

      <h2>35.2 — Worked Example: One Qubit</h2>
      <p>
        Take <InlineMath math="H_0 = -X" />, whose ground state is <InlineMath math="|+\rangle" />, and <InlineMath math="H_P = -Z" />, whose ground state is <InlineMath math="|0\rangle" />:
      </p>
      <BlockMath math="H(s) = -(1-s)X - sZ" />
      <ol>
        <li>This is <InlineMath math="-\vec b\cdot\vec\sigma" /> with <InlineMath math="\vec b = (1-s, 0, s)" />, so its energies are <InlineMath math="\pm|\vec b| = \pm\sqrt{(1-s)^2 + s^2}" />.</li>
        <li>The gap is <InlineMath math="\Delta(s) = 2\sqrt{(1-s)^2 + s^2}" />, smallest at <InlineMath math="s = 1/2" />: <InlineMath math="\Delta_{\min} = \sqrt2 \approx 1.41" />.</li>
        <li><InlineMath math="\partial_s H = X - Z" />, whose norm is <InlineMath math="\sqrt2" />.</li>
        <li>The reference time is <InlineMath math="\sqrt2 / (\sqrt2)^2 = 1/\sqrt2 \approx 0.71" />. A total time several times larger keeps the qubit on track. Geometrically, the ground state rotates smoothly from the equator (<InlineMath math="|+\rangle" />) to the north pole (<InlineMath math="|0\rangle" />).</li>
      </ol>
      <p>
        This example is easy because the gap never gets small. Hard problems are exactly those where it does.
      </p>

      <h2>35.3 — Small Gaps Mean Long Runtimes</h2>
      <p>
        Because the required time scales like <InlineMath math="1/\Delta_{\min}^2" />, halving the gap quadruples the time. At an avoided crossing, where two levels nearly touch, a fast sweep lets the system jump to the excited state. For a linear sweep through such a crossing, the Landau–Zener formula gives a jump probability that falls exponentially with <InlineMath math="T\Delta_{\min}^2" />: slow down enough and jumps become rare, but only at the cost of runtime.
      </p>
      <p>
        For some families of hard optimization problems, the minimum gap shrinks exponentially with problem size, which forces exponential runtimes. So adiabatic computation is not a shortcut to NP-complete problems; its speed depends on how the gap behaves for the problem at hand.
      </p>

      <h2>35.4 — Relationship to Circuits and to Annealing</h2>
      <p>
        With suitable Hamiltonians, adiabatic computation and the circuit model can simulate each other with polynomial overhead (Aharonov and colleagues, 2004), so they have the same computational power. Quantum annealing, from the previous lesson, uses the same schedule idea but with a restricted Hamiltonian, finite temperature, and no guarantee of adiabaticity. It is a heuristic, not a universal computer.
      </p>
      <p>
        <strong>Statistics lens:</strong> a real annealer is warm, so it samples low-energy states with roughly Boltzmann weights <InlineMath math="e^{-E/kT}" /> rather than returning the ground state with certainty. In practice you run it many times and keep the best sample, a strategy whose success depends on the probability mass sitting on the true minimum.
      </p>

      <TryIt heading="35.5 — Try It: Where Is the Gap Smallest?">
        <p>
          For <InlineMath math="H(s) = -(1-s)X - sZ" />, compute the gap at <InlineMath math="s = 0, 0.25, 0.5, 0.75, 1" />. Then repeat for <InlineMath math="H(s) = -(1-s)X - 3sZ" />. Does the smallest gap move, and does the reference time get longer or shorter?
        </p>
      </TryIt>
    </>
  );
}
