'use client';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCircuitStore } from '@/lib/store/circuitStore';

const BASIS_LABELS: Record<number, Record<number, string>> = {
  1: { 0: '|0⟩', 1: '|1⟩' },
  2: { 0: '|00⟩', 1: '|01⟩', 2: '|10⟩', 3: '|11⟩' },
};

export default function StateVector() {
  const { amplitudes, numQubits } = useCircuitStore();

  const displayAmplitudes = useMemo(() => {
    const labels = BASIS_LABELS[numQubits] ?? {};
    return amplitudes.map((amp, i) => {
      const magnitude = Math.sqrt(amp.re * amp.re + amp.im * amp.im);
      const phase = Math.atan2(amp.im, amp.re) * (180 / Math.PI);
      const phase360 = phase < 0 ? phase + 360 : phase;
      
      return {
        index: i,
        label: labels[i] ?? `|${i}⟩`,
        magnitude,
        phase: phase360,
        re: amp.re,
        im: amp.im,
      };
    });
  }, [amplitudes, numQubits]);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 space-y-3">
      <p className="text-xs text-muted font-mono uppercase tracking-widest">State Vector ({numQubits} qubit{numQubits > 1 ? 's' : ''})</p>
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {displayAmplitudes.map((amp) => (
          <div key={amp.index} className="space-y-1 p-2 rounded border border-border/30 bg-background/20">
            {/* Basis state label and magnitude */}
            <div className="flex justify-between items-baseline gap-2 text-xs">
              <span className="text-foreground/80 font-mono font-semibold">{amp.label}</span>
              <span className="text-primary font-mono">{amp.magnitude.toFixed(3)}</span>
            </div>
            
            {/* Magnitude bar */}
            <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(amp.magnitude * 100, 100)}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>

            {/* Amplitude components */}
            {(amp.re !== 0 || amp.im !== 0) && (
              <div className="text-xs text-muted/70 font-mono space-y-0.5 pt-1 border-t border-border/20">
                <div className="flex justify-between">
                  <span>Re:</span>
                  <span>{amp.re.toFixed(3)}</span>
                </div>
                {amp.im !== 0 && (
                  <div className="flex justify-between">
                    <span>Im:</span>
                    <span className={amp.im > 0 ? 'text-accent' : 'text-rose-400'}>{amp.im > 0 ? '+' : ''}{amp.im.toFixed(3)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phase:</span>
                  <span className="text-cyan-400">{amp.phase.toFixed(1)}°</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
