export type LessonAnalogy = {
  title: string;
  analogy: string;
  captures: string;
  limitations: string;
  formalConnection: string;
  formalMath?: string;
};

export const LESSON_ANALOGIES: Record<number, LessonAnalogy> = {
  3: {
    title: 'Roll-call and the classical record',
    analogy: 'A teacher asks a student to answer roll-call. Before the answer, the register has several possible entries; after the answer, one classical result is recorded.',
    captures: 'Measurement is the bridge from a richer quantum state description to one classical outcome that can be stored and communicated.',
    limitations: 'The teacher does not physically force the student to become present or absent. Quantum measurement is a physical interaction, and the post-measurement state depends on the outcome.',
    formalConnection: 'For projectors, the probability of an outcome is an expectation value, and the state update is basis-dependent.',
    formalMath: '\\Pr(i)=\\langle\\psi|\\Pi_i|\\psi\\rangle',
  },
  5: {
    title: 'Traffic signals and coordinated flow',
    analogy: 'A sequence of traffic lights can create a green wave, or badly timed signals can repeatedly interrupt the same journey. Coordination changes the final flow.',
    captures: 'Interference depends on how coherent paths line up: contributions can reinforce or cancel when they reach the same outcome.',
    limitations: 'Traffic is a classical flow, not a wavefunction. Quantum amplitudes are complex numbers that combine before their squared magnitudes become probabilities.',
    formalConnection: 'Amplitudes add first, then probabilities are computed. The cross term can be constructive or destructive.',
    formalMath: '|a+b|^2=|a|^2+|b|^2+2\\operatorname{Re}(a^*b)',
  },
  8: {
    title: 'A steering control for the Bloch sphere',
    analogy: 'A joystick gives directional control: a small change in angle changes the path of the controlled object. The Bloch sphere makes a qubit state orientation visible in a similar way.',
    captures: 'Single-qubit gates rotate the state around axes, while the state’s orientation predicts how later gates and measurements behave.',
    limitations: 'The Bloch sphere is not a literal place where a qubit travels. It represents pure states modulo global phase; mixed states occupy its interior.',
    formalConnection: 'The polar and azimuthal angles set the orientation of a pure qubit state on the sphere.',
    formalMath: '|\\psi\\rangle=\\cos(\\theta/2)|0\\rangle+e^{i\\phi}\\sin(\\theta/2)|1\\rangle',
  },
  13: {
    title: 'A message traveling through a channel',
    analogy: 'A message can arrive unchanged through a clear communication path or become distorted by the medium. The path determines how faithfully the message survives.',
    captures: 'A quantum channel describes how a state changes during transmission, storage, or interaction with an environment.',
    limitations: 'Human messages carry meaning, while a quantum channel is a precise map on density operators. The analogy does not replace complete positivity or trace preservation.',
    formalConnection: 'A channel is a completely positive, trace-preserving map written using Kraus operators.',
    formalMath: '\\mathcal{E}(\\rho)=\\sum_k K_k\\rho K_k^\\dagger',
  },
  16: {
    title: 'Calling attendance in different orders',
    analogy: 'Calling a class by first name and then last name can produce a different process from calling it by last name and then first name. The order of operations matters.',
    captures: 'Some quantum operations cannot be swapped without changing the result, so circuit order is part of the computation.',
    limitations: 'Administrative order does not capture quantum incompatibility or the uncertainty relation. It only supplies the first intuition for order dependence.',
    formalConnection: 'The commutator measures the difference between applying two operators in opposite orders.',
    formalMath: '[A,B]=AB-BA',
  },
  22: {
    title: 'An action triggered by a condition',
    analogy: 'A company may take an action only when a specified financial condition is met. The trigger controls whether the action occurs.',
    captures: 'A controlled gate applies an operation to the target conditional on the control state.',
    limitations: 'A financial trigger is checked classically. A quantum control can be in superposition, so the conditional action happens coherently across branches rather than after observing the control.',
    formalConnection: 'CNOT applies X to the target when the control is |1>; CZ adds a minus sign only to the |11> component.',
    formalMath: '\\operatorname{CNOT}|c,t\\rangle=|c,t\\oplus c\\rangle',
  },
  24: {
    title: 'A small vocabulary of physical controls',
    analogy: 'A vehicle needs only a few controls, such as steering, acceleration, and braking, but combinations of them produce many different trajectories.',
    captures: 'A universal gate set provides a compact vocabulary from which arbitrary computations can be composed or approximated.',
    limitations: 'Vehicle controls are not operators on a Hilbert space, and “universal” does not mean every circuit is short or equally easy to compile.',
    formalConnection: 'A universal set generates a dense family of unitary operations, often up to an approximation error and global phase.',
  },
  32: {
    title: 'Finding a low-cost route',
    analogy: 'Route planning searches for a low-cost path through many possibilities. A useful method should avoid getting trapped by poor local choices.',
    captures: 'Optimization problems can be expressed through a cost landscape, which motivates methods that balance exploration and movement toward low-energy solutions.',
    limitations: 'A classical route planner is not a quantum annealer. Annealing follows a time-dependent Hamiltonian and real devices may be open, noisy, and hardware-specific.',
    formalConnection: 'The schedule interpolates between an easy initial Hamiltonian and a problem Hamiltonian, ideally tracking a low-energy state.',
    formalMath: 'H(s)=(1-s)H_0+sH_P,\\quad 0\\leq s\\leq 1',
  },
  36: {
    title: 'A recipe is not a photocopier',
    analogy: 'A recipe can be copied and followed, but copying a dish that is already prepared requires learning what is in it and may change the original. An unknown quantum state is more constrained than an ordinary file.',
    captures: 'The no-cloning theorem separates copying a known preparation procedure from making a perfect second copy of an arbitrary unknown state.',
    limitations: 'A recipe is classical information. Quantum states can be transferred and correlated, but the analogy does not prove the theorem.',
    formalConnection: 'Linearity fixes the action of a proposed copier on superpositions and creates the contradiction.',
    formalMath: 'U|\\psi\\rangle|0\\rangle\\ne|\\psi\\rangle|\\psi\\rangle',
  },
  37: {
    title: 'Turning up one radio station',
    analogy: 'Imagine a crowded dial where one station matters. A filter can combine signals so the desired station grows while unrelated frequencies cancel.',
    captures: 'Grover iterations use phase marking and diffusion to rotate amplitude toward marked solutions.',
    limitations: 'A radio filter is classical and does not provide a search speedup. Grover also needs a reversible oracle and careful iteration count.',
    formalConnection: 'The oracle and diffusion operator form a rotation in the span of marked and unmarked states.',
    formalMath: 'G=(2|s\\rangle\\langle s|-I)O',
  },
  38: {
    title: 'A tamper-evident seal',
    analogy: 'A package can arrive with a seal that is not guaranteed to prevent every attack, but a broken or statistically unusual seal reveals that the channel needs investigation.',
    captures: 'BB84 uses basis choices and sampled error rates to detect disturbance before accepting key material.',
    limitations: 'A seal is not a security proof. BB84 also needs authentication, privacy amplification, finite-key analysis, and trusted implementation assumptions.',
    formalConnection: 'Incompatible bases make some intercept-and-resend actions produce detectable errors.',
    formalMath: '\\Pr(\\mathrm{error})=\\frac{1}{4}',
  },
  39: {
    title: 'Different vehicles, different roads',
    analogy: 'A city bus, a racing bicycle, and a train can all move people, but their speed, routes, maintenance, and capacity tradeoffs differ.',
    captures: 'Quantum platforms can run related abstract circuits while differing in control, connectivity, coherence, readout, and scaling.',
    limitations: 'The vehicle comparison does not capture quantum fidelity or error correction. Platform choices must be measured for a concrete workload.',
    formalConnection: 'The abstract unitary model is compiled into platform-specific operations and noise processes.',
  },
  40: {
    title: 'Compiling a recipe for a constrained kitchen',
    analogy: 'A recipe may describe any ingredients and order, while a particular kitchen has limited tools, workspace, and timing. The cook must rewrite the recipe without changing the intended dish.',
    captures: 'Quantum compilation decomposes, routes, schedules, and optimizes an abstract circuit for a real device.',
    limitations: 'A kitchen does not have unitary approximation error or qubit connectivity. The analogy explains constraints, not the mathematics.',
    formalConnection: 'The compiler approximates a target unitary with native gates while controlling depth and hardware cost.',
    formalMath: 'U_{\\mathrm{target}}\\approx G_m\\cdots G_1',
  },
};
