'use client';
import { motion } from 'framer-motion';
import { useCircuitStore } from '@/lib/store/circuitStore';
import { cn } from '@/lib/utils';

const GATE_COLORS: Record<string, string> = {
  H: 'bg-indigo-500/20 border-indigo-400/60 text-indigo-300 hover:bg-indigo-500/30',
  X: 'bg-red-500/20 border-red-400/60 text-red-300 hover:bg-red-500/30',
  Y: 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 hover:bg-emerald-500/30',
  Z: 'bg-amber-500/20 border-amber-400/60 text-amber-300 hover:bg-amber-500/30',
  S: 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 hover:bg-cyan-500/30',
  T: 'bg-orange-500/20 border-orange-400/60 text-orange-300 hover:bg-orange-500/30',
  RX: 'bg-sky-500/20 border-sky-400/60 text-sky-300 hover:bg-sky-500/30',
  RY: 'bg-teal-500/20 border-teal-400/60 text-teal-300 hover:bg-teal-500/30',
  RZ: 'bg-lime-500/20 border-lime-400/60 text-lime-300 hover:bg-lime-500/30',
  CNOT: 'bg-violet-500/20 border-violet-400/60 text-violet-300 hover:bg-violet-500/30',
  CZ: 'bg-fuchsia-500/20 border-fuchsia-400/60 text-fuchsia-300 hover:bg-fuchsia-500/30',
  SWAP: 'bg-rose-500/20 border-rose-400/60 text-rose-300 hover:bg-rose-500/30',
};

const GATE_INFO: Record<string, { label: string; desc: string }> = {
  H:    { label: 'H',    desc: 'Hadamard — creates superposition' },
  X:    { label: 'X',    desc: 'Pauli-X — bit flip (NOT gate)' },
  Y:    { label: 'Y',    desc: 'Pauli-Y — bit + phase flip' },
  Z:    { label: 'Z',    desc: 'Pauli-Z — phase flip (−1 on |1⟩)' },
  S:    { label: 'S',    desc: 'Phase S — rotates phase by π/2' },
  T:    { label: 'T',    desc: 'T gate — rotates phase by π/4' },
  RX:   { label: 'RX',   desc: 'RX(π/2) — X-axis rotation' },
  RY:   { label: 'RY',   desc: 'RY(π/2) — Y-axis rotation' },
  RZ:   { label: 'RZ',   desc: 'RZ(π/2) — Z-axis rotation' },
  CNOT: { label: 'CNOT', desc: 'CNOT — flips target if control=|1⟩' },
  CZ:   { label: 'CZ',   desc: 'CZ — adds phase when both qubits are |1⟩' },
  SWAP: { label: 'SWAP', desc: 'SWAP — exchanges two qubit states' },
};

type Props = { allowedGates: string[] };

export default function GatePalette({ allowedGates }: Props) {
  const { addOperation, numQubits } = useCircuitStore();

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted font-mono uppercase tracking-widest">Gate Palette — click to add, drag to position</p>
      <div className="flex flex-wrap gap-3">
        {allowedGates.map((gateId) => {
          const info = GATE_INFO[gateId] ?? { label: gateId, desc: '' };
          const isControlled = gateId === 'CNOT' || gateId === 'CZ' || gateId === 'SWAP';
          const disabled = isControlled && numQubits < 2;
          return (
            <motion.div key={gateId} className="flex flex-col items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  if (disabled) return;
                  addOperation(
                    isControlled
                      ? { gateId, targetQubit: 1, controlQubit: 0 }
                      : { gateId, targetQubit: 0 }
                  );
                }}
                draggable
                onDragStart={(e: any) => {
                  e.dataTransfer.effectAllowed = 'copy';
                  e.dataTransfer.setData('gateId', gateId);
                  e.dataTransfer.setData('numQubits', numQubits.toString());
                }}
                className={cn(
                  'w-12 h-10 rounded-lg border text-sm font-mono font-bold transition-all',
                  disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-move',
                  GATE_COLORS[gateId] ?? 'bg-card border-border text-foreground hover:border-primary/40'
                )}
                title={disabled ? `${info.desc} (requires 2+ qubits)` : info.desc}
                disabled={disabled}
              >
                {info.label}
              </motion.button>
              <span className="text-[10px] text-muted/60 font-mono text-center max-w-[64px] leading-tight">{info.desc.split(' — ')[0]}</span>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-muted/40 font-mono">
        Right-click a gate in the circuit to remove it.{numQubits > 1 ? ' Controlled gates default to control q0 → target q1.' : ''}
      </p>
    </div>
  );
}
