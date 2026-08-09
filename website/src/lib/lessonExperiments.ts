import type { DemoOp } from './lessons';

export type ExperimentMode = 'circuit' | 'conceptual';

export type ExperimentStep = {
  label: string;
  detail: string;
};

export type LessonExperiment = {
  mode: ExperimentMode;
  title: string;
  purpose: string;
  numQubits?: number;
  ops?: DemoOp[];
  steps: ExperimentStep[];
  observe: string;
  boundary: string;
};

const circuit = (experiment: Omit<LessonExperiment, 'mode'>): LessonExperiment => ({ ...experiment, mode: 'circuit' });
const conceptual = (experiment: Omit<LessonExperiment, 'mode'>): LessonExperiment => ({ ...experiment, mode: 'conceptual' });

export const LESSON_EXPERIMENTS: Record<number, LessonExperiment> = {
  1: circuit({
    title: 'Prepare a state and inspect its amplitudes',
    purpose: 'See the difference between a basis state, a balanced state, and the phase information hidden inside the amplitudes.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Start from |0>', detail: 'The empty circuit represents the computational-basis state |0> with probability 1.' },
      { label: 'Add H', detail: 'Hadamard creates equal amplitudes for |0> and |1>.' },
      { label: 'Compare the views', detail: 'Check the probability bar, state vector, and Bloch sphere together. Probabilities do not show every detail of the state.' },
    ],
    observe: 'The probabilities become 50/50 and the Bloch vector moves to the equator. Add Z after H to change relative phase without changing those computational-basis probabilities.',
    boundary: 'The simulator shows exact state-vector amplitudes and ideal probabilities. It does not model a physical qubit or finite-shot readout.',
  }),
  2: circuit({
    title: 'Create and undo a superposition',
    purpose: 'Distinguish a coherent superposition from a classical random bit by watching a gate sequence and its inverse.',
    numQubits: 1,
    ops: [{ gateId: 'X', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Apply X', detail: 'Flip |0> to |1> so the input to H is explicit.' },
      { label: 'Apply H', detail: 'H maps |1> to |->, which has balanced probabilities but opposite relative phase from |+>.' },
      { label: 'Test the phase', detail: 'Add another H. The state returns to |1>, showing that the phase was structured and reversible.' },
    ],
    observe: 'X then H and H alone both show balanced probabilities, but a later H separates their relative phases.',
    boundary: 'The simulator makes coherence visible through ideal unitary evolution; it does not represent classical uncertainty as a separate density-matrix object.',
  }),
  3: circuit({
    title: 'Prepare a state, then read its distribution',
    purpose: 'Connect a pre-measurement state to the computational-basis probabilities that a real device would estimate from repeated shots.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Prepare H|0>', detail: 'Create a balanced state before readout.' },
      { label: 'Read the probability bars', detail: 'Treat the displayed values as ideal Born probabilities, not as one measured shot.' },
      { label: 'Repeat conceptually', detail: 'A hardware run samples 0 or 1 on each shot; many shots approach the ideal distribution.' },
    ],
    observe: 'The simulator shows 0.5 for each outcome. A finite hardware experiment would fluctuate around those values.',
    boundary: 'There is no stochastic measurement action in this builder. It displays exact probabilities rather than generating a shot histogram.',
  }),
  4: circuit({
    title: 'Build and inspect a Bell pair',
    purpose: 'Create a two-qubit state that cannot be described as two independent single-qubit states.',
    numQubits: 2,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 }],
    steps: [
      { label: 'Create a control superposition', detail: 'H on q0 creates |0> and |1> branches with coherent amplitudes.' },
      { label: 'Entangle with CNOT', detail: 'The target q1 flips only on the q0=1 branch, producing (|00>+|11>)/sqrt(2).' },
      { label: 'Inspect joint outcomes', detail: 'The joint distribution has support on 00 and 11, not on 01 and 10.' },
    ],
    observe: 'The two qubits are individually balanced, but their joint outcomes are correlated. The multi-qubit Bloch view is only a reduced single-qubit view, not a complete entanglement diagnostic.',
    boundary: 'The simulator calculates the ideal joint state. It does not model separated hardware, locality tests, or finite-shot correlations.',
  }),
  5: circuit({
    title: 'Make phase become a measurement outcome',
    purpose: 'Use a basis change to turn an invisible relative phase into a deterministic computational-basis result.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'Z', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Create |+>', detail: 'The first H creates two equal amplitude paths.' },
      { label: 'Apply Z', detail: 'Z changes the sign of the |1> amplitude without changing its magnitude.' },
      { label: 'Mix with H', detail: 'The second H recombines the paths, causing cancellation for |0> and reinforcement for |1>.' },
    ],
    observe: 'The final ideal probability is 1 for |1>. Remove Z and the two H gates undo each other, returning to |0>.',
    boundary: 'This is coherent interference, not a noisy interferometer or a hardware measurement trace.',
  }),
  6: circuit({
    title: 'Verify a gate and its inverse',
    purpose: 'Test reversibility directly instead of treating a gate as an irreversible classical instruction.',
    numQubits: 1,
    ops: [{ gateId: 'X', targetQubit: 0 }, { gateId: 'X', targetQubit: 0 }],
    steps: [
      { label: 'Apply X once', detail: 'The state changes from |0> to |1>.' },
      { label: 'Apply X again', detail: 'The second X reverses the first operation.' },
      { label: 'Check normalization', detail: 'The state vector remains normalized throughout the ideal evolution.' },
    ],
    observe: 'The final state returns to |0>. Try H twice or S followed by its inverse is unavailable in this palette, so use H twice to test another self-inverse gate.',
    boundary: 'Real hardware gates are noisy approximations to unitaries; this simulator applies exact matrices.',
  }),
  7: circuit({
    title: 'Move around the Bloch sphere',
    purpose: 'Connect a gate sequence to geometric motion and distinguish population from phase.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'S', targetQubit: 0 }],
    steps: [
      { label: 'Apply H', detail: 'Move |0> to the equator, where the computational-basis probabilities are balanced.' },
      { label: 'Apply S', detail: 'Rotate phase around the Z axis while preserving the latitude.' },
      { label: 'Compare coordinates', detail: 'Use the sphere and state vector together; the probability bars alone miss the phase rotation.' },
    ],
    observe: 'S changes the azimuthal direction of the equatorial state while leaving the 50/50 computational-basis distribution unchanged.',
    boundary: 'The Bloch sphere is exact for a single-qubit pure state, but it does not visualize the full state of an entangled register.',
  }),
  8: circuit({
    title: 'Build a two-qubit product state',
    purpose: 'See the state-space dimension grow before introducing entanglement.',
    numQubits: 2,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'H', targetQubit: 1 }],
    steps: [
      { label: 'Prepare q0', detail: 'H creates a local superposition on the first qubit.' },
      { label: 'Prepare q1', detail: 'A separate H creates an independent local superposition.' },
      { label: 'Inspect the register', detail: 'The four basis states appear, but the state is still a tensor product rather than an entangled state.' },
    ],
    observe: 'All four two-bit outcomes have equal ideal probability. Compare this with the Bell preset: both use two qubits, but their joint structure differs.',
    boundary: 'The per-qubit Bloch spheres show reduced states and cannot by themselves prove separability or entanglement.',
  }),
  9: circuit({
    title: 'Read a circuit as a sequence of operations',
    purpose: 'Practice translating a circuit diagram into state evolution and a final joint distribution.',
    numQubits: 2,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 }],
    steps: [
      { label: 'Read left to right', detail: 'Treat each gate as an operation applied after all gates before it.' },
      { label: 'Track the control', detail: 'CNOT acts on q1 only when q0 is in the |1> component.' },
      { label: 'Predict before checking', detail: 'Write the expected state and compare it with the state vector after running the circuit.' },
    ],
    observe: 'The circuit prepares a Bell state. The diagram, state vector, and probability bars are three views of the same ideal computation.',
    boundary: 'The builder uses q0 as the most-significant qubit; always check register ordering when comparing with external SDK output.',
  }),
  10: circuit({
    title: 'Observe phase kickback',
    purpose: 'Show how a controlled operation can write phase information onto a control qubit when the target is an eigenstate.',
    numQubits: 2,
    ops: [
      { gateId: 'X', targetQubit: 1 },
      { gateId: 'H', targetQubit: 1 },
      { gateId: 'H', targetQubit: 0 },
      { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 },
      { gateId: 'H', targetQubit: 0 },
    ],
    steps: [
      { label: 'Prepare |-> on q1', detail: 'X then H turns the target into an eigenstate of X with eigenvalue -1.' },
      { label: 'Prepare the control', detail: 'H puts q0 into a coherent control superposition.' },
      { label: 'Apply CNOT', detail: 'The target basis label returns unchanged, but its eigenvalue contributes a phase to the control branch.' },
      { label: 'Decode with H', detail: 'The final H converts the kicked-back phase into a computational-basis probability.' },
    ],
    observe: 'The control qubit ends in |1> ideally. The target did not need to visibly flip for phase information to affect the control.',
    boundary: 'This is the exact two-qubit unitary mechanism; a hardware implementation would also require calibrated controlled gates and sampled readout.',
  }),
  11: circuit({
    title: 'Contrast a phase error with decoherence',
    purpose: 'Use a deterministic phase flip to understand what a real dephasing channel would destroy statistically.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'Z', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Create coherence', detail: 'H prepares a superposition with nonzero off-diagonal density-matrix terms.' },
      { label: 'Apply Z', detail: 'Z changes the relative phase coherently and reversibly.' },
      { label: 'Reveal the phase', detail: 'The final H maps that phase change to a different basis outcome.' },
    ],
    observe: 'The result changes deterministically. True decoherence would reduce coherence across an ensemble and cannot be represented by one fixed Z gate.',
    boundary: 'This builder has no environment, density-matrix channel, or time-dependent decoherence model. The circuit is a controlled comparison, not a decoherence simulation.',
  }),
  12: circuit({
    title: 'Separate a deterministic error from a noise channel',
    purpose: 'Identify the visible effect of X or Z while keeping clear that a channel applies errors probabilistically across runs.',
    numQubits: 1,
    ops: [{ gateId: 'X', targetQubit: 0 }],
    steps: [
      { label: 'Set a known input', detail: 'The empty circuit starts in |0>, so an X error is easy to interpret.' },
      { label: 'Apply X', detail: 'This is one deterministic realization of a bit-flip error.' },
      { label: 'Compare phase errors', detail: 'Replace X with H -> Z -> H to reveal how a phase flip affects interference instead of basis population.' },
    ],
    observe: 'X changes |0> to |1>. A Z acting on |0> alone is invisible in computational-basis probabilities, but becomes visible after a basis-changing H.',
    boundary: 'A real noise model mixes ideal and errored states with probabilities. This ideal builder shows individual unitary error realizations only.',
  }),
  13: circuit({
    title: 'Distinguish a constant and balanced oracle',
    purpose: 'Run the two-qubit Deutsch-Jozsa pattern and change only the oracle to see interference classify the promise case.',
    numQubits: 2,
    ops: [
      { gateId: 'X', targetQubit: 1 },
      { gateId: 'H', targetQubit: 0 },
      { gateId: 'H', targetQubit: 1 },
      { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 },
      { gateId: 'H', targetQubit: 0 },
    ],
    steps: [
      { label: 'Prepare the ancilla', detail: 'X then H puts q1 in |-> for phase kickback.' },
      { label: 'Prepare the input', detail: 'H on q0 creates the query superposition.' },
      { label: 'Query the oracle', detail: 'CNOT implements the balanced one-bit function f(x)=x.' },
      { label: 'Decode', detail: 'H on q0 converts the oracle phase pattern into the answer bit.' },
    ],
    observe: 'The balanced oracle ideally produces q0=1. Remove CNOT for the constant-zero oracle and q0 returns to 0.',
    boundary: 'This is the complete two-qubit demonstration for one promised balanced function, not the full n-bit algorithm or an arbitrary oracle compiler.',
  }),
  14: circuit({
    title: "See Simon's interference pattern",
    purpose: 'Use the smallest toy circuit to see how a hidden correlation can become a constraint after a final Hadamard.',
    numQubits: 2,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Create the query branches', detail: 'H on q0 creates two input branches.' },
      { label: 'Apply a toy oracle', detail: 'CNOT correlates q1 with q0, standing in for a simple hidden-XOR relationship.' },
      { label: 'Interfere the input', detail: 'The final H converts the correlation into a basis pattern on q0.' },
    ],
    observe: 'The circuit demonstrates the mechanism, but it does not reveal a multi-bit secret by itself. Full Simon requires repeated samples and linear algebra over bits.',
    boundary: 'The simulator does not implement arbitrary Simon oracles, repeated-shot collection, or the classical null-space solve.',
  }),
  15: circuit({
    title: "Isolate the period-finding mechanism behind Shor's algorithm",
    purpose: 'Trace a small interference scaffold while keeping separate the parts that require modular arithmetic and a QFT.',
    numQubits: 2,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Create a query superposition', detail: 'H on q0 represents candidate exponents in a tiny toy register.' },
      { label: 'Add a periodic correlation', detail: 'CNOT supplies a simple repeating relationship between the two wires.' },
      { label: 'Apply the final basis change', detail: 'The last H is a one-bit analogue of the inverse-QFT readout step.' },
    ],
    observe: 'A small probability pattern can illustrate interference, but it does not factor an integer or implement modular exponentiation.',
    boundary: 'The current engine cannot model Shor’s modular arithmetic, larger registers, inverse QFT, or classical continued fractions.',
  }),
  16: conceptual({
    title: 'Trace a repetition-code syndrome on paper',
    purpose: 'Understand the encode, error, syndrome, and correction stages without pretending one qubit can implement error correction.',
    steps: [
      { label: 'Encode', detail: 'Map logical |0> to |000> and logical |1> to |111> in the three-qubit bit-flip repetition code.' },
      { label: 'Inject one error', detail: 'Flip one physical qubit, for example |000> to |010>.' },
      { label: 'Read the syndrome', detail: 'Parity checks identify which physical position disagrees with the other two.' },
      { label: 'Correct', detail: 'Apply X to the identified qubit without measuring the logical value directly.' },
    ],
    observe: 'The useful experiment is a syndrome table: error location maps to a distinct parity pattern.',
    boundary: 'The current simulator has no measurement, ancilla syndrome extraction, or conditional correction, so this lesson is intentionally conceptual rather than a fake circuit.',
  }),
  17: circuit({
    title: 'Trace the teleportation circuit skeleton',
    purpose: 'Separate the unitary preparation and Bell-basis steps from the measurement and classical feed-forward that complete teleportation.',
    numQubits: 3,
    ops: [
      { gateId: 'H', targetQubit: 1 },
      { gateId: 'CNOT', targetQubit: 2, controlQubit: 1 },
      { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 },
      { gateId: 'H', targetQubit: 0 },
    ],
    steps: [
      { label: 'Prepare the Bell pair', detail: 'H on q1 followed by CNOT q1 -> q2 entangles Alice’s pair qubit with Bob’s qubit.' },
      { label: 'Couple the input', detail: 'CNOT q0 -> q1 combines the unknown input with Alice’s half of the pair.' },
      { label: 'Change Alice’s basis', detail: 'H on q0 completes the Bell-basis unitary before measurement.' },
      { label: 'Name the missing steps', detail: 'In the real protocol, measure q0 and q1, send two classical bits, then apply conditional X and Z on q2.' },
    ],
    observe: 'The circuit shows the unitary skeleton, not state transfer. The missing classical branch is the essential part that the current simulator cannot execute.',
    boundary: 'No measurement register or classically controlled gate exists in this builder, so do not interpret q2 as already teleported.',
  }),
  18: conceptual({
    title: 'Compare pure and mixed density matrices',
    purpose: 'Practice the density-matrix distinction directly instead of inferring mixedness from an ideal state-vector display.',
    steps: [
      { label: 'Write the pure case', detail: 'For |0>, rho_pure = |0><0| has one diagonal entry equal to 1 and preserves the preparation certainty.' },
      { label: 'Write the mixture', detail: 'An equal classical mixture has rho_mix = 1/2 |0><0| + 1/2 |1><1|.' },
      { label: 'Compare coherence', detail: 'The mixture has no off-diagonal coherence, while a superposition density matrix can have nonzero off-diagonal terms.' },
    ],
    observe: 'Two preparations can share the same computational-basis probabilities while differing in phase coherence and purity.',
    boundary: 'The current engine stores a pure state vector and does not evolve density matrices or partial traces.',
  }),
  19: conceptual({
    title: 'Separate a circuit demo from a complexity claim',
    purpose: 'Use a tiny circuit only to inspect state evolution, then evaluate algorithmic claims using asymptotic resources.',
    steps: [
      { label: 'Run a small circuit', detail: 'Use H -> X -> H to verify a concrete unitary transformation.' },
      { label: 'List resources', detail: 'For a real algorithm, record qubits, gate count, depth, oracle calls, samples, and classical post-processing.' },
      { label: 'Avoid overclaiming', detail: 'A visually interesting two-qubit output is not evidence of a complexity-theoretic speedup.' },
    ],
    observe: 'The right output for this lesson is a resource table and a careful claim, not a single probability bar.',
    boundary: 'The simulator can demonstrate a circuit instance but cannot establish BQP, QMA, asymptotic scaling, or quantum advantage.',
  }),
  20: circuit({
    title: 'Inspect one variational trial state',
    purpose: 'See the quantum part of a hybrid loop while making clear that parameter updates and energy estimation are separate layers.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'S', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Prepare a trial state', detail: 'Use H and S as a fixed ansatz snapshot; the current palette does not expose a continuous parameter slider.' },
      { label: 'Inspect the state', detail: 'Read the amplitudes and probabilities that a cost function would consume.' },
      { label: 'Imagine the update', detail: 'A classical optimizer would choose new angles and rerun the circuit; it is not happening automatically here.' },
    ],
    observe: 'The circuit is one point on a variational landscape, not the landscape or optimizer itself.',
    boundary: 'There is no Hamiltonian expectation-value estimator, shot noise, gradient, or optimizer in the current builder.',
  }),
  21: conceptual({
    title: 'Reason about a change of basis',
    purpose: 'Understand what the QFT should reveal before learning its controlled-rotation decomposition.',
    steps: [
      { label: 'Choose a structured state', detail: 'Start with a state whose amplitudes contain a repeating phase or periodic pattern.' },
      { label: 'Change basis', detail: 'The QFT redistributes amplitudes according to phase relationships; it does not inspect a classical list element by element.' },
      { label: 'Predict concentration', detail: 'Ask which frequency labels should reinforce after the transform.' },
    ],
    observe: 'The experiment is a basis-change prediction exercise until controlled phase rotations are available in the simulator.',
    boundary: 'The current gate engine has no QFT primitive or arbitrary controlled-phase-angle gate, so a simple H/S circuit would be misleading.',
  }),
  22: conceptual({
    title: 'Separate the phase-estimation registers',
    purpose: 'Trace the role of the eigenstate and counting registers without claiming that a single H or S gate estimates a phase.',
    steps: [
      { label: 'Prepare an eigenstate', detail: 'The target register must be an eigenstate of U, or the output becomes a mixture of phase components.' },
      { label: 'Accumulate controlled powers', detail: 'Controlled U, U^2, U^4, and so on write phase information into the counting register.' },
      { label: 'Decode with inverse QFT', detail: 'The inverse QFT converts the accumulated phase pattern into a binary estimate.' },
    ],
    observe: 'A correct experiment must show both registers, controlled powers, and an inverse-QFT decoding stage.',
    boundary: 'The current builder cannot represent arbitrary controlled-U powers or inverse QFT, so this lesson remains a guided design exercise.',
  }),
  23: circuit({
    title: 'Use RZ-like phase evolution as a toy Hamiltonian step',
    purpose: 'Connect a simple gate-level phase evolution to the larger task of approximating exp(-iHt).',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'S', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Prepare a phase-sensitive state', detail: 'H creates amplitudes in both computational-basis states.' },
      { label: 'Apply a fixed phase step', detail: 'S is a fixed Z-axis rotation and serves as a small, exact evolution step for a simple Hamiltonian term.' },
      { label: 'Read the effect', detail: 'The final H converts phase into a population difference so the evolution becomes visible.' },
    ],
    observe: 'The sequence demonstrates one simple Hamiltonian term, not a general many-body simulation.',
    boundary: 'There is no Hamiltonian input, Trotter-step parameter, approximation error estimate, or hardware noise model in this builder.',
  }),
  24: circuit({
    title: 'Build a small universal-set circuit',
    purpose: 'Identify the distinct roles of basis change, non-Clifford phase, and entanglement in a compact gate vocabulary.',
    numQubits: 2,
    ops: [
      { gateId: 'H', targetQubit: 0 },
      { gateId: 'T', targetQubit: 0 },
      { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 },
    ],
    steps: [
      { label: 'Change basis', detail: 'H creates a non-computational-basis state.' },
      { label: 'Add a non-Clifford phase', detail: 'T changes relative phase by pi/4 and adds expressive power beyond Clifford-only circuits.' },
      { label: 'Entangle', detail: 'CNOT couples the two qubits; without an entangling gate, local gate products cannot create entanglement.' },
    ],
    observe: 'The circuit is a role-based demonstration, not a proof that this short sequence approximates an arbitrary unitary.',
    boundary: 'Universality is an approximation and compilation property. A small circuit cannot demonstrate arbitrary accuracy or resource efficiency.',
  }),
  25: circuit({
    title: 'Compare measurement bases',
    purpose: 'Show that the same state can produce different distributions when the measurement basis changes.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Prepare |+>', detail: 'The first H prepares a state that is balanced in the computational basis.' },
      { label: 'Measure in the computational basis', detail: 'Without another basis change, ideal probabilities are 50/50.' },
      { label: 'Rotate before readout', detail: 'The second H changes the measurement basis and returns the state to |0>.' },
    ],
    observe: 'Measurement is basis-relative: the second H is not “undoing a collapse”; it changes which observable is read before the final measurement.',
    boundary: 'The builder displays ideal pre-measurement probabilities and does not model the post-measurement state of an individual shot.',
  }),
  26: conceptual({
    title: 'Predict QFT interference',
    purpose: 'Practice identifying phase alignment before implementing a full QFT circuit.',
    steps: [
      { label: 'Mark a periodic pattern', detail: 'Write the phase of each basis component in a small register.' },
      { label: 'Apply the transform conceptually', detail: 'Track which frequency labels receive aligned phase contributions.' },
      { label: 'Explain cancellation', detail: 'Unaligned phases cancel when amplitudes are added, reducing those measurement probabilities.' },
    ],
    observe: 'A useful result is a predicted peak pattern with a reason for each peak, not merely a plotted output.',
    boundary: 'The current gate set lacks arbitrary controlled phase rotations, so this page does not pretend that H/S/CNOT is a QFT implementation.',
  }),
  27: conceptual({
    title: 'Decompose a two-qubit QFT on paper',
    purpose: 'Trace the actual QFT ingredients and distinguish a controlled phase rotation from a plain single-qubit phase.',
    steps: [
      { label: 'Apply the first H', detail: 'Create the first qubit’s local superposition.' },
      { label: 'Apply a controlled R2', detail: 'Use the other qubit to condition a pi/2 phase rotation; the condition carries relational phase information.' },
      { label: 'Apply the second H', detail: 'Complete the local basis transformation.' },
      { label: 'Swap register order', detail: 'Reverse the output significance because the decomposition naturally produces reversed bit order.' },
    ],
    observe: 'The controlled-angle gate is the important missing ingredient in a plain H/S/CNOT palette.',
    boundary: 'Until controlled phase-angle operations are implemented, the accurate playground activity is circuit tracing rather than a fake QFT circuit.',
  }),
  28: conceptual({
    title: 'Count the cost of phase precision',
    purpose: 'Connect extra counting qubits with more controlled powers and a larger inverse-QFT circuit.',
    steps: [
      { label: 'Choose precision', detail: 'Decide how many binary phase digits the counting register should resolve.' },
      { label: 'Add controlled powers', detail: 'Each additional counting qubit requires another controlled power of U.' },
      { label: 'Decode', detail: 'The inverse QFT converts the phase pattern into the estimated binary fraction.' },
    ],
    observe: 'Precision is not free: qubits, controlled-unitary depth, and sensitivity to noise all increase.',
    boundary: 'The current builder has neither parameterized controlled-U powers nor inverse-QFT operations, so it cannot produce a trustworthy phase estimate.',
  }),
  29: conceptual({
    title: 'Separate Trotter error from hardware error',
    purpose: 'Reason about why increasing the number of product-formula steps can reduce one error source while increasing another.',
    steps: [
      { label: 'Choose a Hamiltonian split', detail: 'Write H as a sum of terms that can be implemented separately.' },
      { label: 'Choose a step count', detail: 'Approximate exp(-iHt) with repeated short evolutions under those terms.' },
      { label: 'Compare error sources', detail: 'More steps usually reduce formula error but add gates, depth, and opportunities for hardware noise.' },
    ],
    observe: 'The best circuit is a tradeoff between approximation accuracy and physical execution cost.',
    boundary: 'The ideal builder cannot inject hardware noise or calculate a Hamiltonian-fidelity error curve.',
  }),
  30: circuit({
    title: 'Inspect one VQE ansatz point',
    purpose: 'Make the separation between trial-state preparation and classical optimization concrete.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'S', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Prepare an ansatz point', detail: 'This fixed sequence represents one parameter choice, not a full parameterized circuit.' },
      { label: 'Measure observables', detail: 'A real VQE estimates Hamiltonian terms from repeated shots and combines them into an energy.' },
      { label: 'Update classically', detail: 'An optimizer proposes new parameters and the circuit is run again.' },
    ],
    observe: 'The simulator shows the quantum trial state only. The optimizer and energy calculation remain explicit external steps.',
    boundary: 'No chemistry Hamiltonian, shot noise, parameter slider, gradient, or optimizer is hidden behind this circuit.',
  }),
  31: conceptual({
    title: 'Separate QAOA cost and mixer layers',
    purpose: 'Understand which layer encodes the problem and which layer moves amplitude between candidate solutions.',
    steps: [
      { label: 'Prepare a search space', detail: 'H gates create a superposition of candidate bit strings.' },
      { label: 'Apply the cost unitary', detail: 'Problem-dependent phases mark the quality of each candidate.' },
      { label: 'Apply the mixer', detail: 'Mixer evolution changes amplitudes so candidates can be explored rather than only phase-marked.' },
      { label: 'Measure and optimize', detail: 'A classical loop updates gamma and beta from sampled objective values.' },
    ],
    observe: 'A genuine QAOA example needs a graph-derived cost Hamiltonian, parameterized phase gates, and repeated optimization.',
    boundary: 'The current builder has no parameterized ZZ cost phase or optimizer, so a fixed H/CNOT sketch would not be a robust QAOA example.',
  }),
  32: conceptual({
    title: 'Trace an annealing schedule',
    purpose: 'Understand the time-dependent Hamiltonian path rather than confusing annealing with a short gate sequence.',
    steps: [
      { label: 'Choose H0', detail: 'Start with an easy Hamiltonian whose low-energy state can be prepared.' },
      { label: 'Choose HP', detail: 'Encode the optimization problem in the final problem Hamiltonian.' },
      { label: 'Interpolate slowly', detail: 'Move from H0 to HP while monitoring the minimum spectral gap.' },
      { label: 'Check the assumption', detail: 'Noise, a small gap, or a schedule that changes too quickly can cause excitation.' },
    ],
    observe: 'The central object is H(s) over time, not a probability bar from a fixed ideal circuit.',
    boundary: 'The gate simulator does not model continuous-time Hamiltonian dynamics or annealing hardware.',
  }),
  33: conceptual({
    title: 'Reason about adiabatic runtime',
    purpose: 'Connect the minimum spectral gap to the need for slow evolution near avoided crossings.',
    steps: [
      { label: 'Plot the spectrum conceptually', detail: 'Identify where the ground and first-excited energies approach one another.' },
      { label: 'Find the minimum gap', detail: 'The smallest separation is the most demanding part of the schedule.' },
      { label: 'Slow the schedule there', detail: 'The adiabatic condition becomes strictest near the minimum gap.' },
    ],
    observe: 'A schedule can fail even if its endpoints are correct when it moves too quickly through a small-gap region.',
    boundary: 'The current simulator has no Hamiltonian spectrum, continuous schedule, or adiabatic evolution solver.',
  }),
  34: circuit({
    title: 'Track the control phase',
    purpose: 'Revisit phase kickback with explicit register roles and an eigenstate target.',
    numQubits: 2,
    ops: [
      { gateId: 'X', targetQubit: 1 },
      { gateId: 'H', targetQubit: 1 },
      { gateId: 'H', targetQubit: 0 },
      { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 },
      { gateId: 'H', targetQubit: 0 },
    ],
    steps: [
      { label: 'Prepare the target eigenstate', detail: 'X then H prepares |->, an eigenstate of X.' },
      { label: 'Create control branches', detail: 'H on q0 creates the control superposition.' },
      { label: 'Kick back the eigenphase', detail: 'CNOT applies the target eigenvalue as a relative phase on the control branch.' },
      { label: 'Decode', detail: 'The final H makes the control phase visible in the computational basis.' },
    ],
    observe: 'The control output changes even though the target’s role is to carry an eigenvalue, not a classical answer.',
    boundary: 'This is a unitary subroutine. Full phase estimation still needs controlled powers and an inverse QFT.',
  }),
  35: circuit({
    title: 'Shape a probability distribution with phase',
    purpose: 'Integrate amplitude, relative phase, and basis changes in one controlled interference experiment.',
    numQubits: 1,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'Z', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
    steps: [
      { label: 'Create two paths', detail: 'H creates equal amplitude contributions from |0> and |1>.' },
      { label: 'Change relative phase', detail: 'Z negates one contribution without changing its magnitude.' },
      { label: 'Recombine', detail: 'The second H adds the amplitudes in a new basis.' },
      { label: 'Compare a control', detail: 'Remove Z and rerun to see how the phase change reverses the final probability bias.' },
    ],
    observe: 'The final distribution changes because amplitudes, not probabilities alone, are transformed by the circuit.',
    boundary: 'This is a one-qubit interference demonstration, not evidence that every algorithm achieves a speedup.',
  }),
  36: circuit({
    title: 'Test why CNOT does not clone a superposition',
    purpose: 'Compare a classical basis-state copy with the entangled result produced when the control is in a superposition.',
    numQubits: 2,
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 }],
    steps: [
      { label: 'Prepare |+> on q0', detail: 'Apply H to create a superposition before the attempted copy.' },
      { label: 'Apply CNOT', detail: 'Use q0 as the control and q1 as the target.' },
      { label: 'Compare states', detail: 'The result is a Bell state, not |+>|+>; the two qubits are correlated instead of independent copies.' },
    ],
    observe: 'CNOT copies computational-basis information in a restricted sense, but it does not universally copy an unknown superposition.',
    boundary: 'This circuit illustrates the theorem; it is not a test of every possible copying operation or a formal proof by itself.',
  }),
  37: conceptual({
    title: 'Trace Grover amplification on paper',
    purpose: 'Track the marked and unmarked amplitude components through an oracle and diffusion iteration.',
    steps: [
      { label: 'Initialize', detail: 'Write equal amplitudes for N candidates.' },
      { label: 'Mark', detail: 'Change the sign of the marked amplitude with a phase oracle.' },
      { label: 'Diffuse', detail: 'Reflect all amplitudes around their average.' },
      { label: 'Count iterations', detail: 'Stop near pi sqrt(N)/4 for one marked item rather than iterating indefinitely.' },
    ],
    observe: 'The marked amplitude grows through a rotation in a two-dimensional subspace; the full circuit requires a general oracle and diffusion operator.',
    boundary: 'The current engine has no general multi-qubit phase oracle, diffusion primitive, or shot-based search loop.',
  }),
  38: conceptual({
    title: 'Simulate the logic of BB84 with a basis table',
    purpose: 'Separate matching-basis agreement from wrong-basis randomness and eavesdropper-induced disturbance.',
    steps: [
      { label: 'Choose Alice\'s bit and basis', detail: 'Record whether each signal uses Z or X.' },
      { label: 'Choose Bob\'s basis', detail: 'When the bases match, record the ideal matching result; otherwise mark the result as random.' },
      { label: 'Add an interceptor', detail: 'Have Eve measure and resend in a random basis, then calculate the error rate on the kept sample.' },
    ],
    observe: 'The protocol detects a statistical disturbance; one circuit execution cannot establish cryptographic security.',
    boundary: 'The simulator lacks shot sampling, classical protocol messages, authentication, privacy amplification, and device-level security models.',
  }),
  39: conceptual({
    title: 'Build a hardware tradeoff table',
    purpose: 'Compare platforms using the engineering metrics that determine whether an abstract circuit can run reliably.',
    steps: [
      { label: 'Choose platforms', detail: 'Compare superconducting circuits, trapped ions, neutral atoms, and photons.' },
      { label: 'Record metrics', detail: 'List coherence, gate speed, connectivity, readout, scaling, and control requirements.' },
      { label: 'State the tradeoff', detail: 'Explain why no single metric is enough to rank every platform.' },
    ],
    observe: 'The useful output is a reasoned comparison tied to an application, not a single universal hardware winner.',
    boundary: 'This is a conceptual hardware survey; the ideal state-vector engine does not model physical platform behavior.',
  }),
  40: conceptual({
    title: 'Translate an abstract circuit into hardware constraints',
    purpose: 'Practice identifying decomposition, routing, scheduling, and optimization decisions made by a quantum compiler.',
    steps: [
      { label: 'Write the abstract circuit', detail: 'List logical qubits and the gates the algorithm requests.' },
      { label: 'Choose native gates', detail: 'Replace unsupported operations with a device gate basis.' },
      { label: 'Route interactions', detail: 'Insert movement or remap logical qubits when connectivity is limited.' },
      { label: 'Measure cost', detail: 'Compare gate count, two-qubit count, depth, and approximation error.' },
    ],
    observe: 'Compilation turns mathematical equivalence into a practical engineering tradeoff.',
    boundary: 'The current builder places gates but does not implement a hardware topology, transpiler, scheduler, or calibration-aware optimizer.',
  }),
};
