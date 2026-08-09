'use client';
import { InlineMath } from '@/components/math';
import { NotationBox } from '@/components/lesson';

export default function Lesson39Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="A platform is more than a qubit">
          <NotationBox.Text>
            A quantum hardware platform includes the physical qubit, control signals, couplers or interactions, readout, calibration routines, and the environment that must be managed.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="The comparison questions">
          <NotationBox.List items={[
            { term: 'Coherence', description: 'How long useful quantum relationships survive.' },
            { term: 'Fidelity', description: 'How closely an operation or readout matches its intended behavior.' },
            { term: 'Connectivity', description: 'Which physical qubits can interact directly.' },
            { term: 'Control', description: 'How operations and measurements are driven and calibrated.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>37.1 - Superconducting circuits</h2>
      <p>
        Superconducting qubits are electrical circuits operated at very low temperatures. Microwave pulses control transitions between engineered energy levels, and nearby circuits can interact through designed couplers.
      </p>
      <p>
        They can support fast gates and lithographic fabrication, while facing challenges in coherence, calibration, wiring, crosstalk, and cryogenic scale-up.
      </p>

      <h2>37.2 - Trapped ions and neutral atoms</h2>
      <p>
        Trapped-ion systems use internal states of ions held by electromagnetic fields. They offer long coherence and high-fidelity operations, but gates and transport can be slower and systems must control a precise optical and trapping environment.
      </p>
      <p>
        Neutral-atom platforms use laser-cooled atoms and optical traps. Their layouts can be reconfigured, while laser control, atom loss, and interaction fidelity remain important engineering concerns.
      </p>

      <h2>37.3 - Photons and other approaches</h2>
      <p>
        Photonic systems encode information in properties such as polarization, path, or time bin. Photons are useful for communication and can operate without cryogenic storage in some architectures, but deterministic interactions and loss management are difficult.
      </p>
      <p>
        Semiconductor spins, color centers, and other approaches explore different tradeoffs. There is no single platform that wins every metric; the useful comparison depends on the application and system architecture.
      </p>

      <h2>37.4 - Connect the hardware to the circuit</h2>
      <p>
        An abstract circuit says that a gate should occur on logical qubits. Hardware must decide where those logical qubits live, how the gate is synthesized, how signals are scheduled, and how the result is read. That translation is the subject of the next lesson.
      </p>
      <p>
        The ideal simulator in this course applies exact matrices. It is useful for learning state evolution, but it does not predict the performance of a particular hardware platform.
      </p>
      <p className="text-sm text-foreground/60">
        A practical engineering comparison should report the whole stack: gate and readout fidelity, coherence, connectivity, calibration burden, throughput, and error-correction path, rather than one headline number.
      </p>
    </>
  );
}
