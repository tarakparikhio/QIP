'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CircuitRunner, GateOperation } from '@/lib/quantum-engine/run';
import { computeQubitBlochVectors } from '@/lib/quantum-engine/math';

type Vec = { x: number; y: number; z: number };

const STEPS: { gate: string | null; title: string; body: string }[] = [
  { gate: null, title: 'Start at |0⟩', body: 'The arrow points to the north pole. Measuring gives 0 every time: a certain result.' },
  { gate: 'H', title: 'H: onto the equator', body: 'The Hadamard turns the arrow down to the equator. Now 0 and 1 are equally likely, like a fair coin, but this coin has a direction.' },
  { gate: 'S', title: 'S: a quarter turn around the axis', body: 'S spins the arrow 90° around the vertical axis. The probabilities do not change at all. Only the phase moved, and phase is invisible to this measurement.' },
  { gate: 'T', title: 'T: an eighth turn', body: 'T adds another 45°. Still 50/50. Three gates in, and the measurement statistics have not moved since the first one.' },
  { gate: 'H', title: 'H again: phase becomes probability', body: 'A second Hadamard converts the hidden phase into a real bias: P(0) ≈ 0.15 and P(1) ≈ 0.85. This is interference, the engine of every quantum algorithm.' },
];

// Cabinet projection: z up, y to the right, x toward the viewer (drawn down-left).
const R = 88;
const CX = 120;
const CY = 118;
const project = (v: Vec) => ({ x: CX + R * (v.y - 0.35 * v.x), y: CY - R * (v.z - 0.35 * v.x) });

function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (omega < 1e-4) return b;
  if (Math.PI - omega < 1e-3) {
    // Antipodal: interpolate through the equator via a perpendicular direction.
    const mid: Vec = Math.abs(a.z) < 0.9 ? { x: 0, y: 0, z: 1 } : { x: 1, y: 0, z: 0 };
    return t < 0.5 ? slerp(a, mid, t * 2) : slerp(mid, b, (t - 0.5) * 2);
  }
  const s = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / s;
  const wb = Math.sin(t * omega) / s;
  return { x: wa * a.x + wb * b.x, y: wa * a.y + wb * b.y, z: wa * a.z + wb * b.z };
}

export default function BlochStory() {
  const vectors = useMemo(() => {
    const ops: GateOperation[] = [];
    return STEPS.map((step) => {
      if (step.gate) ops.push({ gateId: step.gate, targetQubit: 0 });
      const runner = new CircuitRunner(1);
      runner.run(ops);
      const [b] = computeQubitBlochVectors(runner.state.amplitudes, 1);
      return { x: b.x, y: b.y, z: b.z };
    });
  }, []);

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<Vec>(vectors[0]);
  const shownRef = useRef<Vec>(vectors[0]);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Activate the step card nearest the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    stepRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // Animate the arrow along the sphere surface.
  useEffect(() => {
    const from = shownRef.current;
    const to = vectors[active];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownRef.current = to;
      setShown(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const next = slerp(from, to, eased);
      shownRef.current = next;
      setShown(next);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, vectors]);

  const tip = project(shown);
  const origin = project({ x: 0, y: 0, z: 0 });
  const p0 = (1 + vectors[active].z) / 2;
  const equator = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * 2 * Math.PI;
    const point = project({ x: Math.cos(t), y: Math.sin(t), z: 0 });
    return `${i === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }).join(' ');
  const shadow = project({ x: shown.x, y: shown.y, z: 0 });
  const labels: [Vec, string][] = [
    [{ x: 0, y: 0, z: 1.18 }, '|0⟩'], [{ x: 0, y: 0, z: -1.2 }, '|1⟩'], [{ x: 1.35, y: 0, z: 0 }, '|+⟩'], [{ x: 0, y: 1.2, z: 0 }, '|+i⟩'],
  ];
  const gatesSoFar = STEPS.slice(1, active + 1).map((step) => step.gate).join(' → ') || 'no gates yet';

  return (
    <section className="relative mx-auto mt-24 max-w-6xl px-0" aria-labelledby="bloch-story-heading">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">One qubit, four gates</p>
      <h2 id="bloch-story-heading" className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Watch phase turn into probability.</h2>
      <p className="mt-3 max-w-2xl text-muted">Scroll through the steps. The sphere is computed by the same simulator the lessons use.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="sticky top-14 z-10 -mx-4 bg-background px-4 py-3 backdrop-blur lg:top-24 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
          <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-3 lg:flex-col lg:p-6">
            <svg viewBox="0 0 240 236" className="h-40 w-40 shrink-0 lg:h-auto lg:w-full lg:max-w-sm" role="img" aria-label={`Bloch sphere after ${gatesSoFar}. Probability of 0 is ${Math.round(p0 * 100)} percent.`}>
              <circle cx={CX} cy={CY} r={R} fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <path d={equator} fill="none" stroke="hsl(var(--border))" strokeDasharray="4 4" />
              <line x1={project({ x: 0, y: 0, z: -1 }).x} y1={project({ x: 0, y: 0, z: -1 }).y} x2={project({ x: 0, y: 0, z: 1 }).x} y2={project({ x: 0, y: 0, z: 1 }).y} stroke="hsl(var(--border))" />
              {labels.map(([v, text]) => {
                const p = project(v);
                return <text key={text} x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" className="fill-[hsl(var(--muted))] font-mono">{text}</text>;
              })}
              <line x1={origin.x} y1={origin.y} x2={shadow.x} y2={shadow.y} stroke="hsl(var(--accent) / 0.35)" strokeDasharray="3 3" />
              <line x1={origin.x} y1={origin.y} x2={tip.x} y2={tip.y} stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
              <circle cx={tip.x} cy={tip.y} r="6" fill="hsl(var(--accent))" />
            </svg>
            <div className="w-full min-w-0">
              <p className="font-mono text-xs text-muted">Gates: <span className="text-foreground">{gatesSoFar}</span></p>
              {[{ label: 'P(0)', value: p0 }, { label: 'P(1)', value: 1 - p0 }].map((row) => (
                <div key={row.label} className="mt-2">
                  <div className="flex justify-between font-mono text-xs text-muted"><span>{row.label}</span><span className="text-foreground">{row.value.toFixed(2)}</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-border/40"><div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700" style={{ width: `${row.value * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ol className="space-y-6 lg:space-y-0">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              ref={(element) => { stepRefs.current[index] = element; }}
              data-step={index}
              className="lg:flex lg:min-h-[55vh] lg:items-center"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={active === index ? 'step' : undefined}
                className={`w-full rounded-2xl border p-5 text-left transition ${active === index ? 'border-accent/50 bg-accent/10' : 'border-border/50 bg-card/30 hover:border-border'}`}
              >
                <p className="font-mono text-xs text-muted">Step {index + 1} of {STEPS.length}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.body}</p>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
