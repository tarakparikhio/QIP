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

const GATE_LABELS: Record<string, string> = {
  H: 'Hadamard',
  X: 'Pauli-X',
  Y: 'Pauli-Y',
  Z: 'Pauli-Z',
  S: 'Phase S',
  T: 'T Gate',
  CNOT: 'CNOT',
};

type Props = { allowedGates: string[] };

export default function GatePalette({ allowedGates }: Props) {
  const { addOperation, numQubits } = useCircuitStore();

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted font-mono uppercase tracking-widest mb-3">Gate Palette</p>
      <div className="flex flex-wrap gap-2">
        {allowedGates.map((gateId) => (
          <motion.button
            key={gateId}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
              'px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all cursor-move',
              GATE_COLORS[gateId] ?? 'bg-card border-border text-foreground hover:border-primary/40'
            )}
            title={GATE_LABELS[gateId]}
          >
            {gateId}
          </motion.button>
        ))}
      </div>
      <p className="text-xs text-muted/50 mt-2">
        Click gate to add, or drag onto qubit wire. {numQubits > 1 ? 'CNOT uses qubit 0→1.' : ''}
      </p>
    </div>
  );
}
