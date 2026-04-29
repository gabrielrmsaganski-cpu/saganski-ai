"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralCore() {
  const groupRef = React.useRef<THREE.Group>(null!);
  const linesRef = React.useRef<THREE.LineSegments>(null!);

  const { positions, indices, count } = React.useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.55 + (Math.random() - 0.5) * 0.15;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      points.push(new THREE.Vector3(x, y, z));
    }

    const idx: number[] = [];
    const threshold = 0.65;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = points[i].distanceTo(points[j]);
        if (d < threshold) {
          idx.push(i, j);
        }
      }
    }
    return { positions, indices: new Uint16Array(idx), count };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.18;
    }
    if (linesRef.current?.material) {
      const m = linesRef.current.material as THREE.LineBasicMaterial;
      m.opacity = 0.25 + Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#67e8f9"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
          <bufferAttribute attach="index" args={[indices, 1]} count={indices.length} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </lineSegments>

      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

export function NeuralBackground({ className }: { className?: string }) {
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  if (!enabled) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.18), transparent 60%)",
        }}
      />
    );
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <NeuralCore />
      </Canvas>
    </div>
  );
}
