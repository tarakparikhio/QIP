# Lesson 30: Variational Quantum Eigensolver (VQE)

- Slug: `variational-quantum-eigensolver-vqe`
- Difficulty: `advanced`
- Stage: `advanced`
- Prerequisites: `[14, 15, 29]`

## Learning Objective

Understand VQE as a hybrid quantum-classical optimization loop that searches for low-energy states using a parameterized circuit.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_26_30.pdf` page `5`

**Quantum Concept**  
VQE is a hybrid quantum-classical algorithm for finding minimum energy states. It iteratively adjusts parameters to minimize output. VQE is robust for near-term quantum devices.

**Original Analogy**  
ADAS systems in cars: continuously measure -> adjust -> optimize driving conditions for efficiency.

**Combined Insight**  
VQE mirrors ADAS feedback cycles-measure, adjust, and converge toward optimal performance.

## Intuition

**Analogy**  
ADAS systems in cars: continuously measure -> adjust -> optimize driving conditions for efficiency.

**Story**  
The ADAS analogy is strong because it centers on repeated sensing, adjustment, and improvement under feedback. VQE works exactly this way: propose parameters, measure performance, update, and repeat until the energy is lowered.

**Why It Works**  
It captures the feedback-loop nature of the algorithm rather than treating it as a single closed-form computation.

**Limitations**  
ADAS optimizes a classical control problem with sensors and heuristics, while VQE estimates a quantum expectation value and uses an optimizer over circuit parameters.

## Math

- LaTeX: `E(\theta) = \langle \psi(\theta)|H|\psi(\theta)\rangle`
  Meaning: VQE minimizes the expected energy of a parameterized trial state.
- LaTeX: `|\psi(\theta)\rangle = U(\theta)|0\cdots 0\rangle`
  Meaning: A variational ansatz prepares the trial state.

**Derivation**  
Choose a parameterized ansatz, evaluate the Hamiltonian expectation value on a quantum device, and let a classical optimizer update the parameters. The loop repeats until the measured energy stabilizes near a minimum.

**Notes**  
VQE trades long coherent circuits for repeated shorter measurements, making it attractive for near-term devices.

## Physics

**Concept**  
VQE estimates ground-state energies of Hamiltonians using hybrid optimization.

**Real-World Mapping**  
It is widely discussed for molecular energy estimation and small quantum chemistry benchmarks.

**Importance**  
It is a flagship NISQ-era algorithm because it mixes quantum state preparation with classical optimization.

## Quantum Mechanics

**Formal Definition**  
VQE uses the variational principle to upper-bound a Hamiltonian's ground-state energy via a parameterized quantum state family.

**State Space**  
The ansatz explores a subset of the full Hilbert space of the encoded problem Hamiltonian.

**Operators Involved**

- Problem Hamiltonian H
- Parameterized unitary ansatz \(U(\theta)\)
- Measurement operators for expectation estimation

## Circuit

**Description**  
Use a tiny two-qubit ansatz with one rotation layer and one entangling gate to illustrate the variational state-preparation step.

**Gates**  
`['Ry', 'CX', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import pi\n\nqc = QuantumCircuit(2, 2)\nqc.ry(pi / 4, 0)\nqc.ry(pi / 6, 1)\nqc.cx(0, 1)\nqc.measure([0, 1], [0, 1])\nprint(qc)
```

**Expected Output**  
The circuit prepares one candidate trial state; VQE would repeat this with updated parameters based on measured energy estimates.

## Visualization

- Type: `probability_chart`
- Interactive: `True`
- Description: Show a feedback loop between a parameter slider, measured energy estimate, and optimizer update.

## Applications

- Quantum chemistry
- Ground-state estimation
- Hybrid quantum-classical workflows

## Interview Ready

VQE is a hybrid algorithm built around the variational principle. A quantum computer prepares and measures trial states, while a classical optimizer updates parameters to reduce the estimated energy.

**Common Questions**

- Why is VQE considered suitable for near-term devices?
- What role does the variational principle play?
- Why does VQE need repeated measurements rather than one circuit run?
