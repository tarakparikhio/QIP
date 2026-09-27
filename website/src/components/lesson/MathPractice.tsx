'use client';

import { useState } from 'react';
import RichText from '@/components/RichText';
import type { PracticeProblem } from '@/lib/lessonPractice';

/** Parse "0.64", "64%", "16/25", "-0.5", "1e-3" into a number. */
export function parseAnswer(raw: string): number | null {
  const text = raw.trim().replace(/,/g, '').replace(/−/g, '-');
  if (text === '') return null;
  if (/^-?\d*\.?\d+(e-?\d+)?%$/i.test(text)) return Number(text.slice(0, -1)) / 100;
  const fraction = text.match(/^(-?\d*\.?\d+)\s*\/\s*(\d*\.?\d+)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    return denominator === 0 ? null : Number(fraction[1]) / denominator;
  }
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}

export function isCorrect(problem: PracticeProblem, value: number): boolean {
  const tolerance = problem.tolerance ?? Math.max(0.005, Math.abs(problem.answer) * 0.01);
  return Math.abs(value - problem.answer) <= tolerance;
}

export function PracticeCard({ problem, index, onSolved, idPrefix = 'practice' }: { problem: PracticeProblem; index: number; onSolved?: () => void; idPrefix?: string }) {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'invalid'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const inputId = `${idPrefix}-${index}`;

  function check() {
    const value = parseAnswer(input);
    if (value === null) {
      setStatus('invalid');
      return;
    }
    setAttempts((count) => count + 1);
    const correct = isCorrect(problem, value);
    setStatus(correct ? 'correct' : 'wrong');
    if (correct) onSolved?.();
  }

  return (
    <li className="rounded-xl border border-border/50 bg-background/40 p-4">
      <p className="text-sm leading-relaxed text-foreground">
        <span className="mr-2 font-mono text-xs text-muted">{index + 1}.</span>
        <RichText text={problem.prompt} />
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label htmlFor={inputId} className="sr-only">Your answer</label>
        <input
          id={inputId}
          value={input}
          onChange={(event) => { setInput(event.target.value); setStatus('idle'); }}
          onKeyDown={(event) => { if (event.key === 'Enter') check(); }}
          inputMode="decimal"
          placeholder="e.g. 0.25, 25%, 1/4"
          disabled={status === 'correct'}
          className="w-44 rounded-lg border border-border/60 bg-card px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted/70 focus:border-primary/60 focus:outline-none"
        />
        {problem.unit && <span className="text-sm text-muted">{problem.unit}</span>}
        <button
          type="button"
          onClick={check}
          disabled={status === 'correct'}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          Check
        </button>
        {attempts > 0 && status !== 'correct' && (
          <button
            type="button"
            onClick={() => setShowSolution((value) => !value)}
            className="rounded-lg border border-border/60 px-3 py-2 text-xs text-muted transition hover:text-foreground"
          >
            {showSolution ? 'Hide worked solution' : 'Show worked solution'}
          </button>
        )}
      </div>

      <div aria-live="polite">
        {status === 'invalid' && (
          <p className="mt-2 text-xs text-amber-300">Enter a number, a fraction like 3/8, or a percentage like 37.5%.</p>
        )}
        {status === 'wrong' && (
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            Not yet. Hint: <RichText text={problem.hint} />
          </p>
        )}
        {status === 'correct' && (
          <p className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            Correct{attempts === 1 ? ' on the first try' : ''}.
          </p>
        )}
      </div>

      {(showSolution || status === 'correct') && (
        <div className="mt-3 rounded-lg border border-border/40 bg-card/50 px-4 py-3 text-sm text-foreground/85">
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Worked solution</p>
          <ol className="list-decimal space-y-1.5 pl-5">
            {problem.solution.map((step, stepIndex) => (
              <li key={stepIndex}><RichText text={step} /></li>
            ))}
          </ol>
        </div>
      )}

      {problem.lens && (status === 'correct' || showSolution) && (
        <p className="mt-3 border-l-2 border-accent/60 pl-3 text-sm text-foreground/80">
          <span className="font-semibold text-accent">Statistics lens: </span>
          <RichText text={problem.lens} />
        </p>
      )}
    </li>
  );
}

export default function MathPractice({ problems }: { problems: PracticeProblem[] }) {
  if (problems.length === 0) return null;
  return (
    <section className="not-prose mb-12 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6" aria-labelledby="math-practice-heading">
      <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">Practice the math</p>
      <h2 id="math-practice-heading" className="text-xl font-bold text-foreground">Work it out yourself</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Each problem uses only arithmetic and the probability ideas you already know: chances, averages, and sample sizes.
        Answers accept decimals, fractions such as 3/8, or percentages. These are for practice and do not affect credits.
      </p>
      <ol className="mt-5 space-y-4">
        {problems.map((problem, index) => (
          <PracticeCard key={index} problem={problem} index={index} />
        ))}
      </ol>
    </section>
  );
}
