/**
 * Classical logic gates and the Logic Lab challenge set.
 *
 * Kept separate from the quantum engine: these are plain Boolean functions on bits,
 * used to contrast irreversible classical logic with reversible quantum gates.
 */

export type Bit = 0 | 1;

export type GateId = 'NOT' | 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'XNOR';

export type ClassicalGate = {
  id: GateId;
  name: string;
  arity: 1 | 2;
  /** Boolean algebra form. */
  expression: string;
  /** One-line rule a learner can say out loud. */
  rule: string;
  /** Everyday picture of the gate. */
  analogy: string;
  /** Can the inputs be recovered from the output alone? */
  reversible: boolean;
  reversibleNote: string;
  universal: boolean;
  quantum: { label: string; note: string; href?: string };
  evaluate: (a: Bit, b: Bit) => Bit;
};

const bit = (value: boolean): Bit => (value ? 1 : 0);

export const CLASSICAL_GATES: ClassicalGate[] = [
  {
    id: 'NOT',
    name: 'NOT',
    arity: 1,
    expression: 'Y = ¬A',
    rule: 'Flips the bit: 0 becomes 1 and 1 becomes 0.',
    analogy: 'A light that is on whenever the switch is off.',
    reversible: true,
    reversibleNote: 'Each output comes from exactly one input, so you can always run it backwards. Applying NOT twice gives you the original bit.',
    universal: false,
    quantum: { label: 'Pauli-X', note: 'The X gate is the quantum NOT. It swaps |0⟩ and |1⟩, and it also works on superpositions.', href: '/gates' },
    evaluate: (a) => bit(a === 0),
  },
  {
    id: 'AND',
    name: 'AND',
    arity: 2,
    expression: 'Y = A · B',
    rule: 'Outputs 1 only when both inputs are 1.',
    analogy: 'Two switches wired in series: the lamp lights only if both are on.',
    reversible: false,
    reversibleNote: 'An output of 0 could come from 00, 01 or 10. Once you see 0, the information about which one is gone.',
    universal: false,
    quantum: { label: 'Toffoli (CCX)', note: 'A Toffoli gate writes A AND B into a fresh target bit while keeping A and B, so nothing is erased. Qiskit: circuit.ccx(0, 1, 2).' },
    evaluate: (a, b) => bit(a === 1 && b === 1),
  },
  {
    id: 'OR',
    name: 'OR',
    arity: 2,
    expression: 'Y = A + B',
    rule: 'Outputs 1 when at least one input is 1.',
    analogy: 'Two switches wired in parallel: either one lights the lamp.',
    reversible: false,
    reversibleNote: 'An output of 1 could come from 01, 10 or 11, so the inputs cannot be recovered.',
    universal: false,
    quantum: { label: 'Toffoli + X gates', note: 'Quantum circuits build OR from a Toffoli surrounded by X gates (De Morgan’s law), keeping the inputs alongside the answer.' },
    evaluate: (a, b) => bit(a === 1 || b === 1),
  },
  {
    id: 'XOR',
    name: 'XOR',
    arity: 2,
    expression: 'Y = A ⊕ B',
    rule: 'Outputs 1 when the inputs are different.',
    analogy: 'A hallway light with a switch at each end: flipping either switch changes the light.',
    reversible: false,
    reversibleNote: 'On its own XOR loses information (0 could mean 00 or 11). Keep A next to the answer, though, and you can always undo it.',
    universal: false,
    quantum: { label: 'CNOT', note: 'CNOT keeps the control A and replaces the target B with A ⊕ B. Keeping A is exactly what makes it reversible.', href: '/gates' },
    evaluate: (a, b) => bit(a !== b),
  },
  {
    id: 'NAND',
    name: 'NAND',
    arity: 2,
    expression: 'Y = ¬(A · B)',
    rule: 'AND followed by NOT: outputs 0 only when both inputs are 1.',
    analogy: 'An alarm that stays on unless both doors are closed.',
    reversible: false,
    reversibleNote: 'Three different input pairs give 1, so the output cannot tell you which one happened.',
    universal: true,
    quantum: { label: 'Toffoli', note: 'With its target starting at 1, a Toffoli computes NAND. The Toffoli is universal for reversible classical logic, just as NAND is for ordinary logic.' },
    evaluate: (a, b) => bit(!(a === 1 && b === 1)),
  },
  {
    id: 'NOR',
    name: 'NOR',
    arity: 2,
    expression: 'Y = ¬(A + B)',
    rule: 'OR followed by NOT: outputs 1 only when both inputs are 0.',
    analogy: 'A “quiet room” sign that lights only when nobody is talking.',
    reversible: false,
    reversibleNote: 'Three different input pairs give 0, so information is lost.',
    universal: true,
    quantum: { label: 'Toffoli + X gates', note: 'Like OR, it is built reversibly from a Toffoli and X gates, with the inputs kept around.' },
    evaluate: (a, b) => bit(a === 0 && b === 0),
  },
  {
    id: 'XNOR',
    name: 'XNOR',
    arity: 2,
    expression: 'Y = ¬(A ⊕ B)',
    rule: 'Outputs 1 when the inputs are the same. It is an equality check.',
    analogy: 'A “match” light that turns on when two switches agree.',
    reversible: false,
    reversibleNote: 'An output of 1 could mean 00 or 11, so you cannot tell which.',
    universal: false,
    quantum: { label: 'CNOT then X', note: 'A CNOT followed by X on the target computes A XNOR B while keeping A.', href: '/gates' },
    evaluate: (a, b) => bit(a === b),
  },
];

export function getGate(id: GateId): ClassicalGate {
  return CLASSICAL_GATES.find((gate) => gate.id === id) ?? CLASSICAL_GATES[0];
}

/** Input rows in truth-table order. */
export function inputRows(arity: 1 | 2): [Bit, Bit][] {
  return arity === 1 ? [[0, 0], [1, 0]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
}

export function outputColumn(gate: ClassicalGate): Bit[] {
  return inputRows(gate.arity).map(([a, b]) => gate.evaluate(a, b));
}

// ---------------------------------------------------------------------------
// Challenges

export type ChoiceChallenge = {
  id: string;
  kind: 'choice';
  title: string;
  prompt: string;
  /** Optional mystery output column shown as a truth table (two-input order). */
  mysteryOutputs?: Bit[];
  options: string[];
  answer: number;
  explanation: string;
};

export type TableChallenge = {
  id: string;
  kind: 'table';
  title: string;
  prompt: string;
  gate: GateId;
  explanation: string;
};

export type LogicChallenge = ChoiceChallenge | TableChallenge;

/** Points for a challenge solved on the first try; retries pay less, like lesson quizzes. */
export const CHALLENGE_POINTS = 10;

export const LOGIC_CHALLENGES: LogicChallenge[] = [
  {
    id: 'predict-and',
    kind: 'choice',
    title: 'Warm-up',
    prompt: 'An AND gate gets A = 1 and B = 0. What does it output?',
    options: ['0', '1'],
    answer: 0,
    explanation: 'AND needs both inputs to be 1. One 0 is enough to make the output 0.',
  },
  {
    id: 'mystery-xor',
    kind: 'choice',
    title: 'Mystery gate',
    prompt: 'This gate’s truth table is shown below. Which gate is it?',
    mysteryOutputs: [0, 1, 1, 0],
    options: ['AND', 'OR', 'XOR', 'NAND'],
    answer: 2,
    explanation: 'The output is 1 exactly when the inputs differ. That is XOR, the classical cousin of the quantum CNOT.',
  },
  {
    id: 'fill-or',
    kind: 'table',
    title: 'Fill the table',
    prompt: 'Click the output cells to complete the truth table for OR.',
    gate: 'OR',
    explanation: 'OR outputs 1 whenever at least one input is 1, so only 00 gives 0.',
  },
  {
    id: 'compound-nor',
    kind: 'choice',
    title: 'Two gates in a row',
    prompt: 'A = 0 and B = 0 go into an OR gate, and its output goes into a NOT gate. What comes out?',
    options: ['0', '1'],
    answer: 1,
    explanation: 'OR(0, 0) = 0, then NOT flips it to 1. OR followed by NOT is the NOR gate.',
  },
  {
    id: 'mystery-nand',
    kind: 'choice',
    title: 'Mystery gate',
    prompt: 'Which gate produces this truth table?',
    mysteryOutputs: [1, 1, 1, 0],
    options: ['NOR', 'NAND', 'XNOR', 'OR'],
    answer: 1,
    explanation: 'Only 11 gives 0, which is AND with its output flipped: NAND.',
  },
  {
    id: 'fill-xnor',
    kind: 'table',
    title: 'Fill the table',
    prompt: 'Complete the truth table for XNOR, the “are they equal?” gate.',
    gate: 'XNOR',
    explanation: 'XNOR outputs 1 when both inputs match (00 or 11) and 0 when they differ.',
  },
  {
    id: 'reversible-and',
    kind: 'choice',
    title: 'Run it backwards',
    prompt: 'An AND gate outputs 0. Can you tell which inputs went in?',
    options: ['Yes, always', 'No, three input pairs give 0'],
    answer: 1,
    explanation: '00, 01 and 10 all give 0, so the gate erased information. Quantum gates are never allowed to do this: every quantum gate can be undone.',
  },
  {
    id: 'universal',
    kind: 'choice',
    title: 'One gate to build them all',
    prompt: 'Which single gate type, copied as many times as you like, can build every other logic gate?',
    options: ['AND', 'XOR', 'NAND', 'NOT'],
    answer: 2,
    explanation: 'NAND is universal (so is NOR). For example, NOT A is just NAND(A, A). In reversible computing the Toffoli gate plays the same role.',
  },
  {
    id: 'quantum-cousin',
    kind: 'choice',
    title: 'Classical meets quantum',
    prompt: 'The quantum CNOT gate keeps its control bit A and turns the target B into…',
    options: ['A AND B', 'A OR B', 'A XOR B', 'NOT B'],
    answer: 2,
    explanation: 'CNOT maps |a, b⟩ to |a, a ⊕ b⟩. It is XOR made reversible by keeping a copy of A.',
  },
  {
    id: 'fanout',
    kind: 'choice',
    title: 'Copy that',
    prompt: 'Classical wires can split one bit into many copies. Can a quantum circuit copy an unknown qubit state the same way?',
    options: ['Yes, with enough CNOTs', 'No, the no-cloning theorem forbids it'],
    answer: 1,
    explanation: 'A CNOT can copy |0⟩ or |1⟩, but not an unknown superposition. Trying gives an entangled pair instead of two copies.',
  },
];

export const MAX_LOGIC_POINTS = LOGIC_CHALLENGES.length * CHALLENGE_POINTS;

export function logicRank(points: number): string {
  const share = points / MAX_LOGIC_POINTS;
  if (share >= 1) return 'Logic architect';
  if (share >= 0.7) return 'Circuit builder';
  if (share >= 0.4) return 'Gate tinkerer';
  if (share > 0) return 'Bit flipper';
  return 'New to logic';
}
