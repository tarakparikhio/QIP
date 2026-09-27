'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircuitRunner, GateOperation, sampleMeasurementCounts } from '@/lib/quantum-engine/run';

const LABELS = ['00', '01', '10', '11'];
const MAX_OPS = 8;
type Gate = 'H' | 'X' | 'Z' | 'CNOT';

const PRESETS: { label: string; ops: GateOperation[] }[] = [
  { label: 'Bell pair', ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'CNOT', controlQubit: 0, targetQubit: 1 }] },
  { label: 'Interference', ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'Z', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }] },
  { label: 'Two coins', ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'H', targetQubit: 1 }] },
];

function describe(amplitudes: { re: number; im: number }[], probabilities: number[], opCount: number): string {
  if (opCount === 0) return 'Both qubits start in |0⟩. Add a gate and watch the probabilities change.';
  const certain = probabilities.findIndex((p) => p > 0.9999);
  if (certain >= 0) return `Definite result: every measurement gives ${LABELS[certain]}.`;
  const [a, b, c, d] = amplitudes;
  // det = a·d − b·c (complex). Non-zero means the two qubits cannot be described separately.
  const re = a.re * d.re - a.im * d.im - (b.re * c.re - b.im * c.im);
  const im = a.re * d.im + a.im * d.re - (b.re * c.im + b.im * c.re);
  if (Math.hypot(re, im) > 1e-6) return 'Entangled: the two qubits no longer have separate states, so their results are linked.';
  return 'Superposition: several outcomes are possible, and each qubit still has its own state.';
}

/** Hero widget: a two-qubit circuit visitors build, with exact probabilities and a live measurement tally. */
export default function InteractiveHero() {
  const reduceMotion = useReducedMotion();
  const [ops, setOps] = useState<GateOperation[]>(PRESETS[0].ops);
  const [target, setTarget] = useState<0 | 1>(0);
  const [tally, setTally] = useState<number[]>([0, 0, 0, 0]);
  const [lastOutcome, setLastOutcome] = useState<{ index: number; key: number } | null>(null);

  const { probabilities, amplitudes } = useMemo(() => {
    const runner = new CircuitRunner(2);
    runner.run(ops);
    return { probabilities: runner.getProbabilities(), amplitudes: runner.state.amplitudes };
  }, [ops]);

  const shots = tally.reduce((sum, value) => sum + value, 0);

  function changeCircuit(next: GateOperation[]) {
    setOps(next);
    setTally([0, 0, 0, 0]);
    setLastOutcome(null);
  }

  function addGate(gate: Gate) {
    if (ops.length >= MAX_OPS) return;
    const op: GateOperation = gate === 'CNOT'
      ? { gateId: 'CNOT', controlQubit: target, targetQubit: target === 0 ? 1 : 0 }
      : { gateId: gate, targetQubit: target };
    changeCircuit([...ops, op]);
  }

  function measure(count: number) {
    const counts = sampleMeasurementCounts(probabilities, count);
    setTally((current) => current.map((value, index) => value + counts[index]));
    if (count === 1) setLastOutcome({ index: counts.findIndex((value) => value === 1), key: Date.now() });
    else setLastOutcome(null);
  }

  const stepWidth = 34;
  const width = Math.max(220, 64 + ops.length * stepWidth + 24);
  const wireY = [26, 70];

  return (
    <div className="rounded-2xl border border-primary/25 bg-card/70 p-4 shadow-[0_0_60px_-20px_hsl(var(--primary)/0.5)] backdrop-blur-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary">Try it · two qubits</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button key={preset.label} type="button" onClick={() => changeCircuit(preset.ops)} className="rounded-md border border-border/60 px-2 py-1 text-[11px] font-mono text-muted transition hover:border-primary/50 hover:text-foreground">
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Circuit */}
      <div className="mt-3 overflow-x-auto">
        <svg viewBox={`0 0 ${width} 96`} width={width} height={96} role="img" aria-label={`Circuit with ${ops.length} gates: ${ops.map((op) => op.gateId === 'CNOT' ? `CNOT from q${op.controlQubit} to q${op.targetQubit}` : `${op.gateId} on q${op.targetQubit}`).join(', ') || 'empty'}.`}>
          {wireY.map((y, qubit) => (
            <g key={qubit}>
              <text x="4" y={y + 4} fontSize="12" className="fill-[hsl(var(--muted))] font-mono">q{qubit}</text>
              <line x1="30" x2={width - 6} y1={y} y2={y} stroke="hsl(var(--border))" strokeWidth="2" />
            </g>
          ))}
          {ops.map((op, index) => {
            const x = 56 + index * stepWidth;
            if (op.gateId === 'CNOT') {
              const cy = wireY[op.controlQubit ?? 0];
              const ty = wireY[op.targetQubit];
              return (
                <g key={index}>
                  <line x1={x} x2={x} y1={Math.min(cy, ty)} y2={Math.max(cy, ty)} stroke="hsl(var(--accent))" strokeWidth="2" />
                  <circle cx={x} cy={cy} r="5" fill="hsl(var(--accent))" />
                  <circle cx={x} cy={ty} r="10" fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="2" />
                  <line x1={x - 10} x2={x + 10} y1={ty} y2={ty} stroke="hsl(var(--accent))" strokeWidth="2" />
                  <line x1={x} x2={x} y1={ty - 10} y2={ty + 10} stroke="hsl(var(--accent))" strokeWidth="2" />
                </g>
              );
            }
            const y = wireY[op.targetQubit];
            return (
              <g key={index}>
                <rect x={x - 13} y={y - 13} width="26" height="26" rx="5" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--foreground))">{op.gateId}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-border/60 p-0.5" role="radiogroup" aria-label="Qubit to add the gate to">
          {[0, 1].map((qubit) => (
            <button key={qubit} type="button" role="radio" aria-checked={target === qubit} onClick={() => setTarget(qubit as 0 | 1)} className={`rounded-md px-2.5 py-1 text-xs font-mono transition ${target === qubit ? 'bg-primary/20 text-primary' : 'text-muted hover:text-foreground'}`}>
              q{qubit}
            </button>
          ))}
        </div>
        {(['H', 'X', 'Z', 'CNOT'] as Gate[]).map((gate) => (
          <button
            key={gate}
            type="button"
            onClick={() => addGate(gate)}
            disabled={ops.length >= MAX_OPS}
            aria-label={gate === 'CNOT' ? `Add CNOT with q${target} as control` : `Add ${gate} to q${target}`}
            className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-mono font-semibold text-primary transition hover:bg-primary/20 active:scale-95 disabled:opacity-40"
          >
            {gate}
          </button>
        ))}
        <button type="button" onClick={() => changeCircuit(ops.slice(0, -1))} disabled={ops.length === 0} className="rounded-lg px-2 py-1.5 text-xs font-mono text-muted transition hover:text-foreground disabled:opacity-40">undo</button>
        <button type="button" onClick={() => changeCircuit([])} disabled={ops.length === 0} className="rounded-lg px-2 py-1.5 text-xs font-mono text-muted transition hover:text-foreground disabled:opacity-40">clear</button>
      </div>

      {/* Probabilities and tally */}
      <div className="mt-4 grid grid-cols-4 gap-2" role="list" aria-label="Outcome probabilities and measured counts">
        {probabilities.map((probability, index) => {
          const measuredShare = shots > 0 ? tally[index] / shots : 0;
          return (
            <div key={LABELS[index]} role="listitem" className="flex flex-col items-center gap-1" aria-label={`Outcome ${LABELS[index]}: probability ${Math.round(probability * 100)} percent${shots ? `, measured ${tally[index]} of ${shots}` : ''}`}>
              <div className="relative flex h-20 w-full items-end overflow-hidden rounded-md bg-border/30" aria-hidden="true">
                <motion.div className="w-full rounded-md bg-gradient-to-t from-primary/80 to-accent/80" animate={{ height: `${probability * 100}%` }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }} />
                {shots > 0 && (
                  <motion.div className="absolute left-1/2 w-2 -translate-x-1/2 rounded-sm bg-amber-300" animate={{ height: `${measuredShare * 100}%` }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 20 }} style={{ bottom: 0 }} />
                )}
                <AnimatePresence>
                  {lastOutcome?.index === index && (
                    <motion.div key={lastOutcome.key} className="absolute inset-0 rounded-md border-2 border-amber-300" initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 1.15 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.6 }} />
                  )}
                </AnimatePresence>
              </div>
              <span className="font-mono text-xs text-foreground/90">|{LABELS[index]}⟩</span>
              <span className="font-mono text-[11px] text-muted">{Math.round(probability * 100)}%{shots > 0 ? ` · ${tally[index]}` : ''}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 min-h-[2.75rem] text-sm leading-relaxed text-foreground/85" aria-live="polite">{describe(amplitudes, probabilities, ops.length)}</p>

      <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3">
        <button type="button" onClick={() => measure(1)} className="rounded-lg bg-amber-400/90 px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-amber-300 active:scale-95">Measure once</button>
        <button type="button" onClick={() => measure(100)} className="rounded-lg border border-amber-400/50 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/10">Measure ×100</button>
        <span className="text-xs text-muted" aria-live="polite">
          {shots === 0 ? 'Gradient bars: exact probabilities. Gold bars: your measured results.' : `${shots} ${shots === 1 ? 'shot' : 'shots'}${lastOutcome ? `, last result ${LABELS[lastOutcome.index]}` : ''}. The gold bars approach the exact ones as shots grow.`}
        </span>
        {shots > 0 && (
          <button type="button" onClick={() => { setTally([0, 0, 0, 0]); setLastOutcome(null); }} className="ml-auto text-xs font-mono text-muted hover:text-foreground">reset tally</button>
        )}
      </div>

      <div className="mt-3 flex justify-end">
        <Link href="/playground" className="text-sm font-semibold text-accent hover:text-foreground">Open the full playground (up to 10 qubits) <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
