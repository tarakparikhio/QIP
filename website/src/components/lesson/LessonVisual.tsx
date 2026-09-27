'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { getLessonVisual, type LessonVisual, type LessonVisualMode } from '@/lib/lessonVisuals';
import { LESSON_EXPERIMENTS } from '@/lib/lessonExperiments';
import { CircuitRunner, type GateOperation } from '@/lib/quantum-engine/run';

type LessonVisualProps = {
  lessonId: number;
};

const pulseTransition = {
  duration: 2.8,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut' as const,
};

const stageTransition = {
  duration: 0.65,
  ease: 'easeInOut' as const,
};

type VisualSnapshot = {
  operationCount: number;
  totalOperations: number;
  numQubits: number;
  operations: GateOperation[];
  probabilities: number[];
  amplitudes: { re: number; im: number }[];
};

function getVisualSnapshots(lessonId: number): VisualSnapshot[] {
  const experiment = LESSON_EXPERIMENTS[lessonId];
  if (!experiment || experiment.mode !== 'circuit' || !experiment.ops?.length) return [];

  const operations = experiment.ops;
  const numQubits = experiment.numQubits ?? 1;

  return Array.from({ length: 4 }, (_, stage) => {
    const operationCount = Math.round((stage / 3) * operations.length);
    const selectedOperations = operations.slice(0, operationCount);
    const runner = new CircuitRunner(numQubits);
    runner.run(selectedOperations);
    return {
      operationCount,
      totalOperations: operations.length,
      numQubits,
      operations: selectedOperations,
      probabilities: runner.getProbabilities(),
      amplitudes: runner.state.amplitudes.map((amplitude) => ({ re: amplitude.re, im: amplitude.im })),
    };
  });
}

export default function LessonVisual({ lessonId }: LessonVisualProps) {
  const visual = getLessonVisual(lessonId);
  const reducedMotion = useReducedMotion() ?? false;
  const snapshots = useMemo(() => getVisualSnapshots(lessonId), [lessonId]);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const [noiseProbability, setNoiseProbability] = useState(0.2);
  const stageCount = 4;

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => {
      setStage((current) => (current + 1) % stageCount);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);

  function moveStage(nextStage: number) {
    setStage((nextStage + stageCount) % stageCount);
    setPlaying(false);
  }

  return (
    <section className="mb-10 border border-accent/25 bg-accent/5 p-5 sm:p-6" aria-labelledby="lesson-visual-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Visual model</p>
          <h2 id="lesson-visual-heading" className="mt-2 text-xl font-bold text-foreground">{visual.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{visual.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="border border-accent/25 bg-background/30 px-2.5 py-1 text-xs font-mono text-accent">{snapshots.length > 0 ? 'computed from lesson circuit' : 'conceptual model'}</span>
          <button type="button" onClick={() => moveStage(stage - 1)} aria-label="Previous visual stage" title="Previous visual stage" className="h-7 w-7 border border-border/60 text-xs font-mono text-muted transition hover:border-primary/50 hover:text-foreground">&lt;|</button>
          <button type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? 'Pause visual model' : 'Play visual model'} title={playing ? 'Pause visual model' : 'Play visual model'} className="h-7 w-7 border border-border/60 text-xs font-mono text-muted transition hover:border-primary/50 hover:text-foreground">{playing ? '||' : '>'}</button>
          <button type="button" onClick={() => moveStage(stage + 1)} aria-label="Next visual stage" title="Next visual stage" className="h-7 w-7 border border-border/60 text-xs font-mono text-muted transition hover:border-primary/50 hover:text-foreground">|&gt;</button>
          <span className="w-12 text-right text-[11px] font-mono text-muted">{String(stage + 1).padStart(2, '0')} / {String(stageCount).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="min-h-[174px] border border-border/50 bg-background/50 p-4" aria-label={`${visual.title}. ${visual.focus}`}>
          <VisualScene mode={visual.mode} stage={stage} reducedMotion={reducedMotion} snapshot={snapshots[stage]} noiseProbability={noiseProbability} onNoiseProbabilityChange={setNoiseProbability} />
        </div>
        <div className="space-y-4 text-sm">
          <div className="border-l-2 border-primary/70 pl-3">
            <p className="text-xs font-mono uppercase tracking-widest text-primary">Notice</p>
            <p className="mt-1 leading-relaxed text-foreground/80">{visual.focus}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-primary">Ideal model</p>
              <p className="mt-1 leading-relaxed text-muted">{visual.ideal}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-300">Reality check</p>
              <p className="mt-1 leading-relaxed text-muted">{visual.reality}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualScene({ mode, stage, reducedMotion, snapshot, noiseProbability, onNoiseProbabilityChange }: { mode: LessonVisualMode; stage: number; reducedMotion: boolean; snapshot?: VisualSnapshot; noiseProbability: number; onNoiseProbabilityChange: (value: number) => void }) {
  switch (mode) {
    case 'amplitude':
      return <AmplitudeScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'phase':
      return <PhaseScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'measurement':
      return <MeasurementScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'entanglement':
      return <EntanglementScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'noise':
      return <NoiseScene stage={stage} reducedMotion={reducedMotion} noiseProbability={noiseProbability} onNoiseProbabilityChange={onNoiseProbabilityChange} />;
    case 'circuit':
      return <CircuitScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'algorithm':
      return <AlgorithmScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'resource':
      return <ResourceScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'hardware':
      return <HardwareScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
    case 'protocol':
      return <ProtocolScene stage={stage} snapshot={snapshot} reducedMotion={reducedMotion} />;
  }
}

function SceneLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">{children}</p>;
}

type SceneProps = {
  stage: number;
  reducedMotion: boolean;
  snapshot?: VisualSnapshot;
};

function Meter({ label, width, color = 'bg-primary', stage = 0, reducedMotion }: { label: string; width: number | number[]; color?: string; stage?: number; reducedMotion: boolean }) {
  const targetWidth = Array.isArray(width) ? width[stage % width.length] : width;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-mono text-foreground/75"><span>{label}</span><span>{`${targetWidth}%`}</span></div>
      <div className="h-2 overflow-hidden bg-border/50">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: `${Array.isArray(width) ? width[0] : width}%` }}
          animate={reducedMotion ? undefined : { width: `${targetWidth}%` }}
          transition={stageTransition}
        />
      </div>
    </div>
  );
}

function AmplitudeScene({ stage, snapshot, reducedMotion }: SceneProps) {
  const probabilities = snapshot?.probabilities ?? [1, 0];
  const first = Math.sqrt(probabilities[0] ?? 0) * 100;
  const second = Math.sqrt(probabilities[1] ?? 0) * 100;
  return <div className="space-y-5"><SceneLabel>Actual amplitudes from the lesson circuit</SceneLabel><Meter label="|0> magnitude" width={first} stage={stage} reducedMotion={reducedMotion} /><Meter label="|1> magnitude" width={second} color="bg-accent" stage={stage} reducedMotion={reducedMotion} /><div className="flex items-center justify-between gap-2 text-[11px] font-mono text-muted"><span>operations applied: {snapshot?.operationCount ?? 0}</span><span>magnitude = sqrt(probability)</span></div></div>;
}

function PhaseScene({ stage, snapshot, reducedMotion }: SceneProps) {
  const amplitudes = snapshot?.amplitudes ?? [{ re: 1, im: 0 }, { re: 0, im: 0 }];
  const phase = (Math.atan2(amplitudes[1]?.im ?? 0, amplitudes[1]?.re ?? 0) - Math.atan2(amplitudes[0]?.im ?? 0, amplitudes[0]?.re ?? 0)) * (180 / Math.PI);
  return <div className="space-y-5"><SceneLabel>Actual relative phase after the selected prefix</SceneLabel><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="space-y-2"><Meter label="|0> magnitude" width={Math.sqrt((amplitudes[0]?.re ?? 0) ** 2 + (amplitudes[0]?.im ?? 0) ** 2) * 100} stage={stage} reducedMotion={reducedMotion} /><Meter label="|1> magnitude" width={Math.sqrt((amplitudes[1]?.re ?? 0) ** 2 + (amplitudes[1]?.im ?? 0) ** 2) * 100} color="bg-accent" stage={stage} reducedMotion={reducedMotion} /></div><motion.div className="text-2xl text-accent" animate={reducedMotion ? undefined : { rotate: [0, 180, 360] }} transition={{ ...pulseTransition, duration: 3.6 }}>+</motion.div><div className="border border-accent/30 bg-accent/5 p-3 text-center"><p className="text-[11px] font-mono text-muted">relative phase</p><p className="mt-1 text-lg font-mono text-accent">{Number.isFinite(phase) ? `${phase.toFixed(0)}°` : 'n/a'}</p></div></div><div className="flex justify-between text-[11px] font-mono text-muted"><span>{snapshot?.operationCount ?? 0} operations</span><span>basis change reveals phase</span></div></div>;
}

function MeasurementScene({ stage, snapshot, reducedMotion }: SceneProps) {
  const probabilities = snapshot?.probabilities ?? [0.5, 0.5];
  return <div className="space-y-4"><SceneLabel>Exact distribution from the selected circuit state</SceneLabel><div className="grid grid-cols-2 gap-4"><Meter label="|0> probability" width={(probabilities[0] ?? 0) * 100} stage={stage} reducedMotion={reducedMotion} /><Meter label="|1> probability" width={(probabilities[1] ?? 0) * 100} color="bg-accent" stage={stage} reducedMotion={reducedMotion} /></div><div className="grid grid-cols-2 gap-2 pt-2"><span className="border border-primary/30 bg-primary/5 px-2 py-2 text-center text-[11px] font-mono text-muted">ideal: {(probabilities[0] ?? 0).toFixed(2)}</span><span className="border border-accent/30 bg-accent/5 px-2 py-2 text-center text-[11px] font-mono text-muted">ideal: {(probabilities[1] ?? 0).toFixed(2)}</span></div><p className="text-[11px] font-mono text-muted">Run the sampler below for actual finite-shot fluctuations.</p></div>;
}

function EntanglementScene({ stage, snapshot, reducedMotion }: SceneProps) {
  const probabilities = snapshot?.probabilities ?? [0.5, 0, 0, 0.5];
  const outcomes = probabilities.slice(0, 4);
  return <div className="space-y-4"><SceneLabel>Actual joint probabilities from the lesson circuit</SceneLabel><div className="relative flex items-center justify-between px-4"><div className="space-y-2 text-center"><motion.div className="h-10 w-10 rounded-full border-2 border-primary bg-primary/15" animate={reducedMotion ? undefined : { scale: [1, 1.12, 1] }} transition={pulseTransition} /><span className="block text-[11px] font-mono text-muted">q0</span></div><motion.div className="h-px flex-1 border-t border-dashed border-accent mx-4" animate={reducedMotion ? undefined : { opacity: [0.25, 1, 0.25] }} transition={pulseTransition} /><div className="space-y-2 text-center"><motion.div className="h-10 w-10 rounded-full border-2 border-accent bg-accent/15" animate={reducedMotion ? undefined : { scale: [1.12, 1, 1.12] }} transition={pulseTransition} /><span className="block text-[11px] font-mono text-muted">q1</span></div></div><div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono">{outcomes.map((probability, index) => <div key={index} className={`border py-2 ${probability > 0.01 ? 'border-accent/50 bg-accent/10 text-foreground' : 'border-border/40 text-muted/60'}`}><span className="block">{index.toString(2).padStart(2, '0')}</span><span>{(probability * 100).toFixed(0)}%</span></div>)}</div></div>;
}

function NoiseScene({ stage, reducedMotion, noiseProbability, onNoiseProbabilityChange }: SceneProps & { noiseProbability: number; onNoiseProbabilityChange: (value: number) => void }) {
  const coherence = 1 - 2 * noiseProbability;
  const xBasisPlus = 1 - noiseProbability;

  return (
    <div className="space-y-4">
      <SceneLabel>Phase-flip channel on |+&gt;</SceneLabel>
      <label className="flex items-center justify-between gap-3 text-[11px] font-mono text-muted">
        <span>Noise probability p = {noiseProbability.toFixed(2)}</span>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={noiseProbability}
          onChange={(event) => onNoiseProbabilityChange(Number(event.target.value))}
          aria-label="Phase-flip probability"
          className="w-28 accent-amber-400"
        />
      </label>
      <Meter label="coherence |1 - 2p|" width={coherence * 100} stage={stage} color="bg-amber-400" reducedMotion={reducedMotion} />
      <Meter label="X-basis |+&gt; outcome" width={xBasisPlus * 100} stage={stage} color="bg-accent" reducedMotion={reducedMotion} />
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted">
        <span className="border border-border/50 px-2 py-1.5">Z basis: 50/50</span>
        <span className="border border-border/50 px-2 py-1.5">X basis: {Math.round(xBasisPlus * 100)}% |+&gt;</span>
      </div>
      <p className="text-[11px] leading-relaxed text-muted">E_p(rho) = (1-p)rho + p Z rho Z; p is limited to 0.5 so this models increasing dephasing, not a deterministic Z gate.</p>
    </div>
  );
}

function CircuitScene({ stage, snapshot, reducedMotion }: SceneProps) {
  const operations = snapshot?.operations ?? [];
  return <div className="space-y-4"><SceneLabel>Actual operations in the selected prefix</SceneLabel><div className="flex min-h-12 items-center gap-2 overflow-x-auto border-y border-border/70 px-2 py-3"><span className="shrink-0 text-[11px] font-mono text-muted">|0&gt;</span>{operations.length > 0 ? operations.map((operation, index) => <motion.span key={`${operation.gateId}-${index}`} className="shrink-0 border border-primary/50 bg-primary/10 px-2.5 py-2 font-mono text-xs" initial={{ opacity: 0.45 }} animate={reducedMotion ? undefined : { opacity: [0.45, 1, 0.45] }} transition={{ ...pulseTransition, delay: index * 0.08 }}>{operation.gateId}<sub className="ml-0.5">q{operation.targetQubit}</sub></motion.span>) : <span className="text-xs font-mono text-muted">identity</span>}</div><div className="flex justify-between text-[11px] font-mono text-muted"><span>{snapshot?.operationCount ?? 0} of {snapshot?.totalOperations ?? 0} operations</span><span>state updates left to right</span></div></div>;
}

function AlgorithmScene({ stage, snapshot, reducedMotion }: SceneProps) {
  const probabilities = snapshot?.probabilities ?? [0.5, 0.5];
  const maximum = Math.max(...probabilities, 0.01);
  const visibleProbabilities = probabilities.slice(0, 8);
  return <div className="space-y-4"><SceneLabel>Actual output probabilities at this stage</SceneLabel><div className="flex h-24 items-end gap-2 border-b border-border/70 px-2">{visibleProbabilities.map((probability, index) => <motion.div key={index} className={`flex-1 ${probability === maximum ? 'bg-accent' : 'bg-primary/50'}`} initial={{ height: `${(probability / maximum) * 100}%` }} animate={reducedMotion ? undefined : { height: `${(probability / maximum) * 100}%` }} transition={stageTransition} title={`|${index.toString(2).padStart(Math.max(1, Math.log2(probabilities.length)), '0')}>: ${(probability * 100).toFixed(1)}%`} />)}</div><div className="flex justify-between text-[11px] font-mono text-muted"><span>{snapshot?.operationCount ?? 0} operations applied</span><span>highest probability highlighted</span></div></div>;
}

function ResourceScene({ stage, snapshot, reducedMotion }: SceneProps) {
  const depth = snapshot ? (snapshot.operationCount / Math.max(snapshot.totalOperations, 1)) * 100 : [28, 42, 58, 76];
  return <div className="space-y-4"><SceneLabel>{snapshot ? 'Actual lesson-circuit resource trace' : 'Resources are separate axes'}</SceneLabel>{snapshot ? <><Meter label="example depth" width={depth} stage={stage} color="bg-accent" reducedMotion={reducedMotion} /><div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted"><span className="border border-border/50 px-2 py-1.5">qubits: {snapshot.numQubits}</span><span className="border border-border/50 px-2 py-1.5">operations: {snapshot.operationCount}</span></div></> : <><Meter label="qubits" width={36} stage={stage} reducedMotion={reducedMotion} /><Meter label="depth" width={58} color="bg-accent" stage={stage} reducedMotion={reducedMotion} /><Meter label="samples / classical work" width={54} color="bg-amber-400" stage={stage} reducedMotion={reducedMotion} /></>}</div>;
}

function HardwareScene({ stage, reducedMotion }: SceneProps) {
  return <div className="space-y-4"><SceneLabel>Logical intent -&gt; physical execution</SceneLabel><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><p className="text-[11px] font-mono text-primary">ideal</p><Meter label="target" width={88} stage={stage} reducedMotion={reducedMotion} /></div><div className="space-y-2"><p className="text-[11px] font-mono text-amber-300">device</p><Meter label="observed" width={[72, 58, 66, 49]} color="bg-amber-400" stage={stage} reducedMotion={reducedMotion} /></div></div><p className="text-[11px] font-mono text-muted">transpilation, calibration, and sampling change the result</p></div>;
}

function ProtocolScene({ stage, reducedMotion }: SceneProps) {
  return <div className="space-y-4"><SceneLabel>Information flow / assumptions</SceneLabel><div className="flex items-center justify-between gap-2 text-center text-[11px] font-mono"><div className="space-y-2"><motion.div className="border border-primary/50 bg-primary/10 px-3 py-2 text-sm" animate={reducedMotion ? undefined : { y: [0, -4, 0] }} transition={pulseTransition}>input</motion.div><span className="text-muted">state</span></div><div className="flex-1 border-t border-dashed border-accent" /><div className="space-y-2"><motion.div className="border border-accent/50 bg-accent/10 px-3 py-2 text-sm" animate={reducedMotion ? undefined : { y: [0, 4, 0] }} transition={{ ...pulseTransition, delay: 0.3 }}>check</motion.div><span className="text-muted">classical info</span></div><div className="flex-1 border-t border-dashed border-amber-400" /><div className="space-y-2"><div className="border border-amber-400/50 bg-amber-400/10 px-3 py-2 text-sm">result</div><span className="text-muted">correction</span></div></div><p className="text-[11px] font-mono text-muted">protocol claims depend on the stated assumptions</p></div>;
}