# Lesson 8: Bloch Sphere

- Slug: `bloch-sphere`
- Difficulty: `beginner`
- Stage: `foundation`
- Prerequisites: `[2, 7]`

## Learning Objective

Use the Bloch sphere as a geometric model of a single-qubit pure state and connect spherical angles to amplitude and phase.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_6_10.pdf` page `3`

**Quantum Concept**  
The Bloch sphere visualizes any single-qubit state as a point on a sphere. It reveals amplitude balance, phase, and direction. It is a powerful tool for understanding rotations and gate effects.

**Original Analogy**  
Steering wheel or flight joystick: tilting in different directions controls movement. Small angles create big trajectory changes.

**Combined Insight**  
Like steering a vehicle, positioning a qubit on the Bloch sphere determines its future evolution.

## Intuition

**Analogy**  
Steering wheel or flight joystick: tilting in different directions controls movement. Small angles create big trajectory changes.

**Story**  
The steering-wheel or joystick analogy is helpful because a tiny change in direction can change the entire path that follows. The Bloch sphere plays the same role for a qubit: where the state points determines how future gates and measurements behave.

**Why It Works**  
The analogy emphasizes orientation, control, and sensitivity to direction, which are exactly what the Bloch sphere makes visible.

**Limitations**  
A joystick controls a classical trajectory in real space, while the Bloch sphere represents a quantum state modulo global phase. It is a visualization of state, not a literal ball the qubit travels on.

## Math

- LaTeX: `|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle`
  Meaning: Every pure single-qubit state can be parameterized by two angles on the Bloch sphere.
- LaTeX: `(x,y,z) = (\sin\theta\cos\phi,\; \sin\theta\sin\phi,\; \cos\theta)`
  Meaning: The Bloch vector coordinates correspond to expectation values of the Pauli operators.

**Derivation**  
Normalization removes one free magnitude parameter and global phase removes one overall phase parameter, leaving two real degrees of freedom. Those two parameters map naturally to the polar and azimuthal angles of the sphere.

**Notes**  
Mixed states live inside the Bloch sphere, while pure states sit on the surface.

## Physics

**Concept**  
The Bloch sphere is a compact geometric representation of a two-level quantum state.

**Real-World Mapping**  
Spin-1/2 particles in magnetic fields and polarized photons are often visualized through Bloch-sphere style geometry.

**Importance**  
It is the most intuitive tool for reasoning about single-qubit rotations, phase shifts, and measurement bases.

## Quantum Mechanics

**Formal Definition**  
The Bloch sphere represents the projective pure-state space of a qubit, with each point corresponding to a normalized state modulo global phase.

**State Space**  
Pure states of \(\mathbb{C}^2\) modulo global phase map to the sphere surface.

**Operators Involved**

- Pauli expectation values
- Rotation operators
- Measurement axes

## Circuit

**Description**  
Prepare a nontrivial point on the Bloch sphere with \(H\) and \(R_z\), then measure in the computational basis.

**Gates**  
`['H', 'Rz', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import pi\n\nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.rz(pi / 3, 0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
The measurement probabilities stay balanced, but the hidden phase changes where the state sits around the equator.

## Visualization

- Type: `bloch_sphere`
- Interactive: `True`
- Description: Show the state vector, basis axes, and sliders for \(\theta\) and \(\phi\).

## Applications

- Single-qubit calibration
- Measurement basis intuition
- Teaching phase and rotation geometry

## Interview Ready

The Bloch sphere turns abstract amplitudes into geometry. It shows that a pure qubit state is determined by orientation, with amplitude balance tied to latitude and relative phase tied to longitude.

**Common Questions**

- What information does the Bloch sphere hide?
- Why does global phase not appear on the sphere?
- What is the difference between points on the surface and inside the sphere?
