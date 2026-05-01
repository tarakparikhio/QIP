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
  CNOT: 'bg-violet-500/20 border-violet-400/60 text-violet-300 hover:bg-violet-500/30',
};

const GATE_INFO: Record<string, { label: string; desc: string }> = {
  H:    { label: 'H',    desc: 'Hadamard — creates superposition' },
  X:    { label: 'X',    desc: 'Pauli-X — bit flip (NOT gate)' },
  Y:    { label: 'Y',    desc: 'Pauli-Y — bit + phase flip' },
  Z:    { label: 'Z',    desc: 'Pauli-Z — phase flip (−1 on |1⟩)' },
  S:    { label: 'S',    desc: 'Phase S — rotates phase by π/2' },
  T:    { label: 'T',    desc: 'T gate — rotates phase by π/4' },
  CNOT: { label: 'CNOT', desc: 'CNOT — flips target if control=|1⟩' },
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
          return (
            <motion.div key={gateId} className="flex flex-col items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() =>
                  addOperation(
                    gateId === 'CNOT'
                      ? { gateId, targetQubit: 1, controlQubit: 0 }
                      : { gateId, targetQubit: 0 }
                  )
                }
                draggable
                onDragStart={(e: any) => {
                  e.dataTransfer.effectAllowed = 'copy';
                  e.dataTransfer.setData('gateId', gateId);
                  e.dataTransfer.setData('numQubits', numQubits.toString());
                }}
                className={cn(
                  'w-12 h-10 rounded-lg border text-sm font-mono font-bold transition-all cursor-move',
                  GATE_COLORS[gateId] ?? 'bg-card border-border text-foreground hover:border-primary/40'
                )}
                title={info.desc}
              >
                {info.label}
              </motion.button>
              <span className="text-[10px] text-muted/60 font-mono text-center max-w-[64px] leading-tight">{info.desc.split(' — ')[0]}</span>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-muted/40 font-mono">
        Right-click a gate in the circuit to remove it.{numQubits > 1 ? ' CNOT: control q0 → target q1.' : ''}
      </p>
    </div>
  );
}
