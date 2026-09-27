export type LessonOrientation = {
  definition: string;
  softwareLens: string;
  hardwareLens: string;
  mathBridge: string;
};

export const LESSON_ORIENTATIONS: Record<number, LessonOrientation> = {
  1: {
    definition: 'A qubit is the quantum version of a bit: it has two measurement labels, but before measurement its state is described by complex amplitudes.',
    softwareLens: 'Think of a qubit as a small state object. Gates are pure transformations that update it, and measurement converts it into ordinary data.',
    hardwareLens: 'A qubit is a physical system with two carefully controlled energy levels, such as a superconducting circuit, trapped ion, or photon mode.',
    mathBridge: 'We introduce vectors, complex numbers, normalization, and the Born rule one piece at a time. You do not need prior quantum physics.',
  },
  2: {
    definition: 'Superposition means a qubit can carry amplitudes for more than one possible measurement result before it is measured. It is not simply a hidden classical choice.',
    softwareLens: 'A superposition is like a structured state that preserves relationships between alternatives until an operation or readout uses them.',
    hardwareLens: 'The physical device is prepared in a coherent combination of its two basis states; keeping that coherence is an engineering challenge.',
    mathBridge: 'The main idea is a linear combination of basis vectors. The coefficients can be complex, while squared magnitudes become probabilities.',
  },
  3: {
    definition: 'Measurement is the point where quantum information becomes a classical result such as 0 or 1. The result is random according to the state amplitudes.',
    softwareLens: 'Measurement is an API boundary: a quantum state becomes ordinary data, and information that was only available as phase may no longer be recoverable.',
    hardwareLens: 'Readout electronics distinguish physical signals associated with the qubit states and report a classical bit for each shot.',
    mathBridge: 'We use the Born rule to square amplitude magnitudes. The simulator shows exact probabilities; real devices estimate them from repeated samples.',
  },
  4: {
    definition: 'Entanglement is a joint quantum state whose behavior cannot be fully described by giving each qubit an independent state.',
    softwareLens: 'The important object is the register state, not a pair of independent variables. Operations on one part can change the correlations available in the whole register.',
    hardwareLens: 'Entanglement is created by calibrated interactions between physical qubits and is sensitive to unwanted coupling and noise.',
    mathBridge: 'Tensor products build multi-qubit states. We will use them to see why some joint vectors cannot be factored into separate single-qubit vectors.',
  },
  5: {
    definition: 'Interference is the addition of complex amplitudes: paths with matching phase reinforce, while paths with opposite phase cancel.',
    softwareLens: 'A useful quantum algorithm is often a pipeline that arranges amplitudes so useful answers become more likely at readout.',
    hardwareLens: 'Relative phase must remain stable while pulses and couplings guide the physical system through the desired paths.',
    mathBridge: 'The key move is adding amplitudes before squaring them. That order is why probabilities alone cannot explain interference.',
  },
  6: {
    definition: 'A quantum gate is a reversible transformation of a quantum state. In the ideal model, it preserves total probability and can be undone.',
    softwareLens: 'Unlike an ordinary destructive assignment, a gate is a constrained state transformation. Circuit design means composing these reversible operations.',
    hardwareLens: 'A gate is implemented by a control pulse or interaction, and calibration determines how closely the hardware matches the intended matrix.',
    mathBridge: 'Unitary matrices satisfy U dagger U = I. We use this condition to connect reversibility, normalization, and matrix multiplication.',
  },
  7: {
    definition: 'The Bloch sphere is a picture of every pure one-qubit state, turning two complex amplitudes into a point on a sphere.',
    softwareLens: 'It is a visualization and debugging view for one qubit, similar to plotting a compact state space instead of inspecting raw numbers.',
    hardwareLens: 'The sphere describes the qubit state, while control pulses rotate that point around physical axes.',
    mathBridge: 'Complex amplitudes become spherical coordinates and expectation values. The picture is exact for one pure qubit, not a complete view of an entangled register.',
  },
  8: {
    definition: 'A system of n qubits has 2^n computational-basis states, so the register state grows much faster than the number of wires drawn in a circuit.',
    softwareLens: 'The state vector is an array with 2^n amplitudes in this simulator. That exponential memory cost is central to why classical simulation becomes difficult.',
    hardwareLens: 'Adding a physical qubit adds another controllable degree of freedom and another source of coupling, calibration, and readout complexity.',
    mathBridge: 'Tensor products explain how small component spaces combine into a larger Hilbert space. We will keep the notation tied to concrete two- and three-qubit examples.',
  },
  9: {
    definition: 'A quantum circuit is a time-ordered recipe: wires hold qubits, gates transform them, and measurement produces classical output.',
    softwareLens: 'It resembles a dataflow graph or execution plan, but its operations are reversible until measurement and can act on correlated state.',
    hardwareLens: 'Compilation maps the abstract circuit to native gates, device connectivity, pulse schedules, and readout operations.',
    mathBridge: 'Circuit order is matrix order. We will learn to follow a state from left to right without needing to multiply every full matrix by hand.',
  },
  10: {
    definition: 'Phase kickback is a controlled-operation effect where phase information associated with a target eigenstate appears as a relative phase on the control.',
    softwareLens: 'It is a reusable subroutine: a control register can query a transformation and store information about its action without copying an unknown quantum state.',
    hardwareLens: 'The effect depends on a reliable controlled interaction and a target state that responds predictably to that interaction.',
    mathBridge: 'The central equation is U|u> = lambda|u>. We then track how the eigenvalue lambda changes the control amplitude.',
  },
  11: {
    definition: 'Decoherence is the loss of usable phase relationships when a quantum system becomes correlated with its environment.',
    softwareLens: 'It is not just a random wrong answer; it changes the state model itself by making coherent alternatives less able to interfere.',
    hardwareLens: 'Energy relaxation, stray fields, thermal effects, crosstalk, and imperfect isolation all limit coherence time.',
    mathBridge: 'We compare a coherent state with what happens when off-diagonal information is reduced. The current playground uses an ideal phase-flip comparison, not a full noise channel.',
  },
  12: {
    definition: 'Quantum noise is unwanted physical variation in preparation, gates, storage, or measurement that changes the statistics of a computation.',
    softwareLens: 'Treat a circuit as a probabilistic experiment with an ideal specification and an error model, rather than assuming every run is identical.',
    hardwareLens: 'Noise sources include relaxation, dephasing, control errors, readout errors, and unwanted interactions between neighboring devices.',
    mathBridge: 'We distinguish a deterministic error operation from a probabilistic channel. The ideal simulator shows error patterns, not a complete noisy hardware model.',
  },
  13: {
    definition: 'Deutsch-Jozsa is a small teaching algorithm that decides whether a promised function is constant or balanced using quantum interference.',
    softwareLens: 'The oracle is a black-box function interface, and the algorithm asks for a property of that interface rather than reading every output.',
    hardwareLens: 'The lesson maps the oracle to a compact controlled circuit; real implementations must compile that oracle to the device’s native interactions.',
    mathBridge: 'Hadamards create query branches, phase kickback marks them, and a final Hadamard makes the constant-versus-balanced distinction measurable.',
  },
  14: {
    definition: "Simon's algorithm uses repeated quantum samples to discover a hidden XOR relationship inside a two-to-one function.",
    softwareLens: 'Think of it as learning a hidden invariant from an API that hides its internal key. The quantum part produces equations; classical linear algebra solves them.',
    hardwareLens: 'The oracle requires coordinated multi-qubit operations, and repeated measurements must be reliable enough to collect independent constraints.',
    mathBridge: 'Each sample gives a bit string y satisfying y dot s = 0 modulo 2. We run a complete two-bit instance, then scale the idea up with the birthday-problem comparison.',
  },
  15: {
    definition: "Shor's algorithm factors integers by turning modular arithmetic into a period-finding problem and solving that period with quantum interference.",
    softwareLens: 'The full program is hybrid: reversible modular arithmetic runs in the quantum circuit, while classical number theory finishes the factor extraction.',
    hardwareLens: 'Large arithmetic registers, deep controlled operations, and error correction make a practical factoring machine far beyond this educational circuit.',
    mathBridge: 'The route is modular exponentiation, periodicity, the inverse QFT, and classical continued fractions. The playground shows only the interference scaffold.',
  },
  16: {
    definition: 'Quantum error correction stores one logical qubit across several physical qubits so errors can be detected and corrected without directly reading the logical information.',
    softwareLens: 'This is redundancy with a quantum constraint: the system records an error syndrome while protecting the data state from direct inspection.',
    hardwareLens: 'A useful logical qubit needs many physical qubits, repeated syndrome measurements, fast feedback, and error rates below a threshold.',
    mathBridge: 'We use code words, parity checks, and syndromes before introducing full stabilizer notation. The playground runs the full 3-qubit code with syndrome qubits.',
  },
  17: {
    definition: 'Quantum teleportation transfers an unknown qubit state using a shared entangled pair plus two ordinary classical bits; it does not transport matter or information faster than light.',
    softwareLens: 'It is a protocol with a shared resource, a local transformation, a classical message, and conditional operations at the receiver.',
    hardwareLens: 'The protocol needs an entangled pair, local two-qubit gates, measurement hardware, and classical feed-forward to apply corrections.',
    mathBridge: 'We rewrite the joint state in the Bell basis to see why the receiver has one of four related states. The playground runs the whole protocol, with controlled corrections standing in for the classical message.',
  },
  18: {
    definition: 'A density matrix describes a quantum state when we need to represent uncertainty, mixtures, or a subsystem of an entangled larger system.',
    softwareLens: 'A state vector is one pure-state representation; a density matrix is a more general state object that can represent ensembles and noise.',
    hardwareLens: 'Open systems constantly interact with environments, so density matrices are the practical language for imperfect preparation and decoherence.',
    mathBridge: 'We compare a projector for a pure state with a weighted mixture, then use trace and purity as checks. The current engine stores state vectors only.',
  },
  19: {
    definition: 'Quantum complexity theory asks which problems quantum computers can solve efficiently and what resources that efficiency requires.',
    softwareLens: 'It is the theory-of-computation layer: compare algorithms by scaling, oracle calls, memory, depth, and classical post-processing, not by a small demo output.',
    hardwareLens: 'A theoretical speedup matters only if circuit depth, connectivity, error correction, and data-loading costs can be made physically meaningful.',
    mathBridge: 'We introduce classes such as BQP and QMA as resource definitions. You can follow the ideas with asymptotic notation before studying formal proofs.',
  },
  20: {
    definition: 'A variational quantum algorithm alternates between a parameterized quantum circuit and a classical optimizer that evaluates and updates its parameters.',
    softwareLens: 'This looks like a training loop: prepare, evaluate a cost, update parameters, and repeat, with the quantum device acting as a specialized sampler.',
    hardwareLens: 'Short circuits can suit noisy devices, but repeated shots, calibration drift, and measurement noise affect the optimization loop.',
    mathBridge: 'The central object is C(theta) = <psi(theta)|H|psi(theta)>. We separate trial-state preparation from expectation estimation and optimization.',
  },
  21: {
    definition: 'The quantum Fourier transform changes the basis used to describe a register so periodic patterns in amplitudes can become concentrated in frequency-like outcomes.',
    softwareLens: 'It is a structured transform, not a faster replacement for every classical FFT. Its value comes from how it fits into a larger quantum algorithm.',
    hardwareLens: 'The transform is compiled into Hadamards, controlled phase rotations, and swaps, with depth and calibration costs that grow with register size.',
    mathBridge: 'We start from the discrete Fourier sum and explain phases as rotating arrows before discussing the unitary QFT matrix.',
  },
  22: {
    definition: 'Phase estimation learns the phase associated with an eigenvalue of a controlled operation and writes that phase into a counting register.',
    softwareLens: 'It is like querying a black-box transformation at controlled powers, then decoding the accumulated signal into a binary number.',
    hardwareLens: 'The controlled powers and inverse QFT require many accurate interactions, making phase precision expensive on real devices.',
    mathBridge: 'The key relationship is U|u> = exp(2 pi i phi)|u>. We build the register roles before deriving the binary phase readout.',
  },
  23: {
    definition: 'Hamiltonian simulation approximates how a quantum system changes over time when its dynamics are described by an energy operator called a Hamiltonian.',
    softwareLens: 'It is numerical time evolution implemented with a sequence of smaller operations, with approximation error tracked alongside runtime cost.',
    hardwareLens: 'The target may be a molecule, material, or spin system; the challenge is encoding its interactions into controllable native gates.',
    mathBridge: 'We connect H to exp(-iHt) and then use simple product formulas. The simulator demonstrates a fixed phase step rather than a general physical model.',
  },
  24: {
    definition: 'A universal gate set is a small toolbox whose combinations can approximate any allowed quantum operation closely enough for computation.',
    softwareLens: 'This is like compiling a rich programming language into a small instruction set while balancing code size, latency, and accuracy.',
    hardwareLens: 'Hardware exposes a native gate set, so compilers must account for connectivity, pulse fidelity, and the cost of approximating non-native gates.',
    mathBridge: 'We distinguish exact identities from approximation and introduce why an entangling gate plus expressive single-qubit gates is necessary.',
  },
  25: {
    definition: 'Measurement theory describes which observable is being read, the probabilities of its outcomes, and what state remains after the readout.',
    softwareLens: 'A measurement is not just printing a variable: the chosen basis and the measurement model determine both the result and the state transition.',
    hardwareLens: 'Changing measurement basis means applying control operations before physical readout; the detector still reports classical signals.',
    mathBridge: 'We use projectors, expectation values, and the Born rule. The notation is introduced as a precise description of an experiment, not as abstract decoration.',
  },
  26: {
    definition: 'This deeper QFT lesson focuses on why periodic phase patterns produce peaks after a change of basis.',
    softwareLens: 'The useful output is a compact description of structure, such as a period or frequency, rather than a list of every input value.',
    hardwareLens: 'The phase relationships must survive a sequence of controlled rotations long enough for the final interference pattern to be read.',
    mathBridge: 'We track phase alignment and cancellation in the Fourier sum before connecting it to the QFT circuit decomposition.',
  },
  27: {
    definition: 'QFT circuit implementation breaks the abstract transform into gates that a quantum processor can schedule and execute.',
    softwareLens: 'This is compilation: turn a high-level transform into an ordered instruction list while preserving its mathematical action.',
    hardwareLens: 'Controlled phase rotations and final swaps must be mapped to available couplers, native rotations, and device connectivity.',
    mathBridge: 'We read a two-qubit decomposition one operation at a time. The current palette uses a related pattern but does not implement arbitrary controlled angles.',
  },
  28: {
    definition: 'Deep phase estimation studies the complete pipeline: prepare an eigenstate, apply controlled powers, and use an inverse QFT to decode phase precision.',
    softwareLens: 'It is a measurement protocol for learning a property of a transformation, with precision traded for more calls and more register space.',
    hardwareLens: 'Every extra phase bit adds controlled work and increases exposure to gate, calibration, and readout errors.',
    mathBridge: 'Binary fractions, eigenvalues, and inverse Fourier transforms are introduced as connected steps rather than one large formula.',
  },
  29: {
    definition: 'Deep Hamiltonian simulation studies how to approximate continuous physical evolution with a finite sequence of implementable operations.',
    softwareLens: 'The design problem resembles numerical integration: reduce formula error without spending so much depth that execution noise dominates.',
    hardwareLens: 'The device must realize interaction terms with enough fidelity while the schedule respects connectivity and coherence limits.',
    mathBridge: 'We compare Trotter error with hardware error and use commutators to explain why the order of terms matters.',
  },
  30: {
    definition: 'VQE is a variational algorithm that estimates a system’s lowest energy by searching over parameterized trial states.',
    softwareLens: 'The classical side looks like optimization over a black-box objective; the quantum side prepares states and estimates expectation values.',
    hardwareLens: 'VQE is designed around near-term constraints, but repeated sampling and noise can make the cost landscape difficult to optimize.',
    mathBridge: 'We build from energy as an expectation value and postpone gradients, ansatz design, and chemistry-specific Hamiltonians until the roles are clear.',
  },
  31: {
    definition: 'QAOA alternates a problem-dependent cost layer with a mixer layer so a quantum state can explore and favor good solutions to a discrete optimization problem.',
    softwareLens: 'It is a hybrid search routine: encode the objective, mix candidate states, sample results, and tune parameters classically.',
    hardwareLens: 'The graph or constraint problem must become physical interactions, and circuit depth grows with the number of alternating layers.',
    mathBridge: 'We interpret cost and mixer Hamiltonians operationally before introducing gamma, beta, and expectation-based optimization.',
  },
  32: {
    definition: 'Quantum annealing solves an optimization problem by slowly changing a physical Hamiltonian from an easy starting form to one that represents the problem.',
    softwareLens: 'Unlike a gate program with discrete instructions, this is a schedule over a changing energy landscape.',
    hardwareLens: 'The machine must control a continuous interpolation and remain near the evolving ground state despite noise and a shrinking energy gap.',
    mathBridge: 'We use a path parameter s and compare starting and problem Hamiltonians before discussing adiabatic conditions.',
  },
  33: {
    definition: 'Adiabatic quantum computation treats computation as continuous physical evolution: begin in a known ground state and transform the Hamiltonian toward the answer.',
    softwareLens: 'The computation is specified by endpoints and a schedule, so runtime and the minimum spectral gap become key program resources.',
    hardwareLens: 'The physical system must follow the intended energy landscape slowly enough, especially near avoided crossings where states come close.',
    mathBridge: 'We introduce spectra, gaps, and the adiabatic condition with diagrams and intuition before formal bounds.',
  },
  34: {
    definition: 'This advanced phase-kickback lesson revisits how controlled operations turn a target eigenphase into information stored on a control register.',
    softwareLens: 'It is a reusable abstraction behind oracle algorithms, phase estimation, and several quantum query constructions.',
    hardwareLens: 'The abstraction only works when controlled interactions and the target eigenstate are prepared with sufficient fidelity.',
    mathBridge: 'We connect eigenvalues, relative phase, and a final basis change, then place the subroutine inside larger algorithms.',
  },
  35: {
    definition: 'This synthesis lesson combines amplitude, relative phase, and interference into one model for understanding how quantum circuits shape measurement outcomes.',
    softwareLens: 'Read a circuit as a program that transforms amplitudes, not probabilities directly, and then intentionally exposes useful structure at measurement.',
    hardwareLens: 'The physical challenge is preserving the phase relationships that make the intended interference survive until readout.',
    mathBridge: 'We reuse vectors, complex numbers, unitary transformations, and the Born rule to connect the whole learning path without adding new prerequisites.',
  },
  36: {
    definition: 'The no-cloning theorem says that one universal quantum operation cannot make a perfect copy of every unknown quantum state.',
    softwareLens: 'Known data can be serialized and copied, but an unknown quantum state is not an ordinary object that a program can inspect and duplicate.',
    hardwareLens: 'Copying would need to preserve amplitudes and phase without learning them. Quantum interactions can correlate systems, but not universally duplicate an unknown state.',
    mathBridge: 'Linearity is enough to see the contradiction: a copier that works on |0> and |1> cannot also work on their superpositions.',
  },
  37: {
    definition: "Grover's algorithm searches an unstructured space by marking solutions and using interference to increase their probability.",
    softwareLens: 'Think of an oracle as a yes-or-no function and the diffusion step as a carefully designed probability-amplification pass.',
    hardwareLens: 'The speedup assumes a reversible oracle and coherent repeated iterations; implementing both can dominate the real hardware cost.',
    mathBridge: 'We track a two-dimensional rotation between the marked and unmarked subspaces instead of memorizing a gate list.',
  },
  38: {
    definition: 'BB84 is a quantum key-distribution protocol that uses two incompatible measurement bases to reveal possible eavesdropping.',
    softwareLens: 'It is a protocol with random basis choices, a public sifting step, error-rate testing, and classical post-processing.',
    hardwareLens: 'The sender, channel, detector, timing, and authentication system all matter. An ideal circuit is not a deployable cryptographic device.',
    mathBridge: 'We compare the Z basis with the X basis and calculate how a wrong-basis interception changes the error statistics.',
  },
  39: {
    definition: 'A quantum hardware platform is a complete physical stack for controlling, coupling, and measuring qubits, not just the qubit material itself.',
    softwareLens: 'Different platforms expose different instruction sets, connectivity graphs, timing models, and error profiles to the compiler.',
    hardwareLens: 'We compare superconducting circuits, trapped ions, neutral atoms, photons, and other approaches by their control and scaling tradeoffs.',
    mathBridge: 'The abstract state-vector model stays the same while physical implementations change the noise, timing, and native-operation assumptions.',
  },
  40: {
    definition: 'Quantum compilation turns an abstract circuit into a hardware-aware sequence of native operations that a device can schedule and run.',
    softwareLens: 'It resembles compiling a high-level program into a constrained instruction set, with extra costs for routing, depth, and approximation error.',
    hardwareLens: 'Connectivity, calibration, pulse timing, crosstalk, and readout constraints shape the final circuit as much as the algorithm does.',
    mathBridge: 'We describe compilation as approximating a target unitary with a product of native gates while tracking an error tolerance.',
  },
};
