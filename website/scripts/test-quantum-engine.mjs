// Regression tests for the local quantum engine.
// Transpiles src/lib/quantum-engine/*.ts with the project's TypeScript compiler,
// then checks known states and cross-checks random circuits against an
// independent dense-matrix reference implementation.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import ts from 'typescript';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const engineDir = path.join(root, 'src/lib/quantum-engine');
const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qengine-'));
for (const file of fs.readdirSync(engineDir).filter((f) => f.endsWith('.ts'))) {
  const source = fs.readFileSync(path.join(engineDir, file), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  fs.writeFileSync(path.join(outDir, file.replace(/\.ts$/, '.js')), outputText);
}
const require = createRequire(import.meta.url);
const { CircuitRunner, sampleMeasurementCounts } = require(path.join(outDir, 'run.js'));
const { computeQubitBlochVectors } = require(path.join(outDir, 'math.js'));
const { Gates } = require(path.join(outDir, 'gates.js'));

const EPS = 1e-9;
let passed = 0;
function test(name, fn) {
  try { fn(); passed += 1; } catch (error) { console.error(`FAIL ${name}\n  ${error.message}`); process.exitCode = 1; }
}
const run = (n, ops) => { const r = new CircuitRunner(n); r.run(ops); return r; };
const probs = (n, ops) => run(n, ops).getProbabilities();
const close = (actual, expected, label = '') => actual.forEach((v, i) => assert.ok(Math.abs(v - expected[i]) < EPS, `${label} index ${i}: ${v} != ${expected[i]}`));
const H = (q) => ({ gateId: 'H', targetQubit: q });
const X = (q) => ({ gateId: 'X', targetQubit: q });
const G = (id, q) => ({ gateId: id, targetQubit: q });
const C = (id, c, t) => ({ gateId: id, controlQubit: c, targetQubit: t });

// ---------- known states ----------
test('empty circuit is |0...0>', () => close(probs(2, []), [1, 0, 0, 0]));
test('qubit 0 is the most significant bit', () => close(probs(2, [X(0)]), [0, 0, 1, 0]));
test('H gives 50/50', () => close(probs(1, [H(0)]), [0.5, 0.5]));
test('H H = I', () => close(probs(1, [H(0), H(0)]), [1, 0]));
test('H Z H = X', () => close(probs(1, [H(0), G('Z', 0), H(0)]), [0, 1]));
test('Bell state', () => close(probs(2, [H(0), C('CNOT', 0, 1)]), [0.5, 0, 0, 0.5]));
test('CNOT with reversed control', () => close(probs(2, [X(1), C('CNOT', 1, 0)]), [0, 0, 0, 1]));
test('SWAP moves an excitation', () => close(probs(3, [X(0), C('SWAP', 0, 2)]), [0, 1, 0, 0, 0, 0, 0, 0]));
test('GHZ on 3 qubits', () => close(probs(3, [H(0), C('CNOT', 0, 1), C('CNOT', 1, 2)]), [0.5, 0, 0, 0, 0, 0, 0, 0.5]));
test('2-qubit Grover finds |11>', () => close(probs(2, [H(0), H(1), C('CZ', 0, 1), H(0), H(1), X(0), X(1), C('CZ', 0, 1), X(0), X(1), H(0), H(1)]), [0, 0, 0, 1]));
test('Grover oracle alone leaves probabilities uniform', () => close(probs(2, [H(0), H(1), C('CZ', 0, 1)]), [0.25, 0.25, 0.25, 0.25]));
test('Deutsch-Jozsa balanced f(x)=x', () => { const p = probs(2, [X(1), H(0), H(1), C('CNOT', 0, 1), H(0)]); assert.ok(Math.abs(p[2] + p[3] - 1) < EPS); });
test('phase kickback turns |+> into |->', () => close(probs(2, [H(0), X(1), H(1), C('CNOT', 0, 1), H(0), H(1)]), [0, 0, 0, 1]));
test('T^2 = S and S^2 = Z (via interference)', () => {
  close(probs(1, [H(0), G('T', 0), G('T', 0), G('S', 0), G('S', 0), G('S', 0), H(0)]), [1, 0], 'T T S S S = S^4 = I');
});
test('RX(pi/2) twice = X up to phase', () => close(probs(1, [G('RX', 0), G('RX', 0)]), [0, 1]));
test('Y is complex: H S Y S H flips correctly', () => { const r = run(1, [G('Y', 0)]); assert.ok(Math.abs(r.state.amplitudes[1].im - 1) < EPS); });

// ---------- Bloch vectors ----------
test('Bloch |0> is +z', () => { const [b] = computeQubitBlochVectors(run(1, []).state.amplitudes, 1); close([b.x, b.y, b.z], [0, 0, 1]); });
test('Bloch |+> is +x', () => { const [b] = computeQubitBlochVectors(run(1, [H(0)]).state.amplitudes, 1); close([b.x, b.y, b.z], [1, 0, 0]); });
test('Bloch S|+> is +y', () => { const [b] = computeQubitBlochVectors(run(1, [H(0), G('S', 0)]).state.amplitudes, 1); close([b.x, b.y, b.z], [0, 1, 0]); });
test('Bell-state qubits are maximally mixed', () => {
  for (const b of computeQubitBlochVectors(run(2, [H(0), C('CNOT', 0, 1)]).state.amplitudes, 2)) close([b.x, b.y, b.z, b.purity], [0, 0, 0, 0.5]);
});

// ---------- sampler ----------
test('sampler totals and deterministic outcomes', () => {
  const counts = sampleMeasurementCounts([0, 1, 0, 0], 500);
  assert.deepEqual(counts, [0, 500, 0, 0]);
  assert.equal(sampleMeasurementCounts([0.5, 0.5], 1000).reduce((a, b) => a + b, 0), 1000);
});

// ---------- cross-check against a dense-matrix reference ----------
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
function referenceState(n, ops) {
  const dim = 1 << n;
  let psi = Array.from({ length: dim }, (_, i) => (i === 0 ? [1, 0] : [0, 0]));
  const bit = (i, q) => (i >> (n - 1 - q)) & 1;
  for (const op of ops) {
    const next = Array.from({ length: dim }, () => [0, 0]);
    for (let col = 0; col < dim; col++) {
      for (let row = 0; row < dim; row++) {
        let entry;
        if (op.controlQubit === undefined) {
          const g = Gates[op.gateId];
          const others = Array.from({ length: n }, (_, q) => q).filter((q) => q !== op.targetQubit);
          if (others.some((q) => bit(row, q) !== bit(col, q))) continue;
          const e = g[bit(row, op.targetQubit)][bit(col, op.targetQubit)];
          entry = [e.re, e.im];
        } else {
          const c = op.controlQubit, t = op.targetQubit;
          let image = col, sign = 1;
          if (op.gateId === 'CNOT' && bit(col, c)) image = col ^ (1 << (n - 1 - t));
          if (op.gateId === 'CZ' && bit(col, c) && bit(col, t)) sign = -1;
          if (op.gateId === 'SWAP' && bit(col, c) !== bit(col, t)) image = col ^ (1 << (n - 1 - c)) ^ (1 << (n - 1 - t));
          if (row !== image) continue;
          entry = [sign, 0];
        }
        const p = cmul(entry, psi[col]);
        next[row][0] += p[0]; next[row][1] += p[1];
      }
    }
    psi = next;
  }
  return psi;
}
let seed = 12345;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const singles = Object.keys(Gates);
test('random circuits match the dense reference', () => {
  for (let trial = 0; trial < 60; trial++) {
    const n = 1 + Math.floor(rand() * 4);
    const ops = [];
    for (let k = 0; k < 12; k++) {
      if (n > 1 && rand() < 0.35) {
        const c = Math.floor(rand() * n);
        let t = Math.floor(rand() * (n - 1)); if (t >= c) t += 1;
        ops.push(C(['CNOT', 'CZ', 'SWAP'][Math.floor(rand() * 3)], c, t));
      } else {
        ops.push(G(singles[Math.floor(rand() * singles.length)], Math.floor(rand() * n)));
      }
    }
    const got = run(n, ops).state.amplitudes;
    const want = referenceState(n, ops);
    got.forEach((a, i) => assert.ok(Math.abs(a.re - want[i][0]) < 1e-9 && Math.abs(a.im - want[i][1]) < 1e-9, `trial ${trial} amp ${i}`));
  }
});

// ---------- performance ----------
test('10 qubits x 40 gates runs quickly', () => {
  const ops = Array.from({ length: 40 }, (_, k) => (k % 3 === 2 ? C('CNOT', k % 10, (k + 1) % 10) : H(k % 10)));
  const start = performance.now();
  run(10, ops);
  const ms = performance.now() - start;
  assert.ok(ms < 250, `took ${ms.toFixed(0)} ms`);
});

fs.rmSync(outDir, { recursive: true, force: true });
console.log(process.exitCode ? 'Quantum engine tests FAILED' : `Quantum engine tests passed (${passed}).`);
