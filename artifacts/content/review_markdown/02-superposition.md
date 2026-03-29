# Lesson 2: Superposition

- Slug: `superposition`
- Difficulty: `beginner`
- Stage: `foundation`
- Prerequisites: `[1]`

## Learning Objective

Explain superposition as linear combination in Hilbert space and understand why it enables quantum algorithms to manipulate multiple amplitudes coherently.

## Intuition

**Analogy**  
A student before answering roll-call could be present, late, or absent. Until the reply comes, the teacher holds a cloud of possible statuses in mind rather than one finalized classroom record.

**Story**  
The class has not yet collapsed into the marked register. There is still a structured uncertainty around the student's state, and the lesson uses that moment to build intuition for a qubit held in a superposed state before measurement.

**Why It Works**  
The analogy helps learners picture a state that has not yet been forced into a single declared outcome. That makes it easier to understand why a qubit can evolve through gates before measurement fixes the result.

**Limitations**  
For a real student, one physical status already exists even if the teacher does not know it. In quantum mechanics, superposition is not just ignorance about a hidden answer; the amplitudes themselves are part of the physical state.

## Math

- LaTeX: `|\psi\rangle = \alpha |0\rangle + \beta |1\rangle`
  Meaning: Superposition means the state contains weighted components along both basis states.
  Variables: `\alpha` = Complex amplitude of |0\rangle, `\beta` = Complex amplitude of |1\rangle
- LaTeX: `H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}}`
  Meaning: A Hadamard gate creates an equal superposition from the basis state |0\rangle.

**Derivation**  
Because state evolution is linear, a gate can map a basis state into a weighted combination of basis states. The Hadamard gate is the standard example: it rotates the qubit from the computational axis into an equal superposition.

**Notes**  
Superposition is not classical ignorance. Relative phase between amplitudes affects later outcomes through interference.

## Physics

**Concept**  
A physical two-level quantum system can occupy a coherent combination of energy, spin, or polarization basis states.

**Real-World Mapping**  
A photon can exist in a coherent mix of horizontal and vertical polarization until it is measured by a polarizer.

**Importance**  
Superposition is the resource that lets quantum circuits process amplitude distributions instead of single classical paths.

## Quantum Mechanics

**Formal Definition**  
Superposition is the statement that if \(|0\rangle\) and \(|1\rangle\) are valid states in Hilbert space, then any normalized linear combination of them is also a valid state.

**State Space**  
Single-qubit Hilbert space \(\mathbb{C}^2\), with superposition represented by vector addition.

**Operators Involved**

- Hadamard operator H
- Projective measurement operators in the computational basis
- Pauli operators as basis rotations

## Circuit

**Description**  
Prepare |0>, apply a Hadamard gate, and measure to observe the equal superposition as a balanced output distribution.

**Gates**  
`['H', 'Measure']`

```python
from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
Sampling the circuit many times gives approximately 50% 0 and 50% 1.

## Visualization

- Type: `bloch_sphere`
- Interactive: `True`
- Description: Animate the qubit moving from the north pole to the equator when the Hadamard gate is applied.

## Applications

- Quantum parallel state preparation
- Amplitude amplification foundations
- Interference-based algorithm design

## Interview Ready

Superposition means a qubit can occupy a coherent linear combination of basis states. The crucial point is coherence: the amplitudes evolve together under unitary gates, so later operations can make them reinforce or cancel.

**Common Questions**

- How is superposition different from a classical probability distribution?
- Why does phase matter in a superposed state?
- What gate creates an equal superposition from |0>?
