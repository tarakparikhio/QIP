# Lesson 15: Eigenstates & Eigenvalues

- Slug: `eigenstates-and-eigenvalues`
- Difficulty: `intermediate`
- Stage: `intermediate`
- Prerequisites: `[14]`

## Learning Objective

Learn what eigenstates and eigenvalues mean physically and why they organize measurement outcomes and Hamiltonian behavior.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_11_15.pdf` page `5`

**Quantum Concept**  
Eigenstates remain unchanged except for a phase when acted on by an operator. Eigenvalues describe measurable outcomes. They are crucial in understanding stability and measurement.

**Original Analogy**  
Vehicle quality testing: under controlled conditions, stable behaviors reveal true characteristics of a machine.

**Combined Insight**  
Eigenstates represent stable truths-unchanged under tests-just like reliable machine responses.

## Intuition

**Analogy**  
Vehicle quality testing: under controlled conditions, stable behaviors reveal true characteristics of a machine.

**Story**  
The original lesson associates eigenstructure with stable stages along a guided path. The useful intuition is that some states line up naturally with the governing operator and therefore respond in a simple, predictable way.

**Why It Works**  
An eigenstate is precisely a state that an operator acts on without changing its direction in Hilbert space, only its scale or phase.

**Limitations**  
Personal stages are not eigenvectors, and human development is not a linear operator. The analogy only conveys the idea of preferred, stable modes under a rule.

## Math

- LaTeX: `A|\psi\rangle = \lambda |\psi\rangle`
  Meaning: An eigenstate of operator \(A\) returns the same direction scaled by eigenvalue \(\lambda\).
- LaTeX: `Z|0\rangle = |0\rangle,\quad Z|1\rangle = -|1\rangle`
  Meaning: The computational basis states are eigenstates of the Pauli-Z operator.

**Derivation**  
When an observable or Hamiltonian acts on one of its eigenstates, the result is simple: the state keeps its direction and only gains a scalar factor. That is why eigenstates are natural bases for analysis and measurement.

**Notes**  
For Hamiltonians, eigenvalues correspond to energies; for observables more generally, they correspond to measurement outcomes.

## Physics

**Concept**  
Eigenstates are the stationary or preferred states of an operator, and eigenvalues are the measurable values associated with them.

**Real-World Mapping**  
Energy levels of atoms and spin-up/spin-down states in magnetic fields are classic eigenstate examples.

**Importance**  
Eigenstructure underlies spectroscopy, measurement theory, Hamiltonian simulation, and phase estimation.

## Quantum Mechanics

**Formal Definition**  
An eigenstate of an operator is a nonzero vector that the operator maps to a scalar multiple of itself.

**State Space**  
Eigenstates form bases or subspaces inside the system Hilbert space, often simplifying dynamics and measurement.

**Operators Involved**

- Observable A
- Hamiltonian H
- Projectors onto eigenspaces

## Circuit

**Description**  
Prepare \(|1\rangle\), apply a \(Z\) gate, and note that the basis state is preserved up to a sign.

**Gates**  
`['X', 'Z', 'Measure']`

```python
from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(1, 1)\nqc.x(0)\nqc.z(0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
Measurement still returns 1 because the \(Z\) gate changes phase, not the computational-basis population, illustrating eigenstate behavior.

## Visualization

- Type: `probability_chart`
- Interactive: `True`
- Description: Show operators acting on basis states and highlight when the direction is preserved but the eigenvalue changes sign or phase.

## Applications

- Measurement analysis
- Hamiltonian diagonalization
- Phase estimation

## Interview Ready

Eigenstates are important because they make operator action simple. When a system is in an eigenstate of an observable, measurement outcomes are definite, and when it is in an eigenstate of a Hamiltonian, evolution has a clean phase structure.

**Common Questions**

- Why do eigenstates matter for measurement?
- What is the difference between changing phase and changing measurement outcome?
- How do Hamiltonian eigenvalues connect to energy?
