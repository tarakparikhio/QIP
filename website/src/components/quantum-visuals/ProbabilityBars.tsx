'use client';
import { motion } from 'framer-motion';
import { useCircuitStore } from '@/lib/store/circuitStore';

const BASIS_LABELS: Record<number, Record<number, string>> = {
  1: { 0: '|0⟩', 1: '|1⟩' },
  2: { 0: '|00⟩', 1: '|01⟩', 2: '|10⟩', 3: '|11⟩' },
};

export default function ProbabilityBars() {
  const { probabilities, numQubits } = useCircuitStore();
  const labels = BASIS_LABELS[numQubits] ?? {};

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 space-y-3">
      <p className="text-xs text-muted font-mono uppercase tracking-widest">State Probabilities</p>
      <div className="space-y-2.5">
        {probabilities.map((prob, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground/80">{labels[i] ?? `|${i}⟩`}</span>
              <span className="text-primary">{(prob * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 rounded-full bg-border/40 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${prob * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
