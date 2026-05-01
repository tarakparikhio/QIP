'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useCircuitStore } from '@/lib/store/circuitStore';
import { BlochVector } from '@/lib/quantum-engine/math';
import { usePersistentRatio } from '@/hooks/usePersistentRatio';

/** Mini arrow helper for a single-qubit Bloch card. */
function MiniVector({ bloch }: { bloch: BlochVector }) {
  const vectorRef = useRef<THREE.ArrowHelper>(null);

  const isMixed = bloch.purity < 0.05; // Nearly maximally mixed → no well-defined axis

  // Map Bloch (x,y,z) → Three.js (x=bloch.x, y=bloch.z, z=bloch.y)
  const targetVec = useMemo(() => {
    if (isMixed) return new THREE.Vector3(0, 1, 0); // fallback: don't normalize zero vector
    return new THREE.Vector3(bloch.x, bloch.z, bloch.y).normalize();
  }, [bloch.x, bloch.y, bloch.z, isMixed]);

  const currentDirRef = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(() => {
    if (vectorRef.current) {
      currentDirRef.current.lerp(targetVec, 0.12).normalize();
      vectorRef.current.setDirection(currentDirRef.current);
      // Fade arrow opacity when qubit is mixed (no well-defined Bloch point)
      const mat = (vectorRef.current as any).line?.material;
      if (mat) mat.opacity = isMixed ? 0.2 : 1;
    }
  });

  return (
    <arrowHelper
      ref={vectorRef}
      args={[targetVec, new THREE.Vector3(0, 0, 0), 0.9, 0x818cf8, 0.18, 0.09]}
    />
  );
}

/** A self-contained mini Bloch sphere canvas for one qubit. */
function QubitBlochCard({ qubitIndex, bloch, ratio }: { qubitIndex: number; bloch: BlochVector; ratio: number }) {
  const purityPct = Math.round(bloch.purity * 100);
  const isMixed = bloch.purity < 0.95;

  const cardWidth = Math.round(220 * ratio);
  const sphereHeight = Math.round(190 * ratio);

  const sphereCanvas = () => (
    <Canvas
      camera={{ position: [2, 1.4, 2], fov: 42 }}
      gl={{ alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.9} />
      <OrbitControls enableZoom autoRotate autoRotateSpeed={0.8} minDistance={1.2} maxDistance={6} />
      <mesh>
        <sphereGeometry args={[1, 24, 24]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.07} roughness={0.1} metalness={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* @ts-ignore */}
      <Line points={[[0, -1.1, 0], [0, 1.1, 0]]} color="#374151" lineWidth={1} />
      {/* @ts-ignore */}
      <Line points={[[-1.1, 0, 0], [1.1, 0, 0]]} color="#374151" lineWidth={1} />
      {/* @ts-ignore */}
      <Line points={[[0, 0, -1.1], [0, 0, 1.1]]} color="#374151" lineWidth={1} />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1, 1.01, 48]} />
        <meshBasicMaterial color="#374151" side={THREE.DoubleSide} />
      </mesh>
      <Text position={[0, 1.3, 0]} fontSize={0.13} color="#f8fafc">|0⟩</Text>
      <Text position={[0, -1.3, 0]} fontSize={0.13} color="#f8fafc">|1⟩</Text>
      <MiniVector bloch={bloch} />
    </Canvas>
  );

  return (
    <div className="flex-shrink-0 flex flex-col items-center rounded-xl border border-border/50 bg-card/50 p-3 gap-2" style={{ width: `${cardWidth}px` }}>
        {/* Header row */}
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-mono font-semibold text-primary">q{qubitIndex}</span>
          <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full border ${isMixed ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'}`}>
            {isMixed ? `${purityPct}%` : 'pure'}
          </span>
        </div>

        {/* Mini sphere */}
        <div className="w-full rounded-lg overflow-hidden cursor-move" style={{ height: `${sphereHeight}px` }}>
          {sphereCanvas()}
        </div>

        {/* Coordinates */}
        <div className="w-full grid grid-cols-4 gap-1 text-center">
          {[{ label: 'x', val: bloch.x }, { label: 'y', val: bloch.y }, { label: 'z', val: bloch.z }, { label: '|r|', val: bloch.purity }].map(({ label, val }) => (
            <div key={label} className="flex flex-col">
              <span className="text-[9px] font-mono text-muted uppercase">{label}</span>
              <span className="text-[10px] font-mono text-foreground/70">{val.toFixed(2)}</span>
            </div>
          ))}
        </div>
    </div>
  );
}

/** Horizontal scrollable panel of per-qubit Bloch sphere cards. */
export default function MultiQubitBlochPanel() {
  const { qubitBlochVectors, numQubits } = useCircuitStore();
  const { ratio, setRatio, min, max } = usePersistentRatio('qcpath:multiBloch:ratio', 1, { min: 0.85, max: 1.8 });

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-muted font-mono uppercase tracking-widest">
          Per-Qubit Bloch Vectors
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted font-mono">({numQubits} qubit{numQubits > 1 ? 's' : ''})</span>
          <button
            onClick={() => setRatio(ratio - 0.1)}
            className="text-[10px] font-mono px-2 py-1 rounded border border-border/40 bg-card/60 text-muted hover:text-foreground hover:border-primary/40 transition-all"
            title="Shrink Bloch cards"
          >
            -
          </button>
          <input
            type="range"
            min={min}
            max={max}
            step={0.05}
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-20 accent-primary"
            title="Bloch card size"
          />
          <button
            onClick={() => setRatio(ratio + 0.1)}
            className="text-[10px] font-mono px-2 py-1 rounded border border-border/40 bg-card/60 text-muted hover:text-foreground hover:border-primary/40 transition-all"
            title="Grow Bloch cards"
          >
            +
          </button>
          <span className="text-[10px] text-muted font-mono w-10 text-right">{Math.round(ratio * 100)}%</span>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {qubitBlochVectors.map((bloch, i) => (
          <QubitBlochCard key={i} qubitIndex={i} bloch={bloch} ratio={ratio} />
        ))}
      </div>

      <p className="text-[10px] text-muted/60 font-mono leading-relaxed">
        Purity = |r|, where r is the Bloch vector. 100% = pure qubit, less = entangled/mixed.
      </p>
    </div>
  );
}
