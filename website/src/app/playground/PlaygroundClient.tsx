'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import GatePalette from '@/components/circuit-builder/GatePalette';
import CircuitGrid from '@/components/circuit-builder/CircuitGrid';
import ProbabilityBars from '@/components/quantum-visuals/ProbabilityBars';
import StateVector from '@/components/quantum-visuals/StateVector';
import { useCircuitStore } from '@/lib/store/circuitStore';

const BlochSphere = dynamic(() => import('@/components/quantum-visuals/BlochSphere'), { ssr: false });
const MultiQubitBlochPanel = dynamic(() => import('@/components/quantum-visuals/MultiQubitBlochPanel'), { ssr: false });

const ALL_GATES = ['H', 'X', 'Y', 'Z', 'S', 'T', 'CNOT'];
const MAX_QUBITS = 10;

const PRESET_CIRCUITS: { label: string; qubits: number; ops: { gateId: string; targetQubit: number; controlQubit?: number }[]; desc: string }[] = [
  {
    label: 'Bell State',
    qubits: 2,
    desc: 'Maximally entangled 2-qubit state |Φ⁺⟩',
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 }],
  },
  {
    label: 'GHZ State',
    qubits: 3,
    desc: '3-qubit entangled GHZ state',
    ops: [
      { gateId: 'H', targetQubit: 0 },
      { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 },
      { gateId: 'CNOT', targetQubit: 2, controlQubit: 0 },
    ],
  },
  {
    label: 'Superposition',
    qubits: 1,
    desc: 'Single qubit Hadamard superposition |+⟩',
    ops: [{ gateId: 'H', targetQubit: 0 }],
  },
  {
    label: 'H → Z → H',
    qubits: 1,
    desc: 'Phase flip: constructive interference → |1⟩',
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'Z', targetQubit: 0 }, { gateId: 'H', targetQubit: 0 }],
  },
  {
    label: 'Full Superposition',
    qubits: 3,
    desc: 'H on all 3 qubits → uniform distribution',
    ops: [{ gateId: 'H', targetQubit: 0 }, { gateId: 'H', targetQubit: 1 }, { gateId: 'H', targetQubit: 2 }],
  },
  {
    label: 'Phase Kickback',
    qubits: 2,
    desc: 'H → CNOT with |−⟩ target kicks phase to control',
    ops: [
      { gateId: 'H', targetQubit: 0 },
      { gateId: 'X', targetQubit: 1 },
      { gateId: 'H', targetQubit: 1 },
      { gateId: 'CNOT', targetQubit: 1, controlQubit: 0 },
      { gateId: 'H', targetQubit: 0 },
    ],
  },
];

export default function PlaygroundClient() {
  const { setNumQubits, clearCircuit, loadOps, numQubits } = useCircuitStore();
  const [localQubits, setLocalQubits] = useState(1);

  // Sync local qubit count into store
  useEffect(() => {
    setNumQubits(localQubits);
  }, [localQubits, setNumQubits]);

  function loadPreset(preset: (typeof PRESET_CIRCUITS)[number]) {
    setLocalQubits(preset.qubits);
    // slight delay so setNumQubits settles before loadOps
    setTimeout(() => loadOps(preset.ops), 30);
  }

  const isMultiQubit = localQubits > 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Quantum Playground</span>
        </div>
        <h1 className="text-4xl font-bold mb-2">Circuit Simulator</h1>
        <p className="text-muted text-base max-w-2xl">
          Build and run quantum circuits up to {MAX_QUBITS} qubits. All gates available. Results update live — Bloch spheres, state vector, and probability distribution.
        </p>
      </motion.div>

      {/* ── Controls row ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap items-center gap-6 p-4 rounded-xl border border-border/50 bg-card/30"
      >
        {/* Qubit picker */}
        <div className="flex items-center gap-4 flex-1 min-w-[240px]">
          <label className="text-xs font-mono text-muted uppercase tracking-widest whitespace-nowrap">
            Qubits
          </label>
          <input
            type="range"
            min={1}
            max={MAX_QUBITS}
            value={localQubits}
            onChange={(e) => setLocalQubits(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-sm font-mono font-bold text-primary w-8 text-center">{localQubits}</span>
        </div>

        {/* State space info */}
        <div className="text-xs font-mono text-muted/70 hidden sm:block">
          State space: <span className="text-foreground/70">2<sup>{localQubits}</sup> = {Math.pow(2, localQubits)} amplitudes</span>
        </div>

        <button
          onClick={() => clearCircuit()}
          className="text-xs font-mono px-3 py-1.5 rounded-lg border border-border/50 text-muted hover:text-foreground hover:border-primary/40 transition-all"
        >
          Clear Circuit
        </button>
      </motion.div>

      {/* ── Preset circuits ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}>
        <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Preset Circuits</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_CIRCUITS.map((p) => (
            <button
              key={p.label}
              onClick={() => loadPreset(p)}
              title={p.desc}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-primary/80 hover:bg-primary/15 hover:border-primary/50 transition-all"
            >
              {p.label}
              <span className="ml-1.5 text-[10px] text-primary/50">{p.qubits}q</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Main circuit area ── */}
      <div className="rounded-2xl border border-primary/20 bg-background/60 backdrop-blur-sm overflow-hidden">
        {/* Gate palette */}
        <div className="px-5 py-4 border-b border-border/30">
          <GatePalette allowedGates={ALL_GATES} />
        </div>

        {/* Circuit grid */}
        <div className="px-5 py-4 border-b border-border/30">
          <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Circuit</p>
          <CircuitGrid />
        </div>

        {/* ── Visualizations ── */}
        <div className="p-5 space-y-6">
          {/* Probabilities + State Vector side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Measurement Probabilities</p>
              <ProbabilityBars />
            </div>
            <div>
              <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">State Vector — amplitudes</p>
              <StateVector />
            </div>
          </div>

          {/* Bloch sphere panel */}
          <div>
            {isMultiQubit ? (
              <>
                <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Per-Qubit Bloch Spheres</p>
                <MultiQubitBlochPanel />
              </>
            ) : (
              <>
                <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Bloch Sphere — click ⛶ to expand, scroll to zoom</p>
                <BlochSphere />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Info footer ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-muted/60">
        <div className="p-3 rounded-lg border border-border/30 bg-card/20 space-y-1">
          <p className="text-muted/90 font-semibold">Gates</p>
          <p>H · X · Y · Z · S · T — single qubit unitary gates</p>
          <p>CNOT — controlled NOT (any control/target pair)</p>
        </div>
        <div className="p-3 rounded-lg border border-border/30 bg-card/20 space-y-1">
          <p className="text-muted/90 font-semibold">Bloch Sphere</p>
          <p>Pure qubit = point on sphere surface (|r| = 1)</p>
          <p>Entangled/mixed qubit = interior point (|r| &lt; 1)</p>
        </div>
        <div className="p-3 rounded-lg border border-border/30 bg-card/20 space-y-1">
          <p className="text-muted/90 font-semibold">State Vector</p>
          <p>2ⁿ complex amplitudes |α|² = probability</p>
          <p>Phase shown in degrees (0°–360°)</p>
        </div>
      </div>
    </div>
  );
}
