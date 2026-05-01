import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson03Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-primary">📚 Foundational Context & Notation</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">The Born Rule (Measurement Postulate)</h3>
            <p className="text-foreground/80 mb-2">
              When you measure a qubit in state <InlineMath math="|\psi\rangle = \alpha |0\rangle + \beta |1\rangle" />:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li>Probability of outcome <InlineMath math="|0\rangle" />: <InlineMath math="P(0) = |\alpha|^2" /></li>
              <li>Probability of outcome <InlineMath math="|1\rangle" />: <InlineMath math="P(1) = |\beta|^2" /></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Wave Function Collapse</h3>
            <p className="text-foreground/80">
              <strong>Before measurement:</strong> The state is a superposition of amplitudes.
              <br />
              <strong>After measurement:</strong> The state collapses to the measured basis state.
            </p>
            <p className="text-foreground/70 text-xs mt-2">
              This is <em>irreversible</em> — once measured, the superposition is destroyed.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Why Amplitude vs. Probability Matters</h3>
            <p className="text-foreground/80">
              Amplitudes can be negative or complex, allowing for <strong>interference</strong>. Two different states with the same probability distribution can still behave differently in circuits.
            </p>
          </div>
        </div>
      </section>

      <h2>The Analogy</h2>
      <p>
        The teacher calls a student&apos;s name. The instant the student replies, the entire cloud
        of possible statuses — present, late, absent — collapses into one line in the register.{' '}
        <strong>That moment of collapse is measurement.</strong>
      </p>
      <p>
        Before measurement, all the amplitudes are real and active. After measurement, one classical
        outcome is written down and the superposition is gone.
      </p>

      <h2>Born&apos;s Rule</h2>
      <p>
        For a qubit in state{' '}
        <InlineMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />, measurement in the
        computational basis gives:
      </p>
      <BlockMath math="P(0) = |\alpha|^2, \qquad P(1) = |\beta|^2" />
      <p>
        This is the <strong>Born rule</strong> — the bridge from quantum amplitudes to classical
        probabilities.
      </p>

      <h2>Projectors and Collapse</h2>
      <p>The mathematical machinery uses <strong>projectors</strong>:</p>
      <BlockMath math="\Pi_0 = |0\rangle\langle 0|, \qquad \Pi_1 = |1\rangle\langle 1|" />
      <p>
        After observing outcome 0, the remaining quantum state is <InlineMath math="|0\rangle" />.
        The superposition is destroyed.
      </p>

      <h2>Why Measure Late?</h2>
      <p>
        Quantum algorithms work precisely because we <strong>delay measurement</strong>. While a
        qubit remains in superposition, gates can steer amplitudes via interference. The moment you
        measure, the game ends and you extract a classical answer. Measurement is irreversible.
      </p>

      <h2>Try It: Born Rule in Action</h2>
      <p>
        Add an <code>H</code> gate (50/50 superposition). Now add a <code>Z</code> gate — it flips
        the phase of <InlineMath math="|1\rangle" /> but the{' '}
        <strong>probabilities stay 50/50</strong>. This shows that phase is invisible to direct
        measurement. Add another <code>H</code> afterward — now you will see the phase become
        visible as a biased outcome.
      </p>
    </>
  );
}
