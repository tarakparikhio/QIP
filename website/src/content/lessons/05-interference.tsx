'use client';
import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson05Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50 not-prose">
        <h2 className="text-base font-semibold mb-4 text-primary font-mono uppercase tracking-widest">Background & Notation</h2>

        <div className="space-y-5 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Amplitude Addition</h3>
            <p className="text-foreground/75 mb-3 leading-relaxed">
              Quantum interference arises because amplitudes add <em>before</em> squaring into probabilities. For two paths with amplitudes <InlineMath math="\alpha_1" /> and <InlineMath math="\alpha_2" />:
            </p>
            <BlockMath math="P = |\alpha_1 + \alpha_2|^2 = |\alpha_1|^2 + |\alpha_2|^2 + 2\,\text{Re}(\alpha_1^*\alpha_2)" />
            <p className="text-foreground/60 text-xs mt-1">
              The cross term <InlineMath math="2\,\text{Re}(\alpha_1^*\alpha_2)" /> is the interference term — absent in classical probability.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Constructive vs. Destructive</h3>
            <ul className="space-y-1.5 text-foreground/70 text-xs">
              <li><strong className="text-foreground">Constructive:</strong> Amplitudes have the same sign/phase → <InlineMath math="|\alpha_1 + \alpha_2|^2 > |\alpha_1|^2 + |\alpha_2|^2" /></li>
              <li><strong className="text-foreground">Destructive:</strong> Amplitudes have opposite phase → <InlineMath math="|\alpha_1 + \alpha_2|^2 < |\alpha_1|^2 + |\alpha_2|^2" />, can reach 0</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Why Classical Probabilities Behave Differently</h3>
            <p className="text-foreground/75 text-xs leading-relaxed">
              For mutually exclusive classical alternatives, probabilities add: <InlineMath math="P = P_1 + P_2" />. There is no amplitude cross term, so an ordinary probabilistic program cannot use quantum-style phase cancellation as part of its computation.
            </p>
          </div>
        </div>
      </section>

      <h2>5.1 — Interference: The Core Quantum Mechanism</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> interference is the mechanism that lets quantum algorithms amplify correct outcomes and suppress incorrect ones.
      </p>
      <p>
        Quantum interference is one mechanism by which some quantum algorithms can gain an advantage. It allows the probability of useful answers to be amplified while other outcomes are suppressed, without requiring the algorithm to read every superposed possibility individually.
      </p>
      <p>
        Interference requires two ingredients:
      </p>
      <ol>
        <li><strong>Superposition:</strong> The system must be in a state where multiple paths coexist as amplitudes.</li>
        <li><strong>Phase structure:</strong> Different paths must have different complex phases so they can constructively or destructively combine.</li>
      </ol>

      <h2>5.2 — Step-by-Step: H → Z → H Circuit</h2>
      <p>
        This three-gate circuit demonstrates destructive interference eliminating the <InlineMath math="|1\rangle" /> outcome:
      </p>
      <ol>
        <li>Start: <InlineMath math="|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}" /></li>
        <li>Apply H: <InlineMath math="|{+}\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\end{pmatrix}" /></li>
        <li>Apply Z (flips sign of <InlineMath math="|1\rangle" /> component): <InlineMath math="|{-}\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\-1\end{pmatrix}" /></li>
        <li>Apply H: compute <InlineMath math="H|{-}\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1 & 1\\1 & -1\end{pmatrix}\frac{1}{\sqrt{2}}\begin{pmatrix}1\\-1\end{pmatrix} = \frac{1}{2}\begin{pmatrix}0\\2\end{pmatrix} = \begin{pmatrix}0\\1\end{pmatrix}" /></li>
        <li>Result: <InlineMath math="|1\rangle" /> with certainty — the <InlineMath math="|0\rangle" /> amplitude cancelled (destructive), the <InlineMath math="|1\rangle" /> amplitude doubled (constructive).</li>
      </ol>

      <h2>5.3 — The Deutsch Algorithm: Interference in Action</h2>
      <p>
        The Deutsch algorithm is the simplest demonstration of quantum speedup via interference. Given a binary function <InlineMath math="f:\{0,1\}\to\{0,1\}" />, it determines whether <InlineMath math="f" /> is <em>constant</em> (<InlineMath math="f(0)=f(1)" />) or <em>balanced</em> (<InlineMath math="f(0)\neq f(1)" />) using a single query.
      </p>
      <p>
        Classical solution: 2 queries minimum. Quantum: 1 query using interference. The key step is:
      </p>
      <BlockMath math="|0\rangle|1\rangle \xrightarrow{H^{\otimes 2}} |{+}\rangle|{-}\rangle \xrightarrow{U_f} \frac{(-1)^{f(0)}|0\rangle+(-1)^{f(1)}|1\rangle}{\sqrt{2}}|{-}\rangle \xrightarrow{H\otimes I} \text{constant or balanced result}" />
      <p>
        Interference causes the output qubit&apos;s first register to be <InlineMath math="|0\rangle" /> if <InlineMath math="f" /> is constant, and <InlineMath math="|1\rangle" /> if balanced — with one oracle query under the problem&apos;s promise.
      </p>

      <h2>5.4 — Phase Kickback (Advanced)</h2>
      <p>
        Many quantum algorithms exploit <strong>phase kickback</strong>: when a control qubit in superposition applies a gate to a target qubit, the phase of the target&apos;s eigenvalue is &ldquo;kicked back&rdquo; onto the control qubit&apos;s amplitude. This is the mechanism behind Grover&apos;s search and Shor&apos;s factoring algorithm.
      </p>
      <BlockMath math="(\alpha|0\rangle+\beta|1\rangle)|\lambda\rangle \xrightarrow{C\text{-}U} (\alpha|0\rangle+\beta e^{i\phi}|1\rangle)|\lambda\rangle" />

      <h2>5.5 — Try It: Observe Interference</h2>
      <p>
        Build the circuit <strong>H → Z → H</strong> in the playground. The initial H creates superposition; Z flips the relative phase; the final H converts phase difference into a probability difference. You will see the state collapse to <InlineMath math="|1\rangle" /> with 100% probability — complete constructive interference on one outcome, complete destructive on the other.
      </p>
      <p>
        Compare with just <strong>H → H</strong> (no Z): the result is <InlineMath math="|0\rangle" /> with certainty. The only difference between the two circuits is the Z gate, which changed the phase — invisible to a single measurement, but revealed by the final H.
      </p>
    </>
  );
}
