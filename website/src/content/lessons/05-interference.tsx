import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson05Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-primary">📚 Foundational Context & Notation</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Amplitude vs. Probability Interference</h3>
            <p className="text-foreground/80 mb-2">
              Unlike classical probability, quantum amplitudes can be <strong>negative or complex</strong>, allowing paths to interfere:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li><strong>Constructive:</strong> Amplitudes align → higher probability</li>
              <li><strong>Destructive:</strong> Amplitudes cancel → lower probability</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Phase Relationships</h3>
            <p className="text-foreground/80 mb-2">
              A complex amplitude <InlineMath math="\alpha = re^{i\theta}" /> has:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li><InlineMath math="r = |\alpha|" />: magnitude (determines probability)</li>
              <li><InlineMath math="\theta" />: phase angle (determines interference)</li>
            </ul>
            <p className="text-foreground/70 text-xs mt-2">
              <strong>Relative phase</strong> between two amplitudes is what matters for interference.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Quantum Advantage via Interference</h3>
            <p className="text-foreground/80">
              Quantum algorithms use interference to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li><strong>Amplify</strong> correct answer paths (constructive)</li>
              <li><strong>Cancel</strong> wrong answer paths (destructive)</li>
            </ul>
            <p className="text-foreground/70 text-xs mt-2">
              This is impossible classically—interference is the core of quantum speed.
            </p>
          </div>
        </div>
      </section>

      <h2>The Analogy</h2>
      <p>
        A traffic engineer can time traffic signals so that a green wave flows through a city —
        cars that hit one green light arrive at the next one green too. The same road network, with
        different <em>timing</em>, either <strong>amplifies</strong> flow or brings it to a halt.
      </p>
      <p>
        Quantum interference works by the same logic: multiple amplitude paths combine, and their
        timing (phase) determines whether they <strong>reinforce</strong> or{' '}
        <strong>cancel</strong>.
      </p>

      <h2>Constructive vs Destructive Interference</h2>
      <p>When two amplitude paths share the same phase, they reinforce:</p>
      <BlockMath math="\frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} = \sqrt{2} \quad \text{(constructive)}" />
      <p>When they are opposite in phase, they cancel:</p>
      <BlockMath math="\frac{1}{\sqrt{2}} - \frac{1}{\sqrt{2}} = 0 \quad \text{(destructive)}" />

      <h2>The H–Z–H Sequence</h2>
      <p>
        Start from <InlineMath math="|0\rangle" />. Apply <InlineMath math="H" /> to get equal
        superposition. Apply <InlineMath math="Z" /> to flip the phase of{' '}
        <InlineMath math="|1\rangle" />:
      </p>
      <BlockMath math="\frac{|0\rangle + |1\rangle}{\sqrt{2}} \xrightarrow{Z} \frac{|0\rangle - |1\rangle}{\sqrt{2}}" />
      <p>
        Apply <InlineMath math="H" /> again. The amplitudes now <strong>interfere</strong> and
        collapse entirely into <InlineMath math="|1\rangle" />:
      </p>
      <BlockMath math="H\left(\frac{|0\rangle - |1\rangle}{\sqrt{2}}\right) = |1\rangle" />
      <p>
        The result is 100% <InlineMath math="|1\rangle" /> — a <em>certain</em> outcome engineered
        entirely through interference.
      </p>

      <h2>Why This Matters for Algorithms</h2>
      <p>
        All major quantum speedups (Grover, Deutsch-Jozsa, QFT-based algorithms) work by designing
        a circuit whose interference <strong>amplifies</strong> the probability of correct answers
        while <strong>suppressing</strong> incorrect ones.
      </p>

      <h2>Try It: Witness Interference</h2>
      <p>
        Apply <code>H → Z → H</code> in sequence. After all three gates, the probability of{' '}
        <InlineMath math="|1\rangle" /> should be 100%. This is not a coincidence — it is{' '}
        <strong>constructive interference</strong> at work. Remove the <code>Z</code> and run{' '}
        <code>H → H</code> instead. The qubit returns to <InlineMath math="|0\rangle" /> —
        destructive interference on <InlineMath math="|1\rangle" />.
      </p>
    </>
  );
}
