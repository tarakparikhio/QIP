export type ProjectUpdate = {
  date: string;
  commit: string;
  title: string;
  summary: string;
};

// Static by design: Firebase Hosting serves the site without a runtime Git dependency.
export const PROJECT_UPDATES: ProjectUpdate[] = [
  {
    date: '2026-08-09',
    commit: '7f03cbf',
    title: 'Audited and corrected lesson content numbering',
    summary: 'Fixed student-facing section numbers across the reordered 40-lesson curriculum, clarified several advanced explanations, and added validation to prevent stale labels from returning.',
  },
  {
    date: '2026-08-09',
    commit: 'f817099',
    title: 'Completed the 40-lesson platform refresh',
    summary: 'Aligned the curriculum, added the self-paced roadmap and project updates, improved simulator learning tools, and focused the landing page on starting a lesson or running a circuit.',
  },
  {
    date: '2026-08-02',
    commit: '06d0339',
    title: 'Validated mental models and circuit presets',
    summary: 'Added guided explanations and circuit presets that make the simulator easier to use while keeping the ideal-state boundary explicit.',
  },
  {
    date: '2026-08-02',
    commit: 'c544922',
    title: 'Completed the 35-lesson platform milestone',
    summary: 'Expanded the curriculum, strengthened lesson validation, and consolidated the learning experience around the interactive website.',
  },
  {
    date: '2026-08-01',
    commit: '84d9431',
    title: 'Merged quiz-gated lesson progress',
    summary: 'Connected lesson quizzes, completion state, XP, and unlock progression into the learning path.',
  },
  {
    date: '2026-08-01',
    commit: '493c104',
    title: 'Published lessons 1-20 and the roadmap',
    summary: 'Established the first complete learning route from foundational concepts through early algorithms.',
  },
  {
    date: '2026-07-25',
    commit: 'f749afd',
    title: 'Added lessons 11-15 and the About section',
    summary: 'Extended the curriculum into decoherence, noise, and algorithms while documenting the project context.',
  },
  {
    date: '2026-05-01',
    commit: '5e800b8',
    title: 'Rebranded to Quantum Playground',
    summary: 'Introduced the current product identity, Bloch favicon, global styling, support footer, and clearer navigation.',
  },
  {
    date: '2026-05-01',
    commit: '49f0e51',
    title: 'Added richer playground controls and content auditing',
    summary: 'Improved gate interactions, persistent visualization sizing, and automated lesson content inspection.',
  },
  {
    date: '2026-05-01',
    commit: '9fed50f',
    title: 'Built the standalone playground',
    summary: 'Added the interactive playground route and expanded the local quantum engine and visualization layer.',
  },
  {
    date: '2026-05-01',
    commit: '5f337bd',
    title: 'Added reduced-state Bloch vectors',
    summary: 'Added per-qubit Bloch views for multi-qubit states using reduced density matrix calculations.',
  },
  {
    date: '2026-03-29',
    commit: '23482e6',
    title: 'Completed the website code review',
    summary: 'Established cleanup, performance, and typography standards for the public-facing application.',
  },
  {
    date: '2026-03-29',
    commit: 'a4d154e',
    title: 'Started the QCML platform',
    summary: 'Created the initial quantum learning platform with lesson content, website structure, scripts, and simulator foundations.',
  },
];
