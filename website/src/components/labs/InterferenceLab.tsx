'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from '@/components/math';
import LabFrame, { Slider, Stat, mulberry32 } from './LabFrame';

/**
 * Two routes lead to the same outcome. Classically, probabilities of exclusive routes
 * add. Quantum mechanically, amplitudes add first, and the cross term 2 r1 r2 cos(phi)
 * can raise or cancel the result. Averaging over a random phase recovers the classical sum.
 */
export default function InterferenceLab() {
  const [r1, setR1] = useState(0.5);
  const [r2, setR2] = useState(0.5);
  const [phaseDeg, setPhaseDeg] = useState(0);
  const [trials, setTrials] = useState(0);

  const phase = (phaseDeg * Math.PI) / 180;
  const classical = r1 * r1 + r2 * r2;
  const cross = 2 * r1 * r2 * Math.cos(phase);
  const quantum = classical + cross;

  // Averaging the quantum result over uniformly random phases (a model of lost phase control).
  const randomAverage = useMemo(() => {
    if (trials === 0) return null;
    const random = mulberry32(trials * 7919);
    let sum = 0;
    for (let i = 0; i < trials; i++) sum += r1 * r1 + r2 * r2 + 2 * r1 * r2 * Math.cos(2 * Math.PI * random());
    return sum / trials;
  }, [trials, r1, r2]);

  const scale = 1; // with r₁, r₂ ≤ 0.5 every probability here stays within [0, 1]
  const bar = (value: number) => `${Math.max(0, (value / scale) * 100)}%`;

  return (
    <LabFrame
      label="Interference lab · statistics lens"
      title="Add the chances, or add the amplitudes?"
      footer={
        <p>
          Classical probability adds the chances of exclusive routes: <InlineMath math="P = r_1^2 + r_2^2" />. Quantum
          mechanics adds amplitudes first: <InlineMath math="P = |r_1 + r_2e^{i\varphi}|^2 = r_1^2 + r_2^2 + 2r_1r_2\cos\varphi" />.
          The extra cross term can be negative, which is impossible for a sum of chances. If the phase is random, the cross
          term averages to zero, because the average of <InlineMath math="\cos\varphi" /> over a full turn is 0. That is decoherence in one line.
        </p>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label="route 1 amplitude r₁" value={r1} min={0} max={0.5} step={0.01} onChange={setR1} display={r1.toFixed(2)} />
        <Slider label="route 2 amplitude r₂" value={r2} min={0} max={0.5} step={0.01} onChange={setR2} display={r2.toFixed(2)} />
        <Slider label="relative phase φ" value={phaseDeg} min={0} max={360} step={5} onChange={setPhaseDeg} display={`${phaseDeg}°`} />
      </div>

      <div className="space-y-2">
        {[
          { label: 'Classical: add chances', value: classical, className: 'bg-muted/70' },
          { label: 'Quantum: add amplitudes, then square', value: quantum, className: 'bg-gradient-to-r from-primary to-accent' },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex justify-between text-xs font-mono text-muted"><span>{row.label}</span><span className="text-foreground">{row.value.toFixed(3)}</span></div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-border/40"><div className={`h-full rounded-full ${row.className}`} style={{ width: bar(row.value) }} /></div>
          </div>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <Stat label="cross term 2r₁r₂cos φ" value={cross >= 0 ? `+${cross.toFixed(3)}` : cross.toFixed(3)} tone={cross >= 0 ? 'good' : 'warn'} />
        <Stat label="quantum − classical" value={(quantum - classical).toFixed(3)} tone="primary" />
        <Stat label="random-phase average" value={randomAverage === null ? '—' : randomAverage.toFixed(3)} tone="accent" />
      </div>

      <div className="flex flex-wrap gap-2">
        {[10, 100, 10000].map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => setTrials(count)}
            className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-mono text-accent transition hover:bg-accent/10"
          >
            average over {count.toLocaleString()} random phases
          </button>
        ))}
      </div>
      <p className="text-xs text-muted">
        Try φ = 180° with r₁ = r₂: the quantum probability is 0 even though each route alone is possible. Then average over random phases and watch the result approach the classical sum.
      </p>
    </LabFrame>
  );
}
