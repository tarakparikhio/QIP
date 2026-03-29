import fs from "fs";
import path from "path";

const lessons = JSON.parse(fs.readFileSync("website/data/lessons.json", "utf8")).sort((a, b) => a.lesson_id - b.lesson_id);
const idx = fs.readFileSync("website/components/lesson-widgets/index.ts", "utf8");
const mapping = {};
for (const m of idx.matchAll(/(\d+):\s*(\w+),/g)) {
  mapping[Number(m[1])] = m[2];
}

const risk = {
  1: { level: "Medium", err: "Bloch-only view can hide explicit alpha/beta and relative phase semantics.", fix: "Add synchronized (theta,phi) <-> (alpha,beta) panel with probabilities and phase." },
  2: { level: "Medium", err: "Superposition animation can be read as classical mixture if phase is not explicit.", fix: "Show purity/coherence and phase wheel before/after H." },
  3: { level: "High", err: "Measurement demo hardcodes 50/50 outcomes instead of amplitude-driven Born probabilities.", fix: "Drive outcomes from user-defined amplitudes and selected measurement basis." },
  4: { level: "Medium", err: "Correlation table alone can look classically correlated without coherence evidence.", fix: "Compare Bell state to classical mixture and include separability witness." },
  5: { level: "Medium", err: "Interference concept risks underspecification without explicit relative phase control.", fix: "Add phasor-sum view with delta-phi slider and post-mixer probabilities." },
  6: { level: "Medium", err: "Gate demo may stay symbolic without matrix/unitary grounding.", fix: "Show matrix action and norm preservation check per gate." },
  7: { level: "Medium", err: "Widget text labels |0> as pointing down, conflicting with standard Bloch convention.", fix: "Set |0> north pole and |1> south pole; annotate axis convention." },
  8: { level: "Low-Medium", err: "Bloch lesson can miss global-phase invariance and physical equivalence.", fix: "Add global-phase toggle showing unchanged measurement predictions." },
  9: { level: "Medium", err: "Basis-count growth may omit full amplitude tensor structure.", fix: "Render indexed statevector amplitudes with normalization meter." },
  10: { level: "Medium", err: "Tensor product can appear as label concatenation only.", fix: "Show explicit Kronecker product numeric examples for states and operators." },
  11: { level: "Medium", err: "Decoherence visuals can blur distinctions between dephasing and damping.", fix: "Add density-matrix heatmap and Bloch-radius decay by channel type." },
  12: { level: "Medium", err: "Noise controls may not explicitly enforce CPTP channel semantics.", fix: "Show Kraus representation and trace-preservation check." },
  13: { level: "Medium", err: "Channel visuals risk metaphor drift without formal map equation.", fix: "Display rho prime equals sum Ek rho Ek dagger with selectable channels." },
  14: { level: "High", err: "Hamiltonian simulator includes inconsistent Ising eigenvalues and overuses single-qubit visual.", fix: "Split single vs two-qubit modes; derive spectrum from actual Hamiltonian matrix." },
  15: { level: "Medium", err: "Eigenstate demo can imply purely real/simple spectra only.", fix: "Support complex eigenvectors/eigenvalues and basis-dependent measurement link." },
  16: { level: "Medium", err: "Order-swap demo may not quantify non-commutation strength.", fix: "Display commutator matrix AB-BA and norm." },
  17: { level: "Low-Medium", err: "Unitary evolution intuition may lack explicit reversibility fidelity metric.", fix: "Show U dagger U = I and state fidelity after inverse evolution." },
  18: { level: "Medium", err: "Notation lesson may drift into analogy without strict linear-algebra mapping.", fix: "Pair each bra-ket expression with vector/matrix form and operation result." },
  19: { level: "Medium", err: "Vector lesson can overemphasize real coordinates versus complex amplitudes.", fix: "Add complex-plane components and normalization enforcement." },
  20: { level: "High", err: "Operator explorer uses incorrect real Pauli-Y matrix while claiming Hermitian properties.", fix: "Implement complex Pauli-Y matrix with proper conjugate transpose logic." },
  21: { level: "Medium", err: "Reused rotation widget can hide axis-specific phase effects.", fix: "Add per-axis evolution equations and statevector updates for Rx/Ry/Rz." },
  22: { level: "Medium-High", err: "Controlled-gate logic appears classical trigger-style; CZ phase action underrepresented.", fix: "Include superposition inputs and explicit phase evolution on |11> branch." },
  23: { level: "High", err: "Entangling-operations lesson is mapped to product-state constructor widget.", fix: "Use entanglement widget with Schmidt rank and entanglement metric output." },
  24: { level: "High", err: "Universality lesson mapped to operator browser instead of decomposition workflow.", fix: "Show compilation of target unitary into native universal gate set with error metric." },
  25: { level: "High", err: "Deep measurement lesson reuses basic collapse widget and omits basis/POVM depth.", fix: "Add basis-rotation measurement and projective vs generalized measurement modes." },
  26: { level: "High", err: "QFT widget is classical DFT-style and includes misleading complexity/speedup claims.", fix: "Reframe as quantum basis transform on amplitudes with phase-gradient structure." },
  27: { level: "Medium-High", err: "QFT implementation view can omit explicit per-wire CP-angle semantics.", fix: "Render full wire-level decomposition with angle labels pi/2^k and swaps." },
  28: { level: "Medium-High", err: "Phase estimation currently approximates by rounding rather than controlled-U powers pipeline.", fix: "Model kickback plus inverse QFT with bitwise probability histogram." },
  29: { level: "High", err: "Hamiltonian simulation lesson mapped to generic precession visual, not Trotter dynamics.", fix: "Add term-splitting timeline and Trotter error scaling controls." },
  30: { level: "High", err: "VQE demo uses toy objective not tied to measured Hamiltonian expectation.", fix: "Implement ansatz circuit, shot-based expectation, and optimizer update loop." },
  31: { level: "High", err: "QAOA score is heuristic and not computed from cost-H expectation on a graph.", fix: "Add graph instance, UC/UB layers, and sampled cut-value distribution." },
  32: { level: "Medium-High", err: "Annealing success metric is heuristic and may be mistaken for physical prediction.", fix: "Show instantaneous spectrum vs schedule and avoided-crossing sensitivity." },
  33: { level: "Medium-High", err: "Adiabatic checker uses oversimplified runtime rule without coupling term.", fix: "Include derivative-coupling factor and explicit failure regime examples." },
  34: { level: "Low-Medium", err: "Kickback demo is good but eigenstate precondition is not enforced visually.", fix: "Add target eigenstate selector and non-eigenstate failure case." },
  35: { level: "Medium", err: "Advanced phase demo can under-link phasor intuition to circuit basis-change mechanics.", fix: "Add H-Rz-H mini-circuit tied directly to phasor-sum probability output." }
};

const esc = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;

const header = [
  "Lesson ID",
  "Concept",
  "Current Visual Approach",
  "Technical Risk/Error",
  "Proposed Truth Fix",
  "Risk Level",
  "Widget",
  "Visualization Type"
];

const lines = [header.join(",")];

for (const l of lessons) {
  const widget = mapping[l.lesson_id] || "";
  const vizType = l.visualization?.type || "";
  const vizDesc = l.visualization?.description || "";
  const current = `${widget} | ${vizType} | ${vizDesc}`;
  const r = risk[l.lesson_id] || {
    level: "Medium",
    err: "Pending manual review.",
    fix: "Define mathematically grounded visual and basis-accurate behavior."
  };

  lines.push([
    esc(l.lesson_id),
    esc(l.title),
    esc(current),
    esc(r.err),
    esc(r.fix),
    esc(r.level),
    esc(widget),
    esc(vizType)
  ].join(","));
}

const outPath = path.join("_metadata", "AUDIT.csv");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${lines.join("\n")}\n`, "utf8");

console.log(`Wrote ${outPath} with ${lessons.length} lessons + header.`);
