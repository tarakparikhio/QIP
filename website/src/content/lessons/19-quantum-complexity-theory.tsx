'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson19Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Complexity Classes">
          <NotationBox.Text>
            Complexity theory asks how much time and space are needed to solve a problem as the input grows.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Key Classes">
          <NotationBox.Code>
            <NotationBox.Row math="\mathrm{P}" label="classically efficient" />
            <NotationBox.Row math="\mathrm{BQP}" label="quantumly efficient" />
            <NotationBox.Row math="\mathrm{QMA}" label="quantum Merlin-Arthur" />
          </NotationBox.Code>
        </NotationBox.Item>
      </NotationBox>

      <h2>19.1 — The Question Is Resource Scaling</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> complexity theory asks how the cost of solving a problem scales with input size, and quantum computing aims to lower that scaling in some cases.
      </p>
      <p>
        Quantum complexity theory studies which problems become tractable when a computer can exploit superposition, interference, and entanglement. The big challenge is to separate the problems that are easy for quantum devices from those that remain hard even with quantum resources.
      </p>
      <p>
        The playground example here is only meant to make the idea of phase-sensitive state preparation concrete. The broader complexity-theory story is about asymptotic scaling and resource costs, not about any one tiny circuit.
      </p>

      <h2>19.2 — A Few Important Classes</h2>
      <p>
        <InlineMath math="\mathrm{P}" /> contains problems efficiently solvable by a classical deterministic computer, while <InlineMath math="\mathrm{BQP}" /> captures the problems that can be solved efficiently with bounded-error quantum computation. Some problems, such as factoring, are believed to lie in <InlineMath math="\mathrm{BQP}" /> but outside <InlineMath math="\mathrm{P}" />.
      </p>
      <BlockMath math="\mathrm{P} \subseteq \mathrm{BQP} \subseteq \mathrm{EXP}" />

      <h2>19.3 — Why the Distinction Matters</h2>
      <p>
        The value of a quantum algorithm is not just that it is clever; it is that it gives a provable or plausible asymptotic speedup over the best known classical method. That distinction is what makes quantum complexity theory so important for cryptography and optimization.
      </p>

      <TryIt heading="19.4 — Try It: Compare the Claims">
        <p>
          Which class would you assign to factoring if the best known classical algorithm is superpolynomial, but Shor&apos;s algorithm is polynomial? Why does the answer depend on whether the speedup is proven or only conjectured?
        </p>
      </TryIt>
    </>
  );
}
