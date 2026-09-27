'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const COLLAPSE_MESSAGES = [
  'Wave function collapsed unexpectedly.',
  'This page exists in superposition — we measured it and it collapsed to ∅.',
  'Schrödinger\'s page was opened. It did not survive.',
  'The URL entered a superposition of valid and invalid, then decoherence happened.',
  'Observer effect: you looked for this page, and it ceased to exist.',
  'This route is entangled with a page that never existed.',
];

const GATE_SEQUENCE = ['H', 'X', 'Y', 'Z', 'H', 'X'];

export default function NotFound() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [activeGate, setActiveGate] = useState(0);

  // Cycle through collapse messages
  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % COLLAPSE_MESSAGES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  // Animate the "circuit" of gates
  useEffect(() => {
    const id = setInterval(() => {
      setActiveGate((g) => (g + 1) % GATE_SEQUENCE.length);
      setTick((t) => t + 1);
    }, 600);
    return () => clearInterval(id);
  }, []);

  // Bloch sphere-like animated "qubit" showing 404 probabilities
  const prob0 = Math.abs(Math.cos(tick * 0.4)) ** 2;
  const prob1 = 1 - prob0;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Animated circuit header */}
      <div className="flex items-center gap-1 mb-8 font-mono text-xs text-muted">
        <span className="text-border/60">q0 ──</span>
        {GATE_SEQUENCE.map((gate, i) => (
          <span
            key={i}
            className={`w-7 h-7 rounded flex items-center justify-center border text-xs font-bold transition-all duration-300 ${
              i === activeGate
                ? 'border-primary bg-primary/20 text-primary scale-110'
                : 'border-border/30 bg-card text-muted'
            }`}
          >
            {gate}
          </span>
        ))}
        <span className="text-border/60">── ✗</span>
      </div>

      {/* 404 */}
      <div className="relative mb-4">
        <h1 className="text-[8rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/60 to-accent/40 select-none">
          404
        </h1>
        <div className="absolute inset-0 text-[8rem] font-black leading-none tracking-tighter text-primary/5 blur-2xl select-none">
          404
        </div>
      </div>

      {/* Collapse message */}
      <p className="text-lg font-semibold text-foreground mb-2">
        Wave Function Collapsed
      </p>
      <p className="text-muted text-sm max-w-md min-h-[2.5rem] transition-all duration-500 mb-8">
        {COLLAPSE_MESSAGES[messageIndex]}
      </p>

      {/* Probability readout */}
      <div className="w-64 mb-8 bg-card border border-border/50 rounded-lg p-4 font-mono text-xs">
        <p className="text-muted uppercase tracking-widest mb-3 text-[11px]">State Probabilities</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-foreground/60 w-12">|page⟩</span>
            <div className="flex-1 h-2 bg-background rounded overflow-hidden">
              <div
                className="h-full bg-primary/60 transition-all duration-500"
                style={{ width: `${prob0 * 100}%` }}
              />
            </div>
            <span className="text-foreground/60 w-10 text-right">{(prob0 * 100).toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground/60 w-12">|void⟩</span>
            <div className="flex-1 h-2 bg-background rounded overflow-hidden">
              <div
                className="h-full bg-rose-500/60 transition-all duration-500"
                style={{ width: `${prob1 * 100}%` }}
              />
            </div>
            <span className="text-foreground/60 w-10 text-right">{(prob1 * 100).toFixed(1)}%</span>
          </div>
        </div>
        <p className="text-muted/70 text-[11px] mt-3 italic">
          Measurement outcome: <span className="text-rose-400">|void⟩</span>
        </p>
      </div>

      {/* Explanation */}
      <p className="text-foreground/50 text-xs max-w-sm mb-8 leading-relaxed">
        Unlike classical errors which are definite, this 404 exists in a probabilistic superposition of{' '}
        <span className="text-primary">bad URL</span>,{' '}
        <span className="text-primary">deleted page</span>, and{' '}
        <span className="text-primary">pure human error</span> — until you navigate away.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Collapse to Home
        </Link>
        <Link
          href="/lessons"
          className="px-5 py-2.5 rounded-lg border border-border/50 text-foreground/80 text-sm font-semibold hover:border-primary/50 hover:text-primary transition-colors"
        >
          View All Lessons
        </Link>
      </div>

      {/* Footer note */}
      <p className="mt-12 text-muted/60 text-xs font-mono">
        Error code: <span className="text-primary/60">DECOHERENCE_404</span> · No qubits were harmed
      </p>
    </div>
  );
}
