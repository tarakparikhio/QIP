import { InlineMath, BlockMath } from '@/components/math';

export default function Lesson01Content() {
  return (
    <>
      {/* Foundational Context Section */}
      <section className="mb-12 p-6 rounded-lg bg-card border border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-primary">📚 Foundational Context & Notation</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Mathematical Notation</h3>
            <p className="text-foreground/80 mb-2">
              Quantum mechanics uses <strong>Dirac notation (bra-ket)</strong> to represent quantum states:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li><InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" /> — basis states (ket notation)</li>
              <li><InlineMath math="\langle 0|" /> and <InlineMath math="\langle 1|" /> — dual states (bra notation)</li>
              <li><InlineMath math="\alpha, \beta" /> — complex amplitudes (can be real or imaginary)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Statistical Concepts</h3>
            <p className="text-foreground/80 mb-2">
              Key terms you'll encounter:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/70">
              <li><strong>Probability:</strong> A value between 0 and 1 describing likelihood of an outcome</li>
              <li><strong>Amplitude:</strong> A complex number whose <em>squared magnitude</em> gives probability</li>
              <li><strong>Normalization:</strong> The sum of all probabilities equals 1</li>
              <li><strong>Phase:</strong> The angle of a complex number; affects interference behavior</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Complex Numbers Refresher</h3>
            <p className="text-foreground/80">
              A complex number <InlineMath math="z = a + bi" /> can be written as <InlineMath math="z = re^{i\theta}" />, 
              where <InlineMath math="r = |z|" /> (magnitude) and <InlineMath math="\theta" /> (phase angle).
            </p>
          </div>
        </div>
      </section>

      <h2>The Analogy</h2>
      <p>
        Imagine a classroom before the teacher calls attendance. Each student might be{' '}
        <strong>present</strong>, <strong>late</strong>, <strong>asleep</strong>, or{' '}
        <strong>absent</strong> — multiple possibilities exist simultaneously in the teacher&apos;s
        mind. The moment a name is called and answered, all that uncertainty collapses into one
        definitive record.
      </p>
      <p>A <strong>qubit</strong> is exactly that classroom, before roll-call.</p>
      <blockquote>
        Before measurement, a qubit holds a <em>structured cloud</em> of possible states — not just
        ignorance, but a real physical configuration described by amplitudes.
      </blockquote>

      <h2>What Makes a Qubit Different from a Bit?</h2>
      <p>
        A classical bit is always exactly 0 or 1 — like a light switch. A qubit holds two{' '}
        <strong>complex amplitudes</strong>, <InlineMath math="\alpha" /> and{' '}
        <InlineMath math="\beta" />:
      </p>
      <BlockMath math="|\psi\rangle = \alpha |0\rangle + \beta |1\rangle" />
      <p>
        These amplitudes obey the <strong>normalization rule</strong>:
      </p>
      <BlockMath math="|\alpha|^2 + |\beta|^2 = 1" />
      <p>
        This is not probability — it is <strong>amplitude</strong>. The probabilities only emerge
        when you measure.
      </p>

      <h2>Why Phase Matters</h2>
      <p>
        Even when two qubits have identical probabilities (<InlineMath math="|0\rangle" /> with
        50%, <InlineMath math="|1\rangle" /> with 50%), the <strong>relative phase</strong> between{' '}
        <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> can be completely different.
        That phase becomes physically meaningful when the qubit goes through more gates before
        measurement — it determines how amplitudes <strong>interfere</strong>.
      </p>

      <h2>Try It: Build Your First Circuit</h2>
      <p>
        Apply a <strong>Hadamard (H)</strong> gate to the qubit below and watch the probabilities
        change from <InlineMath math="|0\rangle = 100\%" /> to an equal superposition.
      </p>
      <p>
        The Hadamard gate puts a qubit exactly on the equator of the Bloch sphere — a perfect 50/50
        split.
      </p>
    </>
  );
}
