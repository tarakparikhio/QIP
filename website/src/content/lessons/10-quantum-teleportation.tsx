'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson10Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The resources">
          <NotationBox.Text>
            Alice holds an unknown qubit <InlineMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />. Alice and Bob share one Bell pair, and they can send ordinary classical bits.
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="|\Phi^\pm\rangle = \tfrac{1}{\sqrt2}(|00\rangle \pm |11\rangle)" label="Bell states with equal bits" />
            <NotationBox.Row math="|\Psi^\pm\rangle = \tfrac{1}{\sqrt2}(|01\rangle \pm |10\rangle)" label="Bell states with opposite bits" />
          </NotationBox.Code>
        </NotationBox.Item>
        <NotationBox.Item heading="Key terms">
          <NotationBox.List items={[
            { term: 'Bell measurement', description: <>A measurement that asks which of the four Bell states two qubits are in. It is done with CNOT, then H, then two ordinary measurements.</> },
            { term: 'Pauli correction', description: <>Bob applies <InlineMath math="X^{m_1}" /> then <InlineMath math="Z^{m_0}" />, where <InlineMath math="m_0, m_1" /> are Alice&apos;s two result bits.</> },
            { term: 'Deferred measurement', description: 'A measurement followed by a classically controlled gate gives the same statistics as a quantum-controlled gate followed by the measurement.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>10.1 — The Problem Teleportation Solves</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> one shared Bell pair plus two classical bits moves one unknown qubit. The original is destroyed, and nothing arrives before the classical bits do.
      </p>
      <p>
        Alice wants Bob to end up with her qubit&apos;s exact state, but she can only send classical messages. Measuring the qubit and phoning the result does not work: one measurement returns a single bit, while <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> are continuous numbers, and she only has one copy (no-cloning rules out making more). Teleportation gets around this by spending entanglement.
      </p>

      <h2>10.2 — The Algebra in One Line</h2>
      <p>
        Label Alice&apos;s unknown qubit q0, Alice&apos;s half of the Bell pair q1, and Bob&apos;s half q2. Expanding <InlineMath math="|\psi\rangle_0|\Phi^+\rangle_{12}" /> and regrouping qubits 0 and 1 in the Bell basis gives an exact identity:
      </p>
      <BlockMath math="|\psi\rangle_0|\Phi^+\rangle_{12} = \tfrac12\Big[\,|\Phi^+\rangle(\alpha|0\rangle+\beta|1\rangle) + |\Phi^-\rangle(\alpha|0\rangle-\beta|1\rangle) + |\Psi^+\rangle(\alpha|1\rangle+\beta|0\rangle) + |\Psi^-\rangle(\alpha|1\rangle-\beta|0\rangle)\Big]" />
      <p>
        Nothing has happened physically yet; this is the same state written differently. It shows that once Alice learns which Bell state her two qubits are in, Bob&apos;s qubit is in one of four known distortions of <InlineMath math="|\psi\rangle" />. Until then, nothing about Bob&apos;s qubit has changed (see 10.4).
      </p>

      <h2>10.3 — Measure, Send Two Bits, Correct</h2>
      <p>
        Alice applies CNOT (q0 → q1) and H on q0, then measures both. This maps each Bell state to a distinct pair of bits, and Bob undoes the matching distortion:
      </p>
      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs font-mono uppercase tracking-wider text-muted">
              <th className="py-2 pr-4">Alice&apos;s Bell state</th><th className="py-2 pr-4">Bits m₀ m₁</th><th className="py-2 pr-4">Bob holds</th><th className="py-2">Bob applies</th>
            </tr>
          </thead>
          <tbody className="text-foreground/85">
            <tr className="border-b border-border/30"><td className="py-2 pr-4"><InlineMath math="|\Phi^+\rangle" /></td><td className="py-2 pr-4 font-mono">00</td><td className="py-2 pr-4"><InlineMath math="\alpha|0\rangle+\beta|1\rangle" /></td><td className="py-2">nothing</td></tr>
            <tr className="border-b border-border/30"><td className="py-2 pr-4"><InlineMath math="|\Phi^-\rangle" /></td><td className="py-2 pr-4 font-mono">10</td><td className="py-2 pr-4"><InlineMath math="\alpha|0\rangle-\beta|1\rangle" /></td><td className="py-2"><InlineMath math="Z" /></td></tr>
            <tr className="border-b border-border/30"><td className="py-2 pr-4"><InlineMath math="|\Psi^+\rangle" /></td><td className="py-2 pr-4 font-mono">01</td><td className="py-2 pr-4"><InlineMath math="\alpha|1\rangle+\beta|0\rangle" /></td><td className="py-2"><InlineMath math="X" /></td></tr>
            <tr><td className="py-2 pr-4"><InlineMath math="|\Psi^-\rangle" /></td><td className="py-2 pr-4 font-mono">11</td><td className="py-2 pr-4"><InlineMath math="\alpha|1\rangle-\beta|0\rangle" /></td><td className="py-2"><InlineMath math="X" />, then <InlineMath math="Z" /></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Check the last row: <InlineMath math="X" /> turns <InlineMath math="\alpha|1\rangle-\beta|0\rangle" /> into <InlineMath math="\alpha|0\rangle-\beta|1\rangle" />, and <InlineMath math="Z" /> then restores <InlineMath math="\alpha|0\rangle+\beta|1\rangle" />. In every row Bob ends with exactly <InlineMath math="|\psi\rangle" />.
      </p>

      <h2>10.4 — Why Nothing Travels Faster Than Light</h2>
      <p>
        Each term in 10.2 has amplitude <InlineMath math="\tfrac12" /> times a normalized state, so each of Alice&apos;s four results has probability <InlineMath math="\tfrac14" />, <strong>whatever</strong> <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> are. Her two bits are two fair coin flips and reveal nothing about the state.
      </p>
      <p>
        Before the bits arrive, Bob&apos;s qubit is one of the four distorted versions, each with probability <InlineMath math="\tfrac14" />. Averaging over them gives the maximally mixed state:
      </p>
      <BlockMath math="\tfrac14\left(\rho + Z\rho Z + X\rho X + XZ\rho ZX\right) = \tfrac{I}{2}" />
      <p>
        So until the classical message arrives, every measurement Bob makes looks like a fair coin. The state becomes usable only after the two bits, which travel no faster than light. Alice&apos;s original is left in a definite measured state, so no copy was made either.
      </p>

      <h2>10.5 — Building It in the Playground</h2>
      <p>
        This simulator has no mid-circuit measurement, but the <strong>deferred measurement principle</strong> says a measurement followed by a classically controlled gate has the same statistics as a quantum-controlled gate followed by the measurement. So Bob&apos;s <InlineMath math="X^{m_1}" /> becomes a CNOT from q1 to q2, and <InlineMath math="Z^{m_0}" /> becomes a CZ from q0 to q2.
      </p>
      <ol>
        <li><strong>Prepare the unknown state:</strong> RX on q0 gives <InlineMath math="(|0\rangle - i|1\rangle)/\sqrt2" />, a point on the Bloch sphere&apos;s −y axis.</li>
        <li><strong>Share a Bell pair:</strong> H on q1, then CNOT (q1 → q2).</li>
        <li><strong>Bell measurement basis change:</strong> CNOT (q0 → q1), then H on q0.</li>
        <li><strong>Corrections:</strong> CNOT (q1 → q2), then CZ (q0 → q2).</li>
      </ol>
      <p>
        Result: q2&apos;s Bloch vector points along −y, exactly where q0 started, while q0 and q1 give uniformly random measurement results (each of the 8 outcomes has probability 1/8).
      </p>

      <TryIt heading="10.6 — Try It: Teleport a State">
        <p>
          Load the example and compare q2&apos;s Bloch sphere with the input. Then change the input: replace RX on q0 with H then T (a point on the equator at 45°) and check that q2 follows. Finally, remove the CZ correction and see which states still arrive correctly and which do not.
        </p>
      </TryIt>
    </>
  );
}
