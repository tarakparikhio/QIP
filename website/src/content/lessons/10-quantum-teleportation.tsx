'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson17Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Bell Pair">
          <NotationBox.Text>
            Teleportation starts by creating an entangled pair shared between Alice and Bob.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Correction">
          <NotationBox.Code>
            <NotationBox.Row math="|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}" label="shared entangled state" />
            <NotationBox.Row math="X^a Z^b" label="classical correction" />
          </NotationBox.Code>
        </NotationBox.Item>
      </NotationBox>

      <h2>17.1 — Teleportation Is Not Faster-Than-Light Communication</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> teleportation combines entanglement with classical communication, and it is a foundational idea for distributed quantum protocols.
      </p>
      <p>
        Quantum teleportation transfers the state of one qubit to another by combining entanglement with classical communication. The state is not copied; instead, the original system becomes correlated with the remote one while the classical message tells Bob which correction to apply.
      </p>
      <p>
        The playground uses a compact Bell-pair-inspired circuit as a conceptual sketch. It is not a full teleportation protocol with all measurement and correction steps, but it captures the core idea that entanglement and classical information together can transfer a state.
      </p>
      <p>
        The protocol works because the Bell-basis measurement on Alice&apos;s side projects the unknown state into one of four possibilities, each of which can be undone by a simple Pauli correction on Bob&apos;s side.
      </p>

      <h2>17.2 — The Three Ingredients</h2>
      <p>
        First, Alice and Bob share a Bell pair. Next, Alice performs a Bell-basis measurement on her unknown qubit and her half of the entangled pair. Finally, she sends two classical bits to Bob, who applies the appropriate correction <InlineMath math="X^a Z^b" />.
      </p>
      <BlockMath math="|\psi\rangle \otimes |\Phi^+\rangle \xrightarrow{\text{Bell measurement}} \text{two classical bits} + \text{Bob correction}" />

      <h2>17.3 — Why It Matters</h2>
      <p>
        Teleportation is a building block for modular quantum networks and distributed architectures. It shows how entanglement can be used to move quantum information between locations even when direct transmission of the state is impossible.
      </p>

      <TryIt heading="17.4 — Try It: Trace the Correction">
        <p>
          Suppose Alice measures one of the Bell states and Bob receives the two classical bits. Which Pauli correction should Bob apply for each measurement outcome, and why does the protocol need the classical channel even though the state has already been transferred?
        </p>
      </TryIt>
    </>
  );
}
