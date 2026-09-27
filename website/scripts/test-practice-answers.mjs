// Checks every "Practice the math" problem:
//  1. its stored answer matches an independent recomputation below,
//  2. every lesson has at least three problems,
//  3. all inline math ($...$) renders with KaTeX,
//  4. the answer parser accepts decimals, fractions, and percentages.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import ts from 'typescript';
import katex from 'katex';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'practice-'));
const source = fs.readFileSync(path.join(root, 'src/lib/lessonPractice.ts'), 'utf8');
fs.writeFileSync(path.join(outDir, 'practice.js'), ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText);
const require = createRequire(import.meta.url);
const { LESSON_PRACTICE } = require(path.join(outDir, 'practice.js'));

const { cos, sin, sqrt, exp, log2, PI, ceil, asin } = Math;
const deg = (d) => (d * PI) / 180;
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const theta16 = asin(1 / 4);
const peProbability = (phi, t, y) => {
  let re = 0; let im = 0;
  for (let x = 0; x < 2 ** t; x++) { re += cos(2 * PI * x * (phi - y / 2 ** t)); im += sin(2 * PI * x * (phi - y / 2 ** t)); }
  return (re * re + im * im) / 4 ** t;
};

// Independent recomputation of every answer, in the same order as the problems.
const EXPECTED = {
  1: [0.8 ** 2, (1 + 1) / 4, sqrt(1 - 0.6 ** 2)],
  2: [0.7, sqrt(1000 * 0.25), 0.5],
  3: [200 * 0.36, sqrt(200 * 0.36 * 0.64), 0.5],
  4: [0, cos(deg(45)), (1 + cos(deg(60))) / 2, 3 * cos(deg(45)) - cos(deg(135))],
  5: [0.25 + 0.25 + 2 * 0.25 * cos(deg(90)), 0.5 + 2 * 0.25 * cos(deg(120)), 0.5],
  6: [(1 + cos(PI / 4)) / 2, 4, -0.6 * 0.8 / 0.8],
  7: [cos(deg(30)) ** 2, 120, 0.9 - 0.1],
  8: [0.64 * 0.5, 0.5 * -0.5 - 0.5 * 0.5, 2 ** 10],
  9: [3, 3, 0.5],
  10: [90, 45, 1],
  11: [exp(-0.5), exp(-2), (1 + exp(-0.5)) / 2],
  12: [0.5 * 0.02 + 0.5 * 0.95, 0.995 ** 20, 0.1],
  13: [2 ** 2 + 1, 2 * 0.5 ** 5, 1],
  14: [9, (32 * 31) / 2 / 1023, (1 * 1 + 0 * 1 + 1 * 0) % 2],
  15: [4, gcd(2 ** 3 - 1, 21), 1 / 4],
  16: [3 * 0.01 ** 2 - 2 * 0.01 ** 3, 0.5, 1],
  17: [0.25, 2000, 0.25],
  18: [0.5, 0.7 ** 2 + 0.3 ** 2, sqrt(2 * 0.58 - 1)],
  19: [(2 / 3) ** 3 + 3 * (2 / 3) ** 2 * (1 / 3), (PI / 4) * 2 ** 20, 2 ** 40 / 1e9],
  20: [-sin(PI / 3), (1.96 / 0.01) ** 2, 20],
  21: [cos(PI) / 2, 1 / 8, 4],
  22: [0.625, 0.75, 1 / 8],
  23: [PI / 2, 0.5, -1],
  24: [8, 7, 3 * log2(1e10)],
  25: [0.36 - 0.64, (30 - 70) / 100, 1.4 ** 2 / 2],
  26: [0.25, 0, Math.round(32 / 3)],
  27: [(5 * 4) / 2, 2, 45],
  28: [2 ** 6 - 1, peProbability(0.3, 3, 2) + peProbability(0.3, 3, 3), 4 + ceil(log2(2 + 1 / 0.2))],
  29: [4 / 0.01, 0.25, 300],
  30: [cos(PI) + 0.5 * sin(PI), -sqrt(1.25), (1.96 / 0.0016) ** 2],
  31: [2, 1.5, 0.75],
  32: [-1 - 0.5, 2 ** 20, exp(-1 / 0.5)],
  33: [2 * sqrt(0.5), sqrt(2) / 2, 4],
  34: [(1 + cos(PI / 4)) / 2, 2 * 0.85 - 1, 0.5],
  35: [sin(7 * theta16) ** 2, sin(13 * theta16) ** 2, 1 / sin(7 * theta16) ** 2],
  36: [0.5, 5 / 6, 2 / 3],
  37: [0.25, 25, (1024 + 1) / 2],
  38: [0.5, 0.4 / 4, 1.96 * sqrt((0.11 * 0.89) / 200)],
  39: [100e-6 / 50e-9, 0.995 ** 50 * 0.9995 ** 100 * 0.99 ** 5, 100 * Math.LN2],
  40: [3 * 3 + 1, 0.99 ** 10, 30 - 8],
};

let failures = 0;
const fail = (message) => { failures += 1; console.error(`FAIL ${message}`); };

for (let id = 1; id <= 40; id++) {
  const problems = LESSON_PRACTICE[id];
  if (!problems || problems.length < 3) { fail(`lesson ${id}: needs at least 3 practice problems`); continue; }
  const expected = EXPECTED[id];
  if (!expected || expected.length !== problems.length) { fail(`lesson ${id}: expected-answer list has ${expected?.length} entries for ${problems.length} problems`); continue; }
  problems.forEach((problem, index) => {
    const tolerance = problem.tolerance ?? Math.max(0.005, Math.abs(problem.answer) * 0.01);
    if (Math.abs(problem.answer - expected[index]) > tolerance) {
      fail(`lesson ${id} problem ${index + 1}: stored ${problem.answer}, recomputed ${expected[index]}`);
    }
    for (const text of [problem.prompt, problem.hint, problem.lens ?? '', ...problem.solution]) {
      for (const match of text.matchAll(/\$([^$]+)\$/g)) {
        try { katex.renderToString(match[1], { throwOnError: true }); } catch (error) { fail(`lesson ${id} problem ${index + 1}: bad KaTeX "${match[1]}" (${error.message})`); }
      }
      if ((text.match(/\$/g) ?? []).length % 2 !== 0) fail(`lesson ${id} problem ${index + 1}: unbalanced $ in "${text}"`);
    }
  });
}

// Answer parser (kept in sync with components/lesson/MathPractice.tsx).
const mp = fs.readFileSync(path.join(root, 'src/components/lesson/MathPractice.tsx'), 'utf8');
const parserSource = mp.slice(mp.indexOf('export function parseAnswer'), mp.indexOf('export function isCorrect'));
fs.writeFileSync(path.join(outDir, 'parse.js'), ts.transpileModule(parserSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText);
const { parseAnswer } = require(path.join(outDir, 'parse.js'));
try {
  assert.equal(parseAnswer('0.25'), 0.25);
  assert.equal(parseAnswer('25%'), 0.25);
  assert.equal(parseAnswer('1/4'), 0.25);
  assert.equal(parseAnswer('−0.5'), -0.5);
  assert.equal(parseAnswer('1,048,576'), 1048576);
  assert.equal(parseAnswer('abc'), null);
  assert.equal(parseAnswer('1/0'), null);
} catch (error) { fail(`answer parser: ${error.message}`); }

fs.rmSync(outDir, { recursive: true, force: true });
if (failures > 0) { console.error(`Practice checks FAILED (${failures}).`); process.exit(1); }
const total = Object.values(LESSON_PRACTICE).reduce((sum, list) => sum + list.length, 0);
console.log(`Practice problems verified (${total} problems across 40 lessons).`);
