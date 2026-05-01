'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useCircuitStore } from '@/lib/store/circuitStore';
import { BlochVector } from '@/lib/quantum-engine/math';

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
function QubitBlochCard({ qubitIndex, bloch }: { qubitIndex: number; bloch: BlochVector }) {
  const purityPct = Math.round(bloch.purity * 100);
  const isMixed = bloch.purity < 0.95;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpanded(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [expanded]);

  const sphereCanvas = (zoom: boolean) => (
    <Canvas
      camera={{ position: [2, 1.4, 2], fov: zoom ? 40 : 45 }}
      gl={{ alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.9} />
      <OrbitControls enableZoom={zoom} autoRotate autoRotateSpeed={0.8} minDistance={zoom ? 1.2 : undefined} maxDistance={zoom ? 6 : undefined} />
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
      <Text position={[0, 1.3, 0]} fontSize={zoom ? 0.12 : 0.13} color="#f8fafc">|0⟩</Text>
      <Text position={[0, -1.3, 0]} fontSize={zoom ? 0.12 : 0.13} color="#f8fafc">|1⟩</Text>
      <MiniVector bloch={bloch} />
    </Canvas>
  );

  return (
    <>
      <div className="flex-shrink-0 flex flex-col items-center rounded-xl border border-border/50 bg-card/50 p-3 gap-2 w-[220px]">
        {/* Header row */}
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-mono font-semibold text-primary">q{qubitIndex}</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full border ${isMixed ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'}`}>
              {isMixed ? `${purityPct}%` : 'pure'}
            </span>
            <button
              onClick={() => setExpanded(true)}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border/40 bg-card/60 text-muted hover:text-foreground hover:border-primary/40 transition-all"
              title="Expand sphere"
            >
              ⛶
            </button>
          </div>
        </div>

        {/* Mini sphere */}
        <div className="w-full h-[190px] rounded-lg overflow-hidden cursor-move">
          {sphereCanvas(false)}
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

      {/* Expanded modal */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-6" onClick={() => setExpanded(false)}>
          <div className="relative w-full max-w-xl aspect-square rounded-2xl border border-primary/30 bg-background overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-3 left-4 z-10 pointer-events-none">
              <span className="text-xs font-mono text-muted uppercase tracking-widest">q{qubitIndex} · scroll = zoom · drag = rotate · Esc = close</span>
            </div>
            <button onClick={() => setExpanded(false)} className="absolute top-3 right-3 z-20 text-xs font-mono px-2.5 py-1 rounded border border-border/50 bg-card/80 text-muted hover:text-foreground transition-all">✕</button>
            {sphereCanvas(true)}
          </div>
        </div>
      )}
    </>
  );
}

/** Horizontal scrollable panel of per-qubit Bloch sphere cards. */
export default function MultiQubitBlochPanel() {
  const { qubitBlochVectors, numQubits } = useCircuitStore();

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <p className="text-xs text-muted font-mono uppercase tracking-widest">
          Per-Qubit Bloch Vectors
        </p>
        <span className="text-xs text-muted font-mono">({numQubits} qubit{numQubits > 1 ? 's' : ''})</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {qubitBlochVectors.map((bloch, i) => (
          <QubitBlochCard key={i} qubitIndex={i} bloch={bloch} />
        ))}
      </div>

      <p className="text-[10px] text-muted/60 font-mono leading-relaxed">
        Purity = |r|, where r is the Bloch vector. 100% = pure qubit, less = entangled/mixed.
      </p>
    </div>
  );
}
