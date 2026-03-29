# Lesson 28: Phase Estimation

- Slug: `phase-estimation`
- Difficulty: `advanced`
- Stage: `advanced`
- Prerequisites: `[15, 17, 26]`

## Learning Objective

Understand phase estimation as the algorithmic procedure for extracting an eigenphase of a unitary operator.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_26_30.pdf` page `3`

**Quantum Concept**  
Phase Estimation extracts eigenvalues of unitary operators. It is one of the most powerful quantum subroutines, enabling efficient solutions to problems like factoring and simulation.

**Original Analogy**  
Options Greeks determine hidden structure behind price movements-delta, gamma, theta, and vega act like phase components.

**Combined Insight**  
Phase estimation is like reading Greeks-extracting the invisible structure behind observable price action.

## Intuition

**Analogy**  
Options Greeks determine hidden structure behind price movements-delta, gamma, theta, and vega act like phase components.

**Story**  
The options-Greeks analogy is trying to expose hidden parameters that shape visible behavior. Phase estimation does the same in quantum form: it extracts a hidden phase that governs how an eigenstate evolves under repeated unitary action.

**Why It Works**  
It points to latent structure that is not directly obvious from surface observations but becomes inferable through the right analysis pipeline.

**Limitations**  
Options Greeks are classical sensitivity measures, while quantum phase is a complex-eigenvalue property of a unitary acting on an eigenstate.

## Math

- LaTeX: `U|u\rangle = e^{2\pi i \phi}|u\rangle`
  Meaning: Phase estimation assumes access to an eigenstate of the unitary.
- LaTeX: `\phi \in [0,1)`
  Meaning: The goal is to estimate the eigenphase encoded in the unitary eigenvalue.

**Derivation**  
Controlled applications of \(U^{2^k}\) encode the unknown eigenphase into a control register. An inverse QFT then translates that phase pattern into a binary estimate readable in the computational basis.

**Notes**  
Phase estimation is the bridge from controlled unitaries to spectral information and is one of the most important templates in quantum algorithms.

## Physics

**Concept**  
Phase estimation extracts spectral information about unitary evolution.

**Real-World Mapping**  
It underlies algorithms for energy estimation, order finding, and many Hamiltonian-related problems.

**Importance**  
Many advanced algorithms reduce to 'estimate the phase associated with a useful eigenstate.'

## Quantum Mechanics

**Formal Definition**  
Quantum phase estimation estimates the eigenphase \(\phi\) associated with an eigenstate of a unitary operator.

**State Space**  
It uses a control register tensor-producted with a target register containing the eigenstate.

**Operators Involved**

- Controlled powers of U
- QFT or inverse QFT
- Projective measurement on the control register

## Circuit

**Description**  
Use a two-qubit control register, controlled powers of a phase gate, and a tiny inverse-QFT pattern to show how phase estimation scales beyond the single-control kickback demo.

**Gates**  
`['H', 'H', 'CP', 'CP', 'CP(-pi/2)', 'H', 'H', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import pi\n\nqc = QuantumCircuit(3, 2)\nqc.x(2)\nqc.h(0)\nqc.h(1)\nqc.cp(pi, 0, 2)\nqc.cp(pi / 2, 1, 2)\nqc.h(1)\nqc.cp(-pi / 2, 0, 1)\nqc.h(0)\nqc.measure([0, 1], [0, 1])\nprint(qc)
```

**Expected Output**  
The two control qubits encode a small binary phase estimate rather than only showing that some kickback occurred.

## Visualization

- Type: `circuit_diagram`
- Interactive: `True`
- Description: Show phase being accumulated in the control register and then decoded into a binary estimate.

## Applications

- Shor-style algorithms
- Energy estimation
- Spectral analysis

## Interview Ready

Phase estimation extracts hidden eigenphase information from a unitary. It works by coherently writing the phase onto a control register and then decoding that pattern with a Fourier transform.

**Common Questions**

- Why does phase estimation require an eigenstate or near-eigenstate?
- What role does the inverse QFT play?
- Why are controlled powers of the unitary used?
