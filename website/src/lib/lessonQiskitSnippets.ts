export type LessonQiskitSnippet = {
  title: string;
  note: string;
  code: string;
};

const circuit = (body: string) => `from qiskit import QuantumCircuit\nfrom qiskit.primitives import StatevectorSampler\n\ncircuit = QuantumCircuit(2)\n${body}\ncircuit.measure_all()\n\nsampler = StatevectorSampler()\nresult = sampler.run([circuit], shots=1024).result()[0]\nprint(circuit)\nprint(result.data.meas.get_counts())\n# Qiskit bitstrings read right-to-left: the rightmost bit is qubit 0.`;

export const LESSON_QISKIT_SNIPPETS: Record<number, LessonQiskitSnippet> = {
  1: { title: 'Create a first superposition', note: 'The Hadamard gate turns |0> into equal 0/1 measurement probabilities.', code: circuit('circuit.h(0)') },
  2: { title: 'Control a superposition', note: 'Change the gate or shots and compare the measured distribution.', code: circuit('circuit.h(0)\ncircuit.x(1)') },
  3: { title: 'Measure a prepared state', note: 'Measurement converts the amplitudes prepared by H into sampled classical results.', code: circuit('circuit.h(0)') },
  4: { title: 'Build a Bell pair', note: 'The H-CX pattern creates correlated 00 and 11 outcomes.', code: circuit('circuit.h(0)\ncircuit.cx(0, 1)') },
  5: { title: 'Make interference visible', note: 'The Z phase between two H gates changes the final measurement result.', code: circuit('circuit.h(0)\ncircuit.z(0)\ncircuit.h(0)') },
  6: { title: 'Use reversible gates', note: 'Applying H twice returns the qubit to its starting state because H squared is identity.', code: circuit('circuit.h(0)\ncircuit.h(0)') },
  7: { title: 'Move around the Bloch sphere', note: 'RY rotates a qubit by a chosen angle around the Y axis.', code: `from math import pi\nfrom qiskit import QuantumCircuit\nfrom qiskit.primitives import StatevectorSampler\n\ncircuit = QuantumCircuit(1)\ncircuit.ry(pi / 2, 0)\ncircuit.measure_all()\n\nresult = StatevectorSampler().run([circuit], shots=1024).result()[0]\nprint(result.data.meas.get_counts())` },
  8: { title: 'Combine two qubits', note: 'Tensor-product structure becomes visible when a two-qubit circuit is measured.', code: circuit('circuit.h(0)\ncircuit.x(1)') },
  9: { title: 'Read a circuit as operations', note: 'The gates execute in order from top to bottom in the circuit diagram.', code: circuit('circuit.h(0)\ncircuit.cx(0, 1)\ncircuit.x(1)') },
  10: { title: 'See phase kickback', note: "The target is an eigenstate (|->), so CNOT leaves it unchanged and flips the control's phase; H makes that phase readable.", code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

circuit = QuantumCircuit(2)
circuit.x(1)
circuit.h(1)          # target in |->, an eigenstate of X with eigenvalue -1
circuit.h(0)          # control in |+>
circuit.cx(0, 1)      # the eigenvalue -1 kicks back: control becomes |->
circuit.h(0)          # |-> -> |1>: the phase is now visible
circuit.h(1)          # |-> -> |1> (unchanged target, just rotated for readout)
circuit.measure_all()

counts = StatevectorSampler().run([circuit], shots=1024).result()[0].data.meas.get_counts()
print(counts)  # {'11': 1024}: the control reads 1 because of kickback` },
  11: { title: 'Compare a coherent phase change', note: 'This is a reversible Z phase flip, used as a clean contrast with stochastic decoherence.', code: circuit('circuit.h(0)\ncircuit.z(0)\ncircuit.h(0)') },
  12: { title: 'Model a simple bit-flip pattern', note: 'The X gate is a deterministic error sketch; real noise requires a channel or hardware execution.', code: circuit('circuit.h(0)\ncircuit.x(0)') },
  13: { title: 'Run a balanced Deutsch-Jozsa oracle', note: 'This complete 2-input example uses an ancilla prepared in |-> and the balanced oracle f(x)=x₀.', code: `from qiskit import QuantumCircuit\nfrom qiskit.primitives import StatevectorSampler\n\ncircuit = QuantumCircuit(3)\ncircuit.x(2)\ncircuit.h([0, 1, 2])\ncircuit.cx(0, 2)\ncircuit.h([0, 1])\ncircuit.measure_all()\n\nresult = StatevectorSampler().run([circuit], shots=1024).result()[0]\nprint(result.data.meas.get_counts())\n# Bitstrings read q2 q1 q0 (qubit 0 is rightmost). Expect only x01 outcomes: the input register q1 q0 reads 01, never 00.` },
  14: { title: "Run Simon's algorithm for n = 2", note: 'The oracle f(x) = x0 XOR x1 hides s = 11. Only strings y with y·s = 0 can appear.', code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# Simon's algorithm for n = 2. The oracle f(x) = x0 XOR x1 hides s = 11.
circuit = QuantumCircuit(3, 2)
circuit.h([0, 1])
circuit.cx(0, 2)
circuit.cx(1, 2)
circuit.h([0, 1])
circuit.measure([0, 1], [0, 1])

counts = StatevectorSampler().run([circuit], shots=1024).result()[0].data.c.get_counts()
print(counts)  # only '00' and '11' appear: every y satisfies y·s = 0 (mod 2)` },
  15: { title: 'Find the period of 7^x mod 15', note: 'Peaks at multiples of 16/4 give r = 4 by continued fractions, and gcd gives the factors 3 and 5. The oracle stands in for modular exponentiation.', code: `from fractions import Fraction
from math import gcd, pi
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# Period finding for N = 15, a = 7. The period of 7^x mod 15 is r = 4.
# Real Shor circuits compute 7^x mod 15 with modular arithmetic; here the oracle
# copies x mod 4 into the output register, which has the same period and the same peaks.
t = 4                                   # input register: Q = 2^4 = 16
circuit = QuantumCircuit(t + 2, t)
circuit.h(range(t))
circuit.cx(0, t)                        # output = x mod 4 (lowest two bits of x)
circuit.cx(1, t + 1)

# Inverse QFT on the input register
for j in range(t // 2):
    circuit.swap(j, t - 1 - j)
for j in range(t):
    for k in range(j):
        circuit.cp(-pi / 2 ** (j - k), k, j)
    circuit.h(j)
circuit.measure(range(t), range(t))

counts = StatevectorSampler(seed=5).run([circuit], shots=1000).result()[0].data.c.get_counts()
print({int(bits, 2): n for bits, n in sorted(counts.items())})   # peaks at 0, 4, 8, 12

for y in sorted({int(bits, 2) for bits in counts}):
    r = Fraction(y, 16).limit_denominator(15).denominator      # continued fractions
    if y and r % 2 == 0 and pow(7, r, 15) == 1:
        print(f"y = {y}: r = {r}, factors {gcd(7 ** (r // 2) - 1, 15)} and {gcd(7 ** (r // 2) + 1, 15)}")` },
  16: { title: 'Extract an error syndrome', note: 'Encode, inject a bit flip on qubit 1, and read the two parity checks without touching the data.', code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

circuit = QuantumCircuit(5, 2)
circuit.h(0)                        # logical state (|0> + |1>)/sqrt(2)
circuit.cx(0, 1)
circuit.cx(0, 2)                    # encode: (|000> + |111>)/sqrt(2)
circuit.x(1)                        # inject a bit-flip error on qubit 1
circuit.cx(0, 3)
circuit.cx(1, 3)                    # ancilla 3 = parity(q0, q1)
circuit.cx(1, 4)
circuit.cx(2, 4)                    # ancilla 4 = parity(q1, q2)
circuit.measure([3, 4], [0, 1])

counts = StatevectorSampler().run([circuit], shots=1024).result()[0].data.c.get_counts()
print(counts)  # {'11': 1024}: both checks fire, so the error is on qubit 1` },
  17: { title: 'Teleport a qubit (deferred measurement)', note: 'Controlled corrections replace the classical feed-forward; the fidelity check confirms Bob holds the input state.', code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import DensityMatrix, Statevector, partial_trace, state_fidelity

circuit = QuantumCircuit(3)
circuit.rx(0.8, 0)                  # the state to teleport
circuit.h(1)
circuit.cx(1, 2)                    # Bell pair shared by Alice (q1) and Bob (q2)
circuit.cx(0, 1)
circuit.h(0)                        # Bell-basis change on Alice's qubits
circuit.cx(1, 2)                    # X correction, controlled by m1 (deferred measurement)
circuit.cz(0, 2)                    # Z correction, controlled by m0

bob = partial_trace(Statevector(circuit), [0, 1])
original = QuantumCircuit(1)
original.rx(0.8, 0)
print(f"fidelity of Bob's qubit with the input: {state_fidelity(bob, DensityMatrix(original)):.6f}")  # 1.000000` },
  18: { title: 'Trace out half of a Bell pair', note: 'The pair is pure, but each qubit alone is the maximally mixed state I/2 with purity 0.5.', code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector, partial_trace

bell = QuantumCircuit(2)
bell.h(0)
bell.cx(0, 1)

qubit_a = partial_trace(Statevector(bell), [1])  # trace out qubit 1
print(qubit_a)                                   # [[0.5, 0], [0, 0.5]] = I/2
print("purity of one qubit:", round(qubit_a.purity().real, 3))  # 0.5, although the pair is pure` },
  19: { title: 'Compare circuit growth', note: 'Complexity is about how resources scale as the input grows, not only the output of one circuit.', code: `from qiskit import QuantumCircuit\n\nfor qubits in [2, 4, 8]:\n    circuit = QuantumCircuit(qubits)\n    for index in range(qubits):\n        circuit.h(index)\n    print(qubits, circuit.size(), 'gates')` },
  20: { title: 'Train a one-parameter ansatz', note: 'Gradient descent with the parameter-shift rule finds the ground energy of H = Z + 0.5X.', code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.circuit import Parameter
from qiskit.quantum_info import SparsePauliOp
from qiskit.primitives import StatevectorEstimator

theta = Parameter("theta")
ansatz = QuantumCircuit(1)
ansatz.ry(theta, 0)
hamiltonian = SparsePauliOp.from_list([("Z", 1.0), ("X", 0.5)])
estimator = StatevectorEstimator()

def energy(value):
    return float(estimator.run([(ansatz, hamiltonian, [value])]).result()[0].data.evs)

t = 0.6
for step in range(40):
    gradient = (energy(t + np.pi / 2) - energy(t - np.pi / 2)) / 2  # parameter-shift rule
    t -= 0.4 * gradient
print(f"theta = {np.degrees(t) % 360:.1f} degrees, energy = {energy(t):.4f}")  # about 206.6 and -1.1180` },
  21: { title: 'Check the two-qubit QFT', note: 'The amplitudes of F|1> are (1, i, -1, -i)/2, exactly the second column of the QFT matrix.', code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFTGate
from qiskit.quantum_info import Statevector

# QFT of |x = 1> on two qubits. Qiskit numbers basis states with qubit 0 as the lowest bit.
circuit = QuantumCircuit(2)
circuit.x(0)                          # |x = 1>
circuit.append(QFTGate(2), [0, 1])

print(np.round(Statevector(circuit).data, 3))   # [0.5, 0.5j, -0.5, -0.5j] = (1, i, -1, -i)/2` },
  22: { title: 'Read an eigenphase with one qubit', note: 'Controlled-Z on the eigenstate |1> kicks back phase 1/2, which the final H turns into the bit 1.', code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# One counting qubit reads the eigenphase of Z on |1>: Z|1> = -|1> = e^(2*pi*i*1/2)|1>.
circuit = QuantumCircuit(2, 1)
circuit.x(1)          # eigenstate |1>
circuit.h(0)          # counting qubit in |+>
circuit.cz(0, 1)      # controlled-Z: the eigenvalue kicks back onto qubit 0
circuit.h(0)
circuit.measure(0, 0)

counts = StatevectorSampler().run([circuit], shots=1024).result()[0].data.c.get_counts()
print(counts)  # {'1': 1024}: phase = 0.1 in binary = 1/2` },
  23: { title: 'Check the ZZ evolution circuit', note: 'CNOT, RZ, CNOT equals exp(-iθ Z⊗Z), the building block of Ising-model simulation.', code: `from qiskit import QuantumCircuit
from qiskit.circuit.library import RZZGate
from qiskit.quantum_info import Operator

theta = 0.37
manual = QuantumCircuit(2)
manual.cx(0, 1)
manual.rz(2 * theta, 1)
manual.cx(0, 1)

reference = QuantumCircuit(2)
reference.append(RZZGate(2 * theta), [0, 1])   # RZZ(2θ) = exp(-iθ Z⊗Z)

print(Operator(manual).equiv(Operator(reference)))  # True: CNOT, RZ, CNOT implements exp(-iθ Z⊗Z)` },
  24: { title: 'Try a universal gate set', note: 'H, T, and CX provide basis change, non-Clifford phase, and entanglement.', code: circuit('circuit.h(0)\ncircuit.t(0)\ncircuit.cx(0, 1)') },
  25: { title: 'Measure in a different basis', note: 'A final H changes a computational-basis measurement into an X-basis measurement.', code: circuit('circuit.h(0)\ncircuit.h(0)') },
  26: { title: 'Turn a period into peaks', note: 'A period-4 state in N = 8 becomes four equal peaks at multiples of N/r = 2.', code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFTGate
from qiskit.quantum_info import Statevector

# Period r = 4 in N = 8: the state (|0> + |4>)/sqrt(2). The QFT gives peaks at multiples of N/r = 2.
circuit = QuantumCircuit(3)
circuit.h(2)                          # (|0> + |4>)/sqrt(2): qubit 2 is the highest bit
circuit.append(QFTGate(3), [0, 1, 2])

probabilities = Statevector(circuit).probabilities()
print({k: round(float(p), 3) for k, p in enumerate(probabilities)})   # 0.25 at k = 0, 2, 4, 6` },
  27: { title: 'Build and count a QFT circuit', note: "A hand-built 5-qubit QFT uses 5 H, 10 controlled phases, and 2 swaps, and matches Qiskit's QFT exactly.", code: `from math import pi
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFTGate
from qiskit.quantum_info import Operator

def qft_circuit(n):
    circuit = QuantumCircuit(n)
    for j in reversed(range(n)):
        circuit.h(j)
        for k in reversed(range(j)):
            circuit.cp(pi / 2 ** (j - k), k, j)   # rotation R_(j-k+1)
    for j in range(n // 2):
        circuit.swap(j, n - 1 - j)
    return circuit

n = 5
circuit = qft_circuit(n)
print(dict(circuit.count_ops()))                        # h: 5, cp: 10, swap: 2
print(Operator(circuit).equiv(Operator(QFTGate(n))))   # True: matches Qiskit's QFT` },
  28: { title: 'Estimate the phase of T with three qubits', note: 'Controlled powers of T plus an inverse QFT read the eigenphase 1/8 exactly as 001.', code: `from math import pi
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# Phase estimation of T on |1>: the eigenphase is 1/8 = 0.001 in binary.
t = 3
circuit = QuantumCircuit(t + 1, t)
circuit.x(t)                          # eigenstate |1> on the last qubit
circuit.h(range(t))
for j in range(t):
    circuit.cp(2 * pi * (1 / 8) * 2**j, j, t)   # controlled-T^(2^j)

# Inverse QFT on the counting qubits
for j in range(t // 2):
    circuit.swap(j, t - 1 - j)
for j in range(t):
    for k in range(j):
        circuit.cp(-pi / 2 ** (j - k), k, j)
    circuit.h(j)

circuit.measure(range(t), range(t))
counts = StatevectorSampler().run([circuit], shots=1024).result()[0].data.c.get_counts()
print(counts)  # {'001': 1024}: read as binary 0.001 = 1/8` },
  29: { title: 'Measure Trotter error', note: 'Compare first-order product formulas with the exact evolution for H = X + Z, and with the t²/r bound.', code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Operator, SparsePauliOp

# H = X + Z. The two terms do not commute, so exp(-iHt) must be approximated.
hamiltonian = SparsePauliOp.from_list([("X", 1.0), ("Z", 1.0)]).to_matrix()
t = 2.0
w, v = np.linalg.eigh(hamiltonian)
exact = v @ np.diag(np.exp(-1j * w * t)) @ v.conj().T

for r in [4, 16, 64, 256]:
    circuit = QuantumCircuit(1)
    for _ in range(r):
        circuit.rz(2 * t / r, 0)   # exp(-i Z t/r)
        circuit.rx(2 * t / r, 0)   # exp(-i X t/r)
    error = np.linalg.norm(exact - Operator(circuit).data, 2)
    print(f"r = {r:3d}: error = {error:.5f}, bound t^2/r = {t * t / r:.5f}")` },
  30: { title: 'Estimate an energy from shots', note: 'Two measurement settings give <Z> and <X>; the error bar shrinks like 1/√N.', code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# E(theta) = <Z> + 0.5 <X> for H = Z + 0.5 X, estimated from shots of two measurement settings.
theta = np.pi + np.arctan(0.5)          # the exact minimizer, about 206.6 degrees
sampler = StatevectorSampler(seed=11)

def average(basis, shots):
    circuit = QuantumCircuit(1)
    circuit.ry(theta, 0)
    if basis == "X":
        circuit.h(0)                    # rotate so an X measurement becomes a Z measurement
    circuit.measure_all()
    counts = sampler.run([circuit], shots=shots).result()[0].data.meas.get_counts()
    return (counts.get("0", 0) - counts.get("1", 0)) / shots   # average of +1/-1 outcomes

for shots in [100, 10_000, 1_000_000]:
    z, x = average("Z", shots), average("X", shots)
    energy = z + 0.5 * x
    std_error = np.sqrt((1 - z**2) / shots + 0.25 * (1 - x**2) / shots)
    print(f"{shots:>9} shots: E = {energy:.4f} ± {1.96 * std_error:.4f} (exact -1.1180)")` },
  31: { title: 'Solve single-edge MaxCut with p = 1', note: 'At γ = π/2 and β = π/8, every sample is an optimal cut (01 or 10).', code: `from math import pi
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# QAOA with p = 1 for MaxCut on a single edge. Cost C = (1 - Z0 Z1)/2 counts cut edges.
gamma, beta = pi / 2, pi / 8

circuit = QuantumCircuit(2)
circuit.h([0, 1])                     # uniform guess
circuit.rzz(-gamma, 0, 1)             # exp(-i gamma C), up to a global phase
circuit.rx(2 * beta, 0)               # mixer exp(-i beta X) on each qubit
circuit.rx(2 * beta, 1)
circuit.measure_all()

counts = StatevectorSampler().run([circuit], shots=1024).result()[0].data.meas.get_counts()
print(counts)  # only '01' and '10': every sample is an optimal cut` },
  32: { title: 'Find the minimum gap of an anneal', note: 'Exact diagonalization along the schedule locates the smallest gap, which sets how slowly the anneal must run.', code: `import numpy as np
from qiskit.quantum_info import SparsePauliOp

# Two-spin annealing problem: H(s) = (1 - s) H0 + s HP.
driver = SparsePauliOp.from_list([("IX", -1.0), ("XI", -1.0)])          # -(X0 + X1)
problem = SparsePauliOp.from_list([("ZZ", 1.0), ("IZ", 0.5)])           # Z0 Z1 + 0.5 Z0

gaps = []
for s in np.linspace(0, 1, 201):
    energies = np.linalg.eigvalsh(((1 - s) * driver + s * problem).to_matrix())
    gaps.append((energies[1] - energies[0], s))
gap, where = min(gaps)
print(f"minimum gap {gap:.3f} at s = {where:.2f}")                      # about 0.658 at s = 0.63

ground = np.linalg.eigh(problem.to_matrix())[1][:, 0]
print("ground state of HP:", format(int(np.argmax(abs(ground))), "02b"))  # '01' in Qiskit order: q0 = 1, q1 = 0` },
  33: { title: 'Sweep slowly, then quickly', note: 'A Trotterized adiabatic sweep reaches the ground state only when the total time is long compared with 1/Δ².', code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

# Adiabatic sweep H(s) = -(1 - s) X - s Z, from ground state |+> to ground state |0>.
def sweep(total_time, steps=400):
    dt = total_time / steps
    circuit = QuantumCircuit(1)
    circuit.h(0)                                # ground state of -X
    for k in range(steps):
        s = (k + 0.5) / steps
        circuit.rx(-2 * (1 - s) * dt, 0)        # exp(+i (1-s) X dt)
        circuit.rz(-2 * s * dt, 0)              # exp(+i s Z dt)
    return Statevector(circuit).probabilities()[0]

for total_time in [0.2, 1, 3, 10]:
    print(f"T = {total_time:>4}: P(ground state |0>) = {sweep(total_time):.3f}")` },
  34: { title: 'Make kickback measurable', note: 'The target is prepared in an X eigenstate so the controlled operation contributes a phase to the control.', code: circuit('circuit.h(0)\ncircuit.x(1)\ncircuit.h(1)\ncircuit.cx(0, 1)\ncircuit.h(1)\ncircuit.h(0)') },
  35: { title: 'Watch amplitude amplification rotate', note: 'Grover on 8 items: the success probability follows sin²((2k+1)θ) and falls again after the optimum.', code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

def ccz(circuit):
    circuit.h(2)
    circuit.ccx(0, 1, 2)
    circuit.h(2)

# Grover on N = 8 with marked item 111: sin(theta) = 1/sqrt(8).
theta = np.arcsin(1 / np.sqrt(8))
for k in [1, 2, 3]:
    circuit = QuantumCircuit(3)
    circuit.h(range(3))
    for _ in range(k):
        ccz(circuit)                  # oracle: flip the sign of |111>
        circuit.h(range(3))
        circuit.x(range(3))
        ccz(circuit)                  # reflect about |000> (up to a global phase)
        circuit.x(range(3))
        circuit.h(range(3))
    circuit.measure_all()
    counts = StatevectorSampler(seed=1).run([circuit], shots=4000).result()[0].data.meas.get_counts()
    print(f"k = {k}: measured P(111) = {counts.get('111', 0) / 4000:.3f}, formula = {np.sin((2 * k + 1) * theta) ** 2:.3f}")` },
  36: { title: 'See why CNOT is not a universal copier', note: 'CNOT copies computational-basis correlation but sends a superposition input to an entangled state.', code: circuit('circuit.h(0)\ncircuit.cx(0, 1)') },
  37: { title: 'Run a two-qubit Grover search', note: 'One oracle call and one diffusion step find the marked item |11> with probability 1 when N = 4.', code: `from qiskit import QuantumCircuit\nfrom qiskit.primitives import StatevectorSampler\n\ncircuit = QuantumCircuit(2)\ncircuit.h([0, 1])\n\n# Oracle: flip the sign of |11>\ncircuit.cz(0, 1)\n\n# Diffusion: reflect amplitudes about their average\ncircuit.h([0, 1])\ncircuit.x([0, 1])\ncircuit.cz(0, 1)\ncircuit.x([0, 1])\ncircuit.h([0, 1])\n\ncircuit.measure_all()\nresult = StatevectorSampler().run([circuit], shots=1024).result()[0]\nprint(result.data.meas.get_counts())  # expect {'11': 1024}` },
  38: { title: 'Write the BB84 basis table', note: 'This compact classical sketch illustrates basis choices and sifting; it is not a security implementation.', code: `import random\n\nalice_bits = [random.randrange(2) for _ in range(8)]\nalice_bases = [random.choice(['Z', 'X']) for _ in alice_bits]\nbob_bases = [random.choice(['Z', 'X']) for _ in alice_bits]\nkept = [index for index, (alice, bob) in enumerate(zip(alice_bases, bob_bases)) if alice == bob]\nprint('Alice bases:', alice_bases)\nprint('Bob bases:  ', bob_bases)\nprint('Kept indexes:', kept)\n# A real protocol needs quantum transmission, authentication, error testing, and privacy amplification.` },
  39: { title: 'Build an error budget', note: "Multiply the fidelities of every operation to estimate a circuit's success probability.", code: `# An error budget: success probability is roughly the product of all operation fidelities.
two_qubit, one_qubit, readout = 0.995, 0.9995, 0.99
counts = {"two-qubit gates": 50, "one-qubit gates": 100, "readouts": 5}

success = two_qubit ** counts["two-qubit gates"] * one_qubit ** counts["one-qubit gates"] * readout ** counts["readouts"]
print(f"estimated success probability: {success:.3f}")          # about 0.704

better = 0.999 ** counts["two-qubit gates"] * one_qubit ** counts["one-qubit gates"] * readout ** counts["readouts"]
print(f"with 99.9% two-qubit gates: {better:.3f}")              # about 0.861

needed = 0.5 ** (1 / 200)
print(f"fidelity needed for 200 two-qubit gates at 50% success: {needed:.5f}")` },
  40: { title: 'Inspect a hardware-aware circuit', note: 'Qiskit transpilation maps an abstract circuit to a target basis; the exact result depends on the backend and settings.', code: `from qiskit import QuantumCircuit, transpile\n\ncircuit = QuantumCircuit(2)\ncircuit.h(0)\ncircuit.cx(0, 1)\ncompiled = transpile(circuit, basis_gates=['rz', 'sx', 'x', 'cx'], optimization_level=1)\nprint(compiled)\nprint('depth:', compiled.depth())` },
};
