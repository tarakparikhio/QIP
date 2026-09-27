'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson37Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="What a platform must provide">
          <NotationBox.Text>
            A physical qubit, a way to control it, a way to couple qubits, a way to read them out, and calibration routines that keep all of it accurate over time.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="The numbers that matter">
          <NotationBox.List items={[
            { term: 'T₁', description: <>Energy-relaxation time: <InlineMath math="P(1)" /> decays as <InlineMath math="e^{-t/T_1}" />.</> },
            { term: 'T₂', description: 'Coherence time: how long phase information survives (always at most 2T₁).' },
            { term: 'Gate fidelity', description: 'How close a real gate is to the ideal one; two-qubit gates are usually the weakest link.' },
            { term: 'Connectivity', description: 'Which pairs of qubits can interact directly.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>37.1 - Comparing Platforms With Ratios, Not Headlines</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> no platform wins every metric. What matters is how many good operations fit inside the coherence window, how errors compound across a circuit, and how easily the design scales.
      </p>
      <p>
        A long coherence time is only useful relative to gate speed. The ratio <InlineMath math="T_2 / t_{\text{gate}}" /> estimates how many sequential operations fit before phase information fades. And since errors compound, the success probability of a circuit is roughly the product of the fidelities of its operations:
      </p>
      <BlockMath math="P(\text{success}) \approx \prod_{\text{gates}} F_{\text{gate}} \times \prod_{\text{readouts}} F_{\text{readout}}" />
      <p>
        Worked example: 50 two-qubit gates at 99.5%, 100 one-qubit gates at 99.95%, and 5 readouts at 99% give <InlineMath math="0.995^{50} \times 0.9995^{100} \times 0.99^{5} \approx 0.70" />. Raising only the two-qubit fidelity to 99.9% lifts this to about 0.86. This is why two-qubit fidelity is the most watched number in the field.
      </p>

      <h2>37.2 - Superconducting Circuits</h2>
      <p>
        Qubits are tiny superconducting electrical circuits cooled to about 10 millikelvin in a dilution refrigerator. Microwave pulses drive transitions, and couplers mediate interactions between neighbors. Typical figures: coherence of tens to hundreds of microseconds, gates of tens to hundreds of nanoseconds, and the best two-qubit fidelities around 99.5 to 99.9%. Strengths: fast gates and chip fabrication. Challenges: fixed, mostly nearest-neighbor connectivity, crosstalk, wiring into the refrigerator, and calibration drift.
      </p>

      <h2>37.3 - Trapped Ions and Neutral Atoms</h2>
      <p>
        <strong>Trapped ions</strong> are individual charged atoms held by electromagnetic fields and controlled with lasers. Coherence can reach seconds or longer, two-qubit fidelities are among the best demonstrated (around 99.9%), and ions in one trap can interact all-to-all. The trade-off is speed: two-qubit gates typically take tens to hundreds of microseconds, and scaling to very long chains is hard, which is why ions are often shuttled between trap zones.
      </p>
      <p>
        <strong>Neutral atoms</strong> are held in arrays of optical tweezers and made to interact by exciting them to Rydberg states. Arrays of hundreds of atoms have been demonstrated, atoms can be rearranged to change connectivity, and two-qubit fidelities have reached about 99.5%. Challenges include atom loss, laser stability, and relatively slow readout.
      </p>

      <h2>37.4 - Photons and Other Approaches</h2>
      <p>
        <strong>Photonic</strong> qubits encode information in polarization, path, or arrival time. Photons barely interact with their environment and are natural for communication, but they also barely interact with each other, so two-qubit operations rely on measurement and are probabilistic, and every component loses some photons. <strong>Spin qubits</strong> in silicon promise compatibility with chip manufacturing, and color centers in diamond are useful for networking. Each makes different trade-offs.
      </p>

      <h2>37.5 - How to Read a Hardware Spec Sheet</h2>
      <p>
        These figures change quickly and vary between devices, so treat the numbers above as orders of magnitude and check a provider&apos;s current calibration data before planning an experiment. A useful comparison reports the whole stack: median and worst-case two-qubit fidelity, readout fidelity, <InlineMath math="T_1" /> and <InlineMath math="T_2" />, connectivity, gate time, and how often calibration is repeated. A single headline number, such as qubit count, says little about what a device can actually run.
      </p>

      <TryIt heading="37.6 - Try It: Build an Error Budget">
        <p>
          A circuit needs 200 two-qubit gates. What two-qubit fidelity gives an overall success probability of at least 50%? (Solve <InlineMath math="F^{200} \ge 0.5" />, so <InlineMath math="F \ge 0.5^{1/200}" />.) Then compare two devices: one with 99.9% fidelity and 1 µs gates, another with 99.5% fidelity and 100 ns gates. Which runs this circuit more reliably, and does the answer change if <InlineMath math="T_2" /> is 100 µs for both?
        </p>
      </TryIt>
    </>
  );
}
