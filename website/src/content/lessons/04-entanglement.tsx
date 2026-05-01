import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson04Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-primary">📚 Foundational Context & Notation</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Multi-Qubit States & Tensor Product</h3>
            <p className="text-foreground/80 mb-2">
              Two independent qubits are combined using the <strong>tensor product</strong> <InlineMath math="\otimes" />:
            </p>
            <BlockMath math="|\psi_1\rangle \otimes |\psi_2\rangle = |\psi_1\psi_2\rangle" />
            <p className="text-foreground/70 text-xs mt-2">
              For example: <InlineMath math="|0\rangle \otimes |1\rangle = |01\rangle" /> (first qubit is 0, second is 1).
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Product States vs. Entangled States</h3>
            <p className="text-foreground/80 mb-2">
              A <strong>product state</strong> can be factored:
            </p>
            <BlockMath math="|\psi\rangle = |\psi_1\rangle \otimes |\psi_2\rangle" />
            <p className="text-foreground/80 mt-3 mb-2">
              An <strong>entangled state</strong> cannot:
            </p>
            <BlockMath math="|\psi\rangle \neq |\psi_1\rangle \otimes |\psi_2\rangle \text{ for any } |\psi_1\rangle, |\psi_2\rangle" />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bell State Example</h3>
            <p className="text-foreground/80">
              The <strong>Bell state</strong> is maximally entangled:
            </p>
            <BlockMath math="|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)" />
            <p className="text-foreground/70 text-xs mt-2">
              If you measure qubit 1 as 0, qubit 2 will always be 0 (perfect correlation).
            </p>
          </div>
        </div>
      </section>

      <h2>The Analogy</h2>
      <p>
        Imagine two people in a deeply linked relationship — what happens to one is immediately
        correlated with the other, not because of communication, but because their states were{' '}
        <strong>jointly prepared</strong> in a way that cannot be described independently.
      </p>
      <p>
        Entanglement is exactly that: two qubits prepared in a <strong>joint state</strong> that
        cannot be factored into two separate single-qubit descriptions.
      </p>

      <h2>The Bell State</h2>
      <p>The canonical entangled state is the <strong>Bell state</strong>:</p>
      <BlockMath math="|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}" />
      <p>
        This state <strong>cannot</strong> be written as{' '}
        <InlineMath math="|a\rangle \otimes |b\rangle" /> for any single-qubit states{' '}
        <InlineMath math="|a\rangle" /> and <InlineMath math="|b\rangle" />. The qubits are
        inseparable — measuring one qubit instantly determines the other.
      </p>

      <h2>How to Create It</h2>
      <p>
        Start from <InlineMath math="|00\rangle" />. Apply Hadamard to qubit 0:
      </p>
      <BlockMath math="\frac{|0\rangle + |1\rangle}{\sqrt{2}} \otimes |0\rangle = \frac{|00\rangle + |10\rangle}{\sqrt{2}}" />
      <p>
        Then apply <strong>CNOT</strong> (control: qubit 0, target: qubit 1):
      </p>
      <BlockMath math="\frac{|00\rangle + |11\rangle}{\sqrt{2}} = |\Phi^+\rangle" />

      <h2>What Entanglement Is Not</h2>
      <p>
        Entanglement is <strong>not</strong> faster-than-light communication. Measuring qubit 0
        determines qubit 1&apos;s outcome, but to <em>learn</em> that correlation you still need a
        classical channel. Entanglement&apos;s power lies in <strong>correlation structure</strong>{' '}
        that enables quantum teleportation, error correction, and cryptographic protocols.
      </p>

      <h2>Try It: Create a Bell State</h2>
      <p>
        Switch to 2 qubits. Apply <code>H</code> to qubit 0, then <code>CNOT</code>. Watch the
        probability bars: only <InlineMath math="|00\rangle" /> and{' '}
        <InlineMath math="|11\rangle" /> will have 50% each.{' '}
        <InlineMath math="|01\rangle" /> and <InlineMath math="|10\rangle" /> will be zero — the
        signature of entanglement.
      </p>
    </>
  );
}
