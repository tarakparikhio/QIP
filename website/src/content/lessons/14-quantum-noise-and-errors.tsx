'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson12Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Key Analogy">
          <NotationBox.Text>
            Quantum noise is like a message sent over a noisy line: the information still exists, but errors can flip bits or distort phase along the way.
          </NotationBox.Text>
        </NotationBox.Item>

        <NotationBox.Item heading="Core Equations">
          <NotationBox.Code>
            <NotationBox.Row math="\mathcal{E}(\rho) = (1-p)\rho + p X\rho X" label="Bit-flip noise with probability p" />
            <NotationBox.Row math="\mathcal{E}(\rho) = (1-p)\rho + p Z\rho Z" label="Phase-flip noise with probability p" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Playground Gates">
          <NotationBox.Text>
            H, X, Z
          </NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>14.1 — Quantum Noise & Errors</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> noise can introduce bit flips, phase flips, or more general distortions, and error correction aims to make those effects controllable.
      </p>
      <p>
        Noise in quantum systems appears as unwanted operations on a qubit. The simplest error models are the bit flip and phase flip channels.
      </p>

      <h2>14.2 — Intuition</h2>
      <p>
        In classical computing, noise may flip a 0 into a 1. In quantum computing, noise can also change the relative phase of a superposition, which alters interference patterns without immediately changing the classical basis probabilities.
      </p>

      <h2>14.3 — Math</h2>
      <BlockMath math="\mathcal{E}(\rho) = (1-p)\rho + p E \rho E^\dagger" />
      <p>
        Here <InlineMath math="E" /> is an error operator such as <InlineMath math="X" /> or <InlineMath math="Z" />. The output is a probabilistic mixture of the ideal state and the errored state.
      </p>

      <h2>14.4 — Circuit Example</h2>
      <p>
        The playground applies deterministic gates, so it illustrates one realization of an error rather than sampling a probabilistic noise channel. Compare a bit flip on <InlineMath math="|0\rangle" /> with a phase flip revealed through interference.
      </p>
      <pre className="rounded-xl bg-card/80 p-4 overflow-x-auto text-sm">
{`X`}
      </pre>
      <pre className="rounded-xl bg-card/80 p-4 overflow-x-auto text-sm mt-4">
{`H
Z
H`}
      </pre>
      <p>
        The first sequence is a single bit-flip error, taking <InlineMath math="|0\rangle" /> to <InlineMath math="|1\rangle" />. The second is a single phase-flip error between two Hadamards, which maps the changed phase back into the measurement basis. The channel equations above describe the stochastic mixture obtained when these errors occur with probability <InlineMath math="p" />.
      </p>

      <TryIt heading="14.5 — Try It">
        <p>
          In the playground, try both <strong>X</strong> and <strong>H → Z → H</strong>. The first shows a bit flip directly; the second makes a phase flip observable. A single run is not the same as a noisy channel—repeat the thought experiment with an error occurring only on some runs to obtain the mixed-state model.
        </p>
      </TryIt>
    </>
  );
}
