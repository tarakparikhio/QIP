'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/** Shared animation clock that only runs while the section is visible and motion is allowed. */
function useClock() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let running = false;
    const start = performance.now();
    const loop = (now: number) => { setT((now - start) / 1000); frame = running ? requestAnimationFrame(loop) : 0; };
    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !frame) frame = requestAnimationFrame(loop);
    });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return { ref, t };
}

const W = 200;
const H = 90;

function InterferencePreview({ t }: { t: number }) {
  // P(φ) = (1 + cos φ)/2 for two equal routes; the dot sweeps the phase.
  const path = Array.from({ length: 61 }, (_, i) => {
    const phi = (i / 60) * 2 * Math.PI;
    return `${i ? 'L' : 'M'}${(i / 60) * W},${H - 8 - ((1 + Math.cos(phi)) / 2) * (H - 16)}`;
  }).join(' ');
  const phi = (t * 0.8) % (2 * Math.PI);
  const x = (phi / (2 * Math.PI)) * W;
  const y = H - 8 - ((1 + Math.cos(phi)) / 2) * (H - 16);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      <line x1="0" x2={W} y1={H - 8 - 0.5 * (H - 16)} y2={H - 8 - 0.5 * (H - 16)} stroke="hsl(var(--muted))" strokeDasharray="3 3" strokeOpacity="0.5" />
      <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx={x} cy={y} r="4.5" fill="hsl(var(--accent))" />
    </svg>
  );
}

function ShotPreview({ t }: { t: number }) {
  // A binomial(100, 0.5) histogram that fills up, then restarts.
  const bins = 13;
  const heights = Array.from({ length: bins }, (_, i) => {
    const z = (i - (bins - 1) / 2) / 2.2;
    return Math.exp(-z * z / 2);
  });
  const fill = Math.min(1, (t % 5) / 3.5);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      {heights.map((h, i) => {
        const barHeight = h * (H - 14) * Math.min(1, fill * (1.2 + 0.25 * Math.sin(i * 2.3)));
        return <rect key={i} x={8 + i * 14.3} y={H - 6 - barHeight} width="11" height={barHeight} rx="2" fill="hsl(var(--accent) / 0.75)" />;
      })}
      <line x1={W / 2} x2={W / 2} y1="4" y2={H - 4} stroke="hsl(45 93% 58%)" strokeWidth="1.5" />
    </svg>
  );
}

function EnergyPreview({ t }: { t: number }) {
  // E(θ) = cos θ + 0.5 sin θ; a point descends toward the minimum at θ ≈ 206.6°.
  const energy = (theta: number) => Math.cos(theta) + 0.5 * Math.sin(theta);
  const toX = (theta: number) => (theta / (2 * Math.PI)) * W;
  const toY = (e: number) => H / 2 - (e / 1.2) * (H / 2 - 8);
  const path = Array.from({ length: 61 }, (_, i) => {
    const theta = (i / 60) * 2 * Math.PI;
    return `${i ? 'L' : 'M'}${toX(theta)},${toY(energy(theta))}`;
  }).join(' ');
  let theta = 0.6;
  const steps = Math.floor((t * 4) % 40);
  for (let i = 0; i < steps; i++) theta -= 0.25 * (-Math.sin(theta) + 0.5 * Math.cos(theta));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      <line x1="0" x2={W} y1={toY(-Math.sqrt(1.25))} y2={toY(-Math.sqrt(1.25))} stroke="hsl(var(--muted))" strokeDasharray="3 3" strokeOpacity="0.5" />
      <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx={toX(theta)} cy={toY(energy(theta))} r="4.5" fill="hsl(var(--accent))" />
    </svg>
  );
}

function TrotterPreview({ t }: { t: number }) {
  // First-order error roughly halves each time the number of steps doubles.
  const errors = [0.8, 0.36, 0.18, 0.088, 0.044, 0.022];
  const visible = Math.floor((t * 1.2) % (errors.length + 2));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      {errors.map((error, i) => {
        const barWidth = (Math.log10(error) + 2.2) / 2.2 * (W - 50);
        return (
          <g key={i} opacity={i <= visible ? 1 : 0.15}>
            <text x="0" y={10 + i * 14} fontSize="8" className="fill-[hsl(var(--muted))] font-mono">r={2 ** i}</text>
            <rect x="34" y={3 + i * 14} width={Math.max(4, barWidth)} height="9" rx="3" fill="hsl(45 93% 58% / 0.8)" />
          </g>
        );
      })}
    </svg>
  );
}

const LABS = [
  { title: 'Interference lab', text: 'Add amplitudes instead of chances and watch outcomes reinforce or cancel.', href: '/lessons/interference/', lesson: 'Lesson 5', Preview: InterferencePreview },
  { title: 'Shot lab', text: 'See how estimates spread, and how many measurements a precise answer really costs.', href: '/lessons/measurement/', lesson: 'Lesson 3', Preview: ShotPreview },
  { title: 'Energy lab', text: 'Train a tiny variational circuit with noisy measurements and exact gradients.', href: '/lessons/variational-quantum-algorithms/', lesson: 'Lesson 29', Preview: EnergyPreview },
  { title: 'Trotter lab', text: 'Slice time into steps to simulate physics, and measure the error you pay.', href: '/lessons/hamiltonian-simulation-deep/', lesson: 'Lesson 33', Preview: TrotterPreview },
];

export default function LabShowcase() {
  const { ref, t } = useClock();
  return (
    <section ref={ref} className="mx-auto mt-24 max-w-6xl" aria-labelledby="labs-heading">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Hands-on labs</p>
      <h2 id="labs-heading" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Move a slider, see the math.</h2>
      <p className="mt-3 max-w-2xl text-muted">Four interactive labs connect quantum ideas to probability you already know. Each lives inside the lesson it explains.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LABS.map(({ title, text, href, lesson, Preview }) => (
          <Link key={title} href={href} className="group flex flex-col rounded-2xl border border-border/60 bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card/70">
            <div className="rounded-xl border border-border/40 bg-background/50 p-2"><Preview t={t} /></div>
            <p className="mt-3 font-mono text-[11px] text-muted">{lesson}</p>
            <h3 className="mt-0.5 font-semibold text-foreground">{title}</h3>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{text}</p>
            <span className="mt-3 text-sm font-semibold text-accent group-hover:text-foreground">Open the lab <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
