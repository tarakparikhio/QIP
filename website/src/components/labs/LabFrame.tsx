import type { ReactNode } from 'react';

/** Shared frame for interactive lesson labs, styled to sit inside lesson prose. */
export default function LabFrame({ label, title, children, footer }: { label: string; title: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <section className="not-prose my-8 rounded-2xl border border-accent/30 bg-card/50 p-5 sm:p-6">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">{label}</p>
      <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-4 space-y-4 text-sm text-foreground/85">{children}</div>
      {footer && <div className="mt-4 border-t border-border/40 pt-3 text-sm text-foreground/80">{footer}</div>}
    </section>
  );
}

export function Slider({ label, value, min, max, step, onChange, display }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; display: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-xs font-mono text-muted">
        <span>{label}</span>
        <span className="text-foreground">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full accent-primary"
      />
    </label>
  );
}

export function Stat({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'primary' | 'accent' | 'good' | 'warn' }) {
  const color = {
    default: 'text-foreground',
    primary: 'text-primary',
    accent: 'text-accent',
    good: 'text-emerald-300',
    warn: 'text-amber-300',
  }[tone];
  return (
    <div className="rounded-lg border border-border/50 bg-background/50 px-3 py-2">
      <p className="text-[11px] font-mono uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-0.5 font-mono text-base ${color}`}>{value}</p>
    </div>
  );
}

/** Deterministic pseudo-random generator so labs behave the same on every render. */
export function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function binomialSample(n: number, p: number, random: () => number): number {
  let count = 0;
  for (let i = 0; i < n; i++) if (random() < p) count++;
  return count;
}
