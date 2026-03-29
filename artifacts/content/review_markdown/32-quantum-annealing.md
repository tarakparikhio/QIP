# Lesson 32: Quantum Annealing

- Slug: `quantum-annealing`
- Difficulty: `advanced`
- Stage: `advanced`
- Prerequisites: `[14, 29]`

## Learning Objective

Understand quantum annealing as an optimization strategy that starts from an easy Hamiltonian and gradually deforms toward a problem Hamiltonian.

## Source Snapshot

**Source PDF**  
`quantum_midway_lessons_31_35.pdf` page `2`

**Quantum Concept**  
Quantum annealing searches for low-energy solutions by slowly evolving a system from an initial Hamiltonian to a problem Hamiltonian. It leverages tunneling to escape local minima. It excels in optimization landscapes.

**Original Analogy**  
Driving an EV through optimized routes-minimizing energy consumption while navigating various terrains and shortcuts.

**Combined Insight**  
Quantum annealing mirrors EV energy optimization-finding the minimum-cost route through complex landscapes.

## Intuition

**Analogy**  
Driving an EV through optimized routes-minimizing energy consumption while navigating various terrains and shortcuts.

**Story**  
The EV route-optimization analogy emphasizes searching for a low-energy route by gradually steering toward more efficient choices. Quantum annealing uses the same high-level idea of moving toward a low-cost configuration under a changing objective landscape.

**Why It Works**  
It captures progressive optimization under a landscape of options, with the goal of settling into a low-cost configuration.

**Limitations**  
Route planning is classical optimization and may rely on explicit heuristics, while quantum annealing evolves under time-dependent Hamiltonians and quantum fluctuations.

## Math

- LaTeX: `H(s) = (1-s)H_0 + sH_P`
  Meaning: Annealing interpolates between an easy initial Hamiltonian and the problem Hamiltonian.
- LaTeX: `s \in [0,1]`
  Meaning: The schedule parameter controls how far the anneal has progressed.

**Derivation**  
Begin in the ground state of a simple Hamiltonian \(H_0\), then slowly increase the weight of the problem Hamiltonian \(H_P\). If the schedule is gentle enough and the gap remains workable, the system can track toward a low-energy state of the target problem.

**Notes**  
Annealing is closely related to adiabatic ideas, though practical devices may be open-system and hardware-specific.

## Physics

**Concept**  
Quantum annealing uses quantum fluctuations and a time-varying Hamiltonian to search for low-energy configurations.

**Real-World Mapping**  
Annealing-inspired hardware is often discussed for Ising-model and discrete optimization formulations.

**Importance**  
It is a major alternative viewpoint to gate-based optimization algorithms.

## Quantum Mechanics

**Formal Definition**  
Quantum annealing evolves a system under a schedule that interpolates from an easy initial Hamiltonian to a problem Hamiltonian whose ground state encodes the solution.

**State Space**  
The system evolves in the Hilbert space of the encoded optimization problem.

**Operators Involved**

- Initial Hamiltonian \(H_0\)
- Problem Hamiltonian \(H_P\)
- Schedule parameter \(s\)

## Circuit

**Description**  
Use a short sequence of X-like and Z-like rotations as a gate-model toy analogue of an annealing schedule.

**Gates**  
`['Rx', 'Rz', 'Measure']`

```python
from qiskit import QuantumCircuit\nfrom math import pi\n\nqc = QuantumCircuit(1, 1)\nqc.rx(pi / 3, 0)\nqc.rz(pi / 5, 0)\nqc.measure(0, 0)\nprint(qc)
```

**Expected Output**  
The circuit is a toy schedule rather than a full annealer, but it captures the idea of gradually shifting which term dominates the evolution.

## Visualization

- Type: `probability_chart`
- Interactive: `True`
- Description: Show the energy landscape and how the system is guided from an easy starting Hamiltonian toward the target one.

## Applications

- Ising optimization
- Heuristic search
- Annealing-hardware studies

## Interview Ready

Quantum annealing is an optimization paradigm based on slowly changing the governing Hamiltonian so the system is guided toward low-energy states of the problem Hamiltonian.

**Common Questions**

- How is quantum annealing different from QAOA?
- What is the role of the initial Hamiltonian?
- Why does the evolution schedule matter?
