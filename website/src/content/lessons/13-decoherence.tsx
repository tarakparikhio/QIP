'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson11Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Key Analogy">
          <NotationBox.Text>
            Decoherence is like a perfectly synchronized signal fading into static. The state is still there, but the phase relationships that made it coherent are washed out.
          </NotationBox.Text>
        </NotationBox.Item>

        <NotationBox.Item heading="Core Equations">
          <NotationBox.Code>
            <NotationBox.Row math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" label="Pure qubit state before decoherence" />
            <NotationBox.Row math="\rho = |\psi\rangle\langle\psi|" label="Density matrix for the pure state" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Playground Gates">
          <NotationBox.Text>
            H, Z
          </NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>11.1 — Decoherence</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> decoherence is a loss of phase coherence caused by environmental interaction, and it is one of the central obstacles to scalable quantum computing.
      </p>
      <p>
        Decoherence is the process where a qubit loses phase coherence through uncontrolled interaction with its environment. It is the main reason why quantum states degrade over time.
      </p>

      <h2>11.2 — Intuition</h2> <p>
          Imagine a choir singing in perfect harmony. If random wind noise mixes with the sound, the harmony is still present, but the coherent pattern is lost. Decoherence is the same idea for a qubit&apos;s phase relationships.
      </p>

      <h2>11.3 — Math</h2>
      <BlockMath math="\rho = \begin{pmatrix} |\alpha|^2 & \alpha\beta^* \\ \alpha^*\beta & |\beta|^2 \end{pmatrix}" />
      <p>
        The off-diagonal entries <InlineMath math="\alpha\beta^*" /> and <InlineMath math="\alpha^*\beta" /> carry the coherence information. When they decay toward zero, the qubit becomes a classical mixture of <InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" />.
      </p>

      <h2>11.4 — Circuit Example</h2>
      <p>
        The playground cannot simulate a stochastic decoherence channel directly. It can show the related coherent phase flip: create a superposition, apply Z, and then convert the relative phase back to the computational basis.
      </p>
      <pre className="rounded-xl bg-card/80 p-4 overflow-x-auto text-sm">
{`H
Z
H`}
      </pre>
      <p>
        From <InlineMath math="|0\rangle" />, the first <strong>H</strong> produces <InlineMath math="|+\rangle" />. The <strong>Z</strong> gate flips the relative phase on <InlineMath math="|1\rangle" />, and the final <strong>H</strong> turns that phase into a different measurement outcome. Unlike decoherence, this Z operation is reversible and preserves a pure state.
      </p>

      <TryIt heading="11.5 — Try It">
        <p>
          In the playground, apply <strong>H → Z → H</strong>. Compare the final result with <strong>H → H</strong> and note how a coherent phase error affects measurement. In a true dephasing channel, the off-diagonal density-matrix entries decay statistically rather than undergo one fixed Z operation.
        </p>
      </TryIt>
    </>
  );
}
