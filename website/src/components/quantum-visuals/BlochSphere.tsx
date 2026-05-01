'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useCircuitStore } from '@/lib/store/circuitStore';

function SphereVector({ amplitudes }: { amplitudes: any[] }) {
  const vectorRef = useRef<THREE.ArrowHelper>(null);

  // Calculate Bloch vector x, y, z
  const targetVec = useMemo(() => {
    if (amplitudes.length !== 2) return new THREE.Vector3(0, 1, 0); // Default to |0> if not 1-qubit

    const alpha = amplitudes[0];
    const beta = amplitudes[1];

    // P = alpha* beta = (a.re - i*a.im)(b.re + i*b.im)
    const Pre = alpha.re * beta.re + alpha.im * beta.im;
    const Pim = alpha.re * beta.im - alpha.im * beta.re;

    const x = 2 * Pre;
    const y = 2 * Pim;
    const z = (alpha.re * alpha.re + alpha.im * alpha.im) - (beta.re * beta.re + beta.im * beta.im);

    // Map to Three.js coordinates (Y is up = Bloch Z)
    return new THREE.Vector3(x, z, y).normalize();
  }, [amplitudes]);

  const currentDirRef = useRef(new THREE.Vector3(0, 1, 0));

  // Smoothly interpolate the visual vector towards the target vector
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

export default function BlochSphere() {
  const { amplitudes, numQubits, operations } = useCircuitStore();
  const [isComputing, setIsComputing] = useState(false);

  // Show loading state briefly when operations change
  useEffect(() => {
    setIsComputing(true);
    const timer = setTimeout(() => setIsComputing(false), 300);
    return () => clearTimeout(timer);
  }, [operations.length]);
  
  if (numQubits > 1) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/50 p-6 h-[400px] flex flex-col items-center justify-center text-center">
        <div className="space-y-3">
          <p className="text-2xl font-mono font-semibold text-primary/60">⊗</p>
          <p className="text-sm text-foreground font-semibold">Multi-Qubit State</p>
          <p className="text-xs text-muted font-mono leading-relaxed max-w-[240px]">
            The Bloch sphere visualizes single-qubit states. For multi-qubit systems, view the state vector and probability amplitudes on the right.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 h-[400px] relative overflow-hidden">
      <p className="absolute top-4 left-4 text-xs text-muted font-mono uppercase tracking-widest z-10">Bloch Sphere {isComputing && '🔄'}</p>
      
      {isComputing && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-muted font-mono">Computing...</p>
          </div>
        </div>
      )}
      
      <div className="w-full h-full cursor-move">
        <Canvas camera={{ position: [2.5, 1.5, 2.5], fov: 45 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 10, 5]} intensity={1.5} />
          
          <OrbitControls 
             enableZoom={false} 
             autoRotate 
             autoRotateSpeed={0.5}
          />
          
          {/* Outer Sphere */}
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial 
               color="#ffffff" 
               transparent={true} 
               opacity={0.08}
               roughness={0.1}
               metalness={0.1} 
               side={THREE.DoubleSide} 
               depthWrite={false}
            />
          </mesh>

          {/* Axes */}
          {/* Z Axis (Three.js Y) */}
          {/* @ts-ignore */}
          <Line points={[[0, -1.2, 0], [0, 1.2, 0]]} color="#4b5563" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
          <Text position={[0, 1.3, 0]} fontSize={0.15} color="#f8fafc">|0⟩</Text>
          <Text position={[0, -1.3, 0]} fontSize={0.15} color="#f8fafc">|1⟩</Text>
          <Text position={[0, 1.1, 0.1]} fontSize={0.08} color="#9ca3af">+Z</Text>
          
          {/* X Axis (Three.js X) */}
          {/* @ts-ignore */}
          <Line points={[[-1.2, 0, 0], [1.2, 0, 0]]} color="#4b5563" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
          <Text position={[1.3, 0, 0]} fontSize={0.15} color="#f8fafc">|+⟩</Text>
          <Text position={[-1.3, 0, 0]} fontSize={0.15} color="#f8fafc">|−⟩</Text>
          <Text position={[1.1, 0.1, 0]} fontSize={0.08} color="#9ca3af">+X</Text>

          {/* Y Axis (Three.js Z) */}
          {/* @ts-ignore */}
          <Line points={[[0, 0, -1.2], [0, 0, 1.2]]} color="#4b5563" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
          <Text position={[0, 0, 1.3]} fontSize={0.15} color="#f8fafc">|i⟩</Text>
          <Text position={[0, 0, -1.3]} fontSize={0.15} color="#f8fafc">|−i⟩</Text>
          <Text position={[0.1, 0.1, 1.1]} fontSize={0.08} color="#9ca3af">+Y</Text>
          
          {/* Equator */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
             <ringGeometry args={[1, 1.01, 64]} />
             <meshBasicMaterial color="#374151" side={THREE.DoubleSide} />
          </mesh>

          {/* Dynamic State Vector */}
          <SphereVector amplitudes={amplitudes} />

        </Canvas>
      </div>
    </div>
  );
}