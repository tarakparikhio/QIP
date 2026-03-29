# Lesson 6: Quantum Gates

- Slug: `quantum-gates`
- Difficulty: `beginner`
- Stage: `foundation`
- Prerequisites: `[1, 2, 3]`

## Learning Objective

Understand quantum gates as reversible unitary operators that transform amplitudes and phase while preserving total probability.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_6_10.pdf` page `1`

**Quantum Concept**  
Quantum gates are unitary operations that rotate, flip, or shift qubit states. They preserve information while transforming amplitudes and phases. Basic gates like X, H, and Z enable control over quantum behaviour. Gates operate reversibly, giving quantum circuits their unique structure.

**Original Analogy**  
Trading actions: buy, sell, hedge, or rebalance. These actions shift the state of a stock in predictable ways. Just as gates rotate or flip a qubit, trading decisions rotate the market position.

**Combined Insight**  
Quantum gates act like precise trading moves-each action changes future trajectories while preserving underlying structure.

## Intuition

**Analogy**  
Trading actions: buy, sell, hedge, or rebalance. These actions shift the state of a stock in predictable ways. Just as gates rotate or flip a qubit, trading decisions rotate the market position.

**Story**  
The original lesson compares gates to trading actions such as buying, selling, hedging, or rebalancing. The useful intuition is that a small, deliberate rule changes the future trajectory of the system without destroying the bookkeeping structure underneath.

**Why It Works**  
A gate is an allowed operation that changes a qubit's state in a controlled way, just as a trading action changes a portfolio state according to a rule rather than by random drift.

**Limitations**  
Trading actions are not reversible in the strict mathematical sense and they usually lose money to friction. Quantum gates are modeled as ideal unitary operations, which preserve norm and are reversible before measurement.

## Math

- LaTeX: `U^\dagger U = I`
  Meaning: A valid closed-system quantum gate is unitary, so it preserves inner products and normalization.
- LaTeX: `X|0\rangle = |1\rangle,\quad H|0\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}}`
  Meaning: Different gates perform different structured state transformations.

**Derivation**  
Quantum states evolve linearly, so a gate must act as a linear operator on Hilbert space. Requiring probability preservation forces the operator to be unitary, which is why gates are represented by matrices with \(U^\dagger U = I\).

**Notes**  
Classical logic gates can be irreversible, but basic quantum gates are reversible until measurement is performed.

## Physics

**Concept**  
A gate is usually implemented by driving a physical qubit with a calibrated pulse or interaction for a precise duration.

**Real-World Mapping**  
In superconducting qubits, microwave pulses implement X, Y, Z-style rotations by controlling phase, amplitude, and pulse duration.

**Importance**  
Gates are the control language of gate-based quantum computing, so every algorithm is built from them.

## Quantum Mechanics

**Formal Definition**  
A quantum gate is a unitary operator acting on the state vector of one or more qubits.

**State Space**  
Single-qubit gates act on \(\mathbb{C}^2\); multi-qubit gates act on tensor-product spaces such as \((\mathbb{C}^2)^{\otimes n}\).

**Operators Involved**

- Unitary operator U
- Pauli gates X, Y, Z
- Hadamard gate H

## Circuit

**Description**  
Apply X and then H to show that gates can both flip basis states and create superposition.

**Gates**  
`['X', 'H', 'Measure']`

```python
from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(1, 1)\nqc.x(0)\nqc.h(0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
Repeated runs produce a balanced distribution, showing that the gate sequence changed the state in a reversible, structured way before measurement.

## Visualization

- Type: `circuit_diagram`
- Interactive: `True`
- Description: Show a small circuit and animate how each gate updates the qubit state step by step.

## Applications

- State preparation
- Algorithm design
- Quantum control calibration

## Interview Ready

Quantum gates are unitary operators that rotate or transform quantum states without losing probability mass. They are the quantum analogue of controllable logic operations, but unlike many classical gates they are reversible before measurement.

**Common Questions**

- Why must an ideal quantum gate be unitary?
- How does a Hadamard gate differ from an X gate?
- Why are reversible operations important in quantum circuits?
