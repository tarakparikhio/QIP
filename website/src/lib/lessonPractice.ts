/**
 * "Practice the math" problems for every lesson, keyed by stable lesson ID.
 *
 * Text fields support inline math between single dollar signs (rendered with KaTeX).
 * Every numeric answer is checked by scripts/test-practice-answers.mjs, which recomputes
 * it independently, so edit the matching check there when you change a problem.
 *
 * The "lens" field connects the quantum idea to a statistics idea most learners already
 * know: weighted coins, expected counts, standard errors, sample sizes, and decay rates.
 */
export type PracticeProblem = {
  prompt: string;
  answer: number;
  /** Absolute tolerance. Defaults to max(0.005, 1% of |answer|). */
  tolerance?: number;
  unit?: string;
  hint: string;
  solution: string[];
  lens?: string;
};

export const LESSON_PRACTICE: Record<number, PracticeProblem[]> = {
  // 1 · Birth of Quantum Information
  1: [
    {
      prompt: 'A qubit is in $|\\psi\\rangle = 0.6|0\\rangle + 0.8|1\\rangle$. What is the probability of measuring 1?',
      answer: 0.64,
      hint: 'Square the magnitude of the amplitude on $|1\\rangle$.',
      solution: ['Born rule: $P(1) = |\\beta|^2$.', '$|0.8|^2 = 0.64$.', 'Check: $0.6^2 + 0.8^2 = 0.36 + 0.64 = 1$.'],
      lens: 'A measurement is a weighted coin. The amplitudes set the weights, but only after squaring.',
    },
    {
      prompt: 'An amplitude can be complex. If the amplitude on $|0\\rangle$ is $\\tfrac{1+i}{2}$, what is $P(0)$?',
      answer: 0.5,
      hint: 'For $z = a + bi$, $|z|^2 = a^2 + b^2$.',
      solution: ['$|1+i|^2 = 1^2 + 1^2 = 2$.', 'Divide by $2^2 = 4$: $P(0) = 2/4 = 0.5$.'],
    },
    {
      prompt: 'A state has $\\alpha = 0.6$ on $|0\\rangle$. What must $|\\beta|$ be for the state to be valid?',
      answer: 0.8,
      hint: 'Probabilities must add up to 1.',
      solution: ['$|\\alpha|^2 + |\\beta|^2 = 1$.', '$|\\beta|^2 = 1 - 0.36 = 0.64$, so $|\\beta| = 0.8$.'],
      lens: 'Exactly like a probability distribution: the chances of all outcomes sum to 1.',
    },
  ],
  // 2 · Superposition
  2: [
    {
      prompt: 'For $|\\psi\\rangle = \\sqrt{0.3}\\,|0\\rangle + e^{i\\pi/3}\\sqrt{0.7}\\,|1\\rangle$, what is $P(1)$?',
      answer: 0.7,
      hint: 'A phase factor $e^{i\\varphi}$ has magnitude 1.',
      solution: ['$|e^{i\\pi/3}\\sqrt{0.7}|^2 = |e^{i\\pi/3}|^2 \\cdot 0.7$.', '$|e^{i\\pi/3}| = 1$, so $P(1) = 0.7$.', 'The phase is invisible in this measurement but matters for interference.'],
    },
    {
      prompt: 'You measure $|+\\rangle$ 1000 times. The number of 1s is binomial. What is its standard deviation?',
      answer: 15.81,
      tolerance: 0.1,
      hint: 'A binomial count has variance $Np(1-p)$.',
      solution: ['$N = 1000$, $p = 0.5$.', 'Variance $= 1000 \\times 0.5 \\times 0.5 = 250$.', 'Standard deviation $= \\sqrt{250} \\approx 15.81$.'],
      lens: 'So a fair superposition gives about 500 ± 16 ones per 1000 shots, the same spread as 1000 fair coin flips.',
    },
    {
      prompt: 'A classical coin prepares $|0\\rangle$ or $|1\\rangle$ with probability 1/2 each (a mixture). You apply H and measure. What is $P(0)$?',
      answer: 0.5,
      hint: 'Work out H on each case separately, then average the probabilities.',
      solution: ['If the coin gave $|0\\rangle$: $H|0\\rangle = |+\\rangle$, so $P(0) = 1/2$.', 'If it gave $|1\\rangle$: $H|1\\rangle = |-\\rangle$, so $P(0) = 1/2$.', 'Average: $P(0) = 1/2$. The superposition $|+\\rangle$ would instead give $P(0) = 1$.'],
      lens: 'Averaging probabilities (a mixture) destroys the cancellation that averaging amplitudes (a superposition) allows.',
    },
  ],
  // 3 · Measurement
  3: [
    {
      prompt: 'The state $0.6|0\\rangle + 0.8|1\\rangle$ is measured 200 times. How many 0s do you expect?',
      answer: 72,
      tolerance: 0.5,
      hint: 'Expected count = shots × probability.',
      solution: ['$P(0) = 0.6^2 = 0.36$.', 'Expected count $= 200 \\times 0.36 = 72$.'],
      lens: 'This is the expected value of a binomial count, $Np$.',
    },
    {
      prompt: 'For the same 200 shots, what is the standard deviation of the number of 0s?',
      answer: 6.79,
      tolerance: 0.05,
      hint: 'Use $\\sqrt{Np(1-p)}$.',
      solution: ['$Np(1-p) = 200 \\times 0.36 \\times 0.64 = 46.08$.', '$\\sqrt{46.08} \\approx 6.79$.', 'So seeing 65 or 79 zeros is normal; seeing 40 would be suspicious.'],
      lens: 'About 95% of experiments land within two standard deviations: roughly 58 to 86 zeros.',
    },
    {
      prompt: 'You prepare $|0\\rangle$ and measure in the X basis $\\{|+\\rangle, |-\\rangle\\}$. What is $P(+)$?',
      answer: 0.5,
      hint: '$P(+) = |\\langle + | 0\\rangle|^2$.',
      solution: ['$\\langle + | 0 \\rangle = \\tfrac{1}{\\sqrt2}$.', '$P(+) = \\tfrac12$.', 'A state that is certain in one basis can be completely random in another.'],
    },
  ],
  // 4 · Entanglement
  4: [
    {
      prompt: 'Two qubits in $|\\Phi^+\\rangle = (|00\\rangle + |11\\rangle)/\\sqrt2$ are both measured in the Z basis. What is the probability that the results differ?',
      answer: 0,
      tolerance: 0.001,
      hint: 'Which basis states have non-zero amplitude?',
      solution: ['Only $|00\\rangle$ and $|11\\rangle$ appear.', 'Both have equal bits, so $P(\\text{differ}) = 0$.'],
    },
    {
      prompt: 'For $|\\Phi^+\\rangle$, measuring along directions at angles $\\alpha$ and $\\beta$ in the x–z plane gives correlation $E = \\cos(\\alpha-\\beta)$. What is $E$ when $\\alpha - \\beta = 45^\\circ$?',
      answer: 0.7071,
      tolerance: 0.005,
      hint: 'Evaluate $\\cos 45^\\circ$.',
      solution: ['$E = \\cos 45^\\circ = \\tfrac{\\sqrt2}{2} \\approx 0.707$.'],
      lens: 'The correlation $E$ is the average of the product of two ±1 outcomes, the same idea as a correlation coefficient.',
    },
    {
      prompt: 'With $\\alpha - \\beta = 60^\\circ$, what is the probability that the two ±1 outcomes agree? (Use $P(\\text{same}) = (1+E)/2$.)',
      answer: 0.75,
      hint: 'First compute $E = \\cos 60^\\circ$.',
      solution: ['$E = \\cos 60^\\circ = 0.5$.', '$P(\\text{same}) = (1 + 0.5)/2 = 0.75$.'],
    },
    {
      prompt: 'The CHSH value for these settings is $S = 3\\cos 45^\\circ - \\cos 135^\\circ$. Compute $S$. (Any local classical model has $S \\le 2$.)',
      answer: 2.828,
      tolerance: 0.01,
      hint: '$\\cos 135^\\circ = -\\cos 45^\\circ$.',
      solution: ['$S = 3(0.7071) - (-0.7071) = 4 \\times 0.7071$.', '$S = 2\\sqrt2 \\approx 2.828 > 2$.'],
      lens: 'Estimating $S$ in a real experiment is a sampling problem: each correlation is an average of ±1 products with a standard error.',
    },
  ],
  // 5 · Interference
  5: [
    {
      prompt: 'Two routes reach the same outcome with amplitudes $r_1 = r_2 = 0.5$ and relative phase $\\varphi = 90^\\circ$. What is the probability?',
      answer: 0.5,
      hint: '$P = r_1^2 + r_2^2 + 2r_1r_2\\cos\\varphi$.',
      solution: ['$r_1^2 + r_2^2 = 0.5$.', '$\\cos 90^\\circ = 0$, so the cross term vanishes.', '$P = 0.5$, the same as the classical sum.'],
    },
    {
      prompt: 'Same routes, but $\\varphi = 120^\\circ$. What is the probability?',
      answer: 0.25,
      hint: '$\\cos 120^\\circ = -0.5$.',
      solution: ['Cross term $= 2(0.5)(0.5)(-0.5) = -0.25$.', '$P = 0.5 - 0.25 = 0.25$.'],
      lens: 'A negative cross term lowers the probability below the sum of the parts, which never happens when you add chances.',
    },
    {
      prompt: 'If the phase $\\varphi$ is uniformly random, what is the average probability for $r_1 = r_2 = 0.5$?',
      answer: 0.5,
      hint: 'What is the average of $\\cos\\varphi$ over a full turn?',
      solution: ['The average of $\\cos\\varphi$ over $[0, 2\\pi)$ is 0.', 'So the average probability is $r_1^2 + r_2^2 = 0.5$.', 'Random phase turns quantum interference back into ordinary probability addition.'],
      lens: 'This is the expected value of a random variable. Losing phase control is exactly what decoherence does.',
    },
  ],
  // 6 · Quantum Gates & Unitarity
  6: [
    {
      prompt: 'Start in $|0\\rangle$ and apply H, then T, then H. What is $P(0)$? ($T$ adds phase $e^{i\\pi/4}$ to $|1\\rangle$.)',
      answer: 0.8536,
      tolerance: 0.005,
      hint: 'After H and T the state is $(|0\\rangle + e^{i\\pi/4}|1\\rangle)/\\sqrt2$. The final H gives amplitude $(1 + e^{i\\pi/4})/2$ on $|0\\rangle$.',
      solution: ['Amplitude on $|0\\rangle$: $\\tfrac{1 + e^{i\\pi/4}}{2}$.', '$|1 + e^{i\\varphi}|^2 = 2 + 2\\cos\\varphi$.', '$P(0) = \\tfrac{2 + 2\\cos 45^\\circ}{4} = \\tfrac{1 + 0.7071}{2} \\approx 0.854$.'],
    },
    {
      prompt: 'How many T gates in a row equal one Z gate?',
      answer: 4,
      tolerance: 0.1,
      hint: 'Each T adds $\\pi/4$ of phase; Z adds $\\pi$.',
      solution: ['$T^k$ adds phase $k\\pi/4$ to $|1\\rangle$.', '$Z$ adds phase $\\pi$, so $k\\pi/4 = \\pi$ gives $k = 4$.'],
    },
    {
      prompt: 'The real matrix $\\begin{pmatrix}0.6 & 0.8\\\\ 0.8 & x\\end{pmatrix}$ is unitary. What is $x$?',
      answer: -0.6,
      tolerance: 0.005,
      hint: 'The two columns must be orthogonal: their dot product is 0.',
      solution: ['Columns $(0.6, 0.8)$ and $(0.8, x)$ must satisfy $0.6 \\times 0.8 + 0.8x = 0$.', '$x = -0.6$.', 'Check the second column: $0.8^2 + 0.6^2 = 1$.'],
      lens: 'Unitary matrices preserve total probability, like a shuffle that never creates or destroys chance.',
    },
  ],
  // 7 · Bloch Sphere
  7: [
    {
      prompt: 'A state has polar angle $\\theta = 60^\\circ$ on the Bloch sphere. What is $P(0) = \\cos^2(\\theta/2)$?',
      answer: 0.75,
      hint: 'Half of 60° is 30°.',
      solution: ['$\\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$.', '$P(0) = \\tfrac34 = 0.75$.'],
    },
    {
      prompt: 'Which polar angle $\\theta$, in degrees, gives $P(0) = 0.25$?',
      answer: 120,
      tolerance: 0.5,
      unit: 'degrees',
      hint: 'Solve $\\cos(\\theta/2) = 0.5$.',
      solution: ['$\\cos^2(\\theta/2) = 0.25$ gives $\\cos(\\theta/2) = 0.5$.', '$\\theta/2 = 60^\\circ$, so $\\theta = 120^\\circ$.'],
    },
    {
      prompt: 'The Bloch z-coordinate equals $P(0) - P(1)$. What is $z$ when $P(0) = 0.9$?',
      answer: 0.8,
      hint: '$P(1) = 1 - P(0)$.',
      solution: ['$z = 0.9 - 0.1 = 0.8$.'],
      lens: 'Score outcome 0 as +1 and outcome 1 as −1. Then $z$ is the average score, the expected value of a ±1 coin.',
    },
  ],
  // 8 · Multi-Qubit Systems
  8: [
    {
      prompt: 'Qubit 0 is $0.6|0\\rangle + 0.8|1\\rangle$ and qubit 1 is $|+\\rangle$, independently. What is $P(11)$?',
      answer: 0.32,
      hint: 'For independent qubits, joint probabilities multiply.',
      solution: ['$P(q_0 = 1) = 0.64$ and $P(q_1 = 1) = 0.5$.', '$P(11) = 0.64 \\times 0.5 = 0.32$.'],
      lens: 'Product states behave like independent random variables: $P(A \\cap B) = P(A)P(B)$.',
    },
    {
      prompt: 'Amplitudes $c_{00} = c_{01} = c_{10} = 0.5$ and $c_{11} = -0.5$. Compute $\\det M = c_{00}c_{11} - c_{01}c_{10}$.',
      answer: -0.5,
      tolerance: 0.005,
      hint: 'Multiply the diagonals and subtract.',
      solution: ['$c_{00}c_{11} = -0.25$ and $c_{01}c_{10} = 0.25$.', '$\\det M = -0.5 \\ne 0$, so the state is entangled.'],
    },
    {
      prompt: 'How many complex amplitudes describe a general 10-qubit state?',
      answer: 1024,
      tolerance: 0.5,
      hint: 'Each extra qubit doubles the count.',
      solution: ['$2^{10} = 1024$.'],
    },
  ],
  // 9 · Quantum Circuits
  9: [
    {
      prompt: 'A circuit has H on q0 and H on q1 in parallel, then CNOT (q0 → q1), then X on q1. What is its depth?',
      answer: 3,
      tolerance: 0.1,
      hint: 'Gates on different qubits at the same time share one layer.',
      solution: ['Layer 1: both H gates.', 'Layer 2: CNOT.', 'Layer 3: X. Depth = 3.'],
    },
    {
      prompt: 'Start in $|00\\rangle$, apply X on q0, then CNOT (q0 → q1). Read the result as a binary number with q0 on the left. What number is it?',
      answer: 3,
      tolerance: 0.1,
      hint: 'X makes q0 = 1, so the CNOT fires.',
      solution: ['After X: $|10\\rangle$.', 'CNOT flips q1: $|11\\rangle$.', 'Binary 11 = 3.'],
    },
    {
      prompt: 'H on q0, then CNOT (q0 → q1), then CNOT (q1 → q2) on three qubits. What is $P(000)$?',
      answer: 0.5,
      hint: 'This is the 3-qubit GHZ state.',
      solution: ['The state is $(|000\\rangle + |111\\rangle)/\\sqrt2$.', '$P(000) = 1/2$.'],
    },
  ],
  // 10 · Phase Kickback
  10: [
    {
      prompt: 'A controlled-S gate acts with control $|+\\rangle$ and target $|1\\rangle$. $S|1\\rangle = i|1\\rangle$. What relative phase, in degrees, appears on the control?',
      answer: 90,
      tolerance: 0.5,
      unit: 'degrees',
      hint: 'The target is an eigenstate; its eigenvalue moves to the control branch.',
      solution: ['The eigenvalue is $i = e^{i\\pi/2}$.', 'The control becomes $(|0\\rangle + i|1\\rangle)/\\sqrt2$: a $90^\\circ$ phase.'],
    },
    {
      prompt: 'Same idea with controlled-T. What phase, in degrees?',
      answer: 45,
      tolerance: 0.5,
      unit: 'degrees',
      hint: '$T|1\\rangle = e^{i\\pi/4}|1\\rangle$.',
      solution: ['$\\pi/4$ radians $= 45^\\circ$.'],
    },
    {
      prompt: 'Control $|+\\rangle$, target $|-\\rangle$, apply CNOT, then H on the control and measure it. What is $P(1)$?',
      answer: 1,
      tolerance: 0.001,
      hint: 'The kickback turns the control into $|-\\rangle$.',
      solution: ['$|-\\rangle$ has X-eigenvalue $-1$, so the control becomes $|-\\rangle$.', '$H|-\\rangle = |1\\rangle$, so $P(1) = 1$.'],
    },
  ],
  // 11 · Decoherence
  11: [
    {
      prompt: 'Phase coherence decays as $e^{-t/T_2}$. With $T_2 = 100\\,\\mu s$, what fraction remains after $50\\,\\mu s$?',
      answer: 0.6065,
      tolerance: 0.005,
      hint: 'Compute $e^{-0.5}$.',
      solution: ['$t/T_2 = 0.5$.', '$e^{-0.5} \\approx 0.607$.'],
    },
    {
      prompt: 'Energy relaxation: $P(\\text{still in }|1\\rangle) = e^{-t/T_1}$. With $T_1 = 80\\,\\mu s$, what is it after $160\\,\\mu s$?',
      answer: 0.1353,
      tolerance: 0.003,
      hint: '$160/80 = 2$.',
      solution: ['$e^{-2} \\approx 0.135$.'],
      lens: 'This is exponential waiting time, like radioactive decay. The half-life is $T_1 \\ln 2 \\approx 0.69\\,T_1$.',
    },
    {
      prompt: 'A $|+\\rangle$ state keeps coherence $c = 0.6065$, then H is applied. $P(0) = (1 + c)/2$. What is $P(0)$?',
      answer: 0.8033,
      tolerance: 0.005,
      hint: 'Substitute $c$.',
      solution: ['$P(0) = (1 + 0.6065)/2 \\approx 0.803$.', 'Perfect coherence gives 1; total decoherence gives 0.5, a fair coin.'],
      lens: 'The interference "contrast" fades from certainty toward a coin flip as coherence decays.',
    },
  ],
  // 12 · Quantum Noise & Errors
  12: [
    {
      prompt: 'Readout error: a true 0 is read as 1 with probability 0.02, and a true 1 is read as 0 with probability 0.05. For $|+\\rangle$, what is $P(\\text{read }1)$?',
      answer: 0.485,
      tolerance: 0.002,
      hint: 'Use the law of total probability over the true outcome.',
      solution: ['$P(\\text{read }1) = P(0)\\cdot 0.02 + P(1)\\cdot 0.95$.', '$= 0.5 \\times 0.02 + 0.5 \\times 0.95 = 0.485$.'],
      lens: 'This is a confusion matrix, exactly like false positives and false negatives in a medical test.',
    },
    {
      prompt: 'A circuit has 20 gates, each succeeding with probability 0.995. Roughly what is the chance that no gate fails?',
      answer: 0.9046,
      tolerance: 0.003,
      hint: 'Independent events: multiply.',
      solution: ['$0.995^{20} \\approx 0.905$.'],
      lens: 'Small per-step errors compound multiplicatively, like survival probabilities.',
    },
    {
      prompt: 'A bit-flip channel with $p = 0.1$ acts on $|0\\rangle$. What is $P(1)$ afterwards?',
      answer: 0.1,
      hint: 'With probability $p$, X is applied.',
      solution: ['$\\rho \\to 0.9|0\\rangle\\langle0| + 0.1|1\\rangle\\langle1|$, so $P(1) = 0.1$.'],
    },
  ],
  // 13 · Deutsch–Jozsa
  13: [
    {
      prompt: 'For $n = 3$ input bits, how many queries does a deterministic classical algorithm need in the worst case to be certain?',
      answer: 5,
      tolerance: 0.1,
      hint: 'In the worst case, the first half of the inputs all agree.',
      solution: ['There are $2^3 = 8$ inputs.', 'Seeing 4 equal values is still consistent with balanced.', 'The 5th query settles it: $2^{n-1} + 1 = 5$.'],
    },
    {
      prompt: 'A randomized classical test queries 5 random inputs (with replacement). If the function is balanced, what is the chance all 5 answers agree?',
      answer: 0.0625,
      tolerance: 0.001,
      hint: 'All five must be 0, or all five must be 1.',
      solution: ['$P(\\text{all 0}) = (1/2)^5$ and $P(\\text{all 1}) = (1/2)^5$.', 'Total $= 2/32 = 0.0625$.'],
      lens: 'Classical random sampling gets a small error cheaply. Deutsch–Jozsa is exact with one query, which is its real advantage.',
    },
    {
      prompt: 'How many oracle queries does Deutsch–Jozsa use?',
      answer: 1,
      tolerance: 0.1,
      hint: 'Count oracle calls in the circuit.',
      solution: ['The oracle is applied once to a superposition of all inputs.'],
    },
  ],
  // 14 · Simon's Algorithm
  14: [
    {
      prompt: 'For $n = 10$ bits (with $s \\ne 0$), how many linearly independent equations $y \\cdot s = 0$ do you need to pin down $s$?',
      answer: 9,
      tolerance: 0.1,
      hint: 'The equations live in an $(n-1)$-dimensional space.',
      solution: ['Valid $y$ values form an $(n - 1)$-dimensional subspace.', 'So you need $n - 1 = 9$ independent equations.'],
    },
    {
      prompt: 'Classically, with $n = 10$, you query 32 random distinct inputs. Each pair collides with probability $1/1023$. What is the expected number of colliding pairs?',
      answer: 0.485,
      tolerance: 0.005,
      hint: 'Count pairs: $\\binom{32}{2}$.',
      solution: ['$\\binom{32}{2} = 496$ pairs.', 'Expected collisions $= 496/1023 \\approx 0.485$.', 'You need about $\\sqrt{2^n}$ queries, which grows exponentially with $n$.'],
      lens: 'This is the birthday paradox: collisions appear after about the square root of the number of possibilities.',
    },
    {
      prompt: 'For secret $s = 110$, compute $y \\cdot s \\bmod 2$ for $y = 101$.',
      answer: 1,
      tolerance: 0.1,
      hint: 'Multiply bit by bit, add, take the remainder mod 2.',
      solution: ['$1\\cdot1 + 0\\cdot1 + 1\\cdot0 = 1$.', '$1 \\bmod 2 = 1$, so Simon\'s circuit can never output $y = 101$ for this $s$.'],
    },
  ],
  // 15 · Shor's Algorithm
  15: [
    {
      prompt: 'Find the period $r$ of $f(x) = 2^x \\bmod 15$.',
      answer: 4,
      tolerance: 0.1,
      hint: 'List $2^1, 2^2, 2^3, \\ldots$ mod 15 until you return to 1.',
      solution: ['$2, 4, 8, 16 \\equiv 1$.', 'So $r = 4$.'],
    },
    {
      prompt: 'For $N = 21$, $a = 2$ has period $r = 6$. Compute $\\gcd(2^{3} - 1, 21)$.',
      answer: 7,
      tolerance: 0.1,
      hint: '$2^3 - 1 = 7$.',
      solution: ['$\\gcd(7, 21) = 7$.', 'Also $\\gcd(2^3 + 1, 21) = \\gcd(9, 21) = 3$, and $21 = 3 \\times 7$.'],
    },
    {
      prompt: 'With $Q = 16$ and $r = 4$, the four outcomes 0, 4, 8, 12 are equally likely. What is the probability of the useless outcome 0?',
      answer: 0.25,
      hint: 'Four equally likely peaks.',
      solution: ['Each peak has probability $1/4$.', 'Outcome 0 gives the fraction $0/16$, which carries no information about $r$.'],
      lens: 'The number of repetitions until a useful outcome is geometric; with success probability 0.75 you expect $1/0.75 \\approx 1.33$ runs.',
    },
  ],
  // 16 · Quantum Error Correction
  16: [
    {
      prompt: 'A 3-qubit repetition code fails when 2 or more qubits flip. With independent flip probability $p = 0.01$, the logical error rate is $3p^2 - 2p^3$. Compute it.',
      answer: 0.000298,
      tolerance: 0.000003,
      hint: '$3(0.0001) - 2(0.000001)$.',
      solution: ['$3p^2 = 0.0003$ and $2p^3 = 0.000002$.', 'Logical error $\\approx 0.000298$, about 34 times smaller than $p$.'],
      lens: 'This is a binomial tail: $P(X \\ge 2)$ for $X \\sim \\text{Bin}(3, p)$.',
    },
    {
      prompt: 'Above what physical error rate $p$ does the 3-qubit repetition code make things worse? (Solve $3p^2 - 2p^3 = p$.)',
      answer: 0.5,
      tolerance: 0.005,
      hint: 'Divide by $p$ and solve the quadratic $2p^2 - 3p + 1 = 0$.',
      solution: ['$2p^2 - 3p + 1 = 0$ gives $p = 0.5$ or $p = 1$.', 'For $p < 0.5$ the code helps. Real codes have a threshold for the same reason, at a much lower value.'],
    },
    {
      prompt: 'Syndrome bits are parity(q0, q1) and parity(q1, q2). You read (1, 1). Which qubit flipped: 0, 1, or 2?',
      answer: 1,
      tolerance: 0.1,
      hint: 'Which single qubit belongs to both parity checks?',
      solution: ['Both checks fired, so the flipped qubit is in both pairs.', 'Only q1 is in both: flip q1 back.'],
    },
  ],
  // 17 · Quantum Teleportation
  17: [
    {
      prompt: 'In teleportation, Alice gets one of four measurement results. What is the probability of each?',
      answer: 0.25,
      hint: 'The results do not depend on the unknown state.',
      solution: ['All four outcomes are equally likely: $1/4$ each.', 'That is why the outcomes reveal nothing about the state being sent.'],
      lens: 'The classical message is a pair of fair coin flips, so it cannot carry the amplitudes by itself.',
    },
    {
      prompt: 'How many classical bits must be sent to teleport 1000 qubits?',
      answer: 2000,
      tolerance: 0.5,
      hint: 'Two bits per qubit.',
      solution: ['$2 \\times 1000 = 2000$ bits, plus 1000 shared Bell pairs.'],
    },
    {
      prompt: 'If Bob guesses the correction instead of waiting for Alice\'s bits, what is the probability he picks the right one?',
      answer: 0.25,
      hint: 'There are four possible corrections.',
      solution: ['He has a 1 in 4 chance. Averaged over outcomes, his qubit is maximally mixed, so no information arrives before the classical bits.'],
    },
  ],
  // 18 · Density Matrices
  18: [
    {
      prompt: 'Write $\\rho = |+\\rangle\\langle+|$. What is the off-diagonal entry $\\rho_{01}$?',
      answer: 0.5,
      hint: '$|+\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt2$, so every entry is $\\tfrac{1}{2}$.',
      solution: ['$\\rho = \\tfrac12\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$.', '$\\rho_{01} = 0.5$.'],
    },
    {
      prompt: 'Compute the purity $\\mathrm{Tr}(\\rho^2)$ of $\\rho = 0.7|0\\rangle\\langle0| + 0.3|1\\rangle\\langle1|$.',
      answer: 0.58,
      hint: 'For a diagonal matrix, square each diagonal entry and add.',
      solution: ['$0.7^2 + 0.3^2 = 0.49 + 0.09 = 0.58$.'],
      lens: 'For a diagonal state, purity is the chance two independent draws give the same outcome (like the Simpson or Gini index).',
    },
    {
      prompt: 'For that same state, what is the Bloch vector length $r$? (Use $\\mathrm{Tr}(\\rho^2) = (1 + r^2)/2$.)',
      answer: 0.4,
      hint: 'Solve $r^2 = 2 \\times 0.58 - 1$.',
      solution: ['$r^2 = 0.16$, so $r = 0.4$.', 'It sits inside the Bloch ball, 0.4 of the way from the center to the north pole.'],
    },
  ],
  // 19 · Quantum Complexity
  19: [
    {
      prompt: 'An algorithm is correct with probability 2/3. You run it 3 times and take the majority vote. What is the probability the majority is correct?',
      answer: 0.7407,
      tolerance: 0.003,
      hint: 'Majority is correct if at least 2 of 3 runs are correct.',
      solution: ['$P = p^3 + 3p^2(1-p)$ with $p = 2/3$.', '$= 8/27 + 12/27 = 20/27 \\approx 0.741$.', 'More repetitions push this toward 1 exponentially fast.'],
      lens: 'This binomial majority vote is why "bounded error" classes like BPP and BQP are robust: the 2/3 is arbitrary.',
    },
    {
      prompt: 'Grover needs about $\\tfrac{\\pi}{4}\\sqrt N$ queries. For $N = 2^{40}$, how many is that?',
      answer: 823550,
      tolerance: 9000,
      hint: '$\\sqrt{2^{40}} = 2^{20} = 1{,}048{,}576$.',
      solution: ['$0.7854 \\times 1{,}048{,}576 \\approx 823{,}550$.', 'Classical search needs about $2^{40} \\approx 1.1 \\times 10^{12}$ in the worst case.'],
    },
    {
      prompt: 'Brute force over $2^{40}$ keys at $10^9$ checks per second takes how many seconds?',
      answer: 1099.5,
      tolerance: 2,
      hint: '$2^{40} \\approx 1.0995 \\times 10^{12}$.',
      solution: ['$1.0995 \\times 10^{12} / 10^9 \\approx 1100$ seconds, about 18 minutes.', 'Polynomial versus exponential scaling matters more than any constant factor.'],
    },
  ],
  // 20 · Variational Quantum Algorithms
  20: [
    {
      prompt: 'For $E(\\theta) = \\cos\\theta$, the parameter-shift rule gives $\\tfrac{dE}{d\\theta} = \\tfrac12[E(\\theta + \\tfrac\\pi2) - E(\\theta - \\tfrac\\pi2)]$. Evaluate it at $\\theta = \\pi/3$.',
      answer: -0.866,
      tolerance: 0.005,
      hint: '$\\cos(\\theta \\pm \\pi/2) = \\mp\\sin\\theta$.',
      solution: ['$E(\\theta + \\pi/2) = -\\sin\\theta$ and $E(\\theta - \\pi/2) = \\sin\\theta$.', 'Gradient $= -\\sin(\\pi/3) \\approx -0.866$, exactly the calculus derivative.'],
    },
    {
      prompt: 'Each shot gives a ±1 outcome with variance $1 - \\langle Z\\rangle^2$. At $\\langle Z\\rangle = 0$, how many shots give a 95% margin of ±0.01?',
      answer: 38416,
      tolerance: 400,
      hint: '$N = (1.96\\,\\sigma / \\varepsilon)^2$ with $\\sigma = 1$.',
      solution: ['$\\sigma^2 = 1 - 0 = 1$.', '$N = (1.96/0.01)^2 = 38{,}416$.'],
      lens: 'This is the standard sample-size formula for estimating a mean. Shot cost grows as $1/\\varepsilon^2$.',
    },
    {
      prompt: 'With 10 parameters, how many circuit evaluations does one full parameter-shift gradient need?',
      answer: 20,
      tolerance: 0.1,
      hint: 'Two shifted evaluations per parameter.',
      solution: ['$2 \\times 10 = 20$ expectation values, each needing many shots.'],
    },
  ],
  // 21 · Quantum Fourier Transform
  21: [
    {
      prompt: 'For $N = 4$, $F_4|1\\rangle = \\tfrac12\\sum_k e^{2\\pi i k/4}|k\\rangle$. What is the (real) amplitude on $|2\\rangle$?',
      answer: -0.5,
      tolerance: 0.005,
      hint: '$e^{2\\pi i \\cdot 2/4} = e^{i\\pi}$.',
      solution: ['$e^{i\\pi} = -1$.', 'Amplitude $= -1/2$.'],
    },
    {
      prompt: 'Apply the QFT on 3 qubits to $|000\\rangle$. What is the probability of each outcome?',
      answer: 0.125,
      hint: 'All phases are 1 when $x = 0$.',
      solution: ['$F_8|0\\rangle = \\tfrac{1}{\\sqrt8}\\sum_k|k\\rangle$.', 'Each outcome has probability $1/8$.'],
    },
    {
      prompt: 'A register of size $N = 16$ holds a pattern with period $r = 4$. How many sharp peaks appear after the QFT?',
      answer: 4,
      tolerance: 0.1,
      hint: 'Peaks sit at multiples of $N/r$.',
      solution: ['$N/r = 4$, so peaks at 0, 4, 8, 12.', 'That is $r = 4$ peaks.'],
    },
  ],
  // 22 · Phase Estimation
  22: [
    {
      prompt: 'Convert the binary fraction $0.101_2$ to decimal.',
      answer: 0.625,
      hint: '$0.101_2 = 1/2 + 0/4 + 1/8$.',
      solution: ['$0.5 + 0.125 = 0.625$.'],
    },
    {
      prompt: 'With 3 counting qubits you measure 110. What phase estimate $\\varphi$ does that give?',
      answer: 0.75,
      hint: 'Read 110 as $0.110_2$.',
      solution: ['$0.110_2 = 1/2 + 1/4 = 0.75$.'],
    },
    {
      prompt: 'For $U = T$ and eigenstate $|1\\rangle$, $T|1\\rangle = e^{2\\pi i\\varphi}|1\\rangle$. What is $\\varphi$?',
      answer: 0.125,
      hint: '$T|1\\rangle = e^{i\\pi/4}|1\\rangle$, and $\\pi/4 = 2\\pi \\cdot \\varphi$.',
      solution: ['$\\varphi = (\\pi/4)/(2\\pi) = 1/8 = 0.125$.', 'Three counting qubits would read exactly 001.'],
    },
  ],
  // 23 · Hamiltonian Simulation
  23: [
    {
      prompt: '$e^{-iZt}$ equals $R_Z(2t)$. What rotation angle, in radians, simulates $H = Z$ for $t = \\pi/4$?',
      answer: 1.5708,
      tolerance: 0.005,
      unit: 'radians',
      hint: 'Angle $= 2t$.',
      solution: ['$2 \\times \\pi/4 = \\pi/2 \\approx 1.571$.'],
    },
    {
      prompt: 'Evolve $|+\\rangle$ under the diagonal Hamiltonian $H = Z$ for any time. What is $P(1)$ afterwards?',
      answer: 0.5,
      hint: 'A diagonal Hamiltonian only changes phases.',
      solution: ['$e^{-iZt}$ multiplies each basis amplitude by a phase.', 'Magnitudes are unchanged, so $P(1) = 0.5$.'],
    },
    {
      prompt: 'For $H = Z_0Z_1$, what is the energy of $|01\\rangle$?',
      answer: -1,
      tolerance: 0.005,
      hint: '$Z|0\\rangle = +|0\\rangle$ and $Z|1\\rangle = -|1\\rangle$.',
      solution: ['$Z_0Z_1|01\\rangle = (+1)(-1)|01\\rangle$.', 'Energy $= -1$.'],
    },
  ],
  // 24 · Universal Gate Sets
  24: [
    {
      prompt: 'What is the smallest $k \\ge 1$ with $T^k = I$?',
      answer: 8,
      tolerance: 0.1,
      hint: 'Each T adds $45^\\circ$ of phase.',
      solution: ['$8 \\times 45^\\circ = 360^\\circ$.', 'So $T^8 = I$.'],
    },
    {
      prompt: 'The standard Clifford+T circuit for a Toffoli gate uses how many T or T† gates?',
      answer: 7,
      tolerance: 0.1,
      hint: 'This is the well-known "T-count" of Toffoli.',
      solution: ['The standard decomposition uses 7 T/T† gates and 6 CNOTs.', 'T-count matters because T gates are the expensive ones in fault-tolerant hardware.'],
    },
    {
      prompt: 'Modern single-qubit synthesis needs about $3\\log_2(1/\\varepsilon)$ T gates. About how many for $\\varepsilon = 10^{-10}$?',
      answer: 100,
      tolerance: 3,
      hint: '$\\log_2(10^{10}) \\approx 33.2$.',
      solution: ['$3 \\times 33.2 \\approx 100$ T gates.', 'Precision is cheap: 10 more digits cost only tens of gates.'],
    },
  ],
  // 25 · Measurement Theory (Deep)
  25: [
    {
      prompt: 'Compute $\\langle Z\\rangle$ for $0.6|0\\rangle + 0.8|1\\rangle$.',
      answer: -0.28,
      tolerance: 0.003,
      hint: '$\\langle Z\\rangle = P(0) - P(1)$.',
      solution: ['$0.36 - 0.64 = -0.28$.'],
      lens: 'An expectation value is a weighted average of the outcome values +1 and −1.',
    },
    {
      prompt: 'In 100 shots you see 30 zeros and 70 ones. What is your estimate of $\\langle Z\\rangle$?',
      answer: -0.4,
      tolerance: 0.003,
      hint: 'Average the ±1 scores.',
      solution: ['$(30 \\times (+1) + 70 \\times (-1))/100 = -0.4$.'],
    },
    {
      prompt: 'For $0.6|0\\rangle + 0.8|1\\rangle$, what is $P(+)$ when measuring in the X basis?',
      answer: 0.98,
      tolerance: 0.003,
      hint: '$\\langle + | \\psi\\rangle = (0.6 + 0.8)/\\sqrt2$.',
      solution: ['$(1.4)^2 / 2 = 1.96/2 = 0.98$.', 'Nearly certain in the X basis, but uncertain in the Z basis.'],
    },
  ],
  // 26 · QFT and periodicity
  26: [
    {
      prompt: 'Apply the 3-qubit QFT to $(|0\\rangle + |4\\rangle)/\\sqrt2$ (period 4 in $N = 8$). What is $P(k = 2)$?',
      answer: 0.25,
      hint: 'Amplitude at $k$ is $(1 + e^{2\\pi i \\cdot 4k/8})/4 = (1 + (-1)^k)/4$.',
      solution: ['For even $k$: amplitude $= 2/4 = 1/2$, so $P = 1/4$.', 'Peaks at 0, 2, 4, 6, which are multiples of $N/r = 2$.'],
    },
    {
      prompt: 'Same state: what is $P(k = 3)$?',
      answer: 0,
      tolerance: 0.001,
      hint: 'Odd $k$ gives $1 + (-1) = 0$.',
      solution: ['Destructive interference: $P(3) = 0$.'],
    },
    {
      prompt: 'If $N = 16$ and $r = 3$ (which does not divide 16), peaks sit near multiples of $16/3$. Which integer is nearest to the second peak, $2 \\times 16/3$?',
      answer: 11,
      tolerance: 0.1,
      hint: '$32/3 \\approx 10.67$.',
      solution: ['$10.67$ rounds to 11.', 'Continued fractions then turn $11/16$ into the estimate $2/3$, revealing $r = 3$.'],
    },
  ],
  // 27 · QFT Circuit Implementation
  27: [
    {
      prompt: 'How many controlled-phase rotations does a 5-qubit QFT use?',
      answer: 10,
      tolerance: 0.1,
      hint: '$n(n-1)/2$.',
      solution: ['$5 \\times 4 / 2 = 10$.'],
    },
    {
      prompt: 'How many SWAP gates reverse the order of 5 qubits?',
      answer: 2,
      tolerance: 0.1,
      hint: '$\\lfloor n/2 \\rfloor$.',
      solution: ['Swap (0,4) and (1,3); the middle qubit stays.', '$\\lfloor 5/2 \\rfloor = 2$.'],
    },
    {
      prompt: 'The rotation $R_k$ turns by $360^\\circ/2^k$. What angle does $R_3$ apply, in degrees?',
      answer: 45,
      tolerance: 0.1,
      unit: 'degrees',
      hint: '$2^3 = 8$.',
      solution: ['$360/8 = 45^\\circ$.'],
    },
  ],
  // 28 · Phase Estimation (Deep)
  28: [
    {
      prompt: 'With $t = 6$ counting qubits, how many applications of $U$ are there in total ($U, U^2, U^4, \\ldots$)?',
      answer: 63,
      tolerance: 0.1,
      hint: '$1 + 2 + 4 + \\cdots + 2^{t-1}$.',
      solution: ['$2^6 - 1 = 63$.', 'Each extra bit of precision doubles the work.'],
    },
    {
      prompt: 'For $\\varphi = 0.3$ and $t = 3$ counting qubits, the two most likely outcomes are 010 (probability 0.5775) and 011 (probability 0.2593). What is the probability of getting one of these two?',
      answer: 0.8368,
      tolerance: 0.003,
      hint: 'Add the two probabilities.',
      solution: ['$0.5775 + 0.2593 \\approx 0.837$.', 'So 84% of the time you land on one of the two grid points around 0.3.'],
      lens: 'The output is a sampling distribution around the true value, like a histogram of estimates.',
    },
    {
      prompt: 'To get $n = 4$ correct bits with failure probability at most $\\varepsilon = 0.1$, use $t = n + \\lceil\\log_2(2 + 1/(2\\varepsilon))\\rceil$. What is $t$?',
      answer: 7,
      tolerance: 0.1,
      hint: '$2 + 1/0.2 = 7$, and $\\log_2 7 \\approx 2.81$.',
      solution: ['$\\lceil 2.81 \\rceil = 3$.', '$t = 4 + 3 = 7$.'],
    },
  ],
  // 29 · Hamiltonian Simulation (Deep)
  29: [
    {
      prompt: 'For $H = X + Z$, the first-order Trotter error is at most $t^2/r$. How many steps $r$ guarantee error $\\le 0.01$ at $t = 2$?',
      answer: 400,
      tolerance: 1,
      hint: 'Solve $4/r \\le 0.01$.',
      solution: ['$r \\ge t^2/0.01 = 4/0.01 = 400$.', 'Doubling $t$ to 4 would need $r \\ge 1600$: four times as many steps.'],
    },
    {
      prompt: 'Second-order (symmetric) Trotter error scales like $1/r^2$. If you double $r$, by what factor does the error change?',
      answer: 0.25,
      hint: '$(1/2)^2$.',
      solution: ['Error $\\times 1/4 = 0.25$.'],
    },
    {
      prompt: 'A Hamiltonian has 3 terms and you use $r = 100$ first-order steps. How many term exponentials does the circuit contain?',
      answer: 300,
      tolerance: 0.5,
      hint: 'One exponential per term per step.',
      solution: ['$3 \\times 100 = 300$.'],
    },
  ],
  // 30 · VQE
  30: [
    {
      prompt: 'For $H = Z + 0.5X$ and ansatz $R_Y(\\theta)|0\\rangle$, $E(\\theta) = \\cos\\theta + 0.5\\sin\\theta$. What is $E(\\pi)$?',
      answer: -1,
      tolerance: 0.005,
      hint: '$\\cos\\pi = -1$ and $\\sin\\pi = 0$.',
      solution: ['$E(\\pi) = -1 + 0 = -1$.', 'Close, but not the minimum.'],
    },
    {
      prompt: 'What is the true ground-state energy $-\\sqrt{1 + 0.5^2}$?',
      answer: -1.118,
      tolerance: 0.003,
      hint: '$\\sqrt{1.25}$.',
      solution: ['$-\\sqrt{1.25} \\approx -1.118$, reached at $\\theta = \\pi + \\arctan(0.5) \\approx 206.6^\\circ$.'],
    },
    {
      prompt: 'Chemical accuracy is about 0.0016 hartree. With per-shot standard deviation 1, how many shots give a 95% margin of ±0.0016?',
      answer: 1500625,
      tolerance: 20000,
      hint: '$N = (1.96/0.0016)^2$.',
      solution: ['$1.96/0.0016 = 1225$.', '$1225^2 = 1{,}500{,}625$ shots for a single energy estimate.'],
      lens: 'Precision costs $1/\\varepsilon^2$ samples, the same law that sizes opinion polls.',
    },
  ],
  // 31 · QAOA
  31: [
    {
      prompt: 'What is the maximum cut of a triangle (3 nodes, 3 edges)?',
      answer: 2,
      tolerance: 0.1,
      hint: 'You cannot separate all three pairs with two groups.',
      solution: ['Put one node alone: it cuts its 2 edges; the third edge stays uncut.', 'Max cut $= 2$.'],
    },
    {
      prompt: 'A uniformly random assignment cuts each edge with probability 1/2. What is the expected cut of the triangle?',
      answer: 1.5,
      hint: 'Linearity of expectation.',
      solution: ['$3 \\times 1/2 = 1.5$.'],
      lens: 'Linearity of expectation works even though the edges are not independent.',
    },
    {
      prompt: 'What approximation ratio does random guessing achieve on the triangle (expected cut divided by max cut)?',
      answer: 0.75,
      hint: '$1.5/2$.',
      solution: ['$1.5/2 = 0.75$.', 'QAOA is judged by how much it beats such baselines.'],
    },
  ],
  // 32 · Quantum Annealing
  32: [
    {
      prompt: 'For $E(s_0, s_1) = s_0s_1 + 0.5s_0$ with $s_i = \\pm1$, what is the energy of $(s_0, s_1) = (-1, +1)$?',
      answer: -1.5,
      tolerance: 0.005,
      hint: '$(-1)(+1) + 0.5(-1)$.',
      solution: ['$-1 - 0.5 = -1.5$, the minimum.'],
    },
    {
      prompt: 'How many spin configurations does a 20-spin problem have?',
      answer: 1048576,
      tolerance: 0.5,
      hint: '$2^{20}$.',
      solution: ['$2^{20} = 1{,}048{,}576$.'],
    },
    {
      prompt: 'Thermal noise at temperature $kT = 0.5$ populates states with Boltzmann weight $e^{-E/kT}$. What is the ratio of the weight at $E = -0.5$ to the weight at $E = -1.5$?',
      answer: 0.1353,
      tolerance: 0.003,
      hint: 'Ratio $= e^{-(\\Delta E)/kT}$ with $\\Delta E = 1$.',
      solution: ['$e^{-1/0.5} = e^{-2} \\approx 0.135$.', 'Heat makes wrong answers appear about 1 time in 8 relative to the right one here.'],
      lens: 'The Boltzmann distribution is the exponential-family model behind simulated annealing and softmax.',
    },
  ],
  // 33 · Adiabatic Quantum Computation
  33: [
    {
      prompt: 'For $H(s) = -(1-s)X - sZ$, the gap is $2\\sqrt{(1-s)^2 + s^2}$. What is the minimum gap (at $s = 0.5$)?',
      answer: 1.4142,
      tolerance: 0.003,
      hint: '$2\\sqrt{0.25 + 0.25}$.',
      solution: ['$2\\sqrt{0.5} = \\sqrt2 \\approx 1.414$.'],
    },
    {
      prompt: 'Using $T \\gg \\|\\partial_s H\\| / \\Delta_{\\min}^2$ with $\\|\\partial_s H\\| = \\sqrt2$ and $\\Delta_{\\min} = \\sqrt2$, what is the reference time scale?',
      answer: 0.7071,
      tolerance: 0.003,
      hint: '$\\sqrt2 / 2$.',
      solution: ['$\\sqrt2 / (\\sqrt2)^2 = \\sqrt2/2 \\approx 0.707$.', 'The total time must be many times larger than this.'],
    },
    {
      prompt: 'If a harder problem has half the minimum gap, by what factor does the required time grow?',
      answer: 4,
      tolerance: 0.1,
      hint: 'Time scales as $1/\\Delta^2$.',
      solution: ['$1/(1/2)^2 = 4$.', 'Exponentially small gaps give exponentially long runtimes.'],
    },
  ],
  // 34 · Phase Kickback (Advanced)
  34: [
    {
      prompt: 'Hadamard test: $P(0) = (1 + \\mathrm{Re}\\langle\\psi|U|\\psi\\rangle)/2$. For $U = T$ and $|\\psi\\rangle = |1\\rangle$, what is $P(0)$?',
      answer: 0.8536,
      tolerance: 0.005,
      hint: '$\\langle 1|T|1\\rangle = e^{i\\pi/4}$, whose real part is $\\cos 45^\\circ$.',
      solution: ['$\\mathrm{Re}\\,e^{i\\pi/4} = 0.7071$.', '$P(0) = 1.7071/2 \\approx 0.854$.'],
    },
    {
      prompt: 'You run a Hadamard test 1000 times and see 850 zeros. What is your estimate of $\\mathrm{Re}\\langle\\psi|U|\\psi\\rangle$?',
      answer: 0.7,
      tolerance: 0.003,
      hint: 'Invert: $\\mathrm{Re} = 2P(0) - 1$.',
      solution: ['$\\hat P(0) = 0.85$.', '$2(0.85) - 1 = 0.70$.'],
      lens: 'The estimate is a rescaled sample proportion, so its standard error is $2\\sqrt{p(1-p)/N} \\approx 0.023$ here.',
    },
    {
      prompt: 'Control $|+\\rangle$, target $|+\\rangle$ (not an eigenstate of Z). After CZ, H on the control gives $P(1)$ = ?',
      answer: 0.5,
      hint: 'The target is a superposition of eigenstates with eigenvalues +1 and −1.',
      solution: ['CZ gives $(|0\\rangle|+\\rangle + |1\\rangle|-\\rangle)/\\sqrt2$: the two registers are entangled.', 'The control alone is maximally mixed, so $P(1) = 1/2$. Kickback is clean only for eigenstates.'],
    },
  ],
  // 35 · Phase, Amplitude & Interference (Advanced)
  35: [
    {
      prompt: 'Amplitude amplification with $N = 16$ and one marked item: $\\sin\\theta = 1/4$ and $P_k = \\sin^2((2k+1)\\theta)$. What is $P_3$?',
      answer: 0.9613,
      tolerance: 0.003,
      hint: '$\\theta \\approx 14.48^\\circ$, so $7\\theta \\approx 101.3^\\circ$.',
      solution: ['$\\sin^2(101.34^\\circ) \\approx 0.961$.'],
    },
    {
      prompt: 'Keep going to $k = 6$ iterations. What is $P_6 = \\sin^2(13\\theta)$?',
      answer: 0.0204,
      tolerance: 0.002,
      hint: '$13\\theta \\approx 188.2^\\circ$.',
      solution: ['$\\sin^2(188.2^\\circ) \\approx 0.020$.', 'Over-rotating destroys the gain: amplification is a rotation, not a ratchet.'],
    },
    {
      prompt: 'If each run succeeds with probability 0.9613, what is the expected number of runs until the first success?',
      answer: 1.04,
      tolerance: 0.005,
      hint: 'Geometric distribution: $1/p$.',
      solution: ['$1/0.9613 \\approx 1.04$ runs.'],
      lens: 'The number of tries until success is geometric, with mean $1/p$.',
    },
  ],
  // 36 · No-Cloning Theorem
  36: [
    {
      prompt: 'A "cloner" that copies $|0\\rangle$ and $|1\\rangle$ turns $|+\\rangle|0\\rangle$ into a Bell state. Measuring both outputs in the X basis, what is $P(++)$?',
      answer: 0.5,
      hint: '$(|00\\rangle + |11\\rangle)/\\sqrt2 = (|{+}{+}\\rangle + |{-}{-}\\rangle)/\\sqrt2$.',
      solution: ['The outcomes ++ and −− each have probability 1/2.', 'True copies $|+\\rangle|+\\rangle$ would give $P(++) = 1$.'],
    },
    {
      prompt: 'The best possible universal cloner produces two copies, each with fidelity $5/6$. Enter it as a decimal.',
      answer: 0.8333,
      tolerance: 0.003,
      hint: '$5 \\div 6$.',
      solution: ['$5/6 \\approx 0.833$ (the Bužek–Hillery bound).', 'Approximate copies are allowed; perfect ones are not.'],
    },
    {
      prompt: 'Measuring one unknown qubit and re-preparing your best guess achieves average fidelity $2/3$. Enter it as a decimal.',
      answer: 0.6667,
      tolerance: 0.003,
      hint: '$2 \\div 3$.',
      solution: ['$2/3 \\approx 0.667$, worse than the optimal cloner\'s $5/6$.', 'A single copy simply does not contain enough classical information to rebuild the state.'],
      lens: 'One sample is not enough to estimate a distribution\'s parameters well; quantum states obey a sharper version of that limit.',
    },
  ],
  // 37 · Grover's Search
  37: [
    {
      prompt: 'Two-qubit Grover: after H on both qubits and the oracle CZ, what is the probability of $|11\\rangle$?',
      answer: 0.25,
      hint: 'The oracle only changes a sign.',
      solution: ['Amplitudes $(\\tfrac12, \\tfrac12, \\tfrac12, -\\tfrac12)$.', '$P(11) = 1/4$ until the diffusion step.'],
    },
    {
      prompt: 'For $N = 1024$ and one marked item, about how many Grover iterations are optimal ($\\approx \\tfrac\\pi4\\sqrt N$)?',
      answer: 25,
      tolerance: 0.6,
      hint: '$\\sqrt{1024} = 32$.',
      solution: ['$0.785 \\times 32 \\approx 25.1$, so 25 iterations.'],
    },
    {
      prompt: 'Classically, checking items in random order until you find the one marked item among $N = 1024$ takes how many checks on average?',
      answer: 512.5,
      tolerance: 0.5,
      hint: 'The marked item is equally likely to be in any position.',
      solution: ['Average position $= (N + 1)/2 = 512.5$.', 'Grover needs about 25 queries.'],
      lens: 'This is the mean of a uniform distribution on 1…N.',
    },
  ],
  // 38 · BB84
  38: [
    {
      prompt: 'Alice and Bob pick bases independently and at random. What fraction of positions survive sifting?',
      answer: 0.5,
      hint: 'They agree when both pick Z or both pick X.',
      solution: ['$P(\\text{match}) = \\tfrac12\\cdot\\tfrac12 + \\tfrac12\\cdot\\tfrac12 = \\tfrac12$.'],
    },
    {
      prompt: 'Eve intercepts and resends a fraction $f = 0.4$ of the signals. The error rate on sifted bits is $f/4$. What is it?',
      answer: 0.1,
      hint: 'Full interception gives 1/4.',
      solution: ['$0.4/4 = 0.10$, a 10% error rate.'],
    },
    {
      prompt: 'You check 200 sifted bits and find 22 errors. What is the half-width of the 95% confidence interval for the error rate?',
      answer: 0.0434,
      tolerance: 0.002,
      hint: '$1.96\\sqrt{\\hat p(1-\\hat p)/n}$ with $\\hat p = 0.11$.',
      solution: ['$\\hat p = 22/200 = 0.11$.', '$1.96\\sqrt{0.11 \\times 0.89/200} \\approx 0.043$.', 'So the error rate is about $11\\% \\pm 4.3\\%$: large enough to abort if the threshold is about 11%.'],
      lens: 'Deciding whether to trust the key is a hypothesis test on an estimated proportion.',
    },
  ],
  // 39 · Hardware Platforms
  39: [
    {
      prompt: 'With $T_1 = 100\\,\\mu s$ and 50 ns gates, how many sequential gates fit into one $T_1$?',
      answer: 2000,
      tolerance: 1,
      hint: 'Convert both to the same unit.',
      solution: ['$100\\,\\mu s / 0.05\\,\\mu s = 2000$ gates.', 'The useful budget is far smaller once gate errors are included.'],
    },
    {
      prompt: 'A circuit has 50 two-qubit gates (99.5% each), 100 one-qubit gates (99.95% each), and 5 readouts (99% each). Estimate its success probability.',
      answer: 0.704,
      tolerance: 0.005,
      hint: 'Multiply all the success probabilities.',
      solution: ['$0.995^{50} \\times 0.9995^{100} \\times 0.99^{5}$.', '$\\approx 0.778 \\times 0.951 \\times 0.951 \\approx 0.704$.'],
      lens: 'An error budget is a product of independent survival probabilities.',
    },
    {
      prompt: 'What is the "half-life" of an excited qubit with $T_1 = 100\\,\\mu s$ (time for $P(1)$ to halve)?',
      answer: 69.3,
      tolerance: 0.3,
      unit: 'µs',
      hint: 'Solve $e^{-t/T_1} = 1/2$.',
      solution: ['$t = T_1\\ln 2 \\approx 69.3\\,\\mu s$.'],
    },
  ],
  // 40 · Compilation & Transpilation
  40: [
    {
      prompt: 'On a line of qubits 0–1–2–3–4, you need a CNOT between qubits 0 and 4. Using SWAPs (3 CNOTs each) to bring them adjacent, how many CNOTs in total?',
      answer: 10,
      tolerance: 0.1,
      hint: 'Three SWAPs move qubit 0 next to qubit 4.',
      solution: ['Move qubit 0 to position 3 with 3 SWAPs: $3 \\times 3 = 9$ CNOTs.', 'Then the actual CNOT: $9 + 1 = 10$.'],
    },
    {
      prompt: 'If each CNOT succeeds with probability 0.99, how much of the success probability survives those 10 CNOTs?',
      answer: 0.9044,
      tolerance: 0.003,
      hint: '$0.99^{10}$.',
      solution: ['$0.99^{10} \\approx 0.904$, versus 0.99 for a single native CNOT.'],
      lens: 'Routing overhead multiplies error, which is why layout choices matter.',
    },
    {
      prompt: 'Two adjacent H gates on the same qubit cancel. A compiler removes 4 such pairs from a 30-gate circuit. How many gates remain?',
      answer: 22,
      tolerance: 0.1,
      hint: 'Each pair is 2 gates.',
      solution: ['$30 - 4 \\times 2 = 22$.'],
    },
  ],
};
