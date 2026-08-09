'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson40Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="The compiler's job">
          <NotationBox.Text>
            A quantum compiler transforms an algorithm-level circuit into instructions that a particular device can execute while preserving the intended operation as closely as possible.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Typical stages">
          <NotationBox.List items={[
            { term: 'Decompose', description: 'Rewrite high-level operations using a supported gate basis.' },
            { term: 'Route', description: 'Move logical qubits when the hardware cannot connect every pair directly.' },
            { term: 'Schedule', description: 'Place operations in time while respecting conflicts and calibration constraints.' },
            { term: 'Optimize', description: 'Reduce depth, gate count, and accumulated error without changing the intended circuit.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>38.1 - Abstract and native gates</h2>
      <p>
        An algorithm may ask for a controlled operation or a rotation that is not a native pulse on the target device. The compiler decomposes it into gates the device supports.
      </p>
      <BlockMath math="U_{\mathrm{target}}\approx G_mG_{m-1}\cdots G_1" />
      <p>
        The approximation error, circuit depth, and number of entangling gates all matter. Two mathematically equivalent circuits can have very different hardware costs.
      </p>

      <h2>38.2 - Connectivity and routing</h2>
      <p>
        Logical qubits are names in the algorithm. Physical qubits are locations on a chip, ion chain, atom array, or photonic network. If two logical qubits need a two-qubit gate but their physical locations cannot interact, the compiler may insert SWAP operations or choose a different mapping.
      </p>
      <p>
        Routing is not free: extra two-qubit gates increase depth and create more opportunities for error. A good initial layout can be as important as a good local gate rewrite.
      </p>

      <h2>38.3 - Optimization is hardware-aware</h2>
      <p>
        A compiler can cancel inverse gates, merge rotations, parallelize independent operations, choose better qubit placements, and prefer calibrated native instructions. It must preserve qubit order, control direction, measurement meaning, and any classical dependencies.
      </p>
      <p>
        Hardware-aware compilation uses calibration data, but calibration changes over time. Compilation is therefore part of the execution workflow, not a one-time formatting step.
      </p>

      <TryIt heading="38.4 - Try It: Compare equivalent circuits">
        <p>
          Build a short circuit with H, CNOT, and a second H. Then remove a pair of adjacent self-inverse gates or change the placement of the two-qubit operation. Compare the state vector and circuit depth while checking that the intended operation remains clear.
        </p>
        <p>
          The current playground does not implement a full transpiler. This activity gives you the right mental model: every abstract circuit eventually becomes a scheduled, device-specific program with measurable cost.
        </p>
      </TryIt>
    </>
  );
}
