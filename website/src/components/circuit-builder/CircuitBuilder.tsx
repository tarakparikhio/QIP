'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import GatePalette from './GatePalette';
import CircuitGrid from './CircuitGrid';
import ProbabilityBars from '@/components/quantum-visuals/ProbabilityBars';
import BlochSphere from '@/components/quantum-visuals/BlochSphere';
import StateVector from '@/components/quantum-visuals/StateVector';
import { useCircuitStore } from '@/lib/store/circuitStore';
import { GateOperation } from '@/lib/quantum-engine/run';

const MultiQubitBlochPanel = dynamic(
  () => import('@/components/quantum-visuals/MultiQubitBlochPanel'),
  { ssr: false },
);

type Props = {
  allowedGates: string[];
  numQubits?: number;
  title?: string;
  demoOps?: GateOperation[];
};

export default function CircuitBuilder({
  allowedGates,
  numQubits = 1,
  title = 'Circuit Builder',
  demoOps,
}: Props) {
  const { setNumQubits, clearCircuit, loadOps } = useCircuitStore();
  const [demoLoaded, setDemoLoaded] = useState(false);

  useEffect(() => {
    setNumQubits(numQubits);
    // Auto-load demo on first mount so beginners see a working circuit immediately
    if (demoOps && demoOps.length > 0) {
      loadOps(demoOps);
      setDemoLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numQubits]);

  const isMultiQubit = numQubits > 1;

  return (
    <div className="rounded-2xl border border-primary/20 bg-background/60 backdrop-blur-sm overflow-hidden">
      {/* ── Header ── */}
      <div className="px-5 py-3.5 border-b border-border/50 flex items-center justify-between bg-background/40 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono font-semibold text-primary">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {demoOps && demoOps.length > 0 && (
            <button
              onClick={() => { loadOps(demoOps); setDemoLoaded(true); }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              ⚡ Load Example
            </button>
          )}
          <button
            onClick={() => { clearCircuit(); setDemoLoaded(false); }}
            className="text-xs text-muted hover:text-foreground transition-colors font-mono px-2 py-1 rounded hover:bg-border/20"
          >
            clear
          </button>
        </div>
      </div>

      {/* ── Beginner hint ── */}
      {demoLoaded && (
        <div className="px-5 py-2.5 bg-primary/5 border-b border-primary/10 flex items-start gap-2 text-xs text-primary/80">
          <span className="mt-px shrink-0">💡</span>
          <span>
            An example circuit is loaded. Click gates in the palette to add more, right-click a gate to remove it, or press <strong>Load Example</strong> to reset.
          </span>
        </div>
      )}

      <div className="p-5 space-y-5">
        {/* ── Gate palette ── */}
        <GatePalette allowedGates={allowedGates} />

        {/* ── Circuit | Probability bars (side-by-side) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/30 pt-5">
          {/* Circuit grid */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Circuit</p>
            <CircuitGrid />
          </div>

          {/* Probability bars */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Measurement Probabilities</p>
            <ProbabilityBars />
          </div>
        </div>

        {/* ── Bottom: Bloch sphere (single qubit) or State vector + multi-qubit Bloch ── */}
        <div className="border-t border-border/30 pt-5 space-y-4">
          {isMultiQubit ? (
            <>
              <div className="space-y-2">
                <p className="text-xs font-mono text-muted uppercase tracking-widest">State Vector</p>
                <StateVector />
              </div>
              <MultiQubitBlochPanel />
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-mono text-muted uppercase tracking-widest">Bloch Sphere</p>
              <BlochSphere />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
