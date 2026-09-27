'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from '@/components/math';
import LabFrame, { Slider, Stat } from './LabFrame';

// Minimal 2×2 complex matrix arithmetic. A matrix is [a, b, c, d] of [re, im] pairs (row-major).
type C = [number, number];
type M = [C, C, C, C];
const cmul = (x: C, y: C): C => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
const cadd = (x: C, y: C): C => [x[0] + y[0], x[1] + y[1]];
const mmul = (A: M, B: M): M => [
  cadd(cmul(A[0], B[0]), cmul(A[1], B[2])), cadd(cmul(A[0], B[1]), cmul(A[1], B[3])),
  cadd(cmul(A[2], B[0]), cmul(A[3], B[2])), cadd(cmul(A[2], B[1]), cmul(A[3], B[3])),
];
const I: M = [[1, 0], [0, 0], [0, 0], [1, 0]];
/** exp(-i·a·X) and exp(-i·a·Z): cos(a) I − i sin(a) P. */
const expX = (a: number): M => [[Math.cos(a), 0], [0, -Math.sin(a)], [0, -Math.sin(a)], [Math.cos(a), 0]];
const expZ = (a: number): M => [[Math.cos(a), -Math.sin(a)], [0, 0], [0, 0], [Math.cos(a), Math.sin(a)]];
function power(A: M, n: number): M {
  let result = I;
  for (let i = 0; i < n; i++) result = mmul(result, A);
  return result;
}
/** Exact exp(-i t (X + Z)) = cos(√2 t) I − i sin(√2 t)(X + Z)/√2. */
function exact(t: number): M {
  const c = Math.cos(Math.SQRT2 * t);
  const s = Math.sin(Math.SQRT2 * t) / Math.SQRT2;
  return [[c, -s], [0, -s], [0, -s], [c, s]];
}
function trotter(t: number, r: number, order: 1 | 2): M {
  const step = order === 1 ? mmul(expX(t / r), expZ(t / r)) : mmul(mmul(expX(t / (2 * r)), expZ(t / r)), expX(t / (2 * r)));
  return power(step, r);
}
/** Spectral norm of A − B, via the largest eigenvalue of D†D. */
function distance(A: M, B: M): number {
  const d: M = [0, 1, 2, 3].map((i) => [A[i][0] - B[i][0], A[i][1] - B[i][1]]) as M;
  const conj = (x: C): C => [x[0], -x[1]];
  const dagger: M = [conj(d[0]), conj(d[2]), conj(d[1]), conj(d[3])];
  const h = mmul(dagger, d);
  const tr = h[0][0] + h[3][0];
  const det = h[0][0] * h[3][0] - (h[1][0] * h[2][0] - h[1][1] * h[2][1]);
  const lambda = (tr + Math.sqrt(Math.max(tr * tr - 4 * det, 0))) / 2;
  return Math.sqrt(Math.max(lambda, 0));
}
const prob0 = (U: M) => U[0][0] ** 2 + U[0][1] ** 2; // |<0|U|0>|^2

const R_VALUES = [1, 2, 4, 8, 16, 32, 64];

/**
 * Trotterization of H = X + Z on one qubit. X and Z do not commute, so
 * e^{-i(X+Z)t} ≠ e^{-iXt}e^{-iZt}; splitting time into r slices shrinks the error.
 */
export default function TrotterLab() {
  const [t, setT] = useState(1);
  const [rIndex, setRIndex] = useState(2);
  const r = R_VALUES[rIndex];

  const rows = useMemo(() => R_VALUES.map((steps) => ({
    steps,
    first: distance(exact(t), trotter(t, steps, 1)),
    second: distance(exact(t), trotter(t, steps, 2)),
  })), [t]);

  const current = rows[rIndex];
  const bound = (t * t) / r; // (t²/2r)·‖[X,Z]‖ with ‖[X,Z]‖ = 2
  const logMin = -5;
  const toBar = (value: number) => `${Math.max(2, ((Math.log10(Math.max(value, 1e-5)) - logMin) / (0 - logMin)) * 100)}%`;

  return (
    <LabFrame
      label="Trotter lab"
      title="Slice time to simulate non-commuting terms"
      footer={
        <p>
          For <InlineMath math="H = X + Z" />, first-order slicing has error at most <InlineMath math="\tfrac{t^2}{2r}\|[X,Z]\| = \tfrac{t^2}{r}" />.
          Doubling <InlineMath math="r" /> roughly halves the first-order error and quarters the second-order error. The bound is a worst case,
          so the actual error can be much smaller, as some values of <InlineMath math="t" /> show.
        </p>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label="evolution time t" value={t} min={0.2} max={3} step={0.1} onChange={setT} display={t.toFixed(1)} />
        <Slider label="Trotter steps r" value={rIndex} min={0} max={R_VALUES.length - 1} step={1} onChange={setRIndex} display={String(r)} />
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        <Stat label="exact P(0)" value={prob0(exact(t)).toFixed(4)} tone="primary" />
        <Stat label="1st-order P(0)" value={prob0(trotter(t, r, 1)).toFixed(4)} />
        <Stat label="1st-order error" value={current.first.toExponential(2)} tone="warn" />
        <Stat label="bound t²/r" value={bound.toExponential(2)} />
      </div>

      <div>
        <p className="mb-2 text-xs font-mono text-muted">Operator error ‖U_exact − U_Trotter‖ for each r (log scale, 10⁻⁵ to 1)</p>
        <div className="space-y-1.5">
          {rows.map((row) => (
            <div key={row.steps} className={`grid grid-cols-[3rem_1fr_1fr] items-center gap-2 text-[11px] font-mono ${row.steps === r ? 'text-foreground' : 'text-muted'}`}>
              <span>r = {row.steps}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-border/40" title={`first order ${row.first.toExponential(2)}`}>
                <div className="h-full rounded-full bg-amber-400/80" style={{ width: toBar(row.first) }} />
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-border/40" title={`second order ${row.second.toExponential(2)}`}>
                <div className="h-full rounded-full bg-emerald-400/80" style={{ width: toBar(row.second) }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-[3rem_1fr_1fr] gap-2 text-[11px] font-mono text-muted"><span /><span>1st order</span><span>2nd order (symmetric)</span></div>
      </div>
    </LabFrame>
  );
}
