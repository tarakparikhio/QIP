export type LessonSource = {
  title: string;
  publisher: string;
  url: string;
  why: string;
};

const IBM_LEARNING: LessonSource = {
  title: 'IBM Quantum Learning',
  publisher: 'IBM Quantum',
  url: 'https://quantum.cloud.ibm.com/learning/en',
  why: 'A maintained, introductory reference for the concepts used in this lesson.',
};

const PRESKILL_NOTES: LessonSource = {
  title: 'Lecture Notes for Physics 219 / CS219: Quantum Information',
  publisher: 'John Preskill, Caltech',
  url: 'https://theory.caltech.edu/~preskill/ph229/',
  why: 'A mathematically detailed open set of lecture notes for checking the formal picture.',
};

const QISKIT_CIRCUITS: LessonSource = {
  title: 'Construct circuits',
  publisher: 'IBM Quantum Documentation',
  url: 'https://quantum.cloud.ibm.com/docs/en/guides/construct-circuits',
  why: 'Documents the circuit model and the software interface used in the examples.',
};

export const CORE_SOURCES: LessonSource[] = [IBM_LEARNING, PRESKILL_NOTES, QISKIT_CIRCUITS];

const SOURCES_BY_LESSON: Record<number, LessonSource[]> = {
  1: [IBM_LEARNING, PRESKILL_NOTES],
  2: [IBM_LEARNING, PRESKILL_NOTES],
  3: [IBM_LEARNING, { title: 'Quantum mechanics: The theoretical minimum', publisher: 'John Preskill, Caltech', url: 'https://theory.caltech.edu/~preskill/ph229/chap3.pdf', why: 'Covers measurement probabilities and the state-update rules behind the simplified explanation.' }],
  4: [IBM_LEARNING, PRESKILL_NOTES],
  5: [IBM_LEARNING, PRESKILL_NOTES],
  6: [IBM_LEARNING, QISKIT_CIRCUITS],
  7: [IBM_LEARNING, PRESKILL_NOTES],
  8: [IBM_LEARNING, PRESKILL_NOTES],
  9: [QISKIT_CIRCUITS, IBM_LEARNING],
  10: [IBM_LEARNING, PRESKILL_NOTES],
  11: [IBM_LEARNING, { title: 'Quantum Computation in the NISQ era and beyond', publisher: 'John Preskill', url: 'https://arxiv.org/abs/1801.00862', why: 'Explains why noise and limited circuit depth matter for near-term devices.' }],
  12: [IBM_LEARNING, { title: 'Quantum Computation in the NISQ era and beyond', publisher: 'John Preskill', url: 'https://arxiv.org/abs/1801.00862', why: 'Places simple error channels in the broader context of noisy hardware.' }],
  13: [IBM_LEARNING, { title: 'Rapid solution of problems by quantum computation', publisher: 'David Deutsch and Richard Jozsa', url: 'https://doi.org/10.1098/rspa.1992.0167', why: 'The original Deutsch-Jozsa algorithm paper and its promise-problem setting.' }],
  14: [IBM_LEARNING, { title: 'On the power of quantum computation', publisher: 'Daniel Simon', url: 'https://doi.org/10.1109/SFCS.1994.365700', why: 'The original paper introducing Simon\'s hidden-period problem.' }],
  15: [IBM_LEARNING, { title: 'Algorithms for quantum computation: discrete logarithms and factoring', publisher: 'Peter Shor', url: 'https://arxiv.org/abs/quant-ph/9508027', why: 'The original source for the period-finding approach behind Shor\'s algorithm.' }],
  16: [IBM_LEARNING, { title: 'Scheme for reducing decoherence in quantum memory', publisher: 'Peter Shor', url: 'https://doi.org/10.1103/PhysRevA.52.R2493', why: 'An early quantum-error-correction construction showing the cost of protecting information.' }],
  17: [IBM_LEARNING, PRESKILL_NOTES],
  18: [IBM_LEARNING, PRESKILL_NOTES],
  19: [IBM_LEARNING, { title: 'Quantum complexity theory', publisher: 'John Preskill, Caltech', url: 'https://theory.caltech.edu/~preskill/ph229/chap6.pdf', why: 'Introduces computational resources and complexity classes behind the high-level discussion.' }],
  20: [IBM_LEARNING, { title: 'A variational eigenvalue solver on a photonic quantum processor', publisher: 'Alberto Peruzzo et al.', url: 'https://doi.org/10.1038/ncomms5213', why: 'A primary source for the variational eigensolver pattern and its measurement loop.' }],
  21: [IBM_LEARNING, PRESKILL_NOTES],
  22: [IBM_LEARNING, PRESKILL_NOTES],
  23: [IBM_LEARNING, PRESKILL_NOTES],
  24: [IBM_LEARNING, QISKIT_CIRCUITS],
  25: [IBM_LEARNING, PRESKILL_NOTES],
  26: [IBM_LEARNING, PRESKILL_NOTES],
  27: [QISKIT_CIRCUITS, PRESKILL_NOTES],
  28: [IBM_LEARNING, PRESKILL_NOTES],
  29: [IBM_LEARNING, PRESKILL_NOTES],
  30: [IBM_LEARNING, { title: 'A variational eigenvalue solver on a photonic quantum processor', publisher: 'Alberto Peruzzo et al.', url: 'https://doi.org/10.1038/ncomms5213', why: 'A primary source for the VQE workflow and the role of repeated measurements.' }],
  31: [IBM_LEARNING, { title: 'A Quantum Approximate Optimization Algorithm', publisher: 'Edward Farhi, Jeffrey Goldstone, Sam Gutmann', url: 'https://arxiv.org/abs/1411.4028', why: 'The original QAOA proposal and its parameterized alternating-operator structure.' }],
  32: [IBM_LEARNING, { title: 'Quantum annealing', publisher: 'Arnab Das and Bikas K. Chakrabarti', url: 'https://doi.org/10.1007/s10909-008-9879-7', why: 'A review of the physical and algorithmic ideas behind quantum annealing.' }],
  33: [IBM_LEARNING, PRESKILL_NOTES],
  34: [IBM_LEARNING, PRESKILL_NOTES],
  35: [IBM_LEARNING, PRESKILL_NOTES],
  36: [IBM_LEARNING, { title: 'The no-cloning theorem', publisher: 'William Wootters and Wojciech Zurek', url: 'https://doi.org/10.1103/PhysRevD.23.310', why: 'The original proof that arbitrary unknown quantum states cannot be copied.' }],
  37: [IBM_LEARNING, { title: 'A fast quantum mechanical algorithm for database search', publisher: 'Lov K. Grover', url: 'https://doi.org/10.1103/PhysRevLett.79.325', why: 'The original source for Grover search and its query-complexity claim.' }],
  38: [IBM_LEARNING, { title: 'Quantum cryptography based on Bell\'s theorem', publisher: 'Charles H. Bennett and Gilles Brassard', url: 'https://doi.org/10.1016/0022-4073(84)90118-9', why: 'The original BB84 proposal; production security also needs authentication and finite-key analysis.' }],
  39: [IBM_LEARNING, { title: 'Quantum information science', publisher: 'National Institute of Standards and Technology', url: 'https://www.nist.gov/topics/physics/quantum-information-science', why: 'A public scientific overview of quantum information and the engineering landscape.' }],
  40: [QISKIT_CIRCUITS, { title: 'Transpiler', publisher: 'IBM Quantum Documentation', url: 'https://quantum.cloud.ibm.com/docs/en/guides/transpile', why: 'Documents how abstract circuits are adapted to a target backend.' }],
};

export function getLessonSources(lessonId: number): LessonSource[] {
  return SOURCES_BY_LESSON[lessonId] ?? [IBM_LEARNING, PRESKILL_NOTES];
}