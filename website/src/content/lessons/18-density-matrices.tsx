'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson18Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Mixed State">
          <NotationBox.Text>
            A density matrix represents both coherent superposition and classical uncertainty about which state the system is in.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Ensemble Form">
          <NotationBox.Code>
            <NotationBox.Row math="\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|" label="mixture of pure states" />
            <NotationBox.Row math="\mathrm{Tr}(\rho)=1" label="normalization" />
          </NotationBox.Code>
        </NotationBox.Item>
      </NotationBox>

      <h2>18.1 — Why a State Vector Is Not Enough</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> density matrices describe both coherent superpositions and classical uncertainty, which makes them essential for open quantum systems.
      </p>
      <p>
        Pure states are described by vectors in Hilbert space, but many realistic systems are only partially known. A qubit subjected to noise, for example, might be in a mixture of states rather than a single coherent state.
      </p>
      <p>
        The simulator here is deliberately simple: it illustrates the impulse behind the density-matrix formalism, but it does not attempt to model a full open-system evolution with a realistic environment.
      </p>
      <p>
        Density matrices capture this by encoding probabilities and phase information at once. They make it possible to reason about decoherence, thermalization, and open-system dynamics.
      </p>

      <h2>18.2 — The Density Matrix Formalism</h2>
      <p>
        If a system is prepared as <InlineMath math="|\psi\rangle" /> with certainty, then <InlineMath math="\rho = |\psi\rangle\langle\psi|" />. If it is instead prepared as one of several states with probabilities <InlineMath math="p_i" />, the density matrix is the weighted average of each projector.
      </p>
      <BlockMath math="\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|" />

      <h2>18.3 — Reduced Density Matrices</h2>
      <p>
        When a subsystem is entangled with the rest of the world, the subsystem alone is described by a reduced density matrix obtained by tracing out the environment. This is the mathematical language of open quantum systems.
      </p>

      <TryIt heading="18.4 — Try It: Compare Pure and Mixed Cases">
        <p>
          Write down the density matrix for a pure state <InlineMath math="|0\rangle" /> and for an equal mixture of <InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" />. Which matrix contains more information about phase coherence, and why?
        </p>
      </TryIt>
    </>
  );
}
