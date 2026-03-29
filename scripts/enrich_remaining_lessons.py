#!/usr/bin/env python3
"""Enrich QCML lessons 6-35 in the unified JSON workspace."""

from __future__ import annotations

import json
from pathlib import Path


JSON_DIR = Path("artifacts/content/json")


def eq(latex: str, meaning: str, variables: dict[str, str] | None = None) -> dict:
    return {
        "latex": latex,
        "meaning": meaning,
        "variables": variables or {},
    }


ENRICHMENTS = {
    6: {
        "learning_objective": "Understand quantum gates as reversible unitary operators that transform amplitudes and phase while preserving total probability.",
        "story": "The original lesson compares gates to trading actions such as buying, selling, hedging, or rebalancing. The useful intuition is that a small, deliberate rule changes the future trajectory of the system without destroying the bookkeeping structure underneath.",
        "why_it_works": "A gate is an allowed operation that changes a qubit's state in a controlled way, just as a trading action changes a portfolio state according to a rule rather than by random drift.",
        "limitations": "Trading actions are not reversible in the strict mathematical sense and they usually lose money to friction. Quantum gates are modeled as ideal unitary operations, which preserve norm and are reversible before measurement.",
        "equations": [
            eq(r"U^\dagger U = I", "A valid closed-system quantum gate is unitary, so it preserves inner products and normalization."),
            eq(r"X|0\rangle = |1\rangle,\quad H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}}", "Different gates perform different structured state transformations.")
        ],
        "derivation": "Quantum states evolve linearly, so a gate must act as a linear operator on Hilbert space. Requiring probability preservation forces the operator to be unitary, which is why gates are represented by matrices with \\(U^\\dagger U = I\\).",
        "notes": "Classical logic gates can be irreversible, but basic quantum gates are reversible until measurement is performed.",
        "physics": {
            "concept": "A gate is usually implemented by driving a physical qubit with a calibrated pulse or interaction for a precise duration.",
            "real_world_mapping": "In superconducting qubits, microwave pulses implement X, Y, Z-style rotations by controlling phase, amplitude, and pulse duration.",
            "importance": "Gates are the control language of gate-based quantum computing, so every algorithm is built from them."
        },
        "quantum_mechanics": {
            "formal_definition": "A quantum gate is a unitary operator acting on the state vector of one or more qubits.",
            "state_space": "Single-qubit gates act on \\(\\mathbb{C}^2\\); multi-qubit gates act on tensor-product spaces such as \\((\\mathbb{C}^2)^{\\otimes n}\\).",
            "operators_involved": ["Unitary operator U", "Pauli gates X, Y, Z", "Hadamard gate H"]
        },
        "circuit": {
            "description": "Apply X and then H to show that gates can both flip basis states and create superposition.",
            "gates": ["X", "H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.x(0)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "Repeated runs produce a balanced distribution, showing that the gate sequence changed the state in a reversible, structured way before measurement."
        },
        "visualization": {"type": "circuit_diagram", "description": "Show a small circuit and animate how each gate updates the qubit state step by step."},
        "applications": ["State preparation", "Algorithm design", "Quantum control calibration"],
        "interview_explanation": "Quantum gates are unitary operators that rotate or transform quantum states without losing probability mass. They are the quantum analogue of controllable logic operations, but unlike many classical gates they are reversible before measurement.",
        "questions": ["Why must an ideal quantum gate be unitary?", "How does a Hadamard gate differ from an X gate?", "Why are reversible operations important in quantum circuits?"]
    },
    7: {
        "learning_objective": "Learn how continuous single-qubit rotation gates \\(R_x\\), \\(R_y\\), and \\(R_z\\) move a qubit on the Bloch sphere and control phase and amplitude precisely.",
        "story": "The dance analogy is thoughtful because a performance can change continuously, not only in a jump from one pose to another. A slight change in angle, posture, or rhythm modifies the whole expression, much like a small rotation changes a qubit state.",
        "why_it_works": "Single-qubit rotations are smooth transformations, and the analogy captures continuous control instead of only discrete switching.",
        "limitations": "Dance expression is a rich human performance, not a strict linear operator acting on a two-dimensional complex space. The analogy helps with smoothness and sensitivity, not with the full algebra.",
        "equations": [
            eq(r"R_x(\theta)=e^{-i\theta X/2},\quad R_y(\theta)=e^{-i\theta Y/2},\quad R_z(\theta)=e^{-i\theta Z/2}", "Rotation gates are generated by Pauli operators."),
            eq(r"R_y(\theta)|0\rangle = \cos(\theta/2)|0\rangle + \sin(\theta/2)|1\rangle", "A rotation changes the amplitude balance continuously.")
        ],
        "derivation": "Exponentiating a Hermitian generator such as a Pauli matrix produces a unitary rotation. The angle parameter controls how far the Bloch vector turns around the chosen axis.",
        "notes": "The factor of one-half appears because Bloch-sphere angles correspond to SU(2) rotations on the qubit state.",
        "physics": {
            "concept": "Rotation gates correspond to controlled precession generated by a chosen interaction Hamiltonian.",
            "real_world_mapping": "In NMR and superconducting devices, tuned control pulses rotate the state around chosen axes.",
            "importance": "Precise single-qubit rotations are the foundation of calibration, state preparation, and variational algorithms."
        },
        "quantum_mechanics": {
            "formal_definition": "Single-qubit rotations are unitary operators generated by the Pauli matrices and parameterized by a continuous angle.",
            "state_space": "The state remains in \\(\\mathbb{C}^2\\), while its Bloch vector rotates on the sphere.",
            "operators_involved": ["Pauli X", "Pauli Y", "Pauli Z", "Rotation operators \\(R_x, R_y, R_z\\)"]
        },
        "circuit": {
            "description": "Use an \\(R_y\\) gate to prepare a state whose measurement probabilities depend continuously on the chosen angle.",
            "gates": ["Ry", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.ry(pi / 3, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The probability of measuring 1 becomes \\(\\sin^2(\\pi/6)=0.25\\), so repeated sampling favors 0 but still produces both outcomes."
        },
        "visualization": {"type": "bloch_sphere", "description": "Let the user drag a slider for \\(\\theta\\) and watch the qubit rotate around the chosen axis."},
        "applications": ["Gate calibration", "State preparation", "Variational ansatz construction"],
        "interview_explanation": "Single-qubit rotations generalize discrete gates into continuous control. They are generated by the Pauli operators and let us move a state smoothly on the Bloch sphere rather than only jumping between a few named gates.",
        "questions": ["Why do rotation gates use Pauli matrices as generators?", "What does \\(R_z\\) change that may not be visible in direct measurement?", "How is \\(R_y(\\theta)\\) reflected in measurement probabilities?"]
    },
    8: {
        "learning_objective": "Use the Bloch sphere as a geometric model of a single-qubit pure state and connect spherical angles to amplitude and phase.",
        "story": "The steering-wheel or joystick analogy is helpful because a tiny change in direction can change the entire path that follows. The Bloch sphere plays the same role for a qubit: where the state points determines how future gates and measurements behave.",
        "why_it_works": "The analogy emphasizes orientation, control, and sensitivity to direction, which are exactly what the Bloch sphere makes visible.",
        "limitations": "A joystick controls a classical trajectory in real space, while the Bloch sphere represents a quantum state modulo global phase. It is a visualization of state, not a literal ball the qubit travels on.",
        "equations": [
            eq(r"|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle", "Every pure single-qubit state can be parameterized by two angles on the Bloch sphere."),
            eq(r"(x,y,z) = (\sin\theta\cos\phi,\; \sin\theta\sin\phi,\; \cos\theta)", "The Bloch vector coordinates correspond to expectation values of the Pauli operators.")
        ],
        "derivation": "Normalization removes one free magnitude parameter and global phase removes one overall phase parameter, leaving two real degrees of freedom. Those two parameters map naturally to the polar and azimuthal angles of the sphere.",
        "notes": "Mixed states live inside the Bloch sphere, while pure states sit on the surface.",
        "physics": {
            "concept": "The Bloch sphere is a compact geometric representation of a two-level quantum state.",
            "real_world_mapping": "Spin-1/2 particles in magnetic fields and polarized photons are often visualized through Bloch-sphere style geometry.",
            "importance": "It is the most intuitive tool for reasoning about single-qubit rotations, phase shifts, and measurement bases."
        },
        "quantum_mechanics": {
            "formal_definition": "The Bloch sphere represents the projective pure-state space of a qubit, with each point corresponding to a normalized state modulo global phase.",
            "state_space": "Pure states of \\(\\mathbb{C}^2\\) modulo global phase map to the sphere surface.",
            "operators_involved": ["Pauli expectation values", "Rotation operators", "Measurement axes"]
        },
        "circuit": {
            "description": "Prepare a nontrivial point on the Bloch sphere with \\(H\\) and \\(R_z\\), then measure in the computational basis.",
            "gates": ["H", "Rz", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.rz(pi / 3, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The measurement probabilities stay balanced, but the hidden phase changes where the state sits around the equator."
        },
        "visualization": {"type": "bloch_sphere", "description": "Show the state vector, basis axes, and sliders for \\(\\theta\\) and \\(\\phi\\)."},
        "applications": ["Single-qubit calibration", "Measurement basis intuition", "Teaching phase and rotation geometry"],
        "interview_explanation": "The Bloch sphere turns abstract amplitudes into geometry. It shows that a pure qubit state is determined by orientation, with amplitude balance tied to latitude and relative phase tied to longitude.",
        "questions": ["What information does the Bloch sphere hide?", "Why does global phase not appear on the sphere?", "What is the difference between points on the surface and inside the sphere?"]
    },
    9: {
        "learning_objective": "Understand how combining multiple qubits creates exponentially larger state spaces and enables correlations that do not exist for isolated qubits.",
        "story": "The family analogy focuses on how adding members creates richer interactions than any one person alone could generate. Multi-qubit systems behave similarly: once more qubits are present, the possible relationships between components expand rapidly.",
        "why_it_works": "The analogy captures growth in relational complexity as the number of components increases.",
        "limitations": "A family is not a tensor-product Hilbert space, and its complexity is not governed by linear algebra. The analogy helps with growth of structure, not with exact quantum composition.",
        "equations": [
            eq(r"\dim\!\left((\mathbb{C}^2)^{\otimes n}\right)=2^n", "An \\(n\\)-qubit system has a state space that grows exponentially with the number of qubits."),
            eq(r"|\psi\rangle = \sum_{x\in\{0,1\}^n} \alpha_x |x\rangle", "A general multi-qubit state is a superposition over all computational basis strings.")
        ],
        "derivation": "Each added qubit doubles the basis size because tensor-product composition multiplies dimensions. Two qubits give four basis states, three qubits give eight, and so on.",
        "notes": "Exponential state-space size is not the same thing as automatic quantum advantage, but it is the reason quantum systems can encode rich correlations.",
        "physics": {
            "concept": "A multi-qubit device is a composite quantum system whose joint state can no longer be described by separate local amplitudes alone.",
            "real_world_mapping": "Superconducting chips and trapped-ion chains both operate by controlling many coupled two-level systems together.",
            "importance": "Useful quantum algorithms require multi-qubit state spaces because entanglement and nontrivial correlations live there."
        },
        "quantum_mechanics": {
            "formal_definition": "A multi-qubit system is described on the tensor-product Hilbert space of its component qubits.",
            "state_space": "For \\(n\\) qubits the state space is \\((\\mathbb{C}^2)^{\\otimes n}\\).",
            "operators_involved": ["Tensor products", "Local operators", "Entangling operators such as CNOT"]
        },
        "circuit": {
            "description": "Prepare a two-qubit Bell pair to show that a joint system can carry structure that is not visible in isolated qubits.",
            "gates": ["H", "CX", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(2, 2)\\nqc.h(0)\\nqc.cx(0, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The joint measurement distribution concentrates on 00 and 11, showing the importance of the combined state rather than separate single-qubit descriptions."
        },
        "visualization": {"type": "probability_chart", "description": "Show how the number of basis states doubles as qubits are added and display joint outcome distributions."},
        "applications": ["Entanglement generation", "Quantum simulation", "Multi-register algorithm design"],
        "interview_explanation": "Multi-qubit systems matter because composition in quantum mechanics is multiplicative: every added qubit doubles the basis size. That growth is what makes entanglement, correlated measurement patterns, and complex algorithms possible.",
        "questions": ["Why does the Hilbert-space dimension grow as \\(2^n\\)?", "What changes qualitatively when we move from one qubit to two?", "Why are joint states more informative than separate local descriptions?"]
    },
    10: {
        "learning_objective": "Understand tensor products as the mathematical rule for combining quantum systems into joint states and joint operators.",
        "story": "The merged-family analogy tries to convey combinatorial growth: when two structures come together, new joint configurations appear that did not exist when they were separate. Tensor products formalize that idea for quantum systems.",
        "why_it_works": "The analogy emphasizes that composition creates a new combined space, not just a side-by-side list of parts.",
        "limitations": "Family relationships are not basis vectors and they do not combine through linear tensor operations. The analogy provides intuition for growth of combinations, not the exact algebraic rule.",
        "equations": [
            eq(r"|a\rangle \otimes |b\rangle", "The tensor product combines subsystem states into one joint state."),
            eq(r"|0\rangle\otimes|1\rangle = |01\rangle", "Computational basis states for multiple qubits are built by tensoring single-qubit basis vectors.")
        ],
        "derivation": "If one qubit is described in \\(\\mathbb{C}^2\\) and another in \\(\\mathbb{C}^2\\), the joint system lives in \\(\\mathbb{C}^2\\otimes\\mathbb{C}^2\\), which has four basis states. Operators compose similarly through tensor products such as \\(X\\otimes I\\).",
        "notes": "Tensor products build the space first; entanglement is then a statement about which vectors in that space can or cannot be factorized.",
        "physics": {
            "concept": "Composite quantum systems are built mathematically by tensoring subsystem spaces and physically by controlling multiple degrees of freedom together.",
            "real_world_mapping": "Two coupled qubits on a chip are modeled jointly, even when only one of them is directly driven at a moment.",
            "importance": "Tensor products are the foundation for multi-qubit circuits, Hamiltonians, measurement models, and entanglement theory."
        },
        "quantum_mechanics": {
            "formal_definition": "The tensor product defines the state space and operator space of a composite quantum system.",
            "state_space": "Two qubits live in \\(\\mathbb{C}^2\\otimes\\mathbb{C}^2\\); more generally, \\((\\mathbb{C}^2)^{\\otimes n}\\).",
            "operators_involved": ["Tensor products of states", "Tensor products of operators such as \\(X\\otimes I\\)", "Projectors on joint basis states"]
        },
        "circuit": {
            "description": "Prepare the basis state \\(|01\\rangle\\) to show how individual qubit states combine into one joint basis label.",
            "gates": ["X", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(2, 2)\\nqc.x(1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The circuit returns the joint computational basis state corresponding to \\(|01\\rangle\\) under the chosen bit-order convention."
        },
        "visualization": {"type": "circuit_diagram", "description": "Display two single-qubit basis states and animate how they combine into a joint basis label."},
        "applications": ["Multi-qubit state definition", "Hamiltonian construction", "Entanglement analysis"],
        "interview_explanation": "Tensor products are the composition rule of quantum mechanics. They are what turn separate qubits into one joint Hilbert space, which is why they show up everywhere from basis construction to entangling gates.",
        "questions": ["Why do tensor products multiply dimensions?", "How does \\(|01\\rangle\\) arise from single-qubit basis states?", "How do tensor products differ from ordinary vector addition?"]
    },
    11: {
        "learning_objective": "Understand decoherence as loss of phase information caused by uncontrolled interaction with the environment.",
        "story": "The original lesson compares decoherence with life noise that breaks internal clarity. That is a useful emotional analogy: outside disturbances do not need to destroy the person entirely to disrupt the structure that made focused behavior possible.",
        "why_it_works": "Decoherence is about the environment scrambling delicate internal relationships, especially phase relationships, rather than simply flipping a value from one symbol to another.",
        "limitations": "Human focus is not represented by a density matrix, and emotional noise is not identical to quantum environmental coupling. The analogy is about fragility of structure, not about literal physics.",
        "equations": [
            eq(r"\rho_{01}(t) = \rho_{01}(0)e^{-t/T_2}", "Under dephasing, off-diagonal coherence decays over time."),
            eq(r"\rho = \begin{pmatrix} |\alpha|^2 & \alpha\beta^* \\ \alpha^*\beta & |\beta|^2 \end{pmatrix}", "The off-diagonal terms store coherence information in a single-qubit density matrix.")
        ],
        "derivation": "A closed pure state can be described coherently, but coupling to uncontrolled environmental degrees of freedom entangles the system with its surroundings. Tracing out the environment suppresses off-diagonal terms, which is the operational signature of decoherence.",
        "notes": "Decoherence does not always mean energy relaxation; phase information can be lost even when populations remain similar.",
        "physics": {
            "concept": "Decoherence is the leakage of phase information from the system into its environment.",
            "real_world_mapping": "Superconducting qubits decohere through coupling to defects, electromagnetic noise, and imperfect isolation.",
            "importance": "It is one of the main reasons practical quantum computers need error mitigation and correction."
        },
        "quantum_mechanics": {
            "formal_definition": "Decoherence is the decay of coherence terms in the reduced density matrix due to system-environment interaction.",
            "state_space": "The full state lives on system plus environment; the observed qubit state is a reduced density operator on \\(\\mathbb{C}^2\\).",
            "operators_involved": ["Density operator \\(\\rho\\)", "Partial trace", "Noise operators associated with dephasing and relaxation"]
        },
        "circuit": {
            "description": "Prepare superposition and measure; on a noisy backend or under a noise model, coherence loss reduces the ideal behavior.",
            "gates": ["H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The ideal circuit is balanced, but real hardware or a noise model reveals how coherence degrades measurement statistics over time."
        },
        "visualization": {"type": "probability_chart", "description": "Show off-diagonal density-matrix terms fading as an environment slider increases dephasing."},
        "applications": ["Hardware benchmarking", "Error-correction motivation", "Noise-aware algorithm design"],
        "interview_explanation": "Decoherence is not just 'random error.' It is the loss of coherent phase relationships because the system becomes entangled with uncontrolled environmental degrees of freedom, making quantum behavior harder to preserve.",
        "questions": ["What part of the density matrix carries coherence?", "How is decoherence different from simple bit-flip error?", "Why does environmental coupling matter so much in quantum hardware?"]
    },
    12: {
        "learning_objective": "Learn the main forms of quantum noise and how physical disturbances translate into logical errors in qubit evolution and measurement.",
        "story": "The original relationship-distortion analogy points toward a useful idea: the message that should have evolved cleanly gets bent by unwanted outside influence. In quantum systems, those distortions become modelable error processes such as bit flips, phase flips, and damping.",
        "why_it_works": "It captures deviation from intended evolution, which is exactly what noise and errors represent in a circuit.",
        "limitations": "Social misunderstandings do not obey Kraus maps or noise channels. The analogy helps with intuition for distortion, not with the formal operator model.",
        "equations": [
            eq(r"\rho' = (1-p)\rho + p X\rho X", "A bit-flip channel applies the wrong basis flip with probability \\(p\\)."),
            eq(r"\rho' = (1-p)\rho + p Z\rho Z", "A phase-flip channel disturbs relative phase with probability \\(p\\).")
        ],
        "derivation": "Noise can be modeled as probabilistic application of unwanted operators or, more generally, as a completely positive trace-preserving map. Error models let us predict how imperfect evolution changes the ideal state.",
        "notes": "Quantum errors are richer than classical bit errors because phase information can be corrupted even when population values look unchanged.",
        "physics": {
            "concept": "Noise arises from control imperfections, thermal effects, crosstalk, readout error, and environmental coupling.",
            "real_world_mapping": "On real devices, imperfect calibration and stray couplings turn ideal pulses into slightly wrong unitary operations or open-system evolution.",
            "importance": "Without noise models, it is impossible to assess algorithm reliability or design correction strategies."
        },
        "quantum_mechanics": {
            "formal_definition": "Quantum noise is modeled by trace-preserving channels that map ideal states to disturbed states.",
            "state_space": "Noise acts on density operators defined over the relevant Hilbert space.",
            "operators_involved": ["Pauli error operators", "Kraus operators", "Measurement error models"]
        },
        "circuit": {
            "description": "Prepare a known state and measure it, using the circuit as the baseline against which noise effects are compared.",
            "gates": ["X", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.x(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "Ideally the result is always 1; any deviation on hardware or under a noise model is evidence of errors in preparation, evolution, or readout."
        },
        "visualization": {"type": "probability_chart", "description": "Let the user dial up bit-flip and phase-flip probabilities and compare ideal and noisy output distributions."},
        "applications": ["Error mitigation", "Hardware characterization", "Fault-tolerance motivation"],
        "interview_explanation": "Quantum noise and errors describe the gap between ideal circuit evolution and what actual hardware produces. The key difference from classical error is that both amplitudes and phase can be corrupted.",
        "questions": ["Why is phase-flip noise not visible in the same way as bit-flip noise?", "What makes a quantum noise model physically valid?", "Why do we often move from state vectors to density matrices when discussing noise?"]
    },
    13: {
        "learning_objective": "Understand quantum channels as the most general physical maps describing state evolution in open and noisy quantum systems.",
        "story": "The communication-pathway analogy is strong because it focuses on how the medium changes the message. A state sent through a perfect channel stays clean; a state sent through a noisy channel loses fidelity depending on the medium.",
        "why_it_works": "Quantum channels are exactly about how transport or interaction environments reshape states between preparation and readout.",
        "limitations": "Human communication is semantic and context-dependent, while a quantum channel is a mathematical map obeying precise positivity and trace-preserving constraints.",
        "equations": [
            eq(r"\mathcal{E}(\rho)=\sum_i K_i \rho K_i^\dagger", "Any quantum channel can be represented in Kraus form."),
            eq(r"\sum_i K_i^\dagger K_i = I", "The Kraus operators must satisfy trace-preservation.")
        ],
        "derivation": "A physical open-system evolution must preserve positivity and total probability. The operator-sum representation packages all such allowed effects into Kraus operators acting on the density matrix.",
        "notes": "Channels include unitary evolution as a special case, but they also describe loss, dephasing, damping, and other non-unitary effects.",
        "physics": {
            "concept": "A quantum channel captures how a prepared state changes after coupling to noise, transmission lines, or imperfect devices.",
            "real_world_mapping": "Photon transmission through fiber and qubit storage in noisy hardware are both described naturally by channels.",
            "importance": "Channels are the language of quantum communication, benchmarking, and noise-aware computation."
        },
        "quantum_mechanics": {
            "formal_definition": "A quantum channel is a completely positive trace-preserving map from density operators to density operators.",
            "state_space": "Channels act on operator spaces associated with the system Hilbert space.",
            "operators_involved": ["Kraus operators", "Density operators", "Superoperators"]
        },
        "circuit": {
            "description": "Prepare a state that could be passed through a modeled channel in simulation or analysis.",
            "gates": ["H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The bare circuit is ideal; channel analysis asks how this state would change under a chosen noisy map before measurement."
        },
        "visualization": {"type": "probability_chart", "description": "Compare an input density matrix with the channel output and show how different channels distort the state."},
        "applications": ["Quantum communication", "Noise modeling", "Process tomography"],
        "interview_explanation": "Quantum channels generalize evolution beyond ideal unitaries. They are the correct framework when the system interacts with an environment or when we want to model realistic transmission and noise.",
        "questions": ["Why are channels usually written on density matrices instead of state vectors?", "What condition makes a map trace-preserving?", "How does a unitary operation fit inside the channel framework?"]
    },
    14: {
        "learning_objective": "Understand the Hamiltonian as the operator that encodes system energy and generates time evolution.",
        "story": "The life-roadmap analogy emphasizes guided progression under a governing structure. In a quantum system, that guiding structure is the Hamiltonian: it determines what kinds of evolution are allowed and at what rates.",
        "why_it_works": "It highlights that there is an underlying rule shaping the path of change rather than random motion.",
        "limitations": "Life stages are narrative and social, while a Hamiltonian is a measurable Hermitian operator with energy eigenvalues. The analogy should not be read as literal determinism.",
        "equations": [
            eq(r"i\hbar \frac{d}{dt}|\psi(t)\rangle = H|\psi(t)\rangle", "The Schrödinger equation says the Hamiltonian generates state evolution."),
            eq(r"U(t)=e^{-iHt/\hbar}", "Time evolution for a time-independent Hamiltonian is unitary.")
        ],
        "derivation": "If the Hamiltonian is known, integrating the Schrödinger equation gives the unitary evolution operator. The eigenstructure of \\(H\\) determines the natural energy modes and their accumulated phases.",
        "notes": "Hamiltonians drive both physical dynamics and many quantum algorithms, especially simulation and optimization methods.",
        "physics": {
            "concept": "The Hamiltonian encodes total energy and interactions in the system.",
            "real_world_mapping": "Spin systems in magnetic fields and coupled superconducting qubits are both described by Hamiltonians with interaction terms.",
            "importance": "Understanding \\(H\\) means understanding what the system does in time."
        },
        "quantum_mechanics": {
            "formal_definition": "A Hamiltonian is a Hermitian operator whose eigenvalues are energy levels and whose action generates unitary time evolution.",
            "state_space": "It acts on the Hilbert space of the system, from single-qubit \\(\\mathbb{C}^2\\) spaces to large many-body spaces.",
            "operators_involved": ["Hamiltonian H", "Time-evolution operator \\(U(t)\\)", "Energy projectors or eigenstates"]
        },
        "circuit": {
            "description": "Use an \\(R_z\\) gate as a simple gate-level stand-in for evolution under a \\(Z\\)-type Hamiltonian.",
            "gates": ["H", "Rz", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.rz(pi / 2, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The gate changes phase according to an effective Hamiltonian-generated evolution, even if the direct computational-basis probabilities remain balanced."
        },
        "visualization": {"type": "bloch_sphere", "description": "Show a state precessing around an axis generated by a chosen Hamiltonian term."},
        "applications": ["Quantum simulation", "Variational chemistry algorithms", "Control design"],
        "interview_explanation": "The Hamiltonian is the operator version of the system's energy model. In quantum mechanics it does more than label energy: it is the generator of time evolution.",
        "questions": ["Why must a Hamiltonian be Hermitian?", "How does the Hamiltonian connect to the Schrödinger equation?", "Why do Hamiltonians matter in quantum algorithms and not just in physics?"]
    },
    15: {
        "learning_objective": "Learn what eigenstates and eigenvalues mean physically and why they organize measurement outcomes and Hamiltonian behavior.",
        "story": "The original lesson associates eigenstructure with stable stages along a guided path. The useful intuition is that some states line up naturally with the governing operator and therefore respond in a simple, predictable way.",
        "why_it_works": "An eigenstate is precisely a state that an operator acts on without changing its direction in Hilbert space, only its scale or phase.",
        "limitations": "Personal stages are not eigenvectors, and human development is not a linear operator. The analogy only conveys the idea of preferred, stable modes under a rule.",
        "equations": [
            eq(r"A|\psi\rangle = \lambda |\psi\rangle", "An eigenstate of operator \\(A\\) returns the same direction scaled by eigenvalue \\(\\lambda\\)."),
            eq(r"Z|0\rangle = |0\rangle,\quad Z|1\rangle = -|1\rangle", "The computational basis states are eigenstates of the Pauli-Z operator.")
        ],
        "derivation": "When an observable or Hamiltonian acts on one of its eigenstates, the result is simple: the state keeps its direction and only gains a scalar factor. That is why eigenstates are natural bases for analysis and measurement.",
        "notes": "For Hamiltonians, eigenvalues correspond to energies; for observables more generally, they correspond to measurement outcomes.",
        "physics": {
            "concept": "Eigenstates are the stationary or preferred states of an operator, and eigenvalues are the measurable values associated with them.",
            "real_world_mapping": "Energy levels of atoms and spin-up/spin-down states in magnetic fields are classic eigenstate examples.",
            "importance": "Eigenstructure underlies spectroscopy, measurement theory, Hamiltonian simulation, and phase estimation."
        },
        "quantum_mechanics": {
            "formal_definition": "An eigenstate of an operator is a nonzero vector that the operator maps to a scalar multiple of itself.",
            "state_space": "Eigenstates form bases or subspaces inside the system Hilbert space, often simplifying dynamics and measurement.",
            "operators_involved": ["Observable A", "Hamiltonian H", "Projectors onto eigenspaces"]
        },
        "circuit": {
            "description": "Prepare \\(|1\\rangle\\), apply a \\(Z\\) gate, and note that the basis state is preserved up to a sign.",
            "gates": ["X", "Z", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.x(0)\\nqc.z(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "Measurement still returns 1 because the \\(Z\\) gate changes phase, not the computational-basis population, illustrating eigenstate behavior."
        },
        "visualization": {"type": "probability_chart", "description": "Show operators acting on basis states and highlight when the direction is preserved but the eigenvalue changes sign or phase."},
        "applications": ["Measurement analysis", "Hamiltonian diagonalization", "Phase estimation"],
        "interview_explanation": "Eigenstates are important because they make operator action simple. When a system is in an eigenstate of an observable, measurement outcomes are definite, and when it is in an eigenstate of a Hamiltonian, evolution has a clean phase structure.",
        "questions": ["Why do eigenstates matter for measurement?", "What is the difference between changing phase and changing measurement outcome?", "How do Hamiltonian eigenvalues connect to energy?"]
    },
    16: {
        "learning_objective": "Understand commutators as a measure of order dependence and why noncommuting operators cannot generally be diagonalized or measured simultaneously.",
        "story": "The attendance-order analogy is surprisingly effective: calling people by first name first versus last name first can change how the process unfolds. In quantum mechanics, that same order sensitivity is formalized by the commutator.",
        "why_it_works": "It emphasizes that sequence matters. If two operations give different outcomes when their order is reversed, they do not commute.",
        "limitations": "Administrative ordering is not quantum incompatibility. The analogy captures order dependence, but not the deep uncertainty and algebraic consequences of noncommutation.",
        "equations": [
            eq(r"[A,B] = AB - BA", "The commutator measures the difference between two operator orders."),
            eq(r"[X,Z] = -2iY", "Pauli operators provide a standard example of noncommuting observables.")
        ],
        "derivation": "If \\([A,B]=0\\), then applying \\(A\\) and \\(B\\) in either order produces the same effect. Nonzero commutators imply order-sensitive evolution or measurement, which is a signature of genuinely quantum structure.",
        "notes": "Commutators appear in dynamics, uncertainty relations, Lie algebras, and gate synthesis.",
        "physics": {
            "concept": "Noncommuting quantities represent incompatible directions of control or measurement.",
            "real_world_mapping": "Spin components along different axes are classic examples of observables that do not commute.",
            "importance": "Commutators explain why some operations can be rearranged safely while others fundamentally cannot."
        },
        "quantum_mechanics": {
            "formal_definition": "The commutator of two operators is the operator \\([A,B]=AB-BA\\), which vanishes only when the pair is order-independent.",
            "state_space": "Commutators act on the same Hilbert space as the operators themselves.",
            "operators_involved": ["Generic operators A and B", "Pauli matrices X, Y, Z"]
        },
        "circuit": {
            "description": "Compare the effect of applying H then Z versus Z then H on \\(|0\\rangle\\) to see that order matters.",
            "gates": ["H", "Z", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.z(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "Changing the gate order would produce a different intermediate state, which is the circuit-level reflection of a nonzero commutator."
        },
        "visualization": {"type": "circuit_diagram", "description": "Place two gate sequences side by side and show how swapping order changes the state trajectory."},
        "applications": ["Trotterization analysis", "Uncertainty relations", "Gate-order optimization"],
        "interview_explanation": "Commutators tell you whether two quantum operations or observables are compatible in order. A nonzero commutator means the sequence matters, and that is one of the clearest signatures that quantum operators are richer than classical variables.",
        "questions": ["What does a zero commutator imply physically?", "Why are Pauli operators useful examples of noncommutation?", "How do commutators connect to uncertainty?"]
    },
    17: {
        "learning_objective": "Understand unitary evolution as reversible, norm-preserving time development of a closed quantum system.",
        "story": "The replaying-life-events analogy captures reversibility as a mental model: under idealized rules, one can conceptually trace the path backward because no information has been discarded. That is the key property of unitary evolution.",
        "why_it_works": "Unitary evolution preserves total probability and keeps state information encoded in a reversible way, so backward reasoning remains meaningful.",
        "limitations": "Human memory is lossy and subjective, while unitary evolution is a precise mathematical reversibility. Real physical systems also stop being unitary when environments are ignored.",
        "equations": [
            eq(r"|\psi(t)\rangle = U(t)|\psi(0)\rangle", "Unitary operators propagate closed-system states in time."),
            eq(r"U^\dagger U = I", "Unitarity ensures reversibility and normalization preservation.")
        ],
        "derivation": "Starting from the Schrödinger equation, the solution for closed evolution is a unitary map. Because \\(U\\) has an inverse \\(U^\\dagger\\), no amplitude information is discarded before measurement.",
        "notes": "Unitary evolution is the ideal model for closed systems; decoherence breaks this picture.",
        "physics": {
            "concept": "Closed quantum dynamics preserve norm and evolve coherently through time.",
            "real_world_mapping": "A well-isolated qubit under a calibrated pulse is modeled as unitary for the duration of the control operation.",
            "importance": "Every ideal quantum circuit step is unitary, so this concept underlies computation itself."
        },
        "quantum_mechanics": {
            "formal_definition": "Unitary evolution is time development generated by a Hermitian Hamiltonian and represented by a unitary operator.",
            "state_space": "The system evolves inside its Hilbert space without changing total norm.",
            "operators_involved": ["Unitary evolution operator \\(U\\)", "Hamiltonian H", "Inverse operator \\(U^\\dagger\\)"]
        },
        "circuit": {
            "description": "Apply a rotation and its inverse to show reversibility before measurement.",
            "gates": ["Ry", "Ry(-theta)", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.ry(pi / 4, 0)\\nqc.ry(-pi / 4, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The qubit returns to its original measurement behavior, illustrating that unitary evolution can be reversed."
        },
        "visualization": {"type": "bloch_sphere", "description": "Animate a state moving along a path and then retracing that path under the inverse unitary."},
        "applications": ["Circuit reversibility", "Algorithm design", "Quantum simulation"],
        "interview_explanation": "Unitary evolution is the ideal closed-system rule of quantum mechanics. It preserves normalization, keeps evolution reversible, and is why quantum gates can be undone in principle.",
        "questions": ["Why does unitarity imply reversibility?", "What breaks unitary evolution in practice?", "How do Hamiltonians generate unitaries?"]
    },
    18: {
        "learning_objective": "Learn Dirac notation as the compact language for states, dual vectors, amplitudes, and operators in quantum mechanics.",
        "story": "The stock-state and indicator analogy is clever because it separates the object being described from the rule used to evaluate it. A ket stores the state, while a bra acts like a contextual readout or evaluation direction.",
        "why_it_works": "Dirac notation distinguishes states from dual vectors and makes inner products feel like an evaluation of one state against another.",
        "limitations": "Financial indicators are heuristic tools, not exact dual vectors in a complex inner-product space. The analogy helps with role separation, not with the full linear-algebra meaning.",
        "equations": [
            eq(r"|\psi\rangle", "A ket represents a state vector."),
            eq(r"\langle \phi | \psi \rangle", "A bra acting on a ket produces an inner product amplitude.")
        ],
        "derivation": "Dirac notation compresses vector and dual-vector language into an expressive symbolic form. Bras live in the dual space, kets in the original Hilbert space, and operators connect them through expressions like \\(\\langle \\phi | A | \\psi \\rangle\\).",
        "notes": "The notation is compact but it is still just linear algebra underneath.",
        "physics": {
            "concept": "Dirac notation lets physicists write states, overlaps, observables, and projections in a basis-independent way.",
            "real_world_mapping": "It is the default notation in quantum mechanics, quantum optics, and nearly all research papers on quantum computing.",
            "importance": "Without comfort in bra-ket notation, later topics like channels, expectation values, and phase estimation become much harder to read."
        },
        "quantum_mechanics": {
            "formal_definition": "Kets denote vectors in Hilbert space, bras denote linear functionals on that space, and combined expressions represent amplitudes, projectors, or expectation values.",
            "state_space": "Kets live in Hilbert space \\(\\mathcal{H}\\); bras live in the dual space \\(\\mathcal{H}^*\\).",
            "operators_involved": ["Kets \\(|\\psi\\rangle\\)", "Bras \\(\\langle\\phi|\\)", "Projectors like \\(|0\\rangle\\langle0|\\)"]
        },
        "circuit": {
            "description": "Prepare a simple superposition and connect the circuit output to ket notation such as \\(|+\\rangle\\).",
            "gates": ["H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The circuit prepares the state commonly written as \\(|+\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt{2}\\)."
        },
        "visualization": {"type": "circuit_diagram", "description": "Pair bra-ket expressions with state-vector and circuit views so the notation maps to something concrete."},
        "applications": ["Reading quantum papers", "Expectation-value calculations", "Measurement and projection notation"],
        "interview_explanation": "Dirac notation is not extra physics; it is the compact language that makes quantum linear algebra readable. Bras, kets, and their products let us express states, overlaps, operators, and measurements very efficiently.",
        "questions": ["What is the difference between a bra and a ket?", "What does \\(\\langle \\phi | \\psi \\rangle\\) represent?", "Why is Dirac notation useful compared with explicit column vectors?"]
    },
    19: {
        "learning_objective": "See quantum states explicitly as vectors and connect amplitude components to geometry and normalization.",
        "story": "The choreography analogy says that a performance is not one number but an organized combination of direction, posture, and rhythm. A state vector works similarly: meaning comes from the whole configuration, not just one label.",
        "why_it_works": "It emphasizes structured components that together define an overall state.",
        "limitations": "Dance vectors are metaphorical, while quantum states are exact vectors in complex Hilbert space with normalization and phase structure.",
        "equations": [
            eq(r"|\psi\rangle = \begin{bmatrix}\alpha \\ \beta\end{bmatrix}", "A qubit state can be written as a two-component column vector in a chosen basis."),
            eq(r"|\alpha|^2 + |\beta|^2 = 1", "Normalization constrains physically allowed state vectors.")
        ],
        "derivation": "Choosing the computational basis identifies \\(|0\\rangle\\) with one basis vector and \\(|1\\rangle\\) with another. Any qubit state becomes a normalized complex linear combination of those basis vectors, which can be written as a column vector.",
        "notes": "Changing basis changes the vector coordinates, not the physical state itself.",
        "physics": {
            "concept": "State vectors are the mathematical objects that encode all accessible predictive information for pure states.",
            "real_world_mapping": "Amplitudes in a spin or polarization experiment are naturally handled as vector components in a chosen basis.",
            "importance": "Treating states as vectors makes gate matrices, basis changes, and expectation values computationally tractable."
        },
        "quantum_mechanics": {
            "formal_definition": "A pure quantum state is represented by a normalized vector in Hilbert space, defined up to a global phase.",
            "state_space": "For one qubit, the state vector lives in \\(\\mathbb{C}^2\\).",
            "operators_involved": ["Basis vectors", "Inner products", "Matrix operators acting on vectors"]
        },
        "circuit": {
            "description": "Initialize a balanced state directly from amplitudes to reinforce the vector view of state preparation.",
            "gates": ["Initialize", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import sqrt\\n\\nqc = QuantumCircuit(1, 1)\\nqc.initialize([1 / sqrt(2), 1 / sqrt(2)], 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "Repeated measurement gives a balanced distribution, consistent with the vector \\([1/\\sqrt{2}, 1/\\sqrt{2}]^T\\)."
        },
        "visualization": {"type": "probability_chart", "description": "Show vector components and the resulting measurement probabilities side by side."},
        "applications": ["State preparation", "Matrix simulation", "Basis-change calculations"],
        "interview_explanation": "Calling a state a vector is not just a metaphor. It means quantum evolution is linear, operators are matrices, and amplitudes are coordinates in a chosen basis with normalization constraints.",
        "questions": ["Why are qubit state vectors complex rather than purely real?", "What changes when we choose a different basis?", "Why does global phase not change the physical state?"]
    },
    20: {
        "learning_objective": "Connect matrix operators to quantum gates and understand how linear maps act on state vectors to produce controlled evolution.",
        "story": "The trading-rule analogy captures the idea that a structured transformation acts on the current state and outputs a new state according to a fixed rule. In quantum mechanics that rule is a linear operator, often represented by a matrix.",
        "why_it_works": "It highlights operator action as transformation-by-rule rather than arbitrary mutation.",
        "limitations": "Trading rules are usually nonlinear, lossy, and context-driven. Quantum gates as linear operators obey strict algebraic constraints that the analogy does not reproduce exactly.",
        "equations": [
            eq(r"|\psi'\rangle = U|\psi\rangle", "A quantum gate transforms a state by matrix multiplication."),
            eq(r"H = \frac{1}{\sqrt{2}}\begin{bmatrix}1 & 1 \\ 1 & -1\end{bmatrix}", "The Hadamard gate is a concrete linear operator acting on qubit vectors.")
        ],
        "derivation": "Once states are written as vectors, gates become matrices. Applying the operator is ordinary linear algebra, but with unitary constraints to preserve the quantum norm.",
        "notes": "Linear operators are more general than gates; observables and projectors are also operators, though not always unitary.",
        "physics": {
            "concept": "Operators encode the allowed actions and observables of a quantum system.",
            "real_world_mapping": "Calibrated control pulses implement effective operators whose matrix forms describe their action on states.",
            "importance": "The operator-state view is the bridge between abstract quantum mechanics and executable circuits."
        },
        "quantum_mechanics": {
            "formal_definition": "A linear operator maps vectors in Hilbert space to other vectors in the same space, and a gate is the special case where the operator is unitary.",
            "state_space": "For single qubits the operator acts on \\(\\mathbb{C}^2\\); for many qubits it acts on tensor-product spaces.",
            "operators_involved": ["Hadamard H", "Pauli matrices", "General linear operators A"]
        },
        "circuit": {
            "description": "Apply Hadamard then Z to show that operator composition corresponds to sequential circuit action.",
            "gates": ["H", "Z", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.z(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The final state depends on the composed linear operators, not on either gate alone."
        },
        "visualization": {"type": "circuit_diagram", "description": "Show the state vector and multiply it by operator matrices as each gate is applied."},
        "applications": ["Circuit compilation", "Operator algebra", "Simulation of gate action"],
        "interview_explanation": "Linear operators are the engine of quantum mechanics. Once states are vectors, gates become matrices, observables become Hermitian operators, and circuit behavior becomes operator composition.",
        "questions": ["Why are quantum gates represented by matrices?", "How does operator composition match circuit order?", "Why are some operators unitary and others Hermitian?"]
    },
    21: {
        "learning_objective": "Deepen control intuition for \\(R_x\\), \\(R_y\\), and \\(R_z\\) by connecting axis-specific rotations to amplitude shaping, phase shaping, and arbitrary single-qubit state preparation.",
        "story": "The trading micro-adjustment analogy becomes stronger here because the lesson is no longer about rotation in general but about small directional changes applied repeatedly and precisely. Each adjustment nudges the trajectory without tearing the structure apart.",
        "why_it_works": "Axis-specific rotations are controlled, incremental changes; the analogy captures bias shifts and directional refinement rather than coarse flipping.",
        "limitations": "Market micro-adjustments are not generated by Pauli matrices and are affected by friction and hidden variables. Quantum rotations follow exact unitary laws in a low-dimensional state space.",
        "equations": [
            eq(r"R_z(\phi) = \begin{bmatrix} e^{-i\phi/2} & 0 \\ 0 & e^{i\phi/2} \end{bmatrix}", "The \\(R_z\\) gate changes relative phase without directly changing computational-basis populations."),
            eq(r"R_x(\theta), R_y(\theta), R_z(\phi)\ \text{generate arbitrary single-qubit control}", "Axis rotations combine to build general single-qubit unitaries.")
        ],
        "derivation": "Different rotation axes affect different Bloch-sphere coordinates. By composing rotations around nonparallel axes, any single-qubit pure state can be reached from \\(|0\\rangle\\).",
        "notes": "This lesson is the practical version of lesson 7, with stronger emphasis on control synthesis rather than the mere idea of continuous motion.",
        "physics": {
            "concept": "Axis-specific rotations correspond to specific control Hamiltonians and pulse phases.",
            "real_world_mapping": "Changing the phase of a microwave drive changes whether a superconducting qubit experiences an effective X or Y rotation; frame shifts produce Z rotations.",
            "importance": "Accurate rotation control is essential for compiling arbitrary circuits and variational ansatz blocks."
        },
        "quantum_mechanics": {
            "formal_definition": "The rotation operators are exponentials of the Pauli generators and together span single-qubit unitary control.",
            "state_space": "They act on \\(\\mathbb{C}^2\\) and rotate the Bloch vector around coordinate axes.",
            "operators_involved": ["\\(R_x\\)", "\\(R_y\\)", "\\(R_z\\)", "Pauli generators X, Y, Z"]
        },
        "circuit": {
            "description": "Apply \\(R_x\\), \\(R_y\\), and \\(R_z\\) in sequence to show how fine-grained control builds a nontrivial state.",
            "gates": ["Rx", "Ry", "Rz", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.rx(pi / 4, 0)\\nqc.ry(pi / 3, 0)\\nqc.rz(pi / 5, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The output distribution reflects the net amplitude shaping from the combined rotations, while the hidden phase affects how later gates would interfere."
        },
        "visualization": {"type": "bloch_sphere", "description": "Show separate X, Y, and Z axis rotations and then the composed trajectory."},
        "applications": ["Arbitrary state preparation", "Variational circuits", "Pulse-level calibration"],
        "interview_explanation": "Axis-specific single-qubit rotations are the real control primitives under many named gates. By composing them, we can implement arbitrary one-qubit behavior and tune amplitudes and phase independently.",
        "questions": ["Why does \\(R_z\\) often look invisible in direct measurement?", "Why are nonparallel axes needed for arbitrary control?", "How do physical pulse phases map onto X, Y, and Z rotations?"]
    },
    22: {
        "learning_objective": "Understand controlled gates as conditional operations that use one qubit to trigger a transformation on another qubit.",
        "story": "The corporate-action analogy works because certain market events happen only when a trigger condition is met. A controlled quantum gate works the same way: the target transformation occurs only when the control qubit is in the relevant state.",
        "why_it_works": "It captures conditional logic embedded inside a broader process rather than unconditional transformation.",
        "limitations": "Financial triggers are classical, observed conditions. In a quantum controlled gate, the control itself can be in superposition, so the condition can be applied coherently rather than after a classical check.",
        "equations": [
            eq(r"\mathrm{CNOT}|a,b\rangle = |a, b\oplus a\rangle", "CNOT flips the target only when the control is 1."),
            eq(r"\mathrm{CZ} = \mathrm{diag}(1,1,1,-1)", "CZ applies a phase only to the \\(|11\\rangle\\) component.")
        ],
        "derivation": "Controlled gates act blockwise on the joint computational basis. They preserve the control state while applying either identity or the chosen target operation depending on the control value.",
        "notes": "Controlled operations are essential because they create conditional structure coherently, not just after classical branching.",
        "physics": {
            "concept": "Controlled gates are implemented by coupling qubits so one qubit's state modulates the evolution of another.",
            "real_world_mapping": "Cross-resonance gates and tunable couplers in superconducting systems are standard routes to effective controlled operations.",
            "importance": "They are the backbone of entanglement generation and multi-qubit logic."
        },
        "quantum_mechanics": {
            "formal_definition": "A controlled gate is a multi-qubit unitary that applies a target operation on one subsystem conditioned on the basis state of another subsystem.",
            "state_space": "The operator acts on a two-qubit tensor-product Hilbert space \\((\\mathbb{C}^2)^{\\otimes 2}\\).",
            "operators_involved": ["CNOT", "CZ", "Projectors on the control qubit"]
        },
        "circuit": {
            "description": "Use H then CNOT to create a Bell state from a coherent control operation.",
            "gates": ["H", "CX", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(2, 2)\\nqc.h(0)\\nqc.cx(0, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The circuit yields correlated results because the controlled operation acted coherently across the joint state."
        },
        "visualization": {"type": "circuit_diagram", "description": "Highlight the control wire and show how the target gate turns on only for the relevant basis component."},
        "applications": ["Bell-state preparation", "Arithmetic circuits", "Error-correction syndrome extraction"],
        "interview_explanation": "Controlled gates are conditional quantum operations. Their power comes from the fact that the condition itself can be in superposition, so the gate acts coherently across multiple computational branches at once.",
        "questions": ["How does CNOT differ from CZ?", "Why are controlled gates central to entanglement generation?", "What is the difference between classical if-statements and coherent quantum control?"]
    },
    23: {
        "learning_objective": "See multi-qubit entangling operations as the mechanisms that create nonseparable joint states beyond what local gates alone can produce.",
        "story": "The connected-family analogy stresses ripple effects across a larger relationship network. That is the right intuition here: once entangling operations act, local changes can no longer describe the full story of the system.",
        "why_it_works": "Entangling operations create shared structure across qubits, and the analogy emphasizes that what happens in one part of the network affects the global picture.",
        "limitations": "Families exchange influence through classical interaction and memory, while entangling gates generate mathematical nonseparability in a joint Hilbert space.",
        "equations": [
            eq(r"U_{\mathrm{ent}} \neq U_1 \otimes U_2", "An entangling operation cannot be written as a simple product of independent local gates."),
            eq(r"|00\rangle \xrightarrow{H\otimes I} \frac{|00\rangle+|10\rangle}{\sqrt{2}} \xrightarrow{\mathrm{CNOT}} \frac{|00\rangle+|11\rangle}{\sqrt{2}}", "A standard entangling sequence creates a Bell state.")
        ],
        "derivation": "Local gates can rotate each qubit independently, but only genuinely joint operations can create states that fail to factorize. Entangling gates therefore mark the transition from local control to fully quantum multi-qubit structure.",
        "notes": "Entanglement is a property of the resulting state; entangling operations are the mechanisms that can generate it.",
        "physics": {
            "concept": "Entangling gates arise from interactions between qubits or engineered couplings that produce joint evolution.",
            "real_world_mapping": "Ion-chain interactions and superconducting cross-couplers are used to generate two-qubit entangling operations.",
            "importance": "Without entangling operations, a gate-based quantum computer reduces to efficiently simulable independent qubits."
        },
        "quantum_mechanics": {
            "formal_definition": "An entangling operation is a multi-qubit unitary capable of generating non-factorizable states from product inputs.",
            "state_space": "It acts on a composite Hilbert space where joint amplitudes can no longer be separated into local factors.",
            "operators_involved": ["CNOT", "CZ", "General two-qubit interaction unitaries"]
        },
        "circuit": {
            "description": "Apply a Bell-state preparation sequence as the minimal example of an entangling operation.",
            "gates": ["H", "CX", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(2, 2)\\nqc.h(0)\\nqc.cx(0, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The measured bit strings show joint correlations that cannot be explained by separate single-qubit pictures."
        },
        "visualization": {"type": "circuit_diagram", "description": "Show before-and-after state descriptions and mark the point where separability is lost."},
        "applications": ["Quantum algorithms", "Teleportation resources", "Error-correcting code construction"],
        "interview_explanation": "Multi-qubit entangling operations are the reason quantum circuits become genuinely quantum at scale. They create correlations that local one-qubit control cannot reproduce.",
        "questions": ["Why are entangling gates necessary for quantum advantage?", "How is an entangling operation different from a merely correlated classical process?", "Can every two-qubit gate create entanglement?"]
    },
    24: {
        "learning_objective": "Understand what it means for a gate set to be universal and why a small finite collection of gates can approximate arbitrary quantum computations.",
        "story": "The driving-control analogy is elegant here: accelerator, brake, and steering are limited controls, yet together they can produce an enormous range of trajectories. Universal gate sets play that role for quantum circuits.",
        "why_it_works": "A finite toolbox can still be expressive enough to generate arbitrary behavior when the controls compose in the right way.",
        "limitations": "Vehicle control is analog and continuous in a physical environment, while universal gate sets are defined by algebraic approximation properties on unitary operators.",
        "equations": [
            eq(r"\{H, T, \mathrm{CNOT}\}\ \text{is a universal gate set}", "A finite discrete family can approximate any quantum circuit to desired accuracy."),
            eq(r"U \approx U_m U_{m-1}\cdots U_1", "Universality means arbitrary unitaries can be compiled into sequences from the chosen gate set.")
        ],
        "derivation": "Single-qubit universality plus at least one entangling two-qubit gate is enough to generate arbitrary multi-qubit unitary behavior up to approximation. This is the conceptual heart of universality proofs and compilation theory.",
        "notes": "Universal does not mean efficient for every task; it means expressive enough in principle.",
        "physics": {
            "concept": "Universality says a hardware platform with a small native gate set can still implement general quantum algorithms via compilation.",
            "real_world_mapping": "Real hardware exposes a native gate library, and compilers translate algorithmic circuits into those native operations.",
            "importance": "This is why practical quantum devices do not need a separate hardware primitive for every abstract algorithmic step."
        },
        "quantum_mechanics": {
            "formal_definition": "A gate set is universal if sequences from the set can generate or approximate any unitary on the relevant Hilbert space.",
            "state_space": "Universality concerns unitary control over single- and multi-qubit Hilbert spaces.",
            "operators_involved": ["H", "T", "CNOT", "General target unitary U"]
        },
        "circuit": {
            "description": "Combine H, T, and CNOT to show a tiny universal toolbox at work in a single circuit.",
            "gates": ["H", "T", "CX", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(2, 2)\\nqc.h(0)\\nqc.t(0)\\nqc.cx(0, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The circuit is simple, but it demonstrates the style of finite-gate composition that underlies universal compilation."
        },
        "visualization": {"type": "circuit_diagram", "description": "Show how a target unitary is decomposed into repeated use of a small native gate set."},
        "applications": ["Compiler design", "Hardware abstraction", "Algorithm portability"],
        "interview_explanation": "A universal gate set is a finite control alphabet rich enough to approximate arbitrary quantum computation. In practice, this lets hardware expose only a few native gates while software handles decomposition and compilation.",
        "questions": ["Why is an entangling two-qubit gate required for universality?", "What is the difference between exact synthesis and approximation?", "Why is {H, T, CNOT} such a standard example?"]
    },
    25: {
        "learning_objective": "Go beyond basic collapse language and understand measurement theory through projectors, expectation values, and basis dependence.",
        "story": "The life-milestone analogy is about irreversible commitment: before a major decision, many futures are open; afterward, one path becomes the operative record. That is why it fits deeper measurement theory as well.",
        "why_it_works": "Measurement selects an outcome and changes which future descriptions are still available, which parallels the commitment structure of a milestone decision.",
        "limitations": "Life decisions are classical and value-laden, while quantum measurement is a basis-dependent physical map governed by operators and probabilities.",
        "equations": [
            eq(r"\sum_i \Pi_i = I", "Projective measurement operators resolve the identity."),
            eq(r"\langle A \rangle = \langle \psi | A | \psi \rangle", "Expectation values summarize measurement statistics of observable \\(A\\).")
        ],
        "derivation": "A projective measurement is defined by orthogonal projectors that sum to identity. Outcome probabilities are expectation values of those projectors, and the post-measurement state depends on the projector associated with the observed outcome.",
        "notes": "Changing basis changes what question is being asked of the state, so measurement is always basis-relative.",
        "physics": {
            "concept": "Measurement extracts classical information by coupling the system to an apparatus aligned with a chosen observable.",
            "real_world_mapping": "Rotating the measurement basis before readout is routine in quantum experiments, for example by applying a final Hadamard before computational-basis measurement.",
            "importance": "Deep measurement theory is essential for tomography, readout interpretation, and many algorithmic post-processing steps."
        },
        "quantum_mechanics": {
            "formal_definition": "Projective measurement is defined by a set of orthogonal projectors associated with an observable's eigenspaces.",
            "state_space": "The state lives in Hilbert space, while projectors pick out basis-dependent components or eigenspaces.",
            "operators_involved": ["Projectors \\(\\Pi_i\\)", "Observable A", "Basis-change unitaries"]
        },
        "circuit": {
            "description": "Measure in the X basis by applying H before the final computational-basis measurement.",
            "gates": ["H", "H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The second Hadamard rotates the basis before readout, illustrating that measurement outcomes depend on the basis being used."
        },
        "visualization": {"type": "probability_chart", "description": "Toggle the measurement basis and show how the same state yields different outcome distributions."},
        "applications": ["Tomography", "Readout calibration", "Observable estimation in variational algorithms"],
        "interview_explanation": "Measurement theory is deeper than collapse language. It is about observables, projectors, probabilities, expectation values, and how basis choice determines what classical information is extracted from a state.",
        "questions": ["What role do projectors play in measurement?", "Why is basis choice so central to quantum measurement?", "How does an expectation value differ from a single-shot outcome?"]
    },
    26: {
        "learning_objective": "Understand the Quantum Fourier Transform as a basis change that converts periodic phase structure into computational-basis information.",
        "story": "The technical-indicator analogy is thoughtful because it frames QFT as a transformation that reveals hidden structure not obvious in raw data. That is exactly what the Fourier viewpoint does for quantum phases.",
        "why_it_works": "QFT reorganizes information so periodicity and phase relationships become easier to read out, much like a transformed market signal can reveal trends hidden in raw prices.",
        "limitations": "Financial indicators are heuristic filters, while the QFT is a precise unitary transform on amplitudes and phase relations.",
        "equations": [
            eq(r"\mathrm{QFT}_N|x\rangle = \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1} e^{2\pi i xk/N}|k\rangle", "The QFT maps computational basis labels into phase-encoded superpositions."),
            eq(r"N = 2^n", "On \\(n\\) qubits the transform acts over a Hilbert space of size \\(2^n\\).")
        ],
        "derivation": "The classical Fourier transform reorganizes information by frequency components. The QFT does the quantum analogue on basis amplitudes, turning periodic phase patterns into basis populations that later measurement can access.",
        "notes": "QFT is useful because many quantum algorithms encode useful information in phase rather than in direct computational-basis amplitudes.",
        "physics": {
            "concept": "QFT is a unitary change of basis tailored to periodic phase structure.",
            "real_world_mapping": "It appears centrally in phase estimation, order finding, and algorithms that exploit periodicity or spectral information.",
            "importance": "Without QFT, some of the most famous quantum speedups would not have a clean extraction step."
        },
        "quantum_mechanics": {
            "formal_definition": "The QFT is a unitary transformation on an \\(N\\)-dimensional Hilbert space that maps computational basis states to equally weighted phase states.",
            "state_space": "For \\(n\\) qubits it acts on \\((\\mathbb{C}^2)^{\\otimes n}\\) with dimension \\(N=2^n\\).",
            "operators_involved": ["QFT unitary", "Controlled phase rotations", "Hadamard gates"]
        },
        "circuit": {
            "description": "Build a minimal two-qubit QFT circuit using Hadamards and a controlled phase gate.",
            "gates": ["H", "CP", "H", "SWAP", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(2, 2)\\nqc.h(1)\\nqc.cp(pi / 2, 0, 1)\\nqc.h(0)\\nqc.swap(0, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The circuit implements the basic QFT pattern, where controlled phase accumulation is converted into measurable basis structure."
        },
        "visualization": {"type": "circuit_diagram", "description": "Animate the layer-by-layer QFT decomposition and show how phase information is redistributed."},
        "applications": ["Phase estimation", "Order finding", "Spectral analysis in quantum algorithms"],
        "interview_explanation": "The QFT is a quantum basis change that exposes periodic phase structure. Its power comes from making hidden phase relationships measurable after further algorithmic processing.",
        "questions": ["Why is the QFT more useful than just applying many Hadamards?", "What kind of structure does QFT reveal?", "Why do controlled phase gates appear in its decomposition?"]
    },
    27: {
        "learning_objective": "Learn how the abstract QFT is decomposed into an executable circuit with Hadamards, controlled phase rotations, and swaps.",
        "story": "The layered-indicator analogy fits implementation well: one indicator alone gives a partial view, but combining carefully ordered layers builds the full transformed picture. QFT circuits are exactly such a layered construction.",
        "why_it_works": "Implementation is about composition of layers, and the analogy highlights structured incremental assembly.",
        "limitations": "Technical indicators do not obey unitary decomposition rules, and layer order in finance does not carry the same strict algebraic meaning as QFT gate order.",
        "equations": [
            eq(r"\mathrm{QFT}_n = \text{Hadamards} + \text{controlled phase rotations} + \text{bit reversal}", "The circuit implementation factorizes the transform into standard gate layers."),
            eq(r"R_k = \begin{bmatrix}1 & 0 \\ 0 & e^{2\pi i / 2^k}\end{bmatrix}", "Controlled phase gates with shrinking angles are the key ingredients.")
        ],
        "derivation": "Each qubit receives a Hadamard and then a cascade of controlled phase rotations from less-significant qubits. A final reversal of qubit order produces the conventional QFT output ordering.",
        "notes": "Implementation matters because the QFT's asymptotic power depends on having an efficient circuit decomposition rather than a dense matrix multiplication.",
        "physics": {
            "concept": "Circuit implementation turns an abstract unitary into a sequence of hardware-executable control operations.",
            "real_world_mapping": "Compilers on real devices approximate these controlled phase layers using the platform's native two-qubit interactions.",
            "importance": "Understanding the implementation makes it easier to reason about cost, approximation, and noise sensitivity."
        },
        "quantum_mechanics": {
            "formal_definition": "A QFT circuit is a decomposition of the Fourier transform unitary into elementary one- and two-qubit gates.",
            "state_space": "The transform acts on a multi-qubit Hilbert space, but the implementation is built from local and controlled operations.",
            "operators_involved": ["Hadamard", "Controlled phase gates \\(R_k\\)", "Swap gates"]
        },
        "circuit": {
            "description": "Show the explicit two-qubit QFT circuit decomposition rather than only the abstract transform.",
            "gates": ["H", "CP", "H", "SWAP", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(2, 2)\\nqc.h(1)\\nqc.cp(pi / 2, 0, 1)\\nqc.h(0)\\nqc.swap(0, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The diagram makes clear how the QFT is assembled from elementary gates rather than applied as one black-box operation."
        },
        "visualization": {"type": "circuit_diagram", "description": "Display the QFT circuit with angle labels on the controlled phase rotations and animate the swap reversal."},
        "applications": ["Compiler education", "Approximate QFT design", "Algorithm resource analysis"],
        "interview_explanation": "QFT circuit implementation matters because algorithms run on gate sequences, not on abstract matrices. The transform becomes practical only when decomposed efficiently into elementary gates.",
        "questions": ["Why do QFT circuits use progressively smaller phase angles?", "What is the role of the final swap layer?", "How do approximate QFT circuits reduce cost?"]
    },
    28: {
        "learning_objective": "Understand phase estimation as the algorithmic procedure for extracting an eigenphase of a unitary operator.",
        "story": "The options-Greeks analogy is trying to expose hidden parameters that shape visible behavior. Phase estimation does the same in quantum form: it extracts a hidden phase that governs how an eigenstate evolves under repeated unitary action.",
        "why_it_works": "It points to latent structure that is not directly obvious from surface observations but becomes inferable through the right analysis pipeline.",
        "limitations": "Options Greeks are classical sensitivity measures, while quantum phase is a complex-eigenvalue property of a unitary acting on an eigenstate.",
        "equations": [
            eq(r"U|u\rangle = e^{2\pi i \phi}|u\rangle", "Phase estimation assumes access to an eigenstate of the unitary."),
            eq(r"\phi \in [0,1)", "The goal is to estimate the eigenphase encoded in the unitary eigenvalue.")
        ],
        "derivation": "Controlled applications of \\(U^{2^k}\\) encode the unknown eigenphase into a control register. An inverse QFT then translates that phase pattern into a binary estimate readable in the computational basis.",
        "notes": "Phase estimation is the bridge from controlled unitaries to spectral information and is one of the most important templates in quantum algorithms.",
        "physics": {
            "concept": "Phase estimation extracts spectral information about unitary evolution.",
            "real_world_mapping": "It underlies algorithms for energy estimation, order finding, and many Hamiltonian-related problems.",
            "importance": "Many advanced algorithms reduce to 'estimate the phase associated with a useful eigenstate.'"
        },
        "quantum_mechanics": {
            "formal_definition": "Quantum phase estimation estimates the eigenphase \\(\\phi\\) associated with an eigenstate of a unitary operator.",
            "state_space": "It uses a control register tensor-producted with a target register containing the eigenstate.",
            "operators_involved": ["Controlled powers of U", "QFT or inverse QFT", "Projective measurement on the control register"]
        },
        "circuit": {
            "description": "Use a minimal controlled-phase example to illustrate how phase is written onto a control qubit.",
            "gates": ["H", "CP", "H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(2, 1)\\nqc.x(1)\\nqc.h(0)\\nqc.cp(pi / 2, 0, 1)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The control qubit's statistics depend on the phase kicked back from the target eigenstate."
        },
        "visualization": {"type": "circuit_diagram", "description": "Show phase being accumulated in the control register and then decoded into a binary estimate."},
        "applications": ["Shor-style algorithms", "Energy estimation", "Spectral analysis"],
        "interview_explanation": "Phase estimation extracts hidden eigenphase information from a unitary. It works by coherently writing the phase onto a control register and then decoding that pattern with a Fourier transform.",
        "questions": ["Why does phase estimation require an eigenstate or near-eigenstate?", "What role does the inverse QFT play?", "Why are controlled powers of the unitary used?"]
    },
    29: {
        "learning_objective": "Learn how Hamiltonian simulation approximates physical time evolution \\(e^{-iHt}\\) using implementable circuit primitives.",
        "story": "The market-pressure analogy is about many forces interacting over time to produce motion. Hamiltonian simulation formalizes the same idea: if you know the underlying interaction terms, you can predict or emulate the system's future evolution.",
        "why_it_works": "It connects the notion of a governing dynamic model to the observable trajectory that emerges over time.",
        "limitations": "Markets are noisy classical systems with incomplete models, while Hamiltonian simulation targets precise operator evolution derived from a specified quantum Hamiltonian.",
        "equations": [
            eq(r"U(t)=e^{-iHt}", "Hamiltonian simulation aims to implement the system's time-evolution operator."),
            eq(r"e^{-i(H_1+H_2)t} \approx \left(e^{-iH_1 t/r}e^{-iH_2 t/r}\right)^r", "Trotterization approximates evolution when the Hamiltonian is decomposed into simpler parts.")
        ],
        "derivation": "If the Hamiltonian contains terms that are easy to implement individually, their short-time exponentials can be composed to approximate the full evolution. Better approximation comes from smaller time slices or more advanced simulation methods.",
        "notes": "Simulation quality depends on both approximation error and hardware noise.",
        "physics": {
            "concept": "Hamiltonian simulation reproduces the dynamics of a target quantum system on a controllable quantum device.",
            "real_world_mapping": "Chemistry, materials, and spin models are common targets because direct classical simulation becomes costly at scale.",
            "importance": "It is one of the most naturally valuable applications of quantum computing."
        },
        "quantum_mechanics": {
            "formal_definition": "Hamiltonian simulation implements or approximates the unitary generated by a target Hamiltonian for a chosen evolution time.",
            "state_space": "The simulation acts on the Hilbert space of the target model encoded into qubits.",
            "operators_involved": ["Hamiltonian H", "Time-evolution unitary \\(e^{-iHt}\\)", "Trotter product formula"]
        },
        "circuit": {
            "description": "Use a short sequence of Z and X rotations as a toy Trotter step for a decomposed Hamiltonian.",
            "gates": ["Rz", "Rx", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.rz(pi / 5, 0)\\nqc.rx(pi / 7, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The circuit represents one simple product-form approximation to evolution under a Hamiltonian with multiple terms."
        },
        "visualization": {"type": "circuit_diagram", "description": "Show a Hamiltonian broken into terms and animate one Trotter step at a time."},
        "applications": ["Quantum chemistry", "Condensed-matter models", "Dynamics prediction"],
        "interview_explanation": "Hamiltonian simulation is the task of reproducing quantum dynamics using a controllable circuit. It matters because many physical problems are naturally expressed as time evolution under a Hamiltonian.",
        "questions": ["Why is Hamiltonian simulation considered a natural quantum-computing application?", "What approximation idea underlies Trotterization?", "What makes simulation hard on classical computers for large systems?"]
    },
    30: {
        "learning_objective": "Understand VQE as a hybrid quantum-classical optimization loop that searches for low-energy states using a parameterized circuit.",
        "story": "The ADAS analogy is strong because it centers on repeated sensing, adjustment, and improvement under feedback. VQE works exactly this way: propose parameters, measure performance, update, and repeat until the energy is lowered.",
        "why_it_works": "It captures the feedback-loop nature of the algorithm rather than treating it as a single closed-form computation.",
        "limitations": "ADAS optimizes a classical control problem with sensors and heuristics, while VQE estimates a quantum expectation value and uses an optimizer over circuit parameters.",
        "equations": [
            eq(r"E(\theta) = \langle \psi(\theta)|H|\psi(\theta)\rangle", "VQE minimizes the expected energy of a parameterized trial state."),
            eq(r"|\psi(\theta)\rangle = U(\theta)|0\cdots 0\rangle", "A variational ansatz prepares the trial state.")
        ],
        "derivation": "Choose a parameterized ansatz, evaluate the Hamiltonian expectation value on a quantum device, and let a classical optimizer update the parameters. The loop repeats until the measured energy stabilizes near a minimum.",
        "notes": "VQE trades long coherent circuits for repeated shorter measurements, making it attractive for near-term devices.",
        "physics": {
            "concept": "VQE estimates ground-state energies of Hamiltonians using hybrid optimization.",
            "real_world_mapping": "It is widely discussed for molecular energy estimation and small quantum chemistry benchmarks.",
            "importance": "It is a flagship NISQ-era algorithm because it mixes quantum state preparation with classical optimization."
        },
        "quantum_mechanics": {
            "formal_definition": "VQE uses the variational principle to upper-bound a Hamiltonian's ground-state energy via a parameterized quantum state family.",
            "state_space": "The ansatz explores a subset of the full Hilbert space of the encoded problem Hamiltonian.",
            "operators_involved": ["Problem Hamiltonian H", "Parameterized unitary ansatz \\(U(\\theta)\\)", "Measurement operators for expectation estimation"]
        },
        "circuit": {
            "description": "Use a tiny two-qubit ansatz with one rotation layer and one entangling gate to illustrate the variational state-preparation step.",
            "gates": ["Ry", "CX", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(2, 2)\\nqc.ry(pi / 4, 0)\\nqc.ry(pi / 6, 1)\\nqc.cx(0, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The circuit prepares one candidate trial state; VQE would repeat this with updated parameters based on measured energy estimates."
        },
        "visualization": {"type": "probability_chart", "description": "Show a feedback loop between a parameter slider, measured energy estimate, and optimizer update."},
        "applications": ["Quantum chemistry", "Ground-state estimation", "Hybrid quantum-classical workflows"],
        "interview_explanation": "VQE is a hybrid algorithm built around the variational principle. A quantum computer prepares and measures trial states, while a classical optimizer updates parameters to reduce the estimated energy.",
        "questions": ["Why is VQE considered suitable for near-term devices?", "What role does the variational principle play?", "Why does VQE need repeated measurements rather than one circuit run?"]
    },
    31: {
        "learning_objective": "Understand QAOA as an alternating-layer hybrid algorithm that balances cost optimization with exploration through mixer dynamics.",
        "story": "The hybrid EV/ICE analogy is useful because power shifts between modes depending on what best serves efficiency. QAOA similarly alternates between a cost Hamiltonian that rewards good solutions and a mixer Hamiltonian that keeps the search moving.",
        "why_it_works": "It emphasizes controlled alternation between exploitation and exploration rather than one static optimization mode.",
        "limitations": "Vehicle power management is classical control logic, while QAOA alternates unitaries generated by two Hamiltonians in a coherent quantum state.",
        "equations": [
            eq(r"|\psi(\gamma,\beta)\rangle = e^{-i\beta B} e^{-i\gamma C} |+\rangle^{\otimes n}", "A single QAOA layer alternates the cost and mixer evolutions."),
            eq(r"\langle C \rangle = \langle \psi(\gamma,\beta)|C|\psi(\gamma,\beta)\rangle", "Optimization tunes the parameters to improve the expected cost value.")
        ],
        "derivation": "Start from a uniform superposition, apply the cost Hamiltonian to encode problem structure in phase, then apply the mixer to redistribute amplitude. Repeat the alternating pattern and optimize the angles classically.",
        "notes": "QAOA sits conceptually between circuit-based optimization and adiabatic ideas, but uses shallow parameterized alternating layers.",
        "physics": {
            "concept": "QAOA uses controlled Hamiltonian-generated layers to search combinatorial solution spaces.",
            "real_world_mapping": "It is often explored for graph partitioning, Max-Cut, and other discrete optimization problems.",
            "importance": "It is one of the most visible quantum optimization frameworks for near-term research."
        },
        "quantum_mechanics": {
            "formal_definition": "QAOA is a parameterized alternating-operator ansatz built from a problem Hamiltonian and a mixer Hamiltonian.",
            "state_space": "The algorithm evolves within the Hilbert space of the qubit encoding of the optimization problem.",
            "operators_involved": ["Cost Hamiltonian C", "Mixer Hamiltonian B", "Layer parameters \\(\\gamma, \\beta\\)"]
        },
        "circuit": {
            "description": "Build a minimal two-qubit QAOA-style layer with a phase-separating ZZ-style term and an X-mixer term.",
            "gates": ["H", "CX", "Rz", "CX", "Rx", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(2, 2)\\nqc.h([0, 1])\\nqc.cx(0, 1)\\nqc.rz(pi / 3, 1)\\nqc.cx(0, 1)\\nqc.rx(pi / 4, 0)\\nqc.rx(pi / 4, 1)\\nqc.measure([0, 1], [0, 1])\\nprint(qc)",
            "expected_output": "The circuit shows the core QAOA pattern: phase-separate by problem structure, then mix amplitudes to continue exploration."
        },
        "visualization": {"type": "circuit_diagram", "description": "Display alternating cost and mixer layers with parameter sliders for \\(\\gamma\\) and \\(\\beta\\)."},
        "applications": ["Combinatorial optimization", "Max-Cut studies", "Hybrid variational research"],
        "interview_explanation": "QAOA alternates two kinds of quantum evolution: one that encodes the optimization objective and one that keeps the state exploring alternatives. The parameters are tuned classically to bias the final measurement distribution toward good solutions.",
        "questions": ["What are the roles of the cost and mixer Hamiltonians?", "How is QAOA related to adiabatic ideas?", "Why is QAOA considered a hybrid algorithm?"]
    },
    32: {
        "learning_objective": "Understand quantum annealing as an optimization strategy that starts from an easy Hamiltonian and gradually deforms toward a problem Hamiltonian.",
        "story": "The EV route-optimization analogy emphasizes searching for a low-energy route by gradually steering toward more efficient choices. Quantum annealing uses the same high-level idea of moving toward a low-cost configuration under a changing objective landscape.",
        "why_it_works": "It captures progressive optimization under a landscape of options, with the goal of settling into a low-cost configuration.",
        "limitations": "Route planning is classical optimization and may rely on explicit heuristics, while quantum annealing evolves under time-dependent Hamiltonians and quantum fluctuations.",
        "equations": [
            eq(r"H(s) = (1-s)H_0 + sH_P", "Annealing interpolates between an easy initial Hamiltonian and the problem Hamiltonian."),
            eq(r"s \in [0,1]", "The schedule parameter controls how far the anneal has progressed.")
        ],
        "derivation": "Begin in the ground state of a simple Hamiltonian \\(H_0\\), then slowly increase the weight of the problem Hamiltonian \\(H_P\\). If the schedule is gentle enough and the gap remains workable, the system can track toward a low-energy state of the target problem.",
        "notes": "Annealing is closely related to adiabatic ideas, though practical devices may be open-system and hardware-specific.",
        "physics": {
            "concept": "Quantum annealing uses quantum fluctuations and a time-varying Hamiltonian to search for low-energy configurations.",
            "real_world_mapping": "Annealing-inspired hardware is often discussed for Ising-model and discrete optimization formulations.",
            "importance": "It is a major alternative viewpoint to gate-based optimization algorithms."
        },
        "quantum_mechanics": {
            "formal_definition": "Quantum annealing evolves a system under a schedule that interpolates from an easy initial Hamiltonian to a problem Hamiltonian whose ground state encodes the solution.",
            "state_space": "The system evolves in the Hilbert space of the encoded optimization problem.",
            "operators_involved": ["Initial Hamiltonian \\(H_0\\)", "Problem Hamiltonian \\(H_P\\)", "Schedule parameter \\(s\\)"]
        },
        "circuit": {
            "description": "Use a short sequence of X-like and Z-like rotations as a gate-model toy analogue of an annealing schedule.",
            "gates": ["Rx", "Rz", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.rx(pi / 3, 0)\\nqc.rz(pi / 5, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The circuit is a toy schedule rather than a full annealer, but it captures the idea of gradually shifting which term dominates the evolution."
        },
        "visualization": {"type": "probability_chart", "description": "Show the energy landscape and how the system is guided from an easy starting Hamiltonian toward the target one."},
        "applications": ["Ising optimization", "Heuristic search", "Annealing-hardware studies"],
        "interview_explanation": "Quantum annealing is an optimization paradigm based on slowly changing the governing Hamiltonian so the system is guided toward low-energy states of the problem Hamiltonian.",
        "questions": ["How is quantum annealing different from QAOA?", "What is the role of the initial Hamiltonian?", "Why does the evolution schedule matter?"]
    },
    33: {
        "learning_objective": "Understand adiabatic quantum computation as computation by slow Hamiltonian deformation that keeps the system near its instantaneous ground state.",
        "story": "The smooth-driving analogy is strong because abrupt changes cause instability, while gradual transitions let the system remain controlled. Adiabatic computation is the quantum version of that idea.",
        "why_it_works": "The central idea is exactly about going slowly enough that the system can track the intended path without unwanted excitation.",
        "limitations": "Mechanical strain in driving is not the same as excitation out of an instantaneous quantum ground state. The analogy captures the pace requirement, not the full spectral-gap condition.",
        "equations": [
            eq(r"H(s) = (1-s)H_0 + sH_P", "Adiabatic computation is built from a slowly varying Hamiltonian path."),
            eq(r"T \gg \frac{\max_s |\langle 1(s)|\partial_s H|0(s)\rangle|}{g_{\min}^2}", "The runtime must be long compared with a gap-dependent adiabatic condition.")
        ],
        "derivation": "If the Hamiltonian changes slowly compared with the inverse square of the minimum spectral gap, the system can remain close to its instantaneous ground state. That final ground state then encodes the solution to the computational problem.",
        "notes": "The adiabatic theorem gives the conceptual guarantee, but practical runtimes depend heavily on the minimum gap.",
        "physics": {
            "concept": "Adiabatic quantum computation uses slow continuous-time evolution instead of a gate sequence as the primary computational model.",
            "real_world_mapping": "It is closely related to annealing frameworks, but framed more directly in theorem-backed adiabatic terms.",
            "importance": "It provides an alternative computational model and a theoretical bridge between dynamics and optimization."
        },
        "quantum_mechanics": {
            "formal_definition": "Adiabatic quantum computation encodes a problem in a final Hamiltonian and solves it by slowly evolving from an easily prepared initial ground state to the target ground state.",
            "state_space": "The evolving state remains in the Hilbert space of the problem Hamiltonian throughout the schedule.",
            "operators_involved": ["Time-dependent Hamiltonian H(s)", "Instantaneous ground state \\(|0(s)\\rangle\\)", "Spectral gap \\(g(s)\\)"]
        },
        "circuit": {
            "description": "Use a toy sequence of gradually changing rotations as a gate-level intuition aid for slow deformation.",
            "gates": ["Rx", "Ry", "Rz", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.rx(pi / 10, 0)\\nqc.ry(pi / 8, 0)\\nqc.rz(pi / 6, 0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The circuit is only an intuition aid, but it reflects the idea of changing control smoothly rather than by abrupt unrelated jumps."
        },
        "visualization": {"type": "bloch_sphere", "description": "Animate a slow path on the Bloch sphere while displaying the changing Hamiltonian and spectral gap."},
        "applications": ["Optimization theory", "Hamiltonian-based algorithms", "Model comparisons with annealing and QAOA"],
        "interview_explanation": "Adiabatic quantum computation solves problems by encoding them into a final Hamiltonian and evolving slowly enough that the system follows the ground state path. The minimum spectral gap is the critical quantity controlling difficulty.",
        "questions": ["How does adiabatic computation differ from gate-based computation?", "Why is the spectral gap so important?", "How is adiabatic computation related to quantum annealing?"]
    },
    34: {
        "learning_objective": "Understand phase kickback as the mechanism by which a controlled unitary writes phase information onto the control qubit.",
        "story": "The gear-and-feedback analogy points toward a downstream change that pushes information back to the driver. Phase kickback is the quantum analogue: the target's eigenphase shows up on the control rather than only on the target.",
        "why_it_works": "It captures the surprising directionality of the effect: the apparent action is on one subsystem, but useful information appears back on the controller.",
        "limitations": "Mechanical feedback is classical torque transfer, whereas phase kickback is coherent phase accumulation in a controlled unitary acting on an eigenstate.",
        "equations": [
            eq(r"|+\rangle|u\rangle \xrightarrow{\mathrm{ctrl}\text{-}U} \frac{|0\rangle|u\rangle + e^{i\phi}|1\rangle|u\rangle}{\sqrt{2}}", "The target eigenphase is transferred onto the relative phase of the control qubit."),
            eq(r"U|u\rangle = e^{i\phi}|u\rangle", "Phase kickback requires the target to be in an eigenstate of the controlled unitary.")
        ],
        "derivation": "Because the target is an eigenstate, the controlled application of \\(U\\) does not scramble the target basis. Instead, the eigenvalue appears as a phase multiplying the \\(|1\\rangle\\) branch of the control superposition.",
        "notes": "Phase kickback is one of the core tricks behind phase estimation and many related algorithms.",
        "physics": {
            "concept": "Phase kickback transfers spectral information from the target's unitary response into the control register.",
            "real_world_mapping": "In algorithm design, it is the hidden engine behind many circuits that seem to 'measure a phase' using control qubits.",
            "importance": "Without phase kickback, phase estimation and many Fourier-based quantum subroutines would lose their core mechanism."
        },
        "quantum_mechanics": {
            "formal_definition": "Phase kickback is the transfer of an eigenphase from a controlled unitary's target register into the relative phase of the control register.",
            "state_space": "It operates on a tensor-product space containing a control qubit and a target eigenstate register.",
            "operators_involved": ["Controlled-U", "Target eigenstate \\(|u\\rangle\\)", "Hadamard for phase readout"]
        },
        "circuit": {
            "description": "Use a control qubit, a target prepared in an eigenstate, and a controlled phase gate to demonstrate kickback.",
            "gates": ["X", "H", "CP", "H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(2, 1)\\nqc.x(1)\\nqc.h(0)\\nqc.cp(pi / 2, 0, 1)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "The control qubit's measurement statistics encode information about the phase applied through the target eigenstate."
        },
        "visualization": {"type": "circuit_diagram", "description": "Animate the phase appearing on the control branch after the controlled unitary acts on the target eigenstate."},
        "applications": ["Phase estimation", "Order finding", "Eigenvalue-extraction subroutines"],
        "interview_explanation": "Phase kickback is the trick that lets a controlled unitary reveal target spectral information on a control qubit. It is one of the central mechanisms behind advanced quantum algorithms.",
        "questions": ["Why must the target be an eigenstate for clean phase kickback?", "How does kickback differ from classical feedback?", "Why is Hadamard used around the control qubit in kickback demos?"]
    },
    35: {
        "learning_objective": "Integrate amplitude, relative phase, and interference into one advanced view of how quantum algorithms shape outcome distributions.",
        "story": "The traffic, dance, and price-momentum analogies all emphasize the same meta-idea: strength alone is not enough. Timing, alignment, and direction determine whether contributions reinforce or cancel. That is exactly the advanced viewpoint needed for quantum amplitudes and interference.",
        "why_it_works": "It combines magnitude and timing intuition, which mirrors the joint role of amplitude and phase in determining interference patterns.",
        "limitations": "Traffic flow, choreography, and markets are classical macroscopic systems. Quantum interference works through complex amplitudes and basis changes, not directly through visible waves in the same sense.",
        "equations": [
            eq(r"|\psi\rangle = \alpha e^{i\phi_0}|0\rangle + \beta e^{i\phi_1}|1\rangle", "A complete amplitude description requires both magnitude and phase."),
            eq(r"P(0) = \left|\frac{\alpha e^{i\phi_0} + \beta e^{i\phi_1}}{\sqrt{2}}\right|^2", "After a basis change, interference depends on relative phase as well as amplitude.")
        ],
        "derivation": "Measurement probabilities in a fixed basis depend on squared magnitudes, but after mixing operations such as Hadamards, relative phases alter how amplitudes combine. That is why phase control becomes algorithmically powerful only when paired with interference structure.",
        "notes": "This lesson closes the conceptual loop from superposition to phase-sensitive algorithm design.",
        "physics": {
            "concept": "Quantum predictions depend on complex amplitudes whose relative phase becomes observable after appropriate basis mixing.",
            "real_world_mapping": "Interferometers make this especially visible: changing path phase changes detector counts even when path amplitudes are unchanged.",
            "importance": "Advanced quantum algorithms succeed by shaping both magnitude and phase rather than by treating probabilities as static classical weights."
        },
        "quantum_mechanics": {
            "formal_definition": "Amplitude magnitude controls potential measurement weight, while relative phase controls how branches interfere after unitary recombination.",
            "state_space": "The state remains in Hilbert space, but the chosen basis and subsequent unitary mixing determine how phase information becomes measurable.",
            "operators_involved": ["Phase operators", "Hadamard or Fourier-like mixing gates", "Measurement projectors"]
        },
        "circuit": {
            "description": "Use an H-Rz-H pattern to show how a hidden relative phase becomes a visible change in measurement statistics.",
            "gates": ["H", "Rz", "H", "Measure"],
            "qiskit_code": "from qiskit import QuantumCircuit\\nfrom math import pi\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\nqc.rz(pi / 2, 0)\\nqc.h(0)\\nqc.measure(0, 0)\\nprint(qc)",
            "expected_output": "Changing the phase rotation changes the final measurement bias, showing that phase and amplitude together determine interference outcomes."
        },
        "visualization": {"type": "probability_chart", "description": "Show two amplitude arrows adding vectorially after a mixing gate, with sliders for magnitude and relative phase."},
        "applications": ["Interference-based algorithm design", "Phase-sensitive sensing", "Advanced intuition for Fourier and estimation algorithms"],
        "interview_explanation": "The advanced view is that amplitude and phase are not separate topics. Algorithms work by preparing amplitudes, shifting relative phases, and then using interference to convert that hidden structure into measurable bias.",
        "questions": ["Why is phase invisible until a basis-mixing operation is applied?", "How does interference combine amplitude and phase?", "Why is this viewpoint essential for understanding quantum algorithmic speedups?"]
    },
}


def merge_enrichment(lesson: dict, enrichment: dict) -> dict:
    lesson["learning_objective"] = enrichment["learning_objective"]
    lesson["intuition"]["story"] = enrichment["story"]
    lesson["intuition"]["why_it_works"] = enrichment["why_it_works"]
    lesson["intuition"]["limitations"] = enrichment["limitations"]
    lesson["math"] = {
        "equations": enrichment["equations"],
        "derivation": enrichment["derivation"],
        "notes": enrichment["notes"],
    }
    lesson["physics"] = enrichment["physics"]
    lesson["quantum_mechanics"] = enrichment["quantum_mechanics"]
    lesson["circuit"] = enrichment["circuit"]
    lesson["visualization"]["type"] = enrichment["visualization"]["type"]
    lesson["visualization"]["description"] = enrichment["visualization"]["description"]
    lesson["applications"] = enrichment["applications"]
    lesson["interview_ready"] = {
        "explanation": enrichment["interview_explanation"],
        "common_questions": enrichment["questions"],
    }
    return lesson


def main() -> None:
    for path in sorted(JSON_DIR.glob("lessons_*.json")):
        lessons = json.loads(path.read_text(encoding="utf-8"))
        changed = False
        for lesson in lessons:
            lesson_id = lesson["lesson_id"]
            if lesson_id in ENRICHMENTS:
                merge_enrichment(lesson, ENRICHMENTS[lesson_id])
                changed = True
        if changed:
            path.write_text(json.dumps(lessons, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
