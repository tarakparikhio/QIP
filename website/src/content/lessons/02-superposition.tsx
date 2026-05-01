import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson02Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-primary">📚 Foundational Context & Notation</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">State Vector Representation</h3>
            <p className="text-foreground/80 mb-2">
              A qubit's state is written as a <strong>superposition</strong> of basis states:
            </p>
            <BlockMath math="|\psi\rangle = \alpha |0\rangle + \beta |1\rangle" />
            <p className="text-foreground/70 text-xs mt-2">
              where <InlineMath math="\alpha, \beta \in \mathbb{C}" /> are complex amplitudes satisfying <InlineMath math="|\alpha|^2 + |\beta|^2 = 1" />.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Key Distinction: Superposition vs. Mixture</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li><strong>Superposition (pure state):</strong> Definite amplitudes, can interfere</li>
              <li><strong>Mixture (mixed state):</strong> Classical probability distribution, no interference</li>
            </ul>
            <p className="text-foreground/70 text-xs mt-2">
              This distinction is crucial—superposition has physical meaning beyond ignorance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bloch Sphere Coordinates</h3>
            <p className="text-foreground/80">
              A single-qubit state can be visualized on the Bloch sphere, with:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li><strong>North Pole:</strong> <InlineMath math="|0\rangle" /></li>
              <li><strong>South Pole:</strong> <InlineMath math="|1\rangle" /></li>
              <li><strong>Equator:</strong> Equal superpositions (50/50 probability)</li>
            </ul>
          </div>
        </div>
      </section>

      <h2>The Analogy</h2>
      <p>
        Before a student answers roll-call, the teacher&apos;s register holds a{' '}
        <strong>cloud of possible statuses</strong> — present, late, or absent. The instant the
        student replies, that cloud collapses into a single declared line item.
      </p>
      <p>
        Superposition is that cloud. It is <strong>not</strong> classical uncertainty (where one
        answer secretly already exists). It is a physical state with genuine amplitude weight on
        multiple outcomes.
      </p>

      <h2>Superposition as Linear Combination</h2>
      <p>
        Any normalized vector in the qubit&apos;s two-dimensional Hilbert space is a valid
        superposition:
      </p>
      <BlockMath math="|\psi\rangle = \alpha |0\rangle + \beta |1\rangle" />
      <p>
        The <strong>Hadamard gate</strong> is the standard way to create equal superposition from
        the ground state:
      </p>
      <BlockMath math="H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}}" />
      <p>
        After this gate, measuring in the computational basis gives 50%{' '}
        <InlineMath math="|0\rangle" /> and 50% <InlineMath math="|1\rangle" />.
      </p>

      <h2>Superposition ≠ Probability Distribution</h2>
      <p>
        A classical probability distribution secretly assumes one outcome is &ldquo;true&rdquo; but
        unknown. Superposition is different: the amplitudes <strong>interact with each other</strong>{' '}
        through later gates. This is why the <strong>relative phase</strong> between{' '}
        <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> affects future interference
        outcomes even though it doesn&apos;t change the measurement probabilities right now.
      </p>

      <h2>Try It: Create Superposition</h2>
      <p>
        Apply <code>H</code> to qubit 0 — watch it go from 100% <InlineMath math="|0\rangle" /> to
        50/50. Then apply <code>X</code> to see the qubit flip. Combine <code>H → X → H</code> and
        observe what happens.
      </p>
    </>
  );
}
