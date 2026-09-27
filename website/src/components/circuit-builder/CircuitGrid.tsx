'use client';
import { motion } from 'framer-motion';
import { useCircuitStore } from '@/lib/store/circuitStore';
import { cn } from '@/lib/utils';

const GATE_COLORS: Record<string, string> = {
  H: 'bg-indigo-500/30 border-indigo-400 text-indigo-200',
  X: 'bg-red-500/30 border-red-400 text-red-200',
  Y: 'bg-emerald-500/30 border-emerald-400 text-emerald-200',
  Z: 'bg-amber-500/30 border-amber-400 text-amber-200',
  S: 'bg-cyan-500/30 border-cyan-400 text-cyan-200',
  T: 'bg-orange-500/30 border-orange-400 text-orange-200',
  RX: 'bg-sky-500/30 border-sky-400 text-sky-200',
  RY: 'bg-teal-500/30 border-teal-400 text-teal-200',
  RZ: 'bg-lime-500/30 border-lime-400 text-lime-200',
  CNOT: 'bg-violet-500/30 border-violet-400 text-violet-200',
  CZ: 'bg-fuchsia-500/30 border-fuchsia-400 text-fuchsia-200',
  SWAP: 'bg-rose-500/30 border-rose-400 text-rose-200',
};

type Props = {
  selectedGateId: string | null;
};

export default function CircuitGrid({ selectedGateId }: Props) {
  const { operations, removeOperation, numQubits, insertOperation } = useCircuitStore();

  const wires = Array.from({ length: numQubits }, (_, i) => i);

  const placeGate = (wireIdx: number, stepIdx: number) => {
    if (!selectedGateId) return;
    const isControlled = selectedGateId === 'CNOT' || selectedGateId === 'CZ' || selectedGateId === 'SWAP';
    const otherQubit = (wireIdx + 1) % numQubits;
    insertOperation(stepIdx,
      isControlled && numQubits > 1
        ? { gateId: selectedGateId, targetQubit: otherQubit, controlQubit: wireIdx }
        : { gateId: selectedGateId, targetQubit: wireIdx }
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/50 bg-card/50 p-4">
      <div className="min-w-[320px] space-y-3">
        {wires.map((wireIdx) => (
          <div key={wireIdx} className="flex items-center gap-1">
            {/* Qubit label */}
            <div className="w-10 shrink-0 text-right text-xs font-mono text-muted pr-2">
              q{wireIdx}
            </div>

            {/* Wire with gates */}
            <div className="flex-1 relative flex items-center gap-1">
              {/* Base wire line */}
              <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-border/60" />

              {operations.map((op, stepIdx) => {
                const slotId = `slot-${wireIdx}-${stepIdx}`;
                return (
                  <motion.div
                    key={slotId}
                    onClick={() => placeGate(wireIdx, stepIdx)}
                    className={cn(
                      'relative z-10 w-9 h-9 shrink-0 rounded-md flex items-center justify-center transition-all',
                      selectedGateId && 'cursor-crosshair hover:border hover:border-primary/60 hover:bg-primary/10'
                    )}
                  >
                    {op.targetQubit === wireIdx ? (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          removeOperation(stepIdx);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedGateId) {
                            placeGate(wireIdx, stepIdx);
                          } else {
                            removeOperation(stepIdx);
                          }
                        }}
                        title={selectedGateId ? `Place ${selectedGateId} before this step` : 'Right-click to remove; click to remove'}
                        aria-label={selectedGateId ? `Place ${selectedGateId} before circuit step ${stepIdx + 1}` : `${op.gateId} gate at circuit step ${stepIdx + 1}; click to remove`}
                        className={cn(
                          'relative z-10 w-9 h-9 rounded-md border text-xs font-bold font-mono flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity',
                          selectedGateId ? 'cursor-crosshair' : 'cursor-pointer',
                          GATE_COLORS[op.gateId] ?? 'bg-card border-border text-foreground'
                        )}
                      >
                        {op.gateId}
                      </motion.button>
                    ) : (
                      <>
                        {op.controlQubit === wireIdx && op.gateId !== 'SWAP' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 border border-violet-300" />
                        )}
                        {op.controlQubit === wireIdx && op.gateId === 'SWAP' && (
                          <div className="text-rose-300 text-sm font-mono leading-none">x</div>
                        )}
                      </>
                    )}
                  </motion.div>
                );
              })}

              {/* Trailing time slot for palette drops */}
              {(() => {
                const stepIdx = operations.length;
                return (
                  <motion.div
                    onClick={() => placeGate(wireIdx, stepIdx)}
                    className={cn(
                      'relative z-10 w-9 h-9 shrink-0 rounded-md border border-border/30 border-dashed transition-all cursor-copy',
                      selectedGateId ? 'cursor-crosshair hover:border-primary/60 hover:bg-primary/10' : 'hover:border-primary/40 hover:bg-primary/5'
                    )}
                  />
                );
              })()}

              {/* Measure symbol */}
              <div className="relative z-10 w-9 h-9 shrink-0 rounded-md border border-muted/30 flex items-center justify-center text-muted/70 text-xs font-mono">
                M
              </div>
            </div>
          </div>
        ))}
      </div>

      {operations.length === 0 && (
        <p className="text-center text-xs text-muted/60 mt-3 pb-1">
          Add gates from the palette to build a circuit
        </p>
      )}
    </div>
  );
}
