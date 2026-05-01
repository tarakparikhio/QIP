'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useCircuitStore } from '@/lib/store/circuitStore';

function SphereVector({ amplitudes }: { amplitudes: any[] }) {
  const vectorRef = useRef<THREE.ArrowHelper>(null);

  const targetVec = useMemo(() => {
    if (amplitudes.length !== 2) return new THREE.Vector3(0, 1, 0);
    const alpha = amplitudes[0];
    const beta = amplitudes[1];
    const Pre = alpha.re * beta.re + alpha.im * beta.im;
    const Pim = alpha.re * beta.im - alpha.im * beta.re;
    const x = 2 * Pre;
    const y = 2 * Pim;
    const z = (alpha.re * alpha.re + alpha.im * alpha.im) - (beta.re * beta.re + beta.im * beta.im);
    return new THREE.Vector3(x, z, y).normalize();
  }, [amplitudes]);

  const currentDirRef = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(() => {
    if (vectorRef.current) {
      currentDirRef.current.lerp(targetVec, 0.1).normalize();
      vectorRef.current.setDirection(currentDirRef.current);
    }
  });

  return (
    <arrowHelper
      ref={vectorRef}
      args={[targetVec, new THREE.Vector3(0, 0, 0), 1.2, 0x818cf8, 0.2, 0.1]}
    />
  );
}

function SphereScene({ amplitudes }: { amplitudes: any[] }) {
  return (
    <Canvas camera={{ position: [2.5, 1.5, 2.5], fov: 45 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 10, 5]} intensity={1.5} />
      <OrbitControls enableZoom autoRotate autoRotateSpeed={0.5} minDistance={1.5} maxDistance={8} />

      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.08} roughness={0.1} metalness={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* @ts-ignore */}
      <Line points={[[0, -1.2, 0], [0, 1.2, 0]]} color="#4b5563" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
      <Text position={[0, 1.35, 0]} fontSize={0.15} color="#f8fafc">|0⟩</Text>
      <Text position={[0, -1.35, 0]} fontSize={0.15} color="#f8fafc">|1⟩</Text>
      <Text position={[0, 1.12, 0.1]} fontSize={0.08} color="#9ca3af">+Z</Text>

      {/* @ts-ignore */}
      <Line points={[[-1.2, 0, 0], [1.2, 0, 0]]} color="#4b5563" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
      <Text position={[1.35, 0, 0]} fontSize={0.15} color="#f8fafc">|+⟩</Text>
      <Text position={[-1.35, 0, 0]} fontSize={0.15} color="#f8fafc">|-⟩</Text>
      <Text position={[1.12, 0.1, 0]} fontSize={0.08} color="#9ca3af">+X</Text>

      {/* @ts-ignore */}
      <Line points={[[0, 0, -1.2], [0, 0, 1.2]]} color="#4b5563" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
      <Text position={[0, 0, 1.35]} fontSize={0.15} color="#f8fafc">|i⟩</Text>
      <Text position={[0, 0, -1.35]} fontSize={0.15} color="#f8fafc">|-i⟩</Text>
      <Text position={[0.1, 0.1, 1.12]} fontSize={0.08} color="#9ca3af">+Y</Text>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1, 1.01, 64]} />
        <meshBasicMaterial color="#374151" side={THREE.DoubleSide} />
      </mesh>

      <SphereVector amplitudes={amplitudes} />
    </Canvas>
  );
}

export default function BlochSphere() {
  const { amplitudes, numQubits, operations } = useCircuitStore();
  const [isComputing, setIsComputing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsComputing(true);
    const timer = setTimeout(() => setIsComputing(false), 300);
    return () => clearTimeout(timer);
  }, [operations.length]);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpanded(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [expanded]);

  if (numQubits > 1) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/50 p-6 h-[400px] flex flex-col items-center justify-center text-center">
        <div className="space-y-3">
          <p className="text-2xl font-mono font-semibold text-primary/60">⊗</p>
          <p className="text-sm text-foreground font-semibold">Multi-Qubit State</p>
          <p className="text-xs text-muted font-mono leading-relaxed max-w-[240px]">
            Use the per-qubit Bloch panel below for multi-qubit systems.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border/50 bg-card/50 p-4 h-[400px] relative overflow-hidden">
        <div className="absolute top-3 left-4 right-3 flex items-center justify-between z-10">
          <span className="text-xs text-muted font-mono uppercase tracking-widest flex items-center gap-1.5">
            {isComputing && <span className="inline-block w-3 h-3 border border-primary/40 border-t-primary rounded-full animate-spin" />}
            Bloch Sphere
          </span>
          <button
            onClick={() => setExpanded(true)}
            className="text-[10px] font-mono px-2 py-1 rounded border border-border/40 bg-card/60 text-muted hover:text-foreground hover:border-primary/40 transition-all"
            title="Expand - scroll to zoom inside"
          >
            expand
          </button>
        </div>
        <div className="w-full h-full cursor-move">
          <SphereScene amplitudes={amplitudes} />
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-6"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative w-full max-w-2xl aspect-square rounded-2xl border border-primary/30 bg-background overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
              <span className="text-xs font-mono text-muted uppercase tracking-widest">
                Bloch Sphere - scroll to zoom - drag to rotate - Esc to close
              </span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-3 z-20 text-xs font-mono px-2.5 py-1 rounded border border-border/50 bg-card/80 text-muted hover:text-foreground transition-all"
            >
              close
            </button>
            <SphereScene amplitudes={amplitudes} />
          </div>
        </div>
      )}
    </>
  );
}
