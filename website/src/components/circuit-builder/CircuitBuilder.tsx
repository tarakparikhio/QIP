'use client';
import { useEffect } from 'react';
import GatePalette from './GatePalette';
import CircuitGrid from './CircuitGrid';
import ProbabilityBars from '@/components/quantum-visuals/ProbabilityBars';
import BlochSphere from '@/components/quantum-visuals/BlochSphere';
import StateVector from '@/components/quantum-visuals/StateVector';
import { useCircuitStore } from '@/lib/store/circuitStore';

type Props = {
  allowedGates: string[];
  numQubits?: number;
  title?: string;
};

export default function CircuitBuilder({ allowedGates, numQubits = 1, title = 'Circuit Builder' }: Props) {
  const { setNumQubits } = useCircuitStore();

  // setNumQubits already resets operations internally and recalculates
  useEffect(() => {
    setNumQubits(numQubits);
  }, [numQubits]);

  return (
    <div className="rounded-2xl border border-primary/20 bg-background/60 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-background/40">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono font-semibold text-primary">{title}</span>
        </div>
        <button
          onClick={() => useCircuitStore.getState().clearCircuit()}
          className="text-xs text-muted hover:text-foreground transition-colors font-mono px-2 py-1 rounded hover:bg-border/20"
        >
          clear
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Gate palette */}
        <section>
          <GatePalette allowedGates={allowedGates} />
        </section>

        {/* Circuit grid */}
        <section className="space-y-2 border-t border-border/30 pt-6">
          <h3 className="text-xs font-mono text-muted uppercase tracking-widest">Circuit</h3>
          <CircuitGrid />
        </section>

        {/* Output visualizations */}
        <section className="space-y-4 border-t border-border/30 pt-6">
          <h3 className="text-xs font-mono text-muted uppercase tracking-widest">Quantum State</h3>
          
          {/* Layout: Single qubit = side by side, Multi-qubit = full width */}
          {numQubits === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProbabilityBars />
              <BlochSphere />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProbabilityBars />
                <StateVector />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
