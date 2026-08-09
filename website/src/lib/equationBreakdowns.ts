export type EquationBreakdownStep = {
  symbol: string;
  description: string;
};

export type EquationBreakdownData = {
  title: string;
  equation: string;
  steps: EquationBreakdownStep[];
  example: string;
  takeaway: string;
};

export const EQUATION_BREAKDOWNS: Record<number, EquationBreakdownData> = {
  6: {
    title: 'Why gates preserve quantum information',
    equation: 'U^\\dagger U = I',
    steps: [
      { symbol: 'U', description: 'is the gate applied to the state.' },
      { symbol: 'U^\\dagger', description: 'is the conjugate transpose, which reverses the operation.' },
      { symbol: 'I', description: 'is the identity, so applying the inverse restores the input.' },
    ],
    example: 'For the Hadamard gate, applying H twice gives H² = I. A state can spread into a superposition and then return exactly to where it started.',
    takeaway: 'Unitarity preserves total probability and makes an ideal gate reversible.',
  },
  7: {
    title: 'Locating a qubit on the Bloch sphere',
    equation: '|\\psi\\rangle = \\cos\\!\\frac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\!\\frac{\\theta}{2}|1\\rangle',
    steps: [
      { symbol: '\\theta', description: 'sets the latitude, or the balance between |0⟩ and |1⟩.' },
      { symbol: '\\phi', description: 'sets the relative phase around the equator.' },
      { symbol: 'e^{i\\phi}', description: 'changes phase without changing the magnitude of the |1⟩ amplitude.' },
    ],
    example: 'At θ = π/2 and φ = 0, the state is |+⟩ = (|0⟩ + |1⟩)/√2, located on the equator.',
    takeaway: 'Two real angles describe every pure single-qubit state up to an irrelevant global phase.',
  },
  8: {
    title: 'Building a multi-qubit state',
    equation: '\\tilde{\\varphi}=\\frac{y}{2^t}',
    steps: [
      { symbol: '\\otimes', description: 'combines the amplitudes of two systems into one joint state.' },
      { symbol: '|\\psi_A\\rangle', description: 'is the state of the first subsystem.' },
      { symbol: '|\\psi_B\\rangle', description: 'is the state of the second subsystem.' },
    ],
    example: 'If A = (a,b) and B = (c,d), then A⊗B = (ac, ad, bc, bd). Two qubits therefore need four amplitudes.',
    takeaway: 'n qubits require 2ⁿ complex amplitudes, which is why simulation becomes difficult quickly.',
  },
  9: {
    title: 'Reading a circuit as matrix multiplication',
    equation: '|\\psi_{\\mathrm{out}}\\rangle = U_m\\cdots U_2U_1|\\psi_{\\mathrm{in}}\\rangle',
    steps: [
      { symbol: '|\\psi_{\\mathrm{in}}\\rangle', description: 'is the state before the circuit.' },
      { symbol: 'U_1,\\ldots,U_m', description: 'are applied from right to left in mathematical notation.' },
      { symbol: '|\\psi_{\\mathrm{out}}\\rangle', description: 'is the state that gets measured at the end.' },
    ],
    example: 'Starting at |0⟩, the sequence H then X gives XH|0⟩ = X|+⟩ = |+⟩ with its amplitudes exchanged in the computational basis.',
    takeaway: 'A circuit is a structured product of reversible operators, followed by a non-reversible measurement.',
  },
  10: {
    title: 'How phase kickback reaches the control',
    equation: '\\mathrm{CNOT}(|-\\rangle\\otimes|1\\rangle) = -|-\\rangle\\otimes|1\\rangle',
    steps: [
      { symbol: '|-\\rangle', description: 'is an eigenstate of X with eigenvalue −1.' },
      { symbol: '\\mathrm{CNOT}', description: 'applies X to the target only when the control is |1⟩.' },
      { symbol: '-1', description: 'appears as a phase on the control branch, even though the target returns to the same state.' },
    ],
    example: 'The target’s X operation turns |−⟩ into −|−⟩. That minus sign is relative phase information available to later interference.',
    takeaway: 'A controlled operation can convert an eigenvalue on the target into phase information on the control.',
  },
  11: {
    title: 'Seeing coherence in a density matrix',
    equation: '\\rho = \\begin{pmatrix}|\\alpha|^2 & \\alpha\\beta^*\\\\ \\alpha^*\\beta & |\\beta|^2\\end{pmatrix}',
    steps: [
      { symbol: '|\\alpha|^2', description: 'is the population associated with |0⟩.' },
      { symbol: '|\\beta|^2', description: 'is the population associated with |1⟩.' },
      { symbol: '\\alpha\\beta^*', description: 'is an off-diagonal coherence term that carries relative-phase information.' },
    ],
    example: 'For |+⟩, α = β = 1/√2, so the off-diagonal entries are 1/2. Dephasing drives those entries toward zero while leaving populations unchanged.',
    takeaway: 'Decoherence primarily destroys the off-diagonal terms that allow amplitudes to interfere.',
  },
  12: {
    title: 'Modeling a noisy quantum operation',
    equation: '\\mathcal{E}(\\rho)=\\sum_k E_k\\rho E_k^\\dagger',
    steps: [
      { symbol: '\\rho', description: 'is the state before the noisy process.' },
      { symbol: 'E_k', description: 'is one possible error operation.' },
      { symbol: '\\sum_k', description: 'adds the possible error branches into a valid mixed state.' },
    ],
    example: 'A bit-flip channel can use E₀ = √(1−p)I and E₁ = √p X. With probability p, the state experiences X instead of I.',
    takeaway: 'Noise is represented as a probabilistic quantum operation, not as one deterministic gate.',
  },
  13: {
    title: 'The interference test in Deutsch–Jozsa',
    equation: '\\frac{1}{2^n}\\sum_x(-1)^{f(x)}',
    steps: [
      { symbol: 'f(x)', description: 'is the oracle’s output bit for input x.' },
      { symbol: '(-1)^{f(x)}', description: 'turns oracle outputs into phases +1 or −1.' },
      { symbol: '\\sum_x', description: 'adds all phase-marked paths, causing cancellation for balanced functions.' },
    ],
    example: 'For a constant f, every term has the same sign and the sum has magnitude 1. For a balanced f, equal positive and negative terms cancel at x = 0ⁿ.',
    takeaway: 'The algorithm identifies a global property by arranging oracle phases to interfere.',
  },
  14: {
    title: 'Turning Simon’s promise into linear equations',
    equation: 'y\\cdot s = 0 \\pmod 2',
    steps: [
      { symbol: 's', description: 'is the hidden nonzero bit string.' },
      { symbol: 'y', description: 'is a measured bit string produced after interference.' },
      { symbol: '\\cdot', description: 'is the bitwise inner product modulo 2.' },
    ],
    example: 'If s = 11, then measured y values must satisfy y₁ ⊕ y₂ = 0, so 00 and 11 are allowed equations.',
    takeaway: 'Repeated samples reveal the hidden string by solving a system of mod-2 linear equations.',
  },
  15: {
    title: 'Extracting factors from a period',
    equation: '\\gcd(a^{r/2}-1,N) \\text{ and } \\gcd(a^{r/2}+1,N)',
    steps: [
      { symbol: 'N', description: 'is the integer to factor.' },
      { symbol: 'a', description: 'is chosen coprime to N.' },
      { symbol: 'r', description: 'is the even period satisfying aʳ ≡ 1 mod N.' },
    ],
    example: 'For N = 15 and a = 2, the period is r = 4. Then gcd(2²−1,15)=3 and gcd(2²+1,15)=5.',
    takeaway: 'Shor’s quantum part finds a period; classical arithmetic converts that period into nontrivial factors.',
  },
  16: {
    title: 'Why a syndrome can reveal an error without reading the state',
    equation: 'E|\\psi_L\\rangle \\xrightarrow{\\text{syndrome}} |s_E\\rangle\\otimes E|\\psi_L\\rangle',
    steps: [
      { symbol: 'E', description: 'is an error acting on physical qubits.' },
      { symbol: '|\\psi_L\\rangle', description: 'is the encoded logical state that must remain coherent.' },
      { symbol: '|s_E\\rangle', description: 'records the error pattern in an ancilla syndrome register.' },
    ],
    example: 'A bit flip on the first qubit of |000⟩ produces |100⟩. Parity checks identify that pattern without asking whether the logical state was 0 or 1.',
    takeaway: 'Error correction extracts information about the error while avoiding a direct measurement of the logical amplitudes.',
  },
  17: {
    title: 'Teleporting an unknown state',
    equation: '|\\psi\\rangle|\\Phi^+\\rangle = \\frac{1}{2}\\sum_{m,n}|mn\\rangle X^nZ^m|\\psi\\rangle',
    steps: [
      { symbol: '|\\psi\\rangle', description: 'is the unknown state held by Alice.' },
      { symbol: '|\\Phi^+\\rangle', description: 'is the shared Bell pair.' },
      { symbol: 'X^nZ^m', description: 'is the correction Bob applies after receiving two classical bits.' },
    ],
    example: 'If Alice measures m = 0 and n = 1, Bob receives X|ψ⟩ and applies X to recover |ψ⟩.',
    takeaway: 'Teleportation transfers a state using entanglement plus two classical bits; it does not copy the original qubit.',
  },
  18: {
    title: 'Separating a mixture from a superposition',
    equation: '\\rho = \\sum_i p_i|\\psi_i\\rangle\\langle\\psi_i|',
    steps: [
      { symbol: 'p_i', description: 'is a classical probability with Σᵢpᵢ = 1.' },
      { symbol: '|\\psi_i\\rangle', description: 'is one possible pure state in the ensemble.' },
      { symbol: '\\rho', description: 'contains every measurement prediction for the mixed state.' },
    ],
    example: 'The mixture ½|0⟩⟨0| + ½|1⟩⟨1| has no off-diagonal terms, unlike |+⟩⟨+|, even though both measure 0 and 1 equally.',
    takeaway: 'A density matrix records both populations and coherence, allowing mixed-state reasoning.',
  },
  19: {
    title: 'Comparing computational resources',
    equation: 'T(n)=O(n^k)',
    steps: [
      { symbol: 'T(n)', description: 'is the number of elementary steps as input size n grows.' },
      { symbol: 'O(·)', description: 'describes an asymptotic upper-growth scale.' },
      { symbol: 'k', description: 'is a fixed exponent for a polynomial-time algorithm.' },
    ],
    example: 'If T(n)=n², doubling the input multiplies the dominant work by about four. An exponential 2ⁿ would double instead.',
    takeaway: 'Complexity asks how resources scale, not merely how fast one small example runs.',
  },
  20: {
    title: 'The variational optimization loop',
    equation: '\\theta_{t+1}=\\theta_t-\\eta\\nabla E(\\theta_t)',
    steps: [
      { symbol: '\\theta_t', description: 'is the current vector of circuit parameters.' },
      { symbol: '\\nabla E', description: 'points toward the direction where measured energy increases fastest.' },
      { symbol: '\\eta', description: 'is the step size controlling how far the optimizer moves.' },
    ],
    example: 'If the gradient is +0.4 and η = 0.1 for one parameter, the next value decreases by 0.04.',
    takeaway: 'A hybrid algorithm alternates quantum measurements with classical parameter updates.',
  },
  21: {
    title: 'Reading the quantum Fourier transform',
    equation: 'F_N|x\\rangle=\\frac{1}{\\sqrt N}\\sum_{k=0}^{N-1}e^{2\\pi ixk/N}|k\\rangle',
    steps: [
      { symbol: 'N', description: 'is the dimension of the register.' },
      { symbol: 'e^{2\\pi ixk/N}', description: 'assigns a phase according to input x and frequency label k.' },
      { symbol: '1/\\sqrt N', description: 'normalizes the resulting superposition.' },
    ],
    example: 'For N = 2 and x = 1, the transform creates (|0⟩ − |1⟩)/√2, turning the input value into a relative phase pattern.',
    takeaway: 'The QFT is a unitary basis change that makes periodic phase structure easier to measure.',
  },
  22: {
    title: 'Estimating an eigenphase',
    equation: 'U|u\\rangle=e^{2\\pi i\\varphi}|u\\rangle',
    steps: [
      { symbol: 'U', description: 'is the unitary whose hidden phase we want to learn.' },
      { symbol: '|u\\rangle', description: 'is an eigenstate, so U changes its phase but not its direction.' },
      { symbol: '\\varphi', description: 'is the phase fraction encoded into the control register.' },
    ],
    example: 'If φ = 1/4, repeated controlled powers create phase patterns corresponding to the binary fraction 0.01.',
    takeaway: 'Phase estimation converts an invisible eigenphase into a classical bit string using controlled powers and an inverse QFT.',
  },
  23: {
    title: 'Approximating continuous quantum evolution',
    equation: '|\\psi(t)\\rangle=e^{-iHt}|\\psi(0)\\rangle',
    steps: [
      { symbol: 'H', description: 'is the Hamiltonian generating the dynamics.' },
      { symbol: 't', description: 'is the elapsed evolution time.' },
      { symbol: 'e^{-iHt}', description: 'is a unitary operator that evolves the initial state.' },
    ],
    example: 'For a simple one-qubit H = Z, the |1⟩ component gains a phase e^{it} relative to |0⟩.',
    takeaway: 'Hamiltonian simulation approximates a physical time-evolution operator with implementable gates.',
  },
  24: {
    title: 'Understanding universal compilation',
    equation: 'U\\approx G_mG_{m-1}\\cdots G_1',
    steps: [
      { symbol: 'U', description: 'is the target operation specified by the algorithm.' },
      { symbol: 'G_j', description: 'is a native gate chosen from the available universal set.' },
      { symbol: '\\approx', description: 'means the compiled circuit approaches U within a chosen error tolerance.' },
    ],
    example: 'H, T, and CNOT provide basis changes, non-Clifford phase control, and entanglement; together they can approximate much richer circuits.',
    takeaway: 'Universality is about expressive power through composition, not about having one physical gate for every operation.',
  },
  25: {
    title: 'Turning a state into a measurement probability',
    equation: 'p(m)=\\langle\\psi|\\Pi_m|\\psi\\rangle',
    steps: [
      { symbol: '|\\psi\\rangle', description: 'is the state immediately before measurement.' },
      { symbol: '\\Pi_m', description: 'projects onto the subspace corresponding to outcome m.' },
      { symbol: 'p(m)', description: 'is the real probability assigned to that outcome.' },
    ],
    example: 'For |+⟩ and Π₀ = |0⟩⟨0|, p(0)=|⟨0|+⟩|²=1/2.',
    takeaway: 'The Born rule converts amplitudes and projectors into normalized classical probabilities.',
  },
  26: {
    title: 'Why the inverse QFT reveals phase structure',
    equation: 'F_N^{-1}|k\\rangle=\\frac{1}{\\sqrt N}\\sum_{x=0}^{N-1}e^{-2\\pi ixk/N}|x\\rangle',
    steps: [
      { symbol: 'F_N^{-1}', description: 'undoes the Fourier basis change.' },
      { symbol: 'e^{-2\\pi ixk/N}', description: 'uses the opposite phase sign from the forward transform.' },
      { symbol: '|x\\rangle', description: 'is the computational basis where the result is measured.' },
    ],
    example: 'Applying F⁻¹ to a Fourier basis state returns one computational basis state, just as an inverse matrix undoes a change of coordinates.',
    takeaway: 'The inverse QFT is useful because it turns organized phase relationships into concentrated measurement outcomes.',
  },
  27: {
    title: 'Decomposing the QFT into gates',
    equation: 'R_k=\\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^k}\\end{pmatrix}',
    steps: [
      { symbol: 'R_k', description: 'is a controlled phase rotation whose angle shrinks as k grows.' },
      { symbol: '2^k', description: 'sets the denominator of the phase angle.' },
      { symbol: 'H', description: 'creates the equal-weight branch that the controlled rotation phases.' },
    ],
    example: 'R₂ applies a phase of π/2 to |1⟩. In a QFT circuit, controlled versions coordinate these rotations across qubits.',
    takeaway: 'Hadamards and controlled phase rotations implement the QFT; swaps reverse the output bit order.',
  },
  28: {
    title: 'Reading phase estimation precision',
    equation: '\\tilde{\\varphi}=\\frac{y}{2^t}',
    steps: [
      { symbol: 't', description: 'is the number of control qubits and sets the binary precision.' },
      { symbol: 'y', description: 'is the integer represented by the measured control bits.' },
      { symbol: '\\tilde{\\varphi}', description: 'is the estimated phase fraction.' },
    ],
    example: 'With t = 3 and measurement y = 2, the estimate is 2/8 = 0.25, or binary 0.010.',
    takeaway: 'More control qubits provide finer phase resolution, at the cost of a larger circuit and more sensitivity to error.',
  },
  29: {
    title: 'Breaking evolution into implementable pieces',
    equation: 'e^{-i(A+B)t}\\approx\\left(e^{-iA\\Delta t}e^{-iB\\Delta t}\\right)^r',
    steps: [
      { symbol: 'A+B', description: 'is a Hamiltonian split into simpler terms.' },
      { symbol: '\\Delta t=t/r', description: 'is a small time step.' },
      { symbol: 'r', description: 'is the number of repeated product-formula steps.' },
    ],
    example: 'For two non-commuting terms, using smaller Δt reduces the error from replacing one combined evolution with alternating evolutions.',
    takeaway: 'Hamiltonian simulation trades circuit depth for an approximation that becomes better as the time steps shrink.',
  },
  30: {
    title: 'Using the variational principle in VQE',
    equation: 'E(\\theta)=\\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle\\ge E_0',
    steps: [
      { symbol: '|\\psi(\\theta)\\rangle', description: 'is the parameterized trial state prepared by the circuit.' },
      { symbol: 'H', description: 'is the problem Hamiltonian whose energy is measured.' },
      { symbol: 'E_0', description: 'is the unknown ground-state energy that the estimate bounds from above.' },
    ],
    example: 'If a trial state produces E(θ)=−0.8 while the true ground energy is −1.0, the variational estimate is valid but not yet optimal.',
    takeaway: 'VQE searches for a low-energy state rather than directly diagonalizing the Hamiltonian.',
  },
  31: {
    title: 'Alternating cost and mixer evolution in QAOA',
    equation: '|\\gamma,\\beta\\rangle= e^{-i\\beta B}e^{-i\\gamma C}|+\\rangle^{\\otimes n}',
    steps: [
      { symbol: 'C', description: 'encodes the problem cost, assigning phases to candidate solutions.' },
      { symbol: 'B', description: 'is the mixer that moves amplitude between candidates.' },
      { symbol: '\\gamma,\\beta', description: 'control the strengths of the cost and mixer layers.' },
    ],
    example: 'One QAOA round first marks candidates by cost phase, then mixes amplitudes so the optimizer can favor lower-cost bit strings.',
    takeaway: 'QAOA uses interference between alternating problem and mixer dynamics, with angles optimized classically.',
  },
  32: {
    title: 'Interpolating between easy and hard Hamiltonians',
    equation: 'H(s)=(1-s)H_0+sH_P,\\qquad 0\\le s\\le1',
    steps: [
      { symbol: 'H_0', description: 'is an easy initial Hamiltonian with a known ground state.' },
      { symbol: 'H_P', description: 'encodes the optimization problem.' },
      { symbol: 's', description: 'moves the system continuously from the initial to the problem Hamiltonian.' },
    ],
    example: 'At s=0 the system is governed entirely by H₀; at s=1 it is governed entirely by H_P.',
    takeaway: 'Quantum annealing changes the energy landscape gradually so a low-energy state can track the problem solution.',
  },
  33: {
    title: 'The adiabatic condition',
    equation: '\\left|\\frac{\\langle 1(s)|\\frac{dH}{ds}|0(s)\\rangle}{\\Delta(s)^2}\\right|\\ll\\frac{dt}{ds}',
    steps: [
      { symbol: '\\Delta(s)', description: 'is the energy gap between the ground and first excited state.' },
      { symbol: '\\frac{dH}{ds}', description: 'measures how quickly the Hamiltonian is changing.' },
      { symbol: '\\ll', description: 'expresses the need for slow evolution relative to the gap.' },
    ],
    example: 'A small gap requires extra time because the system is more vulnerable to transitions out of the ground state.',
    takeaway: 'Adiabatic success depends on both the schedule and the minimum spectral gap along the path.',
  },
  34: {
    title: 'Making phase kickback visible',
    equation: 'U|u\\rangle=e^{2\\pi i\\varphi}|u\\rangle',
    steps: [
      { symbol: 'U|u\\rangle=e^{2\\pi i\\varphi}|u\\rangle', description: 'means the target is an eigenstate of the controlled operation.' },
      { symbol: '|+\\rangle', description: 'puts the control into two branches that can interfere.' },
      { symbol: 'e^{2\\pi i\\varphi}', description: 'becomes a relative phase on the control branch.' },
    ],
    example: 'A controlled-U acting on (|0⟩+|1⟩)|u⟩/√2 produces (|0⟩+e^{2πiφ}|1⟩)|u⟩/√2.',
    takeaway: 'The target eigenphase is not measured directly; it is transferred to a control qubit for interference and estimation.',
  },
  35: {
    title: 'From amplitudes to interference',
    equation: 'p(x)=|\\alpha_x|^2,\\qquad \\alpha_x=\\sum_j a_{xj}',
    steps: [
      { symbol: '\\alpha_x', description: 'is the total complex amplitude for outcome x.' },
      { symbol: 'a_{xj}', description: 'is the contribution from one computational path.' },
      { symbol: '|\\alpha_x|^2', description: 'is the probability observed after all paths combine.' },
    ],
    example: 'Two equal paths with amplitudes 1/2 add to 1 and give probability 1; with opposite signs they add to 0 and cancel.',
    takeaway: 'Quantum algorithms engineer relative phase before measurement so useful outcomes are amplified and unhelpful ones cancel.',
  },
  36: {
    title: 'Why an unknown state cannot be cloned',
    equation: 'U|\psi\rangle|0\rangle\ne |\psi\rangle|\psi\rangle',
    steps: [
      { symbol: 'U', description: 'would be the proposed universal copying operation.' },
      { symbol: '|\psi\rangle', description: 'is an arbitrary unknown input state.' },
      { symbol: '\ne', description: 'indicates that linear evolution cannot produce a perfect copy for every possible input.' },
    ],
    example: 'A CNOT maps |0>|0> to |0>|0> and |1>|0> to |1>|1>, but maps |+>|0> to an entangled Bell state rather than |+>|+>.',
    takeaway: 'Copying known basis information is not the same as universally copying an unknown quantum state.',
  },
  37: {
    title: 'The Grover iteration',
    equation: 'G=(2|s\rangle\langle s|-I)O',
    steps: [
      { symbol: 'O', description: 'is the phase oracle that marks the solution subspace.' },
      { symbol: '|s\rangle', description: 'is the equal superposition prepared at the start.' },
      { symbol: '2|s\rangle\langle s|-I', description: 'is the diffusion reflection around the average amplitude.' },
    ],
    example: 'For one marked item among N candidates, repeated Grover iterations rotate amplitude toward that item and need about pi sqrt(N)/4 iterations.',
    takeaway: 'Grover provides a quadratic query improvement under its unstructured-oracle assumptions, not a general exponential speedup.',
  },
  38: {
    title: 'The BB84 disturbance rate',
    equation: '\Pr(\mathrm{error}\mid\mathrm{intercept\text{-}resend})=\frac{1}{4}',
    steps: [
      { symbol: '\frac{1}{2}', description: 'is the chance that an interceptor chooses the wrong basis.' },
      { symbol: '\frac{1}{2}', description: 'is the chance that the wrong-basis resend disagrees when the legitimate bases later match.' },
      { symbol: '\frac{1}{4}', description: 'is the resulting error probability for the simple idealized attack on kept bits.' },
    ],
    example: 'The protocol samples some kept bits to estimate the error rate before using the remaining reconciled and privacy-amplified key material.',
    takeaway: 'BB84 turns incompatible measurements into a detectable statistical disturbance, subject to explicit security assumptions.',
  },
  39: {
    title: 'A platform is a full control stack',
    equation: '\text{platform}=\text{qubits}+\text{control}+\text{coupling}+\text{readout}',
    steps: [
      { symbol: '\text{qubits}', description: 'are the physical systems that carry the computational degrees of freedom.' },
      { symbol: '\text{control}', description: 'includes pulses, lasers, fields, timing, and calibration.' },
      { symbol: '\text{readout}', description: 'converts the physical state into classical data with a measurable error rate.' },
    ],
    example: 'Two platforms can implement the same abstract H and CNOT gates while differing substantially in gate speed, connectivity, coherence, and calibration.',
    takeaway: 'Hardware comparisons must cover the complete stack rather than one headline qubit count.',
  },
  40: {
    title: 'Compiling an abstract operation',
    equation: 'U_{\mathrm{target}}\approx G_mG_{m-1}\cdots G_1',
    steps: [
      { symbol: 'U_{\mathrm{target}}', description: 'is the operation requested by the algorithm.' },
      { symbol: 'G_j', description: 'is a native or decomposed gate that the device can execute.' },
      { symbol: '\approx', description: 'captures approximation error, which must remain within the algorithm\'s tolerance.' },
    ],
    example: 'A compiler may trade a shorter abstract circuit for additional SWAP gates when logical qubits are not directly connected on the device.',
    takeaway: 'Compilation is part of the computation: routing, scheduling, and native-gate choices directly affect execution quality.',
  },
};
