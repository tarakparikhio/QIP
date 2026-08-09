'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import GatePalette from './GatePalette';
import CircuitGrid from './CircuitGrid';
import ProbabilityBars from '@/components/quantum-visuals/ProbabilityBars';
import MeasurementSampler from '@/components/quantum-visuals/MeasurementSampler';
import BlochSphere from '@/components/quantum-visuals/BlochSphere';
import StateVector from '@/components/quantum-visuals/StateVector';
import { useCircuitStore } from '@/lib/store/circuitStore';
import { GateOperation } from '@/lib/quantum-engine/run';
import type { LessonExperiment } from '@/lib/lessonExperiments';

const MultiQubitBlochPanel = dynamic(
  () => import('@/components/quantum-visuals/MultiQubitBlochPanel'),
  { ssr: false },
);

type Props = {
  allowedGates: string[];
  numQubits?: number;
  title?: string;
  demoOps?: GateOperation[];
  experiment?: LessonExperiment;
};

export default function CircuitBuilder({
  allowedGates,
  numQubits = 1,
  title = 'Circuit Builder',
  demoOps,
  experiment,
}: Props) {
  const { setNumQubits, clearCircuit, loadOps } = useCircuitStore();
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [selectedGateId, setSelectedGateId] = useState<string | null>(null);

  useEffect(() => {
    setNumQubits(numQubits);
    clearCircuit();
    setDemoLoaded(false);
    setSelectedGateId(null);
  }, [clearCircuit, numQubits, setNumQubits]);

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
              aria-label="Load the lesson example circuit and steps"
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              ⚡ Load Example + Steps
            </button>
          )}
            <button
              onClick={() => { clearCircuit(); setDemoLoaded(false); }}
              aria-label="Clear the circuit"
            className="text-xs text-muted hover:text-foreground transition-colors font-mono px-2 py-1 rounded hover:bg-border/20"
          >
            clear
          </button>
        </div>
      </div>

      {/* ── Beginner hint ── */}
      {demoLoaded && (
        <div className="border-b border-primary/10 bg-primary/5 px-5 py-3 text-xs text-primary/80">
          <div className="flex items-start gap-2">
            <span className="mt-px shrink-0">💡</span>
            <span>
              <strong className="text-primary">{experiment?.title ?? 'Guided example'} loaded.</strong>{' '}
              The simulator shows exact state evolution and ideal probabilities, not realistic hardware sampling or noise.
            </span>
          </div>
          {experiment && (
            <div className="mt-3 border-t border-primary/15 pt-3">
              <p className="mb-2 font-mono uppercase tracking-widest text-primary/80">Walkthrough</p>
              <ol className="grid gap-2 md:grid-cols-2">
                {experiment.steps.map((step, index) => (
                  <li key={step.label} className="flex gap-2 text-primary/75">
                    <span className="shrink-0 font-mono text-primary">{index + 1}.</span>
                    <span><strong className="text-primary/90">{step.label}:</strong> {step.detail}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 border-t border-primary/15 pt-3 text-primary/80">
                <strong className="text-primary">What to observe:</strong> {experiment.observe}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="p-5 space-y-5">
        {/* ── Gate palette ── */}
          <GatePalette
            allowedGates={allowedGates}
            selectedGateId={selectedGateId}
            onSelectGate={(gateId) => setSelectedGateId((current) => current === gateId ? null : gateId)}
          />

        {/* ── Circuit | Probability bars (side-by-side) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/30 pt-5">
          {/* Circuit grid */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Circuit</p>
            <CircuitGrid selectedGateId={selectedGateId} />
          </div>

          {/* Probability bars */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Ideal Measurement Probabilities</p>
            <ProbabilityBars />
            <p className="text-xs text-muted/65 leading-relaxed">
              This ideal simulator displays exact computational-basis probabilities. Real hardware returns sampled outcomes and can be affected by noise.
            </p>
            <MeasurementSampler />
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
