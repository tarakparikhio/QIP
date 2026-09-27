'use client';
import { motion } from 'framer-motion';
import { useCircuitStore } from '@/lib/store/circuitStore';

function basisLabel(i: number, n: number): string {
  return '|' + i.toString(2).padStart(n, '0') + '⟩';
}

export default function ProbabilityBars() {
  const { probabilities, numQubits } = useCircuitStore();

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 space-y-3">
      <div className="space-y-2.5 max-h-[260px] overflow-y-auto" role="list" aria-label="Measurement probabilities">
        {probabilities.map((prob, i) => (
          <div key={i} className="space-y-1" role="listitem">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground/80">{basisLabel(i, numQubits)}</span>
              <span className="text-primary">{(prob * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 rounded-full bg-border/40 overflow-hidden" aria-hidden="true">
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
