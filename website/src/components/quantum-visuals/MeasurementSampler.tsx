'use client';
import { useEffect, useState } from 'react';
import { sampleMeasurementCounts } from '@/lib/quantum-engine/run';
import { useCircuitStore } from '@/lib/store/circuitStore';

const SHOT_OPTIONS = [256, 1024, 4096, 10000];
const BASIS_OPTIONS = ['Z', 'X', 'Y'] as const;
type MeasurementBasis = (typeof BASIS_OPTIONS)[number];

function outcomeLabel(index: number, numQubits: number, basis: MeasurementBasis): string {
  if (numQubits === 1 && basis === 'X') return index === 0 ? '|+>' : '|->';
  if (numQubits === 1 && basis === 'Y') return index === 0 ? '|+i>' : '|-i>';
  return `|${index.toString(2).padStart(numQubits, '0')}>`;
}

export default function MeasurementSampler() {
  const { probabilities, amplitudes, numQubits } = useCircuitStore();
  const [shots, setShots] = useState(1024);
  const [basis, setBasis] = useState<MeasurementBasis>('Z');
  const [counts, setCounts] = useState<number[] | null>(null);
  const [sampledShots, setSampledShots] = useState(0);
  const activeBasis = numQubits === 1 ? basis : 'Z';

  const measurementProbabilities = numQubits === 1 && activeBasis !== 'Z'
    ? getRotatedProbabilities(amplitudes, activeBasis)
    : probabilities;

  useEffect(() => {
    setCounts(null);
    setSampledShots(0);
  }, [probabilities, amplitudes, numQubits, basis]);

  function runSample() {
    setCounts(sampleMeasurementCounts(measurementProbabilities, shots));
    setSampledShots(shots);
  }

  const visibleResults = counts
    ?.map((count, index) => ({ count, index }))
    .filter(({ count }) => count > 0)
    .sort((left, right) => right.count - left.count)
    .slice(0, 8) ?? [];
  const highestCount = visibleResults[0]?.count ?? 1;

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Finite-shot measurement</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Sample the exact state locally as if the circuit were run repeatedly on a device.
          </p>
        </div>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-accent">
          browser only
        </span>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-wider text-muted">
          Shots
          <select
            value={shots}
            onChange={(event) => setShots(Number(event.target.value))}
            className="rounded-lg border border-border/60 bg-background px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/60"
          >
            {SHOT_OPTIONS.map((option) => (
              <option key={option} value={option}>{option.toLocaleString()}</option>
            ))}
          </select>
        </label>
          <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-wider text-muted">
            Basis
            <select
              value={basis}
              onChange={(event) => setBasis(event.target.value as MeasurementBasis)}
              disabled={numQubits > 1}
              className="rounded-lg border border-border/60 bg-background px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/60 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {BASIS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option} basis</option>
              ))}
            </select>
          </label>
        <button
          type="button"
          onClick={runSample}
          className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
        >
          Run {shots.toLocaleString()} shots
        </button>
      </div>

      {counts ? (
        <div className="space-y-2.5" aria-live="polite">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>{sampledShots.toLocaleString()} local samples in {activeBasis} basis</span>
            <span>Ideal probabilities above remain exact</span>
          </div>
          {visibleResults.map(({ count, index }) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-foreground/80">{outcomeLabel(index, numQubits, activeBasis)}</span>
                <span className="text-accent">{count.toLocaleString()} ({((count / sampledShots) * 100).toFixed(1)}%)</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all"
                  style={{ width: `${(count / highestCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border/50 px-3 py-3 text-xs leading-relaxed text-muted/80">
          Run a sample to see the difference between an exact probability and fluctuating finite-shot counts. X and Y basis sampling is available for one qubit.
        </p>
      )}
    </div>
  );
}

function getRotatedProbabilities(amplitudes: { re: number; im: number }[], basis: MeasurementBasis): number[] {
  const alpha = amplitudes[0];
  const beta = amplitudes[1];
  if (!alpha || !beta || basis === 'Z') return [1, 0];

  const scale = 1 / Math.sqrt(2);
  if (basis === 'X') {
    const plus = { re: (alpha.re + beta.re) * scale, im: (alpha.im + beta.im) * scale };
    const minus = { re: (alpha.re - beta.re) * scale, im: (alpha.im - beta.im) * scale };
    return [magnitudeSquared(plus), magnitudeSquared(minus)];
  }

  const plus = { re: (alpha.re + beta.im) * scale, im: (alpha.im - beta.re) * scale };
  const minus = { re: (alpha.re - beta.im) * scale, im: (alpha.im + beta.re) * scale };
  return [magnitudeSquared(plus), magnitudeSquared(minus)];
}

function magnitudeSquared(value: { re: number; im: number }): number {
  return value.re * value.re + value.im * value.im;
}
