# Lesson 34: Phase Kickback

- Slug: `phase-kickback`
- Difficulty: `advanced`
- Stage: `advanced`
- Prerequisites: `[21, 26, 28]`

## Learning Objective

Understand phase kickback as the mechanism by which a controlled unitary writes phase information onto the control qubit.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_31_35.pdf` page `4`

**Quantum Concept**  
Phase kickback occurs when a controlled operation transfers phase information from the target qubit back to the control qubit. It is essential for algorithms involving oracles and function evaluation. Kickback enables phase accumulation in control registers.

**Original Analogy**  
Car gear system: shifting gears creates downstream torque changes that send feedback back to the driver. Laptop upgrades: changing one component triggers OS-level performance adjustments.

**Combined Insight**  
Phase kickback mirrors mechanical and digital feedback loops-actions on one component influence controllers upstream.

## Intuition

**Analogy**  
Car gear system: shifting gears creates downstream torque changes that send feedback back to the driver. Laptop upgrades: changing one component triggers OS-level performance adjustments.

**Story**  
The gear-and-feedback analogy points toward a downstream change that pushes information back to the driver. Phase kickback is the quantum analogue: the target's eigenphase shows up on the control rather than only on the target.

**Why It Works**  
It captures the surprising directionality of the effect: the apparent action is on one subsystem, but useful information appears back on the controller.

**Limitations**  
Mechanical feedback is classical torque transfer, whereas phase kickback is coherent phase accumulation in a controlled unitary acting on an eigenstate.

## Math

- LaTeX: `|+\rangle|u\rangle \xrightarrow{\mathrm{ctrl}\text{-}U} \frac{|0\rangle|u\rangle + e^{i\phi}|1\rangle|u\rangle}{\sqrt{2}}`
  Meaning: The target eigenphase is transferred onto the relative phase of the control qubit.
- LaTeX: `U|u\rangle = e^{i\phi}|u\rangle`
  Meaning: Phase kickback requires the target to be in an eigenstate of the controlled unitary.

**Derivation**  
Because the target is an eigenstate, the controlled application of \(U\) does not scramble the target basis. Instead, the eigenvalue appears as a phase multiplying the \(|1\rangle\) branch of the control superposition.

**Notes**  
Phase kickback is one of the core tricks behind phase estimation and many related algorithms.

## Physics

**Concept**  
Phase kickback transfers spectral information from the target's unitary response into the control register.

**Real-World Mapping**  
In algorithm design, it is the hidden engine behind many circuits that seem to 'measure a phase' using control qubits.

**Importance**  
Without phase kickback, phase estimation and many Fourier-based quantum subroutines would lose their core mechanism.

## Quantum Mechanics

**Formal Definition**  
Phase kickback is the transfer of an eigenphase from a controlled unitary's target register into the relative phase of the control register.

**State Space**  
It operates on a tensor-product space containing a control qubit and a target eigenstate register.

**Operators Involved**

- Controlled-U
- Target eigenstate \(|u\rangle\)
- Hadamard for phase readout

## Circuit

**Description**  
Prepare the target in the |-> eigenstate of Z so a controlled-Z gate kicks a phase back onto the control qubit in the cleanest possible way.

**Gates**  
`['X', 'H', 'CZ', 'H', 'Measure']`

```python
from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2, 1)\nqc.x(1)\nqc.h(1)\nqc.h(0)\nqc.cz(0, 1)\nqc.h(0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
The control qubit flips from a |+> readout pattern to a |-> readout pattern, making the kicked-back phase directly visible after the final Hadamard.

## Visualization

- Type: `circuit_diagram`
- Interactive: `True`
- Description: Animate the phase appearing on the control branch after the controlled unitary acts on the target eigenstate.

## Applications

- Phase estimation
- Order finding
- Eigenvalue-extraction subroutines

## Interview Ready

Phase kickback is the trick that lets a controlled unitary reveal target spectral information on a control qubit. It is one of the central mechanisms behind advanced quantum algorithms.

**Common Questions**

- Why must the target be an eigenstate for clean phase kickback?
- How does kickback differ from classical feedback?
- Why is Hadamard used around the control qubit in kickback demos?
