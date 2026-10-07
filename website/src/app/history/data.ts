export type Milestone = {
  year: string;
  title: string;
  /** Short symbol drawn inside the timeline node, like a gate on a circuit wire. */
  glyph: string;
  people: string;
  what: string;
  why: string;
  lessonSlug?: string;
};

export type Era = {
  id: string;
  label: string;
  span: string;
  title: string;
  intro: string;
  tone: 'classical' | 'physics' | 'bridge' | 'quantum';
  milestones: Milestone[];
};

export const ERAS: Era[] = [
  {
    id: 'logic',
    label: 'Chapter 1',
    span: '1703 to 1937',
    title: 'Thinking in 0s and 1s',
    intro: 'Long before electronics, people discovered that any number, and even logical reasoning, can be written with just two symbols.',
    tone: 'classical',
    milestones: [
      {
        year: '1703',
        title: 'Binary arithmetic',
        glyph: '101',
        people: 'Gottfried Leibniz',
        what: 'Leibniz publishes a way to write every number using only 0 and 1. Five is 101, six is 110.',
        why: 'Two symbols are enough to represent any number. This is the alphabet every computer still uses.',
      },
      {
        year: '1854',
        title: 'Logic becomes algebra',
        glyph: '∧∨¬',
        people: 'George Boole',
        what: 'Boole shows that true/false reasoning can be done with equations using AND, OR, and NOT.',
        why: 'Logic turns into arithmetic on 0s and 1s. Quantum gates later play the same role for qubits.',
      },
      {
        year: '1936',
        title: 'What a computer is',
        glyph: 'tape',
        people: 'Alan Turing',
        what: 'Turing describes an imaginary machine that reads and writes symbols on a tape by following simple rules.',
        why: 'It defines what “computable” means. Quantum computers do not compute anything a Turing machine cannot; the question is how fast.',
      },
      {
        year: '1937',
        title: 'Logic on wires',
        glyph: '0|1',
        people: 'Claude Shannon',
        what: 'Shannon shows that Boole’s algebra can be built out of electrical switches: on is 1, off is 0.',
        why: 'Abstract logic becomes something you can build. A circuit diagram is born, and quantum circuits borrow the idea.',
      },
    ],
  },
  {
    id: 'quantum-physics',
    label: 'Chapter 2',
    span: '1900 to 1935',
    title: 'Meanwhile, physics gets strange',
    intro: 'In the same decades, physicists found that tiny things like electrons and light do not behave like little marbles.',
    tone: 'physics',
    milestones: [
      {
        year: '1900',
        title: 'Energy comes in chunks',
        glyph: 'hν',
        people: 'Max Planck',
        what: 'To explain how hot objects glow, Planck assumes energy is released in small fixed packets, or “quanta”.',
        why: 'This is where the word quantum comes from: discrete steps instead of a smooth dial.',
      },
      {
        year: '1905',
        title: 'Light is made of particles too',
        glyph: 'γ',
        people: 'Albert Einstein',
        what: 'Einstein explains the photoelectric effect by treating light as packets, later called photons.',
        why: 'Photons are now one of the ways to build qubits.',
      },
      {
        year: '1925–26',
        title: 'Quantum mechanics and the Born rule',
        glyph: '|ψ|²',
        people: 'Werner Heisenberg, Erwin Schrödinger, Max Born',
        what: 'A full mathematical theory appears. Born explains that it predicts probabilities: square the amplitude to get the chance of an outcome.',
        why: 'This one rule, probability = |amplitude|², is the heart of how a qubit is measured.',
        lessonSlug: 'measurement',
      },
      {
        year: '1935',
        title: 'Entanglement is named',
        glyph: '⊗',
        people: 'Einstein, Podolsky, Rosen; Schrödinger',
        what: 'Einstein and colleagues argue quantum theory must be incomplete because linked particles seem too correlated. Schrödinger names the effect entanglement.',
        why: 'What looked like a flaw became a resource. Entanglement powers teleportation and many algorithms.',
        lessonSlug: 'entanglement',
      },
    ],
  },
  {
    id: 'classical-machines',
    label: 'Chapter 3',
    span: '1945 to 1965',
    title: 'Classical computers take over the world',
    intro: 'Quantum physics quietly made modern classical computing possible. The transistor is a quantum device that stores ordinary bits.',
    tone: 'classical',
    milestones: [
      {
        year: '1945',
        title: 'Electronic, programmable computers',
        glyph: 'CPU',
        people: 'ENIAC team; John von Neumann',
        what: 'ENIAC runs with about 18,000 vacuum tubes. Von Neumann describes storing the program in memory alongside the data.',
        why: 'The basic layout of a computer, a processor plus memory, is still how we think about a quantum computer controlled by a classical one.',
      },
      {
        year: '1947',
        title: 'The transistor',
        glyph: 'npn',
        people: 'John Bardeen, Walter Brattain, William Shockley',
        what: 'Bell Labs builds a tiny solid switch that replaces bulky vacuum tubes.',
        why: 'Understanding how electrons move in semiconductors required quantum mechanics. Classical bits run on quantum physics already.',
      },
      {
        year: '1948',
        title: 'The bit gets its name',
        glyph: 'bit',
        people: 'Claude Shannon',
        what: 'Shannon’s theory of communication measures information in “bits”, a word he credits to John Tukey.',
        why: 'Information becomes something you can count. Later, the qubit is defined as the quantum version of this unit.',
      },
      {
        year: '1958–65',
        title: 'Chips and Moore’s law',
        glyph: 'IC',
        people: 'Jack Kilby, Robert Noyce, Gordon Moore',
        what: 'Many transistors are printed onto one chip. Moore observes that the number per chip keeps doubling.',
        why: 'Shrinking transistors eventually approach sizes where quantum effects can no longer be ignored.',
      },
    ],
  },
  {
    id: 'bridge',
    label: 'Chapter 4',
    span: '1961 to 1985',
    title: 'Asking a new question: what if the computer itself were quantum?',
    intro: 'Physicists and computer scientists start asking what information really is physically, and whether nature computes differently.',
    tone: 'bridge',
    milestones: [
      {
        year: '1961',
        title: 'Information is physical',
        glyph: 'kT',
        people: 'Rolf Landauer',
        what: 'Landauer shows that erasing a bit always costs a minimum amount of energy.',
        why: 'Computation follows the laws of physics, so different physics could mean a different kind of computer.',
      },
      {
        year: '1964',
        title: 'Bell’s theorem',
        glyph: '≠',
        people: 'John Bell',
        what: 'Bell finds a test that can tell quantum entanglement apart from any hidden, pre-set classical explanation.',
        why: 'Experiments starting in the 1970s and 1980s confirm quantum predictions, recognised by the 2022 Nobel Prize in Physics.',
        lessonSlug: 'entanglement',
      },
      {
        year: '1980–82',
        title: '“Nature isn’t classical”',
        glyph: 'sim',
        people: 'Paul Benioff, Richard Feynman, Yuri Manin',
        what: 'Benioff describes a quantum version of a Turing machine. Feynman argues that simulating quantum systems needs a computer that is quantum itself.',
        why: 'This is the birth of the idea. Simulating molecules and materials is still one of the most promising uses.',
        lessonSlug: 'hamiltonian-simulation',
      },
      {
        year: '1982',
        title: 'You cannot copy a qubit',
        glyph: '⊘',
        people: 'William Wootters, Wojciech Zurek, Dennis Dieks',
        what: 'They prove that an unknown quantum state cannot be perfectly copied.',
        why: 'Copy and paste, the most basic classical operation, is forbidden. It complicates error correction and enables secure communication.',
        lessonSlug: 'no-cloning-theorem',
      },
      {
        year: '1984',
        title: 'Quantum cryptography',
        glyph: 'key',
        people: 'Charles Bennett, Gilles Brassard',
        what: 'The BB84 protocol uses single photons so that any eavesdropper disturbs the message and gets noticed.',
        why: 'The first practical application of quantum information, and one already in commercial use.',
        lessonSlug: 'quantum-cryptography-bb84',
      },
      {
        year: '1985',
        title: 'A universal quantum computer',
        glyph: 'U',
        people: 'David Deutsch',
        what: 'Deutsch defines a quantum computer that can run any quantum program, much like Turing did for classical machines.',
        why: 'Quantum computing becomes a field of computer science, not only a physics curiosity.',
        lessonSlug: 'quantum-circuits',
      },
    ],
  },
  {
    id: 'algorithms',
    label: 'Chapter 5',
    span: '1992 to 1996',
    title: 'Algorithms that prove the point',
    intro: 'A handful of algorithms showed that a quantum computer could beat a classical one on specific problems, not on everything.',
    tone: 'quantum',
    milestones: [
      {
        year: '1992',
        title: 'The first speedup',
        glyph: 'f(x)',
        people: 'David Deutsch, Richard Jozsa',
        what: 'A toy problem that a quantum computer answers with one question, where a classical one may need many.',
        why: 'Small and artificial, but it shows interference doing useful work.',
        lessonSlug: 'deutsch-jozsa',
      },
      {
        year: '1993',
        title: 'Teleportation is proposed',
        glyph: '⇝',
        people: 'Bennett and colleagues',
        what: 'A recipe to move a qubit’s state using entanglement plus two ordinary classical bits.',
        why: 'Nothing travels faster than light, but it shows entanglement and classical bits working together. First demonstrated in 1997.',
        lessonSlug: 'quantum-teleportation',
      },
      {
        year: '1994',
        title: 'Shor’s algorithm',
        glyph: 'N=pq',
        people: 'Peter Shor (building on Daniel Simon)',
        what: 'Shor shows a quantum computer could factor large numbers far faster than any known classical method.',
        why: 'Much of today’s internet encryption relies on factoring being hard. Suddenly quantum computing mattered to everyone.',
        lessonSlug: 'shors-algorithm',
      },
      {
        year: '1995',
        title: 'Error correction and the word “qubit”',
        glyph: 'QEC',
        people: 'Peter Shor, Andrew Steane; Benjamin Schumacher',
        what: 'Shor and Steane show quantum errors can be corrected without looking at the data directly. Schumacher’s paper coins “qubit”.',
        why: 'Without error correction, fragile qubits could never run long programs.',
        lessonSlug: 'quantum-error-correction',
      },
      {
        year: '1996',
        title: 'Grover’s search',
        glyph: '√N',
        people: 'Lov Grover',
        what: 'Grover finds a way to search an unsorted list in roughly the square root of the usual number of steps.',
        why: 'A modest but very general speedup, and a beautiful example of amplifying the right answer.',
        lessonSlug: 'grovers-search-algorithm',
      },
    ],
  },
  {
    id: 'hardware',
    label: 'Chapter 6',
    span: '1995 to today',
    title: 'Building real machines',
    intro: 'Turning theory into hardware has been slow and hard, because qubits lose their quantum behaviour when anything disturbs them.',
    tone: 'quantum',
    milestones: [
      {
        year: '1995',
        title: 'First quantum logic gate',
        glyph: 'ion',
        people: 'Ignacio Cirac, Peter Zoller; David Wineland, Christopher Monroe',
        what: 'A proposal to use trapped ions as qubits is followed the same year by a working two-qubit gate in the lab.',
        why: 'Trapped ions remain one of the leading ways to build qubits.',
        lessonSlug: 'quantum-hardware-platforms',
      },
      {
        year: '1999–2001',
        title: 'Superconducting qubits and factoring 15',
        glyph: 'JJ',
        people: 'Yasunobu Nakamura and colleagues; IBM and Stanford',
        what: 'A tiny superconducting circuit is controlled as a qubit. Separately, a 7-qubit molecule factors 15 into 3 × 5 using Shor’s idea.',
        why: 'Superconducting circuits became the basis of IBM’s and Google’s machines.',
        lessonSlug: 'quantum-hardware-platforms',
      },
      {
        year: '2016',
        title: 'Quantum computers in the cloud',
        glyph: 'web',
        people: 'IBM',
        what: 'IBM puts a 5-qubit processor online so anyone can run circuits from a browser.',
        why: 'Students can now program real quantum hardware. You can too, from this site.',
      },
      {
        year: '2018–19',
        title: 'The NISQ era and “quantum supremacy”',
        glyph: 'NISQ',
        people: 'John Preskill; Google',
        what: 'Preskill names today’s noisy, intermediate-scale machines. Google reports a 53-qubit chip finishing a sampling task believed too hard for classical computers.',
        why: 'An important milestone on a deliberately artificial task. Classical methods later narrowed the gap, which shows how hard fair comparisons are.',
        lessonSlug: 'quantum-noise-and-errors',
      },
      {
        year: '2023–24',
        title: 'Logical qubits arrive',
        glyph: 'L',
        people: 'Harvard and QuEra; Google; others',
        what: 'Teams run programs on error-corrected “logical” qubits, and show errors falling as the code grows larger.',
        why: 'The first evidence that scaling up can make qubits more reliable, not less. Useful, large-scale machines are still being built.',
        lessonSlug: 'quantum-error-correction',
      },
    ],
  },
];

export const COMPARISON = [
  { aspect: 'Basic unit', classical: 'Bit: 0 or 1', quantum: 'Qubit: a blend of 0 and 1 described by amplitudes' },
  { aspect: 'Reading it', classical: 'Shows the stored value, nothing changes', quantum: 'Gives 0 or 1 at random, with probability = |amplitude|², and the blend is lost' },
  { aspect: 'Operations', classical: 'Logic gates: AND, OR, NOT', quantum: 'Quantum gates: reversible rotations like H, X, Z, CNOT' },
  { aspect: 'Copying', classical: 'Copy freely', quantum: 'An unknown state cannot be copied' },
  { aspect: 'Strength', classical: 'Fast, reliable, good at almost everything', quantum: 'Interference and entanglement help on specific problems' },
];

/** Stable anchor for a milestone, shared by the timeline and the people page. */
export function milestoneId(milestone: Milestone) {
  return `m-${milestone.year.slice(0, 4)}-${milestone.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}
