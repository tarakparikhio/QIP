'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from '@/components/math';
import LabFrame, { Slider, Stat, binomialSample, mulberry32 } from './LabFrame';

const SHOT_OPTIONS = [10, 100, 1000, 10000];
const REPEATS = 300;
const BINS = 30;

type Props = {
  /** Fix the true probability (e.g. 0.25 for a BB84 intercept-resend error rate). */
  fixedP?: number;
  /** What a "success" is called, e.g. "outcome 1" or "error". */
  eventName?: string;
  title?: string;
};

/**
 * Measurement as sampling. Each shot is a Bernoulli trial with success probability p
 * (the Born-rule probability). The lab shows one estimate with its 95% interval, the
 * spread of estimates over many repeated experiments, and the shots needed for a target precision.
 */
export default function ShotLab({ fixedP, eventName = 'outcome 1', title = 'How many shots do you need?' }: Props) {
  const [p, setP] = useState(fixedP ?? 0.5);
  const [shotIndex, setShotIndex] = useState(1);
  const [margin, setMargin] = useState(0.02);
  const [seed, setSeed] = useState(1);
  const shots = SHOT_OPTIONS[shotIndex];

  // Histogram window: ±4 theoretical standard deviations around p, so the spread stays visible at any N.
  const theorySd = Math.sqrt((p * (1 - p)) / shots);
  const lo = Math.max(0, p - 4 * theorySd);
  const hi = Math.min(1, p + 4 * theorySd);

  const { estimate, lower, upper, histogram, coverage, spread } = useMemo(() => {
    const random = mulberry32(seed * 104729 + shots);
    const estimates: number[] = [];
    let covered = 0;
    for (let i = 0; i < REPEATS; i++) {
      const pHat = binomialSample(shots, p, random) / shots;
      const se = Math.sqrt(Math.max(pHat * (1 - pHat), 1e-12) / shots);
      if (p >= pHat - 1.96 * se && p <= pHat + 1.96 * se) covered++;
      estimates.push(pHat);
    }
    const first = estimates[0];
    const firstSe = Math.sqrt((first * (1 - first)) / shots);
    const counts = new Array(BINS).fill(0);
    for (const value of estimates) {
      const bin = Math.floor(((value - lo) / (hi - lo)) * BINS);
      if (bin >= 0 && bin < BINS) counts[bin]++;
      else counts[bin < 0 ? 0 : BINS - 1]++;
    }
    const mean = estimates.reduce((a, b) => a + b, 0) / REPEATS;
    const sd = Math.sqrt(estimates.reduce((a, b) => a + (b - mean) ** 2, 0) / (REPEATS - 1));
    return { estimate: first, lower: Math.max(0, first - 1.96 * firstSe), upper: Math.min(1, first + 1.96 * firstSe), histogram: counts, coverage: covered / REPEATS, spread: sd };
  }, [p, shots, seed, lo, hi]);

  const shotsNeeded = Math.ceil((1.96 ** 2 * p * (1 - p)) / (margin * margin));
  const maxCount = Math.max(...histogram, 1);

  return (
    <LabFrame
      label="Shot lab · statistics lens"
      title={title}
      footer={
        <p>
          Each shot is a coin flip that lands on {eventName} with probability <InlineMath math="p" />. After <InlineMath math="N" /> shots
          the estimate <InlineMath math="\hat p" /> has standard error <InlineMath math="\sqrt{p(1-p)/N}" />, so a 95% interval is about{' '}
          <InlineMath math="\hat p \pm 1.96\sqrt{\hat p(1-\hat p)/N}" />. Halving the error bar costs four times as many shots.
        </p>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {fixedP === undefined ? (
          <Slider label={`true P(${eventName})`} value={p} min={0.01} max={0.99} step={0.01} onChange={setP} display={p.toFixed(2)} />
        ) : (
          <Stat label={`true P(${eventName})`} value={p.toFixed(2)} tone="primary" />
        )}
        <Slider label="shots N per experiment" value={shotIndex} min={0} max={SHOT_OPTIONS.length - 1} step={1} onChange={setShotIndex} display={shots.toLocaleString()} />
        <Slider label="target margin ±ε" value={margin} min={0.005} max={0.1} step={0.005} onChange={setMargin} display={`±${margin.toFixed(3)}`} />
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        <Stat label="one experiment p̂" value={estimate.toFixed(3)} tone="accent" />
        <Stat label="95% interval" value={`${lower.toFixed(3)}–${upper.toFixed(3)}`} />
        <Stat label={`spread over ${REPEATS} runs`} value={`${spread.toFixed(4)} (theory ${theorySd.toFixed(4)})`} />
        <Stat label="intervals containing p" value={`${Math.round(coverage * 100)}%`} tone={coverage > 0.9 ? 'good' : 'warn'} />
      </div>

      <div>
        <p className="mb-1 text-xs font-mono text-muted">Estimates p̂ from {REPEATS} repeated experiments, zoomed to ±4 standard deviations (the line is the true p)</p>
        <div className="relative flex h-28 items-end gap-px rounded-lg border border-border/40 bg-background/40 px-1 pt-2" aria-hidden="true">
          {histogram.map((count, index) => (
            <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-primary/70 to-accent/70" style={{ height: `${(count / maxCount) * 100}%` }} />
          ))}
          <div className="absolute bottom-0 top-0 w-0.5 bg-amber-300" style={{ left: `${((p - lo) / (hi - lo)) * 100}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-[11px] font-mono text-muted"><span>{lo.toFixed(3)}</span><span>p = {p.toFixed(2)}</span><span>{hi.toFixed(3)}</span></div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>
          Shots needed for ±{margin.toFixed(3)} at 95% confidence: <strong className="font-mono text-accent">{shotsNeeded.toLocaleString()}</strong>
        </p>
        <button type="button" onClick={() => setSeed((value) => value + 1)} className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-mono text-accent transition hover:bg-accent/10">
          run again
        </button>
      </div>
    </LabFrame>
  );
}
