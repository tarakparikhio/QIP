'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson16Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Redundancy">
          <NotationBox.Text>
            A logical qubit is encoded into several physical qubits so that a local error changes the code space in a detectable way.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Syndrome">
          <NotationBox.Code>
            <NotationBox.Row math="|0_L\rangle \mapsto |000\rangle, \quad |1_L\rangle \mapsto |111\rangle" label="simple repetition code" />
            <NotationBox.Row math="s = \text{syndrome}(E)" label="error signature" />
          </NotationBox.Code>
        </NotationBox.Item>
      </NotationBox>

      <h2>16.1 — Error Correction Protects the Logic</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> quantum error correction uses redundancy and syndrome information to preserve logical information in the presence of noise.
      </p>
      <p>
        Quantum error correction is the practice of preserving fragile quantum states by encoding them in a larger system. The idea is not to prevent every error, but to make errors recognizable so they can be corrected before they spread into a logical failure.
      </p>
      <p>
        In this playground, we use a simplified single-qubit sketch to highlight the basic idea of detecting a disturbance and responding to it. A real error-correcting code uses many physical qubits and structured syndrome measurements, which are beyond the scope of this toy simulator.
      </p>
      <p>
        In a repetition-style code, the logical zero and logical one are stored as different bit patterns that are far apart in Hamming space. A single bit-flip then becomes easy to identify through parity checks.
      </p>

      <h2>16.2 — Measuring What Went Wrong</h2>
      <p>
        The key step is syndrome extraction: a set of ancilla qubits is used to detect which kind of error happened without directly measuring the logical state. That keeps the superposition intact while exposing enough information to decide on a correction.
      </p>
      <BlockMath math="|\psi_L\rangle \xrightarrow{\text{error}} E|\psi_L\rangle \xrightarrow{\text{syndrome}} s" />

      <h2>16.3 — Why It Matters for Hardware</h2>
      <p>
        Real devices have noise from imperfect gates, relaxation, and cross-talk. Error correction gives a route to make a noisy machine useful by trading many physical qubits for one more reliable logical qubit.
      </p>

      <TryIt heading="16.4 — Try It: Spot the Error Pattern">
        <p>
          Imagine the code state is encoded as three physical qubits. If one qubit flips, which parity check would tell you that something went wrong? Compare the effect of a single flip to the effect of a phase error and explain why the correction strategy must be tailored to the hardware noise model.
        </p>
      </TryIt>
    </>
  );
}
