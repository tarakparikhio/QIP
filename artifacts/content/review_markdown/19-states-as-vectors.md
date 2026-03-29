# Lesson 19: States as Vectors

- Slug: `states-as-vectors`
- Difficulty: `intermediate`
- Stage: `intermediate`
- Prerequisites: `[18]`

## Learning Objective

See quantum states explicitly as vectors and connect amplitude components to geometry and normalization.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_16_20.pdf` page `4`

**Quantum Concept**  
Quantum states live as vectors in Hilbert space. Their length encodes probability conservation, and their direction encodes behavior. Operators rotate or transform these vectors.

**Original Analogy**  
Dance choreography: direction, posture, and rhythm form a vector of movement. Small shifts alter the whole expression.

**Combined Insight**  
Quantum vectors reflect the same structure as dance direction shifts-precise alignment changes everything.

## Intuition

**Analogy**  
Dance choreography: direction, posture, and rhythm form a vector of movement. Small shifts alter the whole expression.

**Story**  
The choreography analogy says that a performance is not one number but an organized combination of direction, posture, and rhythm. A state vector works similarly: meaning comes from the whole configuration, not just one label.

**Why It Works**  
It emphasizes structured components that together define an overall state.

**Limitations**  
Dance vectors are metaphorical, while quantum states are exact vectors in complex Hilbert space with normalization and phase structure.

## Math

- LaTeX: `|\psi\rangle = \begin{bmatrix}\alpha \\ \beta\end{bmatrix}`
  Meaning: A qubit state can be written as a two-component column vector in a chosen basis.
- LaTeX: `|\alpha|^2 + |\beta|^2 = 1`
  Meaning: Normalization constrains physically allowed state vectors.

**Derivation**  
Choosing the computational basis identifies \(|0\rangle\) with one basis vector and \(|1\rangle\) with another. Any qubit state becomes a normalized complex linear combination of those basis vectors, which can be written as a column vector.

**Notes**  
Changing basis changes the vector coordinates, not the physical state itself.

## Physics

**Concept**  
State vectors are the mathematical objects that encode all accessible predictive information for pure states.

**Real-World Mapping**  
Amplitudes in a spin or polarization experiment are naturally handled as vector components in a chosen basis.

**Importance**  
Treating states as vectors makes gate matrices, basis changes, and expectation values computationally tractable.

## Quantum Mechanics

**Formal Definition**  
A pure quantum state is represented by a normalized vector in Hilbert space, defined up to a global phase.

**State Space**  
For one qubit, the state vector lives in \(\mathbb{C}^2\).

**Operators Involved**

- Basis vectors
- Inner products
- Matrix operators acting on vectors

## Circuit

**Description**  
Initialize a balanced state directly from amplitudes to reinforce the vector view of state preparation.

**Gates**  
`['Initialize', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import sqrt\n\nqc = QuantumCircuit(1, 1)\nqc.initialize([1 / sqrt(2), 1 / sqrt(2)], 0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
Repeated measurement gives a balanced distribution, consistent with the vector \([1/\sqrt{2}, 1/\sqrt{2}]^T\).

## Visualization

- Type: `probability_chart`
- Interactive: `True`
- Description: Show vector components and the resulting measurement probabilities side by side.

## Applications

- State preparation
- Matrix simulation
- Basis-change calculations

## Interview Ready

Calling a state a vector is not just a metaphor. It means quantum evolution is linear, operators are matrices, and amplitudes are coordinates in a chosen basis with normalization constraints.

**Common Questions**

- Why are qubit state vectors complex rather than purely real?
- What changes when we choose a different basis?
- Why does global phase not change the physical state?
