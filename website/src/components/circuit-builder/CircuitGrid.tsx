'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
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

export default function CircuitGrid() {
  const { operations, removeOperation, numQubits, addOperation, moveOperation } = useCircuitStore();
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const [draggedGateIdx, setDraggedGateIdx] = useState<number | null>(null);
  const [dragTargetIdx, setDragTargetIdx] = useState<number | null>(null);

  const wires = Array.from({ length: numQubits }, (_, i) => i);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // Allow both adding gates and reordering
    if (draggedGateIdx !== null) {
      e.dataTransfer.dropEffect = 'move';
    } else {
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDrop = (e: React.DragEvent, wireIdx: number, stepIdx: number) => {
    e.preventDefault();
    
    // Handle gate reordering
    if (draggedGateIdx !== null) {
      setDragOverSlot(null);
      setDraggedGateIdx(null);
      setDragTargetIdx(null);
      return;
    }
    
    // Handle gate placement
    const gateId = e.dataTransfer.getData('gateId');
    const numQubitsStr = e.dataTransfer.getData('numQubits');
    const numQubitsVal = parseInt(numQubitsStr);

    if (gateId) {
      const isControlled = gateId === 'CNOT' || gateId === 'CZ' || gateId === 'SWAP';
      addOperation(
        isControlled && numQubitsVal > 1
          ? { gateId, targetQubit: wireIdx, controlQubit: (wireIdx + 1) % numQubitsVal }
          : { gateId, targetQubit: wireIdx }
      );
      setDragOverSlot(null);
    }
  };

  const handleGateDragStart = (e: React.DragEvent, stepIdx: number) => {
    e.stopPropagation();
    setDraggedGateIdx(stepIdx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleGateDragOver = (e: React.DragEvent, stepIdx: number) => {
    if (draggedGateIdx === null) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDragTargetIdx(stepIdx);
  };

  const handleGateDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedGateIdx !== null && draggedGateIdx !== targetIdx) {
      moveOperation(draggedGateIdx, targetIdx);
    }
    setDraggedGateIdx(null);
    setDragTargetIdx(null);
  };

  const handleGateDragEnd = () => {
    setDraggedGateIdx(null);
    setDragTargetIdx(null);
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

              {operations.map((op, stepIdx) =>
                op.targetQubit === wireIdx ? (
                  <motion.button
                    key={`gate-${stepIdx}`}
                    draggable
                    onDragStart={(e: any) => handleGateDragStart(e, stepIdx)}
                    onDragOver={(e: any) => handleGateDragOver(e, stepIdx)}
                    onDrop={(e: any) => handleGateDrop(e, stepIdx)}
                    onDragEnd={handleGateDragEnd}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: draggedGateIdx === stepIdx ? 0.8 : 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      removeOperation(stepIdx);
                    }}
                    onClick={() => {
                      if (draggedGateIdx === null) {
                        removeOperation(stepIdx);
                      }
                    }}
                    title="Drag to reorder • Right-click to remove • Click to remove"
                    aria-label={`${op.gateId} gate at circuit step ${stepIdx + 1}; click to remove`}
                    className={cn(
                      'relative z-10 w-9 h-9 rounded-md border text-xs font-bold font-mono flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity',
                      dragTargetIdx === stepIdx && draggedGateIdx !== null
                        ? 'ring-2 ring-primary/60 scale-110'
                        : draggedGateIdx === stepIdx
                        ? 'opacity-60 cursor-grabbing'
                        : 'cursor-grab',
                      GATE_COLORS[op.gateId] ?? 'bg-card border-border text-foreground'
                    )}
                  >
                    {op.gateId}
                  </motion.button>
                ) : (
                  <div key={`slot-${stepIdx}`} className="relative z-10 w-9 h-9 shrink-0 flex items-center justify-center">
                    {op.controlQubit === wireIdx && op.gateId !== 'SWAP' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-violet-400 border border-violet-300" />
                    )}
                    {op.controlQubit === wireIdx && op.gateId === 'SWAP' && (
                      <div className="text-rose-300 text-sm font-mono leading-none">x</div>
                    )}
                  </div>
                )
              )}

              {/* Empty placeholder slots - droppable */}
              {Array.from({ length: Math.max(0, 4 - operations.filter(o => o.targetQubit === wireIdx).length) }).map((_, i) => {
                const stepIdx = operations.filter(o => o.targetQubit === wireIdx).length + i;
                const slotId = `slot-${wireIdx}-${stepIdx}`;
                return (
                  <motion.div
                    key={`empty-${i}`}
                    onDragOver={handleDragOver}
                    onDragEnter={() => setDragOverSlot(slotId)}
                    onDragLeave={() => setDragOverSlot(null)}
                    onDrop={(e) => handleDrop(e as any, wireIdx, stepIdx)}
                    animate={dragOverSlot === slotId ? { scale: 1.15, backgroundColor: 'rgba(129, 140, 248, 0.2)' } : {}}
                    className={cn(
                      'relative z-10 w-9 h-9 shrink-0 rounded-md border border-border/30 border-dashed transition-all cursor-copy',
                      dragOverSlot === slotId ? 'border-primary/60 bg-primary/10' : 'hover:border-primary/40 hover:bg-primary/5'
                    )}
                  />
                );
              })}

              {/* Measure symbol */}
              <div className="relative z-10 w-9 h-9 shrink-0 rounded-md border border-muted/30 flex items-center justify-center text-muted/50 text-xs font-mono">
                M
              </div>
            </div>
          </div>
        ))}
      </div>

      {operations.length === 0 && (
        <p className="text-center text-xs text-muted/40 mt-3 pb-1">
          Add gates from the palette to build a circuit
        </p>
      )}
    </div>
  );
}
