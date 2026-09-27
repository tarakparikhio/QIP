import type { LessonQuiz } from './lessons';

// Additional questions per lesson ID. The first question for each lesson lives in
// QUIZZES inside lessons.ts; these extend every lesson to a three-question check.
// Options are shuffled at render time, so the answer letter position does not leak.
const q = (prompt: string, options: string[], answer: LessonQuiz['answer'], explanation: string): LessonQuiz => ({ prompt, options, answer, explanation });

export const QUIZ_EXTRAS: Record<number, LessonQuiz[]> = {
  1: [
    q('A classical bit and a qubit are both measured once. What can each return?', ['Both return one of two values, 0 or 1', 'The qubit returns a number between 0 and 1', 'The qubit returns both 0 and 1 at once', 'The bit returns a probability'], 'a', 'A single measurement of a qubit in the computational basis still yields just 0 or 1. The difference lies in the amplitudes that determine the statistics, not in the number of readable outcomes.'),
    q('Predict: start in |0⟩ and apply H twice. What is measured?', ['0 with probability 1', '0 or 1 with 50% each', '1 with probability 1', 'It depends on the hardware'], 'a', 'H is its own inverse (H² = I), so two Hadamards return |0⟩ exactly.'),
  ],
  2: [
    q('Which state has a 25% chance of measuring 1?', ['√0.75|0⟩ + √0.25|1⟩', '0.75|0⟩ + 0.25|1⟩', '0.5|0⟩ + 0.5|1⟩', '|0⟩ + |1⟩'], 'a', 'Probabilities are squared magnitudes of amplitudes: (√0.25)² = 0.25. Option 0.75|0⟩ + 0.25|1⟩ is not even normalized.'),
    q('Why is |+⟩ different from a coin that is 0 or 1 with 50% chance?', ['|+⟩ has a definite relative phase that can interfere; a random coin does not', 'They give different Z-basis statistics', '|+⟩ is always measured as 1', 'There is no difference'], 'a', 'Both give 50/50 in the Z basis, but applying H to |+⟩ returns |0⟩ deterministically. A classical mixture would stay 50/50.'),
  ],
  3: [
    q('After measuring |+⟩ and getting 0, you measure again immediately in the same basis. What happens?', ['You get 0 again with certainty', 'You get 0 or 1 with 50% each', 'You get 1 with certainty', 'The qubit returns to |+⟩'], 'a', 'Measurement collapses the state to |0⟩, so an immediate repeat in the same basis gives the same result.'),
    q('Predict: H then Z then H, starting from |0⟩. What is measured?', ['1 with probability 1', '0 with probability 1', '0 or 1 with 50% each', 'The circuit is invalid'], 'a', 'H|0⟩ = |+⟩, Z|+⟩ = |−⟩, and H|−⟩ = |1⟩. The phase flip becomes a bit flip after the basis change.'),
  ],
  4: [
    q('Predict: H on q0 then CNOT (q0 control, q1 target), starting from |00⟩. Which outcomes can appear?', ['00 and 11 only', '00, 01, 10, 11 equally', '01 and 10 only', '00 only'], 'a', 'This prepares the Bell state (|00⟩ + |11⟩)/√2, so the two qubits always agree.'),
    q('Can entanglement be used to send a message faster than light?', ['No; each side alone sees random outcomes until classical information is compared', 'Yes, by choosing the measurement result', 'Yes, but only with Bell states', 'Only on superconducting hardware'], 'a', 'The no-signalling principle holds: one party cannot control their outcome, and local statistics do not change with the other party\'s actions.'),
  ],
  5: [
    q('Two paths lead to the same outcome with amplitudes +1/2 and −1/2. What is the contribution to that outcome?', ['Zero: the amplitudes cancel', '1/2', '1/4', '1'], 'a', 'Amplitudes add before squaring. (+1/2) + (−1/2) = 0, which is destructive interference.'),
    q('Why does H → H return |0⟩ while H → Z → H returns |1⟩?', ['Z changes the relative phase, which flips which outcome interferes constructively', 'Z adds noise', 'Z measures the qubit', 'Z is not unitary'], 'a', 'Z changes |+⟩ to |−⟩. The second H converts that phase difference into a different computational-basis result.'),
  ],
  6: [
    q('Which matrix property guarantees a gate can be undone?', ['U†U = I', 'U is diagonal', 'All entries are real', 'U has trace zero'], 'a', 'Unitarity means the inverse is the conjugate transpose U†, so every ideal gate is reversible.'),
    q('What is X applied twice?', ['The identity', 'Z', 'H', 'A measurement'], 'a', 'X is a bit flip; flipping twice returns the original state, so X² = I.'),
  ],
  7: [
    q('Where is |+⟩ on the Bloch sphere?', ['On the equator, along +x', 'At the north pole', 'At the south pole', 'At the center'], 'a', '|+⟩ = (|0⟩ + |1⟩)/√2 has equal probabilities and zero relative phase, which is the +x point on the equator.'),
    q('What does the S gate do on the Bloch sphere?', ['Rotates by 90° about the z axis', 'Flips north and south poles', 'Moves the state to the center', 'Rotates about the x axis by 180°'], 'a', 'S = diag(1, i) adds a 90° relative phase, which is a quarter-turn around the z axis. For example, it takes |+⟩ to |+i⟩.'),
  ],
  8: [
    q('How many complex amplitudes describe a general 3-qubit state?', ['8', '3', '6', '9'], 'a', 'n qubits need 2ⁿ amplitudes, so 3 qubits need 8.'),
    q('Is the state (|00⟩ + |01⟩)/√2 entangled?', ['No; it equals |0⟩ ⊗ |+⟩', 'Yes; it is a Bell state', 'Yes; it has two terms', 'It is not a valid state'], 'a', 'The amplitude matrix [[1,1],[0,0]]/√2 has determinant 0, so the state factorizes as |0⟩ ⊗ |+⟩.'),
  ],
  9: [
    q('In a circuit diagram, in what order do gates act?', ['Left to right in time', 'Right to left', 'Top wire first, then bottom wire', 'All at once'], 'a', 'Circuit diagrams are read left to right. When written as a matrix product, the later gates appear on the left.'),
    q('Predict: X on q0 then CNOT (q0 control, q1 target), starting from |00⟩. What is the result in this playground\'s notation?', ['|11⟩', '|10⟩', '|01⟩', '|00⟩'], 'a', 'X makes q0 = 1, so the CNOT fires and flips q1 to 1.'),
  ],
  10: [
    q('In phase kickback, the target qubit is prepared in an eigenstate of the controlled operation. What changes?', ['The control qubit picks up the eigenvalue as a relative phase', 'The target flips from |0⟩ to |1⟩', 'Both qubits are measured', 'Nothing observable'], 'a', 'Because the target is an eigenstate, it stays the same, and the eigenvalue\'s phase attaches to the control\'s |1⟩ branch.'),
    q('A CNOT targets a qubit in |−⟩. What does it do to a control in |+⟩?', ['Turns it into |−⟩', 'Leaves it as |+⟩', 'Measures it', 'Entangles it permanently with the target'], 'a', '|−⟩ is an eigenstate of X with eigenvalue −1, so the control\'s |1⟩ component picks up −1, giving |−⟩.'),
  ],
  11: [
    q('Which density-matrix entries shrink during pure dephasing?', ['The off-diagonal entries', 'The diagonal entries', 'The trace', 'All entries equally'], 'a', 'Dephasing destroys the coherences (off-diagonals) while leaving the populations (diagonals) unchanged.'),
    q('How is a single fixed Z gate different from decoherence?', ['Z is reversible and keeps the state pure; decoherence is irreversible and produces a mixed state', 'They are identical', 'Z is irreversible', 'Decoherence only affects |0⟩'], 'a', 'A known Z can be undone by another Z. Decoherence involves unknown interaction with the environment and cannot be undone by a fixed gate.'),
  ],
  12: [
    q('Which error flips |0⟩ to |1⟩?', ['Bit flip (X error)', 'Phase flip (Z error)', 'Global phase', 'Identity error'], 'a', 'An X error swaps the computational-basis states. A Z error only changes relative phase.'),
    q('Why does a Z error on |0⟩ appear harmless, while a Z error on |+⟩ does not?', ['|0⟩ is a Z eigenstate; |+⟩ becomes |−⟩', 'Z only acts on |+⟩', 'Z never changes anything', 'Z flips |0⟩ to |1⟩'], 'a', 'Z|0⟩ = |0⟩, but Z|+⟩ = |−⟩. Phase errors hurt states that carry phase information.'),
  ],
  13: [
    q('Deutsch-Jozsa distinguishes which two cases?', ['Constant versus balanced functions', 'Prime versus composite numbers', 'Sorted versus unsorted lists', 'Periodic versus random functions'], 'a', 'The promise is that f is either constant or balanced; one query decides which.'),
    q('Why is the ancilla prepared in |−⟩?', ['So the oracle\'s output appears as phase kickback on the input register', 'To store the answer directly', 'To reduce noise', 'Because |0⟩ cannot be used as a target'], 'a', 'With the target in |−⟩, the oracle maps |x⟩ to (−1)^f(x)|x⟩, and interference reads out the global structure of f.'),
  ],
  14: [
    q('Simon\'s algorithm finds a hidden string s such that f(x) = f(y) exactly when…', ['y = x ⊕ s', 'y = x + 1', 'y = 2x', 'x and y are both even'], 'a', 'The function is two-to-one with the hidden XOR mask s.'),
    q('What does each run of Simon\'s circuit give you?', ['A random y with y · s = 0 (mod 2)', 's directly', 'A factor of N', 'The period of a modular function'], 'a', 'You collect about n linearly independent such y values and solve the linear system classically for s.'),
  ],
  15: [
    q('Shor factors N by finding the period r of which function?', ['a^x mod N', 'x² + 1', 'sin(x)', 'x mod 2'], 'a', 'Factoring reduces to order finding for modular exponentiation.'),
    q('If a = 7 and N = 15, the period is r = 4. Which factors follow from gcd(7² ± 1, 15)?', ['3 and 5', '2 and 7', '1 and 15', '4 and 15'], 'a', '7² = 49; gcd(48, 15) = 3 and gcd(50, 15) = 5.'),
  ],
  16: [
    q('A three-qubit repetition code protects against which single error?', ['One bit flip', 'Any two errors', 'All phase errors', 'Measurement of all qubits'], 'a', 'Majority voting corrects a single X error on any one of the three qubits. Phase errors need a different code.'),
    q('Why do syndrome measurements not destroy the encoded information?', ['They measure parities, not the logical value itself', 'They are performed slowly', 'They copy the state first', 'They only measure ancillas in |+⟩'], 'a', 'Parity checks such as Z₀Z₁ reveal where an error happened without revealing whether the logical state is 0 or 1.'),
  ],
  17: [
    q('How many classical bits must Alice send to Bob in teleportation?', ['2', '1', '0', 'Infinitely many to describe the amplitudes'], 'a', 'Alice sends her two measurement results; Bob applies X and/or Z corrections accordingly.'),
    q('Does teleportation copy the original state?', ['No; Alice\'s original is destroyed by her measurement', 'Yes; both parties end with the state', 'Yes, but only for |0⟩ and |1⟩', 'Only if the Bell pair is ideal'], 'a', 'Teleportation moves the state rather than copying it, which is consistent with the no-cloning theorem.'),
  ],
  18: [
    q('What is the density matrix of the maximally mixed single qubit?', ['I/2', '|+⟩⟨+|', '|0⟩⟨0|', 'The zero matrix'], 'a', 'I/2 has equal populations and no coherences. It sits at the center of the Bloch ball.'),
    q('For a pure state ρ, what is Tr(ρ²)?', ['1', '0', '1/2', 'It depends on the basis'], 'a', 'Purity Tr(ρ²) equals 1 exactly for pure states and is below 1 for mixed states.'),
  ],
  19: [
    q('Is factoring known to be NP-complete?', ['No; it is in NP but not known to be NP-complete', 'Yes, proven', 'Yes, because of Shor\'s algorithm', 'It is undecidable'], 'a', 'Shor puts factoring in BQP, but that does not imply quantum computers solve NP-complete problems efficiently.'),
    q('Grover\'s speedup for unstructured search is…', ['Quadratic', 'Exponential', 'Linear', 'Constant'], 'a', 'Grover uses O(√N) queries versus O(N) classically, and this is provably optimal for black-box search.'),
  ],
  20: [
    q('In a variational algorithm, what does the classical computer do?', ['Update circuit parameters to minimize a measured cost', 'Simulate the full quantum state', 'Perform measurements', 'Implement the gates'], 'a', 'The quantum device estimates the cost; a classical optimizer proposes new parameters.'),
    q('Why is a barren plateau a problem?', ['Gradients vanish, so the optimizer cannot find a direction to improve', 'The circuit becomes too short', 'Measurements become deterministic', 'The Hamiltonian becomes diagonal'], 'a', 'In large, randomly initialized ansätze the cost landscape can be exponentially flat.'),
  ],
  21: [
    q('The QFT is the quantum analogue of which classical transform?', ['Discrete Fourier transform', 'Laplace transform', 'Hadamard product', 'Wavelet transform'], 'a', 'The QFT applies the DFT to the amplitude vector.'),
    q('Why can\'t you just read out all Fourier coefficients after a QFT?', ['Measurement yields one sampled outcome, not the whole amplitude vector', 'The QFT is not unitary', 'The coefficients are always zero', 'Readout is too slow'], 'a', 'The QFT is useful when the answer is concentrated in a few peaks that measurement can reveal.'),
  ],
  22: [
    q('If U|u⟩ = e^{2πiφ}|u⟩, what does phase estimation output?', ['An approximation of φ', 'The eigenvector |u⟩', 'The matrix U', 'The number of qubits'], 'a', 'The counting register ends near a binary fraction approximating φ.'),
    q('Adding more counting qubits does what?', ['Increases the precision of the estimate', 'Changes the eigenvalue', 'Removes the need for controlled-U', 'Makes the circuit shallower'], 'a', 't counting qubits give about t bits of precision, at the cost of more controlled-U applications.'),
  ],
  23: [
    q('What is the goal of Hamiltonian simulation?', ['Implement e^{-iHt} approximately with gates', 'Measure the energy directly', 'Diagonalize H classically', 'Find the ground state by annealing'], 'a', 'It approximates time evolution under H to a target accuracy.'),
    q('Why is Trotterization needed when H = A + B and A, B do not commute?', ['e^{-i(A+B)t} ≠ e^{-iAt}e^{-iBt}, so evolution is split into small steps', 'Because A and B are not Hermitian', 'Because H is time-dependent', 'To avoid measurements'], 'a', 'Splitting into many small time steps reduces the commutator error.'),
  ],
  24: [
    q('Which gate set is universal for quantum computation?', ['H, T, and CNOT', 'X and Z only', 'H and S only', 'CNOT only'], 'a', 'Clifford gates alone (H, S, CNOT) are efficiently simulable classically; adding T makes the set universal.'),
    q('What does the Solovay–Kitaev theorem guarantee?', ['Any single-qubit gate can be approximated efficiently by a finite universal set', 'Every circuit can be run without error', 'CNOT is unnecessary', 'All gates commute'], 'a', 'The sequence length grows only polylogarithmically in 1/ε.'),
  ],
  25: [
    q('A projective measurement uses projectors Pₖ. What must they sum to?', ['The identity', 'Zero', 'The density matrix', 'The Hamiltonian'], 'a', 'Completeness, Σ Pₖ = I, ensures the probabilities add up to 1.'),
    q('To measure in the X basis on hardware that only measures Z, you first apply…', ['H', 'X', 'Z', 'T'], 'a', 'H maps |+⟩ to |0⟩ and |−⟩ to |1⟩, so a Z measurement after H is an X-basis measurement.'),
  ],
  26: [
    q('What does the QFT do to a periodic superposition?', ['Concentrates amplitude near multiples of N/r', 'Makes it uniform', 'Measures the period directly', 'Removes all phases'], 'a', 'Periodic structure in one basis becomes sharp peaks in the Fourier basis.'),
    q('Why do Shor and phase estimation use the inverse QFT?', ['To convert phase information into readable computational-basis bits', 'To prepare the initial state', 'To correct errors', 'To reduce the qubit count'], 'a', 'The phases accumulated by controlled operations become a binary number after QFT⁻¹.'),
  ],
  27: [
    q('How many gates does the standard n-qubit QFT circuit use, ignoring swaps?', ['O(n²)', 'O(2ⁿ)', 'O(n)', 'O(1)'], 'a', 'n Hadamards plus about n(n−1)/2 controlled-phase rotations.'),
    q('Why are swaps added at the end of the QFT circuit?', ['The decomposition outputs qubits in reverse order', 'To cancel phases', 'To entangle the register', 'To measure the result'], 'a', 'The natural product-form circuit produces bits in reverse significance.'),
  ],
  28: [
    q('With φ = 0.101 in binary, how many counting qubits give an exact readout?', ['3', '1', '2', '8'], 'a', 'A phase with a 3-bit binary expansion is represented exactly by 3 counting qubits.'),
    q('What happens when φ is not an exact t-bit fraction?', ['The result is a nearby approximation with high probability', 'The algorithm always fails', 'The output is uniformly random', 'U must be changed'], 'a', 'Probability concentrates on the closest t-bit values; adding extra qubits raises the success probability.'),
  ],
  29: [
    q('How does first-order Trotter error scale with the step size Δt for a fixed total time t?', ['Roughly as t·Δt', 'It is independent of Δt', 'It grows exponentially in Δt', 'It is always zero'], 'a', 'The error per step is O(Δt²); over t/Δt steps that gives O(t·Δt).'),
    q('Which property of a Hamiltonian makes it efficient to simulate?', ['It is a sum of a few local terms', 'It is a large dense matrix', 'It has no eigenvalues', 'It is diagonal in an unknown basis'], 'a', 'Locality lets each term be implemented with a few gates.'),
  ],
  30: [
    q('What principle guarantees that VQE\'s measured energy is at least the ground energy?', ['The variational principle', 'The no-cloning theorem', 'The Born rule', 'Solovay–Kitaev'], 'a', '⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀ for every normalized trial state.'),
    q('How is ⟨H⟩ usually estimated on hardware?', ['Measure each Pauli term separately and sum the weighted averages', 'Read the eigenvalue directly', 'Run phase estimation', 'Apply the QFT'], 'a', 'H is decomposed into Pauli strings, each estimated from repeated shots.'),
  ],
  31: [
    q('For MaxCut, what does the cost Hamiltonian reward?', ['Edges whose endpoints are in different groups', 'Nodes with high degree', 'Edges with both endpoints in the same group', 'Fewer qubits'], 'a', 'Each cut edge contributes to the cost function being maximized.'),
    q('What does the QAOA depth p control?', ['The number of alternating cost and mixer layers', 'The number of qubits', 'The number of shots', 'The graph size'], 'a', 'Larger p gives a more expressive ansatz, at the cost of deeper circuits and harder optimization.'),
  ],
  32: [
    q('In quantum annealing, the system starts in the ground state of…', ['An easy driver Hamiltonian', 'The problem Hamiltonian', 'A random Hamiltonian', 'The identity'], 'a', 'The transverse-field driver has a simple, easily prepared ground state.'),
    q('Is a practical quantum annealer a universal gate-model computer?', ['No; it targets optimization problems and is not generally universal', 'Yes, always', 'Only at zero temperature', 'Only with error correction'], 'a', 'Commercial annealers implement a restricted model aimed at Ising-type optimization.'),
  ],
  33: [
    q('What sets the required run time of adiabatic evolution?', ['The minimum spectral gap during the evolution', 'The number of measurements', 'The size of the final answer', 'The clock speed of the hardware'], 'a', 'The run time scales roughly as 1/Δ²_min, where Δ_min is the smallest gap between the ground and first excited states.'),
    q('Adiabatic quantum computation with suitable Hamiltonians is…', ['Polynomially equivalent to the circuit model', 'Strictly weaker than classical computing', 'Exponentially more powerful than circuits', 'Unrelated to the circuit model'], 'a', 'With the right Hamiltonians, adiabatic and circuit models can simulate each other with polynomial overhead.'),
  ],
  34: [
    q('In phase estimation, why does controlled-U change the control rather than the target?', ['The target is an eigenstate, so the eigenphase kicks back to the control', 'The control is measured first', 'U only acts on controls', 'The target is discarded'], 'a', 'This is phase kickback: the target stays the same while its eigenvalue becomes a relative phase on the control.'),
    q('A Hadamard test gives P(0) = 0.9. What is Re⟨ψ|U|ψ⟩?', ['0.8', '0.9', '0.45', '0.1'], 'a', 'P(0) = (1 + Re⟨ψ|U|ψ⟩)/2, so Re⟨ψ|U|ψ⟩ = 2(0.9) − 1 = 0.8.'),
  ],
  35: [
    q('Why can\'t a quantum algorithm just read out all 2ⁿ amplitudes?', ['Measurement returns one outcome per run', 'Amplitudes are always equal', 'The state has only n amplitudes', 'Readout takes 2ⁿ gates'], 'a', 'The algorithm must use interference so that useful answers carry large probability.'),
    q('Which pair of states has identical Z-basis statistics but different interference behavior?', ['|+⟩ and |−⟩', '|0⟩ and |1⟩', '|0⟩ and |+⟩', '|1⟩ and |−⟩'], 'a', 'Both are 50/50 in the Z basis, but H maps them to |0⟩ and |1⟩ respectively.'),
  ],
  36: [
    q('Why doesn\'t no-cloning forbid copying |0⟩ and |1⟩ with a CNOT?', ['Known orthogonal states can be copied; the theorem forbids copying arbitrary unknown states', 'CNOT is not unitary', 'It does forbid it', 'Because |0⟩ and |1⟩ are entangled'], 'a', 'CNOT copies basis states, but applied to |+⟩ it produces a Bell state, not |+⟩|+⟩.'),
    q('Predict: H on q0 then CNOT (q0 → q1). Is the result |+⟩|+⟩?', ['No; it is the entangled Bell state (|00⟩ + |11⟩)/√2', 'Yes', 'Yes, up to a global phase', 'It is |+⟩|0⟩'], 'a', '|+⟩|+⟩ would give all four outcomes, but the circuit only produces 00 and 11.'),
  ],
  37: [
    q('Predict: H on both qubits, then CZ. What are the measurement probabilities?', ['All four outcomes at 1/4', '|11⟩ with probability 1', '|00⟩ with probability 1', '00 and 11 at 1/2 each'], 'a', 'The oracle only flips the sign of |11⟩. Sign changes do not alter probabilities until diffusion converts them into amplitude differences.'),
    q('With N = 4 and one marked item, how many Grover iterations give certainty?', ['1', '2', '4', 'π/4'], 'a', 'sin θ = 1/2 gives θ = 30°; one iteration rotates by 60° to reach 90°, the marked state.'),
  ],
  38: [
    q('In BB84, which bits are kept after sifting?', ['Positions where Alice and Bob used the same basis', 'All positions', 'Positions where the bits disagree', 'Only positions measured as 1'], 'a', 'Mismatched-basis results are random and are discarded.'),
    q('What does a high error rate in the checked sample indicate?', ['Possible eavesdropping or excessive noise, so the key must be discarded', 'A perfect key', 'That Bob used the wrong laser', 'Nothing; a 50% error rate is expected'], 'a', 'Above a threshold, Alice and Bob cannot distill a secure key and abort.'),
  ],
  39: [
    q('What does T2 measure?', ['How long phase coherence lasts', 'Gate speed', 'Number of qubits', 'Readout fidelity'], 'a', 'T2 is the dephasing time; T1 is the energy relaxation time.'),
    q('Why does qubit connectivity matter?', ['Two-qubit gates between distant qubits need extra SWAPs', 'It sets the measurement basis', 'It determines T1', 'It limits single-qubit gates'], 'a', 'Limited connectivity increases depth and error through routing overhead.'),
  ],
  40: [
    q('What is an ISA or native circuit?', ['A circuit expressed only in gates and couplings the target device supports', 'A circuit with no measurements', 'A circuit written in Python', 'A circuit with fewer than 5 qubits'], 'a', 'Transpilation rewrites abstract gates into the device\'s native instruction set.'),
    q('Why might two transpilations of the same circuit perform differently on hardware?', ['Different layouts, routing, and gate counts lead to different accumulated error', 'Transpilation changes the algorithm\'s answer', 'One of them skips measurement', 'They cannot differ'], 'a', 'The logical function is the same, but depth, SWAP count, and qubit choice affect noise.'),
  ],
};
