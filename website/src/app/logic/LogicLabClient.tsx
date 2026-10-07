'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  CLASSICAL_GATES,
  CHALLENGE_POINTS,
  LOGIC_CHALLENGES,
  MAX_LOGIC_POINTS,
  getGate,
  inputRows,
  logicRank,
  outputColumn,
  type Bit,
  type ChoiceChallenge,
  type ClassicalGate,
  type GateId,
  type LogicChallenge,
  type TableChallenge,
} from '@/lib/classicalLogic';
import { useLogicLabStore } from '@/lib/store/logicLabStore';

const ON = '#fbbf24';
const OFF = 'hsl(var(--muted) / 0.6)';

// ---------------------------------------------------------------------------
// Gate symbol

function GateSymbol({ gate, a, b, out }: { gate: ClassicalGate; a: Bit; b: Bit; out: Bit }) {
  const isOr = gate.id === 'OR' || gate.id === 'NOR' || gate.id === 'XOR' || gate.id === 'XNOR';
  const hasBubble = gate.id === 'NOT' || gate.id === 'NAND' || gate.id === 'NOR' || gate.id === 'XNOR';
  const bodyEnd = gate.id === 'NOT' ? 78 : isOr ? 86 : 82;
  const outStart = hasBubble ? bodyEnd + 8 : bodyEnd;
  const body = gate.id === 'NOT'
    ? 'M34 10 L78 30 L34 50 Z'
    : isOr
      ? 'M28 8 Q52 8 70 18 Q80 24 86 30 Q80 36 70 42 Q52 52 28 52 Q40 30 28 8 Z'
      : 'M30 8 H60 A22 22 0 0 1 60 52 H30 Z';
  const wire = (value: Bit) => ({ stroke: value ? ON : OFF, strokeWidth: 3, strokeLinecap: 'round' as const });

  return (
    <svg viewBox="0 0 130 60" className="h-28 w-full max-w-[22rem]" role="img" aria-label={`${gate.name} gate symbol, output ${out}`}>
      {gate.arity === 1 ? (
        <line x1="4" y1="30" x2="34" y2="30" {...wire(a)} />
      ) : (
        <>
          <line x1="4" y1="20" x2="36" y2="20" {...wire(a)} />
          <line x1="4" y1="40" x2="36" y2="40" {...wire(b)} />
        </>
      )}
      <line x1={outStart} y1="30" x2="118" y2="30" {...wire(out)} />
      {(gate.id === 'XOR' || gate.id === 'XNOR') && <path d="M21 8 Q33 30 21 52" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />}
      <path d={body} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
      {hasBubble && <circle cx={bodyEnd + 4} cy="30" r="4" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />}
      <circle cx="122" cy="30" r="6" fill={out ? ON : 'transparent'} stroke={out ? ON : OFF} strokeWidth="2" />
      <text x="44" y="34" fontSize="9" fontFamily="monospace" fill="hsl(var(--foreground))">{gate.id}</text>
    </svg>
  );
}

function BitSwitch({ label, value, onChange }: { label: string; value: Bit; onChange: (value: Bit) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(value ? 0 : 1)}
      aria-pressed={value === 1}
      aria-label={`Input ${label} is ${value}. Click to flip.`}
      className={`flex w-20 flex-col items-center rounded-xl border px-3 py-2 font-mono transition ${value ? 'border-amber-300/60 bg-amber-300/10 text-amber-200' : 'border-border/60 bg-background/50 text-muted hover:border-primary/50'}`}
    >
      <span className="text-[11px] uppercase tracking-widest">Input {label}</span>
      <span className="text-2xl font-semibold">{value}</span>
    </button>
  );
}

function TruthTable({ gate, a, b, onPick }: { gate: ClassicalGate; a: Bit; b: Bit; onPick: (a: Bit, b: Bit) => void }) {
  const rows = inputRows(gate.arity);
  return (
    <table className="w-full max-w-xs text-center font-mono text-sm">
      <thead>
        <tr className="text-xs text-muted">
          <th className="py-1.5 font-normal">A</th>
          {gate.arity === 2 && <th className="py-1.5 font-normal">B</th>}
          <th className="py-1.5 font-normal text-primary">{gate.id}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([rowA, rowB]) => {
          const active = rowA === a && (gate.arity === 1 || rowB === b);
          const out = gate.evaluate(rowA, rowB);
          return (
            <tr
              key={`${rowA}${rowB}`}
              onClick={() => onPick(rowA, rowB)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onPick(rowA, rowB);
                }
              }}
              tabIndex={0}
              className={`cursor-pointer border-t border-border/40 transition ${active ? 'bg-primary/15 text-foreground' : 'text-muted hover:bg-primary/5'}`}
            >
              <td className="py-1.5">{rowA}</td>
              {gate.arity === 2 && <td className="py-1.5">{rowB}</td>}
              <td className={`py-1.5 font-semibold ${out ? 'text-amber-300' : ''}`}>{out}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ---------------------------------------------------------------------------
// Explorer

function GateExplorer() {
  const markExplored = useLogicLabStore((state) => state.markExplored);
  const [gateId, setGateId] = useState<GateId>('AND');
  const [a, setA] = useState<Bit>(1);
  const [b, setB] = useState<Bit>(0);
  const gate = getGate(gateId);
  const out = gate.evaluate(a, b);

  useEffect(() => {
    markExplored(gateId);
  }, [gateId, markExplored]);

  return (
    <section id="explorer" className="mt-12 rounded-2xl border border-border/50 bg-card/40 p-5 sm:p-6">
      <p className="text-xs font-mono uppercase tracking-widest text-primary">Gate explorer</p>
      <h2 className="mt-2 text-2xl font-semibold">Flip the inputs, watch the lamp</h2>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Choose a logic gate">
        {CLASSICAL_GATES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === gateId}
            onClick={() => setGateId(item.id)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-sm transition ${item.id === gateId ? 'border-primary bg-primary/20 text-foreground' : 'border-border/60 text-muted hover:border-primary/50 hover:text-foreground'}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border/40 bg-background/40 p-4">
          <div className="flex w-full items-center justify-center gap-3">
            <div className="flex flex-col gap-2">
              <BitSwitch label="A" value={a} onChange={setA} />
              {gate.arity === 2 && <BitSwitch label="B" value={b} onChange={setB} />}
            </div>
            <GateSymbol gate={gate} a={a} b={b} out={out} />
          </div>
          <p className="font-mono text-sm text-muted" aria-live="polite">
            {gate.arity === 1 ? `NOT ${a}` : `${a} ${gate.id} ${b}`} = <span className={out ? 'text-amber-300' : 'text-foreground'}>{out}</span>
          </p>
          <TruthTable gate={gate} a={a} b={b} onPick={(rowA, rowB) => { setA(rowA); setB(rowB); }} />
          <p className="text-xs text-muted">Tip: click a row to load those inputs.</p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <p className="font-mono text-lg text-primary">{gate.expression}</p>
            <p className="mt-2 text-foreground/90">{gate.rule}</p>
            <p className="mt-2 text-muted"><span className="text-foreground/80">Picture it:</span> {gate.analogy}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full border px-2.5 py-1 ${gate.reversible ? 'border-emerald-400/40 text-emerald-300' : 'border-rose-400/40 text-rose-300'}`}>
              {gate.reversible ? 'Reversible' : 'Erases information'}
            </span>
            {gate.universal && <span className="rounded-full border border-accent/40 px-2.5 py-1 text-accent">Universal gate</span>}
            <span className="rounded-full border border-border/60 px-2.5 py-1 text-muted">{gate.arity} in, 1 out</span>
          </div>
          <p className="text-muted">{gate.reversibleNote}</p>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
            <p className="text-xs font-mono uppercase tracking-widest text-accent">Quantum counterpart: {gate.quantum.label}</p>
            <p className="mt-2 text-foreground/85">{gate.quantum.note}</p>
            {gate.quantum.href && (
              <Link href={gate.quantum.href} className="mt-2 inline-block text-xs text-accent hover:underline">See it in the gate reference →</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Half adder

function HalfAdder() {
  const [a, setA] = useState<Bit>(1);
  const [b, setB] = useState<Bit>(1);
  const sum = getGate('XOR').evaluate(a, b);
  const carry = getGate('AND').evaluate(a, b);
  return (
    <section className="mt-10 grid gap-5 rounded-2xl border border-border/50 bg-card/40 p-5 sm:p-6 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-primary">Gates working together</p>
        <h2 className="mt-2 text-2xl font-semibold">A half adder adds two bits</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Wire an XOR and an AND to the same two inputs and you get binary addition. XOR gives the sum digit and AND gives the carry. Every calculator chip is built from stacks of these.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          A quantum computer can add too, but it uses a Toffoli for the carry and a CNOT for the sum so that the inputs survive and the whole circuit can be run backwards.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border/40 bg-background/40 p-4">
        <div className="flex gap-3">
          <BitSwitch label="A" value={a} onChange={setA} />
          <BitSwitch label="B" value={b} onChange={setB} />
        </div>
        <div className="grid w-full max-w-xs grid-cols-2 gap-3 text-center font-mono">
          <div className="rounded-lg border border-border/50 bg-background/50 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-muted">Carry (AND)</p>
            <p className={`text-2xl ${carry ? 'text-amber-300' : 'text-foreground'}`}>{carry}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background/50 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-muted">Sum (XOR)</p>
            <p className={`text-2xl ${sum ? 'text-amber-300' : 'text-foreground'}`}>{sum}</p>
          </div>
        </div>
        <p className="font-mono text-sm text-muted">{a} + {b} = <span className="text-foreground">{carry}{sum}</span> in binary ({a + b} in decimal)</p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Challenges

function MysteryTable({ outputs }: { outputs: Bit[] }) {
  const rows = inputRows(2);
  return (
    <table className="mt-3 w-full max-w-[14rem] text-center font-mono text-sm">
      <thead><tr className="text-xs text-muted"><th className="py-1 font-normal">A</th><th className="py-1 font-normal">B</th><th className="py-1 font-normal text-primary">?</th></tr></thead>
      <tbody>
        {rows.map(([a, b], index) => (
          <tr key={`${a}${b}`} className="border-t border-border/40">
            <td className="py-1">{a}</td><td className="py-1">{b}</td><td className={`py-1 font-semibold ${outputs[index] ? 'text-amber-300' : ''}`}>{outputs[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type Feedback = { correct: boolean; message: string } | null;

function ChoiceBody({ challenge, solved, onAnswer }: { challenge: ChoiceChallenge; solved: boolean; onAnswer: (correct: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <>
      {challenge.mysteryOutputs && <MysteryTable outputs={challenge.mysteryOutputs} />}
      <div className="mt-4 flex flex-wrap gap-2">
        {challenge.options.map((option, index) => {
          const isPicked = picked === index;
          const isAnswer = solved && index === challenge.answer;
          return (
            <button
              key={option}
              type="button"
              disabled={solved}
              onClick={() => { setPicked(index); onAnswer(index === challenge.answer); }}
              className={`rounded-lg border px-4 py-2 font-mono text-sm transition disabled:cursor-default ${isAnswer ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200' : isPicked ? 'border-rose-400/60 bg-rose-400/10 text-rose-200' : 'border-border/60 text-foreground hover:border-primary/60'}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
}

function TableBody({ challenge, solved, onAnswer }: { challenge: TableChallenge; solved: boolean; onAnswer: (correct: boolean) => void }) {
  const gate = getGate(challenge.gate);
  const rows = inputRows(gate.arity);
  const [cells, setCells] = useState<Bit[]>(() => rows.map(() => 0));
  const shown = solved ? outputColumn(gate) : cells;
  return (
    <>
      <table className="mt-3 w-full max-w-[14rem] text-center font-mono text-sm">
        <thead><tr className="text-xs text-muted"><th className="py-1 font-normal">A</th><th className="py-1 font-normal">B</th><th className="py-1 font-normal text-primary">{gate.id}</th></tr></thead>
        <tbody>
          {rows.map(([a, b], index) => (
            <tr key={`${a}${b}`} className="border-t border-border/40">
              <td className="py-1">{a}</td><td className="py-1">{b}</td>
              <td className="py-1">
                <button
                  type="button"
                  disabled={solved}
                  aria-label={`Output for A=${a}, B=${b} is ${shown[index]}. Click to flip.`}
                  onClick={() => setCells((current) => current.map((value, i) => (i === index ? (value ? 0 : 1) : value)))}
                  className={`h-9 w-11 rounded border font-semibold transition ${shown[index] ? 'border-amber-300/60 bg-amber-300/10 text-amber-200' : 'border-border/60 text-muted hover:border-primary/60'}`}
                >
                  {shown[index]}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!solved && (
        <button
          type="button"
          onClick={() => onAnswer(cells.every((value, index) => value === outputColumn(gate)[index]))}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Check my table
        </button>
      )}
    </>
  );
}

function ChallengeCard({ challenge, index }: { challenge: LogicChallenge; index: number }) {
  const result = useLogicLabStore((state) => state.results[challenge.id]);
  const recordSolve = useLogicLabStore((state) => state.recordSolve);
  const [wrong, setWrong] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [solvedNow, setSolvedNow] = useState(false);
  const solved = solvedNow || Boolean(result);

  function onAnswer(correct: boolean) {
    if (correct) {
      recordSolve(challenge.id, wrong);
      setSolvedNow(true);
      setFeedback({ correct: true, message: challenge.explanation });
    } else {
      setWrong((value) => value + 1);
      setFeedback({ correct: false, message: 'Not quite. Try again: each retry is worth a little less, just like lesson quizzes.' });
    }
  }

  return (
    <article className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-mono uppercase tracking-widest text-primary">Challenge {index + 1} · {challenge.title}</p>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] ${result ? 'border-emerald-400/50 text-emerald-300' : 'border-border/60 text-muted'}`}>
          {result ? `${result.points}/${CHALLENGE_POINTS} pts` : `${CHALLENGE_POINTS} pts`}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{challenge.prompt}</p>
      {challenge.kind === 'choice'
        ? <ChoiceBody challenge={challenge} solved={solved} onAnswer={onAnswer} />
        : <TableBody challenge={challenge} solved={solved} onAnswer={onAnswer} />}
      {(feedback || (solved && !feedback)) && (
        <p className={`mt-4 text-sm leading-relaxed ${feedback && !feedback.correct ? 'text-rose-300' : 'text-emerald-200/90'}`} aria-live="polite">
          {feedback ? feedback.message : challenge.explanation}
        </p>
      )}
    </article>
  );
}

function Challenges({ mounted }: { mounted: boolean }) {
  const results = useLogicLabStore((state) => state.results);
  const resetLab = useLogicLabStore((state) => state.resetLab);
  const [resetKey, setResetKey] = useState(0);
  const solvedCount = mounted ? Object.keys(results).length : 0;

  return (
    <section id="challenges" className="mt-14">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">Challenges</p>
          <h2 className="mt-2 text-2xl font-semibold">Test your logic</h2>
          <p className="mt-2 text-sm text-muted">{solvedCount} of {LOGIC_CHALLENGES.length} solved. Full points on the first try, half on the second, a quarter after that.</p>
        </div>
        {solvedCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset your Logic Lab challenges? Lesson progress is not affected.')) {
                resetLab();
                setResetKey((value) => value + 1);
              }
            }}
            className="rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted hover:border-primary/50 hover:text-foreground"
          >
            Reset challenges
          </button>
        )}
      </div>
      {mounted && (
        <div key={resetKey} className="grid gap-4 md:grid-cols-2">
          {LOGIC_CHALLENGES.map((challenge, index) => <ChallengeCard key={challenge.id} challenge={challenge} index={index} />)}
        </div>
      )}
      {mounted && solvedCount === LOGIC_CHALLENGES.length && (
        <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5 text-sm">
          <p className="font-semibold text-emerald-200">All challenges solved. You speak classical logic.</p>
          <p className="mt-1 text-muted">Now see what changes when bits become qubits.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/lessons" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90">Start the quantum lessons</Link>
            <Link href="/playground" className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-accent hover:border-accent/70">Open the quantum playground</Link>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Classical vs quantum

const CONTRASTS: { topic: string; classical: string; quantum: string }[] = [
  { topic: 'Basic unit', classical: 'A bit is 0 or 1.', quantum: 'A qubit can be a superposition α|0⟩ + β|1⟩.' },
  { topic: 'Inputs and outputs', classical: 'Most gates take two inputs and give one output.', quantum: 'Every gate has as many outputs as inputs.' },
  { topic: 'Undoing a gate', classical: 'AND, OR and NAND erase information and cannot be undone.', quantum: 'Every gate is reversible. Only measurement erases information.' },
  { topic: 'Copying', classical: 'A wire can fan out one bit into many copies.', quantum: 'No-cloning: an unknown qubit state cannot be copied.' },
  { topic: 'Reading the answer', classical: 'Look at the wire. It is 0 or 1.', quantum: 'Measure, and the qubit gives 0 or 1 with some probability.' },
];

function ClassicalVsQuantum() {
  return (
    <section className="mt-14 border-t border-border/60 pt-10">
      <p className="text-xs font-mono uppercase tracking-widest text-accent">Bridge to quantum</p>
      <h2 className="mt-2 text-2xl font-semibold">What changes when bits become qubits</h2>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-border/50">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-card/60 text-xs uppercase tracking-wider text-muted">
            <tr><th className="px-4 py-3 font-normal"> </th><th className="px-4 py-3 font-normal">Classical logic</th><th className="px-4 py-3 font-normal text-accent">Quantum gates</th></tr>
          </thead>
          <tbody>
            {CONTRASTS.map((row) => (
              <tr key={row.topic} className="border-t border-border/40 align-top">
                <td className="px-4 py-3 font-medium text-foreground">{row.topic}</td>
                <td className="px-4 py-3 text-muted">{row.classical}</td>
                <td className="px-4 py-3 text-foreground/85">{row.quantum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { from: 'NOT', to: 'X', text: 'Same truth table on 0 and 1, but X also acts on superpositions.' },
          { from: 'XOR', to: 'CNOT', text: 'Keeps the control bit so the operation can be undone. With H first, it creates entanglement.' },
          { from: 'AND', to: 'Toffoli', text: 'Writes the AND into a third bit, keeping both inputs. Universal for reversible logic.' },
        ].map((pair) => (
          <div key={pair.from} className="rounded-2xl border border-border/50 bg-card/40 p-4">
            <p className="font-mono text-lg"><span className="text-primary">{pair.from}</span> <span className="text-muted">→</span> <span className="text-accent">{pair.to}</span></p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{pair.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/playground" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90">Try X and CNOT in the playground</Link>
        <Link href="/gates" className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-accent hover:border-accent/70">Quantum gate reference</Link>
        <Link href="/lessons" className="rounded-lg border border-border/60 px-4 py-2 text-muted hover:border-primary/50 hover:text-foreground">Lessons</Link>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page

function ProgressStrip({ mounted }: { mounted: boolean }) {
  const results = useLogicLabStore((state) => state.results);
  const explored = useLogicLabStore((state) => state.exploredGates);
  const points = mounted ? Object.values(results).reduce((sum, result) => sum + result.points, 0) : 0;
  const solved = mounted ? Object.keys(results).length : 0;
  const exploredCount = mounted ? explored.length : 0;
  const percent = Math.round((points / MAX_LOGIC_POINTS) * 100);

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        ['Rank', logicRank(points)],
        ['Logic points', `${points}/${MAX_LOGIC_POINTS}`],
        ['Challenges', `${solved}/${LOGIC_CHALLENGES.length}`],
        ['Gates explored', `${exploredCount}/${CLASSICAL_GATES.length}`],
      ].map(([label, value]) => (
        <div key={label} className="rounded-xl border border-border/50 bg-card/40 px-4 py-3">
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted">{label}</p>
          <p className="mt-1 font-mono text-base text-foreground">{value}</p>
        </div>
      ))}
      <div className="h-1.5 overflow-hidden rounded-full bg-border/40 col-span-2 sm:col-span-4" aria-hidden="true">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function LogicLabClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">Logic lab</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Classical logic, before qubits.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Every computer you have used is built from a handful of logic gates acting on bits. Play with them here, then see which ideas carry over to quantum gates and which ones break.
        </p>
      </div>
      <ProgressStrip mounted={mounted} />
      <GateExplorer />
      <HalfAdder />
      <Challenges mounted={mounted} />
      <ClassicalVsQuantum />
    </div>
  );
}
