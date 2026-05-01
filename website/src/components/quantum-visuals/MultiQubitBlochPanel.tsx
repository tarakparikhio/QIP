'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useCircuitStore } from '@/lib/store/circuitStore';
import { BlochVector } from '@/lib/quantum-engine/math';

/** Mini arrow helper for a single-qubit Bloch card. */
function MiniVector({ bloch }: { bloch: BlochVector }) {
  const vectorRef = useRef<THREE.ArrowHelper>(null);

  // Map Bloch (x,y,z) → Three.js (x=bloch.x, y=bloch.z, z=bloch.y)
  const targetVec = useMemo(
    () => new THREE.Vector3(bloch.x, bloch.z, bloch.y).normalize(),
    [bloch.x, bloch.y, bloch.z],
  );

  const currentDirRef = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(() => {
    if (vectorRef.current) {
      currentDirRef.current.lerp(targetVec, 0.12).normalize();
      vectorRef.current.setDirection(currentDirRef.current);
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

  return (
    <div className="flex-shrink-0 flex flex-col items-center rounded-xl border border-border/50 bg-card/50 p-3 gap-2 w-[160px]">
      {/* Qubit label */}
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-mono font-semibold text-primary">q{qubitIndex}</span>
        <span
          className={`text-xs font-mono px-1.5 py-0.5 rounded-full border ${
            isMixed
              ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
              : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
          }`}
        >
          {isMixed ? `${purityPct}%` : 'pure'}
        </span>
      </div>

      {/* Mini 3D Bloch sphere */}
      <div className="w-full h-[130px] rounded-lg overflow-hidden cursor-move">
        <Canvas
          camera={{ position: [2, 1.2, 2], fov: 50 }}
          gl={{ alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.9} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />

          {/* Sphere */}
          <mesh>
            <sphereGeometry args={[1, 24, 24]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.07}
              roughness={0.1}
              metalness={0.1}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>

          {/* Z axis (|0⟩ up) */}
          {/* @ts-ignore */}
          <Line points={[[0, -1.1, 0], [0, 1.1, 0]]} color="#374151" lineWidth={1} />
          {/* X axis */}
          {/* @ts-ignore */}
          <Line points={[[-1.1, 0, 0], [1.1, 0, 0]]} color="#374151" lineWidth={1} />
          {/* Y axis */}
          {/* @ts-ignore */}
          <Line points={[[0, 0, -1.1], [0, 0, 1.1]]} color="#374151" lineWidth={1} />

          {/* Equator ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1, 1.01, 48]} />
            <meshBasicMaterial color="#374151" side={THREE.DoubleSide} />
          </mesh>

          <MiniVector bloch={bloch} />
        </Canvas>
      </div>

      {/* Bloch coordinates */}
      <div className="w-full grid grid-cols-3 gap-1 text-center">
        {[
          { label: 'x', val: bloch.x },
          { label: 'y', val: bloch.y },
          { label: 'z', val: bloch.z },
        ].map(({ label, val }) => (
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
