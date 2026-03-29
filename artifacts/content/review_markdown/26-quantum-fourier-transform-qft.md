# Lesson 26: Quantum Fourier Transform (QFT)

- Slug: `quantum-fourier-transform-qft`
- Difficulty: `advanced`
- Stage: `advanced`
- Prerequisites: `[17, 18, 20]`

## Learning Objective

Understand the Quantum Fourier Transform as a basis change that converts periodic phase structure into computational-basis information.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_26_30.pdf` page `1`

**Quantum Concept**  
QFT transforms quantum amplitudes into a frequency-domain representation. It extracts periodic structures from quantum states with exponential efficiency. QFT is a core component of algorithms like Shor's, enabling hidden-pattern detection.

**Original Analogy**  
Applying technical indicators (RSI, MACD, moving averages) to price movements reveals hidden trends. Indicators convert raw price behavior into frequency-like insight.

**Combined Insight**  
QFT mirrors technical analysis-both expose underlying patterns not visible in raw signals.

## Intuition

**Analogy**  
Applying technical indicators (RSI, MACD, moving averages) to price movements reveals hidden trends. Indicators convert raw price behavior into frequency-like insight.

**Story**  
The technical-indicator analogy is thoughtful because it frames QFT as a transformation that reveals hidden structure not obvious in raw data. That is exactly what the Fourier viewpoint does for quantum phases.

**Why It Works**  
QFT reorganizes information so periodicity and phase relationships become easier to read out, much like a transformed market signal can reveal trends hidden in raw prices.

**Limitations**  
Financial indicators are heuristic filters, while the QFT is a precise unitary transform on amplitudes and phase relations.

## Math

- LaTeX: `\mathrm{QFT}_N|x\rangle = \frac{1}{\sqrt{N}}\sum_{k=0}^{N-1} e^{2\pi i xk/N}|k\rangle`
  Meaning: The QFT maps computational basis labels into phase-encoded superpositions.
- LaTeX: `N = 2^n`
  Meaning: On \(n\) qubits the transform acts over a Hilbert space of size \(2^n\).

**Derivation**  
The classical Fourier transform reorganizes information by frequency components. The QFT does the quantum analogue on basis amplitudes, turning periodic phase patterns into basis populations that later measurement can access.

**Notes**  
QFT is useful because many quantum algorithms encode useful information in phase rather than in direct computational-basis amplitudes.

## Physics

**Concept**  
QFT is a unitary change of basis tailored to periodic phase structure.

**Real-World Mapping**  
It appears centrally in phase estimation, order finding, and algorithms that exploit periodicity or spectral information.

**Importance**  
Without QFT, some of the most famous quantum speedups would not have a clean extraction step.

## Quantum Mechanics

**Formal Definition**  
The QFT is a unitary transformation on an \(N\)-dimensional Hilbert space that maps computational basis states to equally weighted phase states.

**State Space**  
For \(n\) qubits it acts on \((\mathbb{C}^2)^{\otimes n}\) with dimension \(N=2^n\).

**Operators Involved**

- QFT unitary
- Controlled phase rotations
- Hadamard gates

## Circuit

**Description**  
Build a minimal two-qubit QFT circuit using Hadamards and a controlled phase gate.

**Gates**  
`['H', 'CP', 'H', 'SWAP', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import pi\n\nqc = QuantumCircuit(2, 2)\nqc.h(1)\nqc.cp(pi / 2, 0, 1)\nqc.h(0)\nqc.swap(0, 1)\nqc.measure([0, 1], [0, 1])\nprint(qc)
```

**Expected Output**  
The circuit implements the basic QFT pattern, where controlled phase accumulation is converted into measurable basis structure.

## Visualization

- Type: `circuit_diagram`
- Interactive: `True`
- Description: Animate the layer-by-layer QFT decomposition and show how phase information is redistributed.

## Applications

- Phase estimation
- Order finding
- Spectral analysis in quantum algorithms

## Interview Ready

The QFT is a quantum basis change that exposes periodic phase structure. Its power comes from making hidden phase relationships measurable after further algorithmic processing.

**Common Questions**

- Why is the QFT more useful than just applying many Hadamards?
- What kind of structure does QFT reveal?
- Why do controlled phase gates appear in its decomposition?
