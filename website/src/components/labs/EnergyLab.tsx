'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from '@/components/math';
import LabFrame, { Slider, Stat, binomialSample, mulberry32 } from './LabFrame';

const G = 0.5; // H = Z + G·X
const GROUND = -Math.sqrt(1 + G * G);
const SHOT_OPTIONS = [20, 100, 1000, 10000];

const energy = (theta: number) => Math.cos(theta) + G * Math.sin(theta);
const gradient = (theta: number) => -Math.sin(theta) + G * Math.cos(theta);

/**
 * A one-qubit variational eigensolver. The ansatz RY(θ)|0⟩ gives ⟨Z⟩ = cos θ and ⟨X⟩ = sin θ,
 * so E(θ) = cos θ + 0.5 sin θ for H = Z + 0.5 X. Each expectation value is estimated from
 * finite shots, and the gradient comes from the parameter-shift rule.
 */
export default function EnergyLab() {
  const [theta, setTheta] = useState(0.6);
  const [shotIndex, setShotIndex] = useState(1);
  const [seed, setSeed] = useState(3);
  const [history, setHistory] = useState<number[]>([]);
  const shots = SHOT_OPTIONS[shotIndex];

  const estimate = useMemo(() => {
    const random = mulberry32(seed * 7331 + shots + Math.round(theta * 1000));
    // Z measurement: P(0) = cos²(θ/2); X measurement (after H): P(+) = (1 + sin θ)/2.
    const p0 = Math.cos(theta / 2) ** 2;
    const pPlus = (1 + Math.sin(theta)) / 2;
    const z = 2 * (binomialSample(shots, p0, random) / shots) - 1;
    const x = 2 * (binomialSample(shots, pPlus, random) / shots) - 1;
    const e = z + G * x;
    // Var(Z-hat) = (1 - <Z>^2)/N, Var(X-hat) = (1 - <X>^2)/N, measured independently.
    const se = Math.sqrt((1 - Math.cos(theta) ** 2) / shots + (G * G * (1 - Math.sin(theta) ** 2)) / shots);
    return { e, se };
  }, [theta, shots, seed]);

  const shiftGradient = (energy(theta + Math.PI / 2) - energy(theta - Math.PI / 2)) / 2;

  function step() {
    const next = theta - 0.4 * shiftGradient;
    setHistory((values) => [...values.slice(-9), theta]);
    setTheta(((next % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
    setSeed((value) => value + 1);
  }

  // Curve for the SVG plot.
  const width = 320;
  const height = 120;
  const toX = (t: number) => (t / (2 * Math.PI)) * width;
  const toY = (e: number) => height / 2 - (e / 1.2) * (height / 2 - 6);
  const path = Array.from({ length: 121 }, (_, i) => {
    const t = (i / 120) * 2 * Math.PI;
    return `${i === 0 ? 'M' : 'L'}${toX(t).toFixed(1)},${toY(energy(t)).toFixed(1)}`;
  }).join(' ');

  return (
    <LabFrame
      label="Energy lab · statistics lens"
      title="Find the lowest energy with noisy measurements"
      footer={
        <p>
          The quantum device never outputs <InlineMath math="E(\theta)" /> directly. It outputs samples, and each average carries
          a standard error that shrinks like <InlineMath math="1/\sqrt{N}" />. The parameter-shift rule gives the exact gradient from two
          energy evaluations: <InlineMath math="\tfrac{dE}{d\theta} = \tfrac12\big[E(\theta+\tfrac{\pi}{2}) - E(\theta-\tfrac{\pi}{2})\big]" />.
          The true minimum here is <InlineMath math="-\sqrt{1.25}\approx-1.118" /> at <InlineMath math="\theta\approx 206.6^\circ" />.
        </p>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label="ansatz angle θ" value={theta} min={0} max={2 * Math.PI} step={0.01} onChange={(value) => { setTheta(value); setSeed((s) => s + 1); }} display={`${((theta * 180) / Math.PI).toFixed(1)}°`} />
        <Slider label="shots per expectation value" value={shotIndex} min={0} max={SHOT_OPTIONS.length - 1} step={1} onChange={setShotIndex} display={shots.toLocaleString()} />
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full rounded-lg border border-border/40 bg-background/40" role="img" aria-label={`Energy curve E(theta). Current theta ${theta.toFixed(2)} radians, estimated energy ${estimate.e.toFixed(3)}.`}>
        <line x1="0" x2={width} y1={toY(GROUND)} y2={toY(GROUND)} stroke="hsl(var(--border))" strokeDasharray="4 4" />
        <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        {history.map((t, i) => (
          <circle key={i} cx={toX(t)} cy={toY(energy(t))} r="2.5" fill="hsl(var(--muted))" />
        ))}
        <line x1={toX(theta)} x2={toX(theta)} y1={toY(estimate.e - 1.96 * estimate.se)} y2={toY(estimate.e + 1.96 * estimate.se)} stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx={toX(theta)} cy={toY(estimate.e)} r="4" fill="hsl(var(--accent))" />
      </svg>

      <div className="grid gap-2 sm:grid-cols-4">
        <Stat label="exact E(θ)" value={energy(theta).toFixed(3)} tone="primary" />
        <Stat label="measured Ê ± 95%" value={`${estimate.e.toFixed(3)} ± ${(1.96 * estimate.se).toFixed(3)}`} tone="accent" />
        <Stat label="gradient (shift rule)" value={shiftGradient.toFixed(3)} />
        <Stat label="gap to ground energy" value={(energy(theta) - GROUND).toFixed(3)} tone={energy(theta) - GROUND < 0.01 ? 'good' : 'default'} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={step} className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90">
          take a gradient step (θ ← θ − 0.4·dE/dθ)
        </button>
        <button type="button" onClick={() => setSeed((value) => value + 1)} className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-mono text-accent transition hover:bg-accent/10">
          re-measure
        </button>
        <span className="text-xs text-muted">Check: the shift-rule value equals the calculus derivative {gradient(theta).toFixed(3)}.</span>
      </div>
    </LabFrame>
  );
}
