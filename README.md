# Quantum Playground

**Learn quantum computing from zero, one idea at a time.**

Quantum Playground is a free, self-paced website that teaches the fundamentals of quantum computing to people who have never studied it. Every concept is shown from several angles (an everyday analogy, a picture you can poke at, the math broken down line by line, and real code) so you can pick the explanation that clicks for you and check it against the others.

**Start learning:** [qcmlbytarak.web.app](https://qcmlbytarak.web.app)

No account, no install, no prior physics. Your progress is saved in your browser.

## Who this is for

- **Curious beginners** who keep hearing about qubits and want a clear, honest explanation.
- **Students** who want intuition and worked practice alongside their course.
- **Programmers** who want to see how quantum circuits work and try them in code.

You only need high-school algebra to begin. Complex numbers, vectors, and matrices are introduced as you need them.

## What you will learn

By the end of the foundation lessons you should be able to explain, in your own words:

- what a qubit is, and how it differs from a coin flip
- why measuring a qubit gives a random result, and how the odds are set
- how gates change a qubit, and why phase matters even when you can't see it
- what entanglement is (and what it isn't: it does not send messages faster than light)
- how interference lets a quantum algorithm cancel wrong answers

From there the course continues into circuits, noise, famous algorithms (Deutsch-Jozsa, Grover, Shor), the quantum Fourier transform, near-term hybrid methods, and real hardware.

## How each lesson teaches

Each lesson combines several perspectives on the same idea:

| Perspective | What you get |
| --- | --- |
| **Intuition** | A plain-language explanation and an everyday analogy for every lesson, with notes on where the analogy breaks down. |
| **Visual** | Interactive circuits, the Bloch sphere, state vectors, and probability bars that update as you change things. |
| **Math** | Key equations broken down term by term, so the notation stops being a wall. |
| **Code** | Copyable [Qiskit](https://www.ibm.com/quantum/qiskit) examples you can run yourself. |
| **Practice** | A short quiz to finish the lesson, plus verified practice problems for many lessons. |

Four hands-on labs live inside the lessons they explain: the **Shot lab** (Measurement), the **Interference lab** (Interference), the **Energy lab** (Variational Quantum Algorithms), and the **Trotter lab** (Hamiltonian Simulation, deep dive).

## How to start

1. Open [the lessons page](https://qcmlbytarak.web.app/lessons) and begin with **Lesson 1: Birth of Quantum Information**.
2. Read the lesson, try the interactive pieces, and change things to see what happens.
3. Pass the short quiz at the end. That marks the lesson complete and moves you along your path.
4. Whenever you want to experiment freely, open the [Playground](https://qcmlbytarak.web.app/playground) and build your own circuit.
5. Keep the [Gate reference](https://qcmlbytarak.web.app/gates) open if you forget what a gate does.

New to the whole field? Read [From bits to qubits](https://qcmlbytarak.web.app/history), a 10-minute, math-free history of how classical computing and quantum physics led to quantum computers, and meet [the people behind it](https://qcmlbytarak.web.app/history/people). If logic gates are new to you, warm up in the [Logic lab](https://qcmlbytarak.web.app/logic): flip the inputs of AND, OR, XOR and friends, solve short challenges, and see which ideas carry over to quantum gates.

Lessons are meant to be taken in order, but nothing is locked: you can jump to any lesson you're curious about, and it will point you to the earlier lessons it builds on.

## Learning paths

The 40 lessons are grouped into six stages. The [Roadmap](https://qcmlbytarak.web.app/roadmap) lists the same stages with a checklist for each, so you can tell when you are ready to move on.

| Stage | Lessons | You'll be able to... |
| --- | --- | --- |
| **1. Build the mental model** | 1 to 9 | Describe qubits, superposition, measurement, gates, the Bloch sphere, entanglement, and simple circuits without hand-waving. |
| **2. Reason about circuits and noise** | 10 to 18 | Follow teleportation and no-cloning, trace a circuit step by step, and explain how real hardware differs from an ideal simulator. |
| **3. First quantum speedups** | 19 to 21 | Explain Deutsch-Jozsa, Simon's, and Grover's algorithms as oracle, interference, and measurement steps. |
| **4. Fourier and phase tools** | 22 to 28 | Use the quantum Fourier transform and phase estimation, and see how they power Shor's algorithm. |
| **5. Near-term practice** | 29 to 35 | Understand hybrid quantum-classical methods like VQE and QAOA, Hamiltonian simulation, and annealing. |
| **6. Toward real systems** | 36 to 40 | Discuss quantum cryptography, hardware platforms, and compilation, and start a small project of your own. |

**Short on time?** Stage 1 alone gives you a solid, honest picture of what quantum computing is. Stages 1 and 3 together show you why people are excited about it.

## Good to know

- **The simulator is ideal.** It runs perfect, noise-free math in your browser. Real quantum computers add noise, errors, and other limits, and the lessons point these out where they matter.
- **Qubit order:** the Playground writes qubit 0 as the left-most bit (`|q0 q1 ...⟩`). Qiskit writes it as the right-most bit. Exported code shows both, and the lessons call this out.
- **Check what you learn.** Explanations aim to be accurate but simplified. The [Sources](https://qcmlbytarak.web.app/sources) page lists references for going deeper. Qiskit and IBM Quantum are used as familiar examples; this project is not affiliated with them.
- **Feedback is welcome.** If something is confusing or wrong, please [open an issue](https://github.com/tarakparikhio/QIP/issues).

## For developers

The site is a static-exported Next.js app in [`website/`](website/), deployed to Firebase Hosting. Interactive views run on a small TypeScript quantum engine in `website/src/lib/quantum-engine/`.

```bash
npm --prefix website install
npm --prefix website run dev          # http://localhost:3000
npm --prefix website run typecheck
npm --prefix website run lint
npm --prefix website run check:lessons
npm --prefix website run test:engine
npm --prefix website run build
```

CI (`.github/workflows/quick-validate.yml`) runs the engine tests, lesson and KaTeX checks, typecheck, lint, and a production build.

- Curriculum metadata, quizzes, and prerequisites: `website/src/lib/lessons.ts`
- Lesson content: `website/src/content/lessons/` (files are numbered in visible course order; see `.github/instructions/lesson-authoring.instructions.md`)
- Learner progress is stored in the browser under the `qcpath-progress` key. Renaming it resets everyone's progress.
- `website/.env.production` sets `NEXT_PUBLIC_SITE_URL` for canonical links, Open Graph images, and the sitemap.

See [website/README.md](website/README.md) for architecture and deployment details, and [CHANGELOG.md](CHANGELOG.md) for release notes.
