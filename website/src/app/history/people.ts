import { ERAS, milestoneId, type Era, type Milestone } from './data';

export type Person = {
  id: string;
  name: string;
  /** Birth and death years; left out where we have not checked them. */
  lived?: string;
  role: string;
  /** Year of the contribution highlighted on the timeline. */
  year: string;
  contribution: string;
  /** Path after https://en.wikipedia.org/wiki/ */
  wiki: string;
  /** Exact title of the timeline milestone this person belongs to. */
  milestone: string;
};

const RAW_PEOPLE: Person[] = [
  { id: 'leibniz', name: 'Gottfried Wilhelm Leibniz', lived: '1646–1716', role: 'Mathematician and philosopher', year: '1703', contribution: 'Published binary arithmetic, writing every number with only 0 and 1, and dreamed of a machine that could reason by calculation.', wiki: 'Gottfried_Wilhelm_Leibniz', milestone: 'Binary arithmetic' },
  { id: 'boole', name: 'George Boole', lived: '1815–1864', role: 'Mathematician', year: '1854', contribution: 'Turned logic into algebra. AND, OR, and NOT on true/false values are still called Boolean logic.', wiki: 'George_Boole', milestone: 'Logic becomes algebra' },
  { id: 'turing', name: 'Alan Turing', lived: '1912–1954', role: 'Mathematician and computer scientist', year: '1936', contribution: 'Defined what it means for something to be computable with the Turing machine, the model every computer, quantum ones included, is measured against.', wiki: 'Alan_Turing', milestone: 'What a computer is' },
  { id: 'shannon', name: 'Claude Shannon', lived: '1916–2001', role: 'Engineer and mathematician', year: '1937 · 1948', contribution: 'Showed that switches can do Boolean logic, then founded information theory and made the bit the unit of information.', wiki: 'Claude_Shannon', milestone: 'Logic on wires' },
  { id: 'planck', name: 'Max Planck', lived: '1858–1947', role: 'Physicist', year: '1900', contribution: 'Proposed that energy comes in discrete packets, or quanta, starting quantum theory.', wiki: 'Max_Planck', milestone: 'Energy comes in chunks' },
  { id: 'einstein', name: 'Albert Einstein', lived: '1879–1955', role: 'Physicist', year: '1905 · 1935', contribution: 'Explained light as packets (photons). Later co-wrote the EPR paper that put entanglement in the spotlight.', wiki: 'Albert_Einstein', milestone: 'Light is made of particles too' },
  { id: 'heisenberg', name: 'Werner Heisenberg', lived: '1901–1976', role: 'Physicist', year: '1925', contribution: 'Created matrix mechanics, the first complete formulation of quantum mechanics. Quantum gates are matrices for the same reason.', wiki: 'Werner_Heisenberg', milestone: 'Quantum mechanics and the Born rule' },
  { id: 'schrodinger', name: 'Erwin Schrödinger', lived: '1887–1961', role: 'Physicist', year: '1926 · 1935', contribution: 'Wrote the wave equation that describes how quantum states change, and gave entanglement its name.', wiki: 'Erwin_Schr%C3%B6dinger', milestone: 'Entanglement is named' },
  { id: 'born', name: 'Max Born', lived: '1882–1970', role: 'Physicist', year: '1926', contribution: 'Gave the rule that turns amplitudes into probabilities: probability equals amplitude squared.', wiki: 'Max_Born', milestone: 'Quantum mechanics and the Born rule' },
  { id: 'von-neumann', name: 'John von Neumann', lived: '1903–1957', role: 'Mathematician', year: '1945', contribution: 'Described the stored-program computer design used ever since, and earlier put quantum mechanics on a rigorous mathematical footing.', wiki: 'John_von_Neumann', milestone: 'Electronic, programmable computers' },
  { id: 'bardeen', name: 'John Bardeen', lived: '1908–1991', role: 'Physicist', year: '1947', contribution: 'Co-invented the transistor at Bell Labs. Won the Nobel Prize in Physics twice.', wiki: 'John_Bardeen', milestone: 'The transistor' },
  { id: 'brattain', name: 'Walter Brattain', lived: '1902–1987', role: 'Physicist', year: '1947', contribution: 'Built the first working point-contact transistor with Bardeen.', wiki: 'Walter_Houser_Brattain', milestone: 'The transistor' },
  { id: 'shockley', name: 'William Shockley', lived: '1910–1989', role: 'Physicist', year: '1947', contribution: 'Led the Bell Labs group and developed the junction transistor that made the device practical.', wiki: 'William_Shockley', milestone: 'The transistor' },
  { id: 'kilby', name: 'Jack Kilby', lived: '1923–2005', role: 'Engineer', year: '1958', contribution: 'Built the first integrated circuit, putting several components on one piece of semiconductor.', wiki: 'Jack_Kilby', milestone: 'Chips and Moore’s law' },
  { id: 'noyce', name: 'Robert Noyce', lived: '1927–1990', role: 'Physicist and entrepreneur', year: '1959', contribution: 'Independently invented the silicon integrated circuit that could be mass-produced, and co-founded Intel.', wiki: 'Robert_Noyce', milestone: 'Chips and Moore’s law' },
  { id: 'moore', name: 'Gordon Moore', lived: '1929–2023', role: 'Chemist and entrepreneur', year: '1965', contribution: 'Observed that transistor counts per chip were doubling at a steady pace, an observation known as Moore’s law.', wiki: 'Gordon_Moore', milestone: 'Chips and Moore’s law' },
  { id: 'landauer', name: 'Rolf Landauer', lived: '1927–1999', role: 'Physicist', year: '1961', contribution: 'Showed that erasing information has an unavoidable energy cost: information is physical.', wiki: 'Rolf_Landauer', milestone: 'Information is physical' },
  { id: 'bell', name: 'John Stewart Bell', lived: '1928–1990', role: 'Physicist', year: '1964', contribution: 'Found a measurable test that separates quantum entanglement from any hidden classical explanation.', wiki: 'John_Stewart_Bell', milestone: 'Bell’s theorem' },
  { id: 'aspect', name: 'Alain Aspect', lived: 'born 1947', role: 'Physicist', year: '1982', contribution: 'Ran landmark Bell tests confirming quantum predictions. Shared the 2022 Nobel Prize in Physics.', wiki: 'Alain_Aspect', milestone: 'Bell’s theorem' },
  { id: 'benioff', name: 'Paul Benioff', lived: '1930–2022', role: 'Physicist', year: '1980', contribution: 'Described the first quantum mechanical model of a Turing machine.', wiki: 'Paul_Benioff', milestone: '“Nature isn’t classical”' },
  { id: 'manin', name: 'Yuri Manin', lived: '1937–2023', role: 'Mathematician', year: '1980', contribution: 'Independently suggested that quantum systems could be used to compute.', wiki: 'Yuri_Manin', milestone: '“Nature isn’t classical”' },
  { id: 'feynman', name: 'Richard Feynman', lived: '1918–1988', role: 'Physicist', year: '1981', contribution: 'Argued that simulating nature needs a computer built on quantum mechanics, launching the field’s best-known motivation.', wiki: 'Richard_Feynman', milestone: '“Nature isn’t classical”' },
  { id: 'wootters', name: 'William Wootters', lived: 'born 1951', role: 'Physicist', year: '1982', contribution: 'Co-proved the no-cloning theorem with Zurek, and later co-authored the teleportation proposal.', wiki: 'William_Wootters', milestone: 'You cannot copy a qubit' },
  { id: 'zurek', name: 'Wojciech Zurek', lived: 'born 1951', role: 'Physicist', year: '1982', contribution: 'Co-proved the no-cloning theorem and is known for explaining decoherence.', wiki: 'Wojciech_H._Zurek', milestone: 'You cannot copy a qubit' },
  { id: 'dieks', name: 'Dennis Dieks', role: 'Physicist and philosopher', year: '1982', contribution: 'Independently proved that unknown quantum states cannot be copied.', wiki: 'Dennis_Dieks', milestone: 'You cannot copy a qubit' },
  { id: 'bennett', name: 'Charles Bennett', lived: 'born 1943', role: 'Physicist and computer scientist', year: '1984 · 1993', contribution: 'Co-invented quantum cryptography (BB84) and quantum teleportation, and showed computation can be reversible.', wiki: 'Charles_H._Bennett_(physicist)', milestone: 'Quantum cryptography' },
  { id: 'brassard', name: 'Gilles Brassard', lived: 'born 1955', role: 'Computer scientist', year: '1984', contribution: 'Co-invented BB84 quantum key distribution with Bennett.', wiki: 'Gilles_Brassard', milestone: 'Quantum cryptography' },
  { id: 'deutsch', name: 'David Deutsch', lived: 'born 1953', role: 'Physicist', year: '1985 · 1992', contribution: 'Defined the universal quantum computer and, with Jozsa, the first algorithm with a clear quantum speedup.', wiki: 'David_Deutsch', milestone: 'A universal quantum computer' },
  { id: 'jozsa', name: 'Richard Jozsa', role: 'Mathematician', year: '1992', contribution: 'Co-created the Deutsch–Jozsa algorithm and co-authored the teleportation proposal.', wiki: 'Richard_Jozsa', milestone: 'The first speedup' },
  { id: 'shor', name: 'Peter Shor', lived: 'born 1959', role: 'Mathematician', year: '1994 · 1995', contribution: 'Found the fast quantum factoring algorithm and the first quantum error-correcting code.', wiki: 'Peter_Shor', milestone: 'Shor’s algorithm' },
  { id: 'steane', name: 'Andrew Steane', role: 'Physicist', year: '1996', contribution: 'Independently developed quantum error-correcting codes, including the 7-qubit Steane code.', wiki: 'Andrew_Steane', milestone: 'Error correction and the word “qubit”' },
  { id: 'schumacher', name: 'Benjamin Schumacher', role: 'Physicist', year: '1995', contribution: 'Coined the word “qubit” and showed how much quantum information a signal can carry.', wiki: 'Benjamin_Schumacher', milestone: 'Error correction and the word “qubit”' },
  { id: 'grover', name: 'Lov Grover', lived: 'born 1961', role: 'Computer scientist', year: '1996', contribution: 'Invented the quantum search algorithm that finds a marked item in about √N steps.', wiki: 'Lov_Grover', milestone: 'Grover’s search' },
  { id: 'cirac', name: 'Ignacio Cirac', lived: 'born 1965', role: 'Physicist', year: '1995', contribution: 'Proposed with Zoller how to build a quantum computer from trapped ions.', wiki: 'Ignacio_Cirac', milestone: 'First quantum logic gate' },
  { id: 'zoller', name: 'Peter Zoller', lived: 'born 1952', role: 'Physicist', year: '1995', contribution: 'Co-proposed the trapped-ion quantum computer with Cirac.', wiki: 'Peter_Zoller', milestone: 'First quantum logic gate' },
  { id: 'wineland', name: 'David Wineland', lived: 'born 1944', role: 'Physicist', year: '1995', contribution: 'Demonstrated an early two-qubit quantum logic gate with trapped ions. Shared the 2012 Nobel Prize in Physics.', wiki: 'David_J._Wineland', milestone: 'First quantum logic gate' },
  { id: 'monroe', name: 'Christopher Monroe', role: 'Physicist', year: '1995', contribution: 'Built the first trapped-ion quantum logic gate with Wineland, and later co-founded a quantum computing company.', wiki: 'Christopher_Monroe', milestone: 'First quantum logic gate' },
  { id: 'nakamura', name: 'Yasunobu Nakamura', role: 'Physicist', year: '1999', contribution: 'Led the first coherent control of a superconducting qubit, the technology behind many of today’s machines.', wiki: 'Yasunobu_Nakamura', milestone: 'Superconducting qubits and factoring 15' },
  { id: 'preskill', name: 'John Preskill', lived: 'born 1953', role: 'Physicist', year: '2012 · 2018', contribution: 'Coined “quantum supremacy” and “NISQ”, giving the field words for where it stands.', wiki: 'John_Preskill', milestone: 'The NISQ era and “quantum supremacy”' },
];

const MILESTONES = ERAS.flatMap((era) => era.milestones.map((milestone) => ({ milestone, tone: era.tone })));

export type PersonWithLink = Person & { milestoneRef: Milestone; milestoneAnchor: string; tone: Era['tone'] };

/** People joined with their timeline milestone. Throws at build time if a milestone title drifts. */
export const PEOPLE: PersonWithLink[] = RAW_PEOPLE.map((person) => {
  const match = MILESTONES.find((entry) => entry.milestone.title === person.milestone);
  if (!match) throw new Error(`Person ${person.id} points at unknown milestone "${person.milestone}"`);
  return { ...person, milestoneRef: match.milestone, milestoneAnchor: milestoneId(match.milestone), tone: match.tone };
});

/** Anchor of the first person listed for a milestone, so timeline cards can link to their people. */
export function firstPersonFor(milestone: Milestone): string | undefined {
  return PEOPLE.find((person) => person.milestone === milestone.title)?.id;
}
