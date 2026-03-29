# Lesson 1: Birth of Quantum Information

- Slug: `birth-of-quantum-information`
- Difficulty: `beginner`
- Stage: `foundation`
- Prerequisites: `[]`

## Learning Objective

Understand why a qubit is more expressive than a classical bit and how amplitudes, phase, and measurement define quantum information.

## Intuition

**Analogy**  
A classroom before attendance: students might be present, late, asleep, or absent. Multiple possibilities exist in the teacher's mind before roll-call fixes one status.

**Story**  
The room is real, but the final attendance sheet is not written yet. Before the teacher calls each name, the classroom contains a structured space of possible states. The lesson uses that moment to build intuition for a qubit: a system that has a valid state before a final classical answer is extracted.

**Why It Works**  
The classroom analogy captures the idea of a state space that contains multiple allowed possibilities before observation produces one explicit record. It helps a beginner separate the existence of a system from the final act of declaring a classical outcome.

**Limitations**  
A student's actual status is usually definite even before the teacher asks, while a qubit can genuinely exist in a coherent quantum state rather than in mere hidden classical uncertainty. The analogy helps with state space intuition, not with the full physics of coherence.

## Math

- LaTeX: `|\psi\rangle = \alpha |0\rangle + \beta |1\rangle`
  Meaning: A single-qubit pure state is a linear combination of the computational basis states.
  Variables: `\alpha` = Complex amplitude for basis state |0\rangle, `\beta` = Complex amplitude for basis state |1\rangle
- LaTeX: `|\alpha|^2 + |\beta|^2 = 1`
  Meaning: The total measurement probability must normalize to one.

**Derivation**  
A qubit lives in a two-dimensional complex Hilbert space with basis \(|0\rangle, |1\rangle\). Any normalized vector in that space can be written as \(\alpha|0\rangle + \beta|1\rangle\). Measurement in the computational basis returns 0 with probability \(|\alpha|^2\) and 1 with probability \(|\beta|^2\).

**Notes**  
The amplitudes are complex, so relative phase can affect later interference even when probabilities stay unchanged.

## Physics

**Concept**  
A qubit is the controllable state of a two-level quantum system.

**Real-World Mapping**  
Examples include photon polarization, electron spin, superconducting circuit energy levels, or trapped-ion internal states.

**Importance**  
Quantum computing begins when we encode information into a physical system whose state evolves according to quantum mechanics rather than classical switching logic.

## Quantum Mechanics

**Formal Definition**  
A qubit is a normalized state vector in a two-dimensional Hilbert space. Observable outcomes are defined relative to a measurement basis, typically the computational basis.

**State Space**  
Two-dimensional complex Hilbert space \(\mathbb{C}^2\).

**Operators Involved**

- Identity operator I
- Projectors |0\rangle\langle 0| and |1\rangle\langle 1|
- Unitary gates such as X, Y, Z, and H

## Circuit

**Description**  
Prepare a qubit with both amplitude imbalance and a relative phase to show that quantum information contains more structure than a classical bit value.

**Gates**  
`['Ry', 'Rz', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import pi\n\nqc = QuantumCircuit(1, 1)\nqc.ry(pi / 3, 0)\nqc.rz(pi / 4, 0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
The measurement frequencies favor 0 over 1, while the hidden relative phase is still part of the quantum state and would matter if later interference gates were added.

## Visualization

- Type: `bloch_sphere`
- Interactive: `True`
- Description: Show the qubit as a point on the Bloch sphere and let the user toggle between basis labels and amplitude interpretation.

## Applications

- Quantum state preparation
- Quantum communication
- Foundations for all gate-based quantum algorithms

## Interview Ready

A qubit is the quantum analogue of a bit, but it stores information as a normalized complex state in Hilbert space rather than as a fixed classical symbol. That means both amplitude and phase matter before measurement, which is why quantum computation can use interference and entanglement.

**Common Questions**

- Why is a qubit not just a probabilistic bit?
- What information is carried by phase if it is not directly measured?
- Why must a qubit state satisfy normalization?
