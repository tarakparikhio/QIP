# Lesson 3: Measurement

- Slug: `measurement`
- Difficulty: `beginner`
- Stage: `foundation`
- Prerequisites: `[1, 2]`

## Learning Objective

Understand measurement as the bridge from quantum amplitudes to classical outcomes and why it irreversibly changes what information remains available.

## Intuition

**Analogy**  
The teacher asks the student's name during roll-call; the instant the student answers, the uncertainty in the register disappears and one specific status becomes part of the official record.

**Story**  
Before the answer, the classroom discussion lives in a space of possible attendance states. Once the answer is given, the school register no longer stores that cloud of possibilities; it stores one concrete line item.

**Why It Works**  
The analogy captures the jump from a richer pre-readout situation to a single declared classical record. That is the central beginner intuition behind measurement: many possibilities in the state description, one recorded outcome at readout.

**Limitations**  
In a classroom, the teacher's question does not physically force the student into being present or absent. In quantum mechanics, measurement is an actual interaction with the system, and it changes the state that remains after the outcome is observed.

## Math

- LaTeX: `P(0) = |\alpha|^2, \quad P(1) = |\beta|^2`
  Meaning: Born's rule gives the probabilities for computational-basis outcomes.
  Variables: `\alpha` = Amplitude of |0\rangle, `\beta` = Amplitude of |1\rangle
- LaTeX: `\Pi_0 = |0\rangle\langle 0|, \quad \Pi_1 = |1\rangle\langle 1|`
  Meaning: Projectors define the measurement outcomes in the computational basis.

**Derivation**  
For a state \(|\psi\rangle = \alpha|0\rangle + \beta|1\rangle\), measurement in the computational basis applies projectors \(\Pi_0\) and \(\Pi_1\). The corresponding probabilities are expectation values \(\langle \psi|\Pi_i|\psi\rangle\), which reduce to \(|\alpha|^2\) and \(|\beta|^2\).

**Notes**  
The outcome probabilities depend on amplitude magnitudes, while phase becomes visible only through basis changes and interference before measurement.

## Physics

**Concept**  
Measurement couples a quantum system to a macroscopic apparatus, producing a classical record.

**Real-World Mapping**  
In superconducting qubits, microwave resonator readout converts the qubit-dependent response of a circuit into a classical voltage trace that is then thresholded.

**Importance**  
Quantum algorithms are useful only because we can eventually read out a classical answer, but measurement must be delayed carefully to preserve quantum coherence during computation.

## Quantum Mechanics

**Formal Definition**  
Measurement in a chosen basis is represented by a set of operators whose outcomes occur probabilistically and whose post-measurement state depends on the operator applied.

**State Space**  
The qubit remains in \(\mathbb{C}^2\), but measurement maps the pre-measurement state to a basis eigenstate associated with the observed outcome.

**Operators Involved**

- Projection operators \(\Pi_0\) and \(\Pi_1\)
- Basis-change unitary operators when measuring in a different basis
- Observable operators whose eigenstates define measurement outcomes

## Circuit

**Description**  
Prepare a state with known amplitudes and measure it so Born's rule becomes visible in the output frequencies.

**Gates**  
`['Ry', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import pi\n\nqc = QuantumCircuit(1, 1)\nqc.ry(pi / 3, 0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
Repeated shots give roughly 75% 0 and 25% 1, matching the measurement probabilities of the prepared state.

## Visualization

- Type: `probability_chart`
- Interactive: `True`
- Description: Let the user adjust amplitudes and watch the resulting measurement probabilities update before triggering a simulated measurement.

## Applications

- Quantum readout design
- Algorithm output interpretation
- State discrimination and tomography foundations

## Interview Ready

Measurement is not a passive peek into a quantum system. It is a basis-dependent physical interaction that turns amplitudes into a classical outcome according to Born's rule and changes what state information remains available afterward.

**Common Questions**

- Why does a single measurement not reveal the full quantum state?
- How does Born's rule connect amplitudes to probabilities?
- Why is measurement considered destructive in many quantum circuits?
