"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// ── Shaders ────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vNoise;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uPointer;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    float n = snoise(position * 1.6 + uTime * 0.4);
    float n2 = snoise(position * 3.5 - uTime * 0.25);
    // pull toward pointer subtly
    float pull = max(dot(normalize(position), normalize(uPointer + vec3(0.001))), 0.0);
    float displacement = (n * 0.18 + n2 * 0.06) * uIntensity + pull * 0.06;
    vNoise = displacement;
    vec3 displaced = position + normal * displacement;
    vPos = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vNoise;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPos);
    float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 2.6);
    float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + vPos.y * 2.0);
    float t = clamp(vNoise * 5.0 + 0.5, 0.0, 1.0);
    vec3 base = mix(uColorA, uColorB, t);
    base = mix(base, uColorC, fresnel * 0.85);
    base += fresnel * 0.7 * pulse;
    gl_FragColor = vec4(base, 0.94);
  }
`;

// ── Core ───────────────────────────────────────────────────────────────────

function CoreSphere() {
  const ref = React.useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();
  const pointerVec = React.useRef(new THREE.Vector3());

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
      uPointer: { value: new THREE.Vector3() },
      uColorA: { value: new THREE.Color("#1d4ed8") },
      uColorB: { value: new THREE.Color("#22d3ee") },
      uColorC: { value: new THREE.Color("#a855f7") },
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uIntensity.value = 0.85 + Math.sin(t * 0.6) * 0.18;
    pointerVec.current.set(pointer.x, pointer.y, 0.6).normalize();
    uniforms.uPointer.value.lerp(pointerVec.current, 0.06);
    if (ref.current) {
      ref.current.rotation.y = t * 0.18 + pointer.x * 0.25;
      ref.current.rotation.x = Math.sin(t * 0.22) * 0.2 + pointer.y * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.05, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function InnerCore() {
  const ref = React.useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.5;
      ref.current.rotation.x = -t * 0.3;
      const m = ref.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.55 + Math.sin(t * 1.6) * 0.15;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.42, 0]} />
      <meshBasicMaterial
        color="#67e8f9"
        wireframe
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </mesh>
  );
}

function CoreWireframe() {
  const ref = React.useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = -t * 0.08;
      ref.current.rotation.z = Math.sin(t * 0.18) * 0.1;
      const m = ref.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.18 + Math.sin(t * 0.6) * 0.05;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.42, 2]} />
      <meshBasicMaterial
        color="#67e8f9"
        wireframe
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </mesh>
  );
}

function OuterCage() {
  const ref = React.useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
      ref.current.rotation.x = state.clock.elapsedTime * -0.02;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[3.05, 1]} />
      <meshBasicMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Knowledge nodes ─────────────────────────────────────────────────────────

type NodeDef = {
  label: string;
  radius: number;
  speed: number;
  phase: number;
  tilt: number;
  yAmp: number;
  yPhase: number;
  color: string;
};

const knowledgeNodes: NodeDef[] = [
  { label: "PyTorch",     radius: 1.95, speed: 0.42,  phase: 0.0,  tilt: 0.25,  yAmp: 0.55, yPhase: 0.4, color: "#67e8f9" },
  { label: "RAG",         radius: 2.05, speed: -0.34, phase: 1.0,  tilt: -0.32, yAmp: 0.45, yPhase: 1.2, color: "#a855f7" },
  { label: "MCP",         radius: 2.20, speed: 0.30,  phase: 2.0,  tilt: 0.18,  yAmp: 0.50, yPhase: 0.0, color: "#3b82f6" },
  { label: "LoRA",        radius: 1.90, speed: 0.55,  phase: 3.1,  tilt: -0.15, yAmp: 0.35, yPhase: 2.3, color: "#22d3ee" },
  { label: "GPT-5.4",     radius: 2.45, speed: -0.25, phase: 4.2,  tilt: 0.40,  yAmp: 0.65, yPhase: 1.8, color: "#a855f7" },
  { label: "Claude 4.7",  radius: 2.30, speed: 0.20,  phase: 5.0,  tilt: -0.30, yAmp: 0.30, yPhase: 3.0, color: "#67e8f9" },
  { label: "Llama 3.1",   radius: 2.10, speed: -0.45, phase: 0.6,  tilt: 0.05,  yAmp: 0.50, yPhase: 0.9, color: "#22d3ee" },
  { label: "Embed",       radius: 1.85, speed: 0.38,  phase: 1.7,  tilt: 0.45,  yAmp: 0.40, yPhase: 2.5, color: "#3b82f6" },
];

function nodePosition(def: NodeDef, time: number, out: THREE.Vector3) {
  const angle = time * def.speed + def.phase;
  out.x = Math.cos(angle) * def.radius;
  out.z = Math.sin(angle) * def.radius;
  out.y = Math.sin(time * def.speed * 0.7 + def.yPhase) * def.yAmp;
  // Tilt the orbit
  const cy = Math.cos(def.tilt);
  const sy = Math.sin(def.tilt);
  const yy = out.y * cy - out.z * sy;
  const zz = out.y * sy + out.z * cy;
  out.y = yy;
  out.z = zz;
}

function KnowledgeNode({ def }: { def: NodeDef }) {
  const groupRef = React.useRef<THREE.Group>(null!);
  const haloRef = React.useRef<THREE.Mesh>(null!);
  const tmp = React.useRef(new THREE.Vector3());

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    nodePosition(def, t, tmp.current);
    if (groupRef.current) {
      groupRef.current.position.copy(tmp.current);
    }
    if (haloRef.current) {
      const m = haloRef.current.material as THREE.MeshBasicMaterial;
      const pulse = 0.6 + Math.sin(t * 2.4 + def.phase) * 0.4;
      m.opacity = pulse * 0.4;
      const s = 1 + Math.sin(t * 1.6 + def.phase) * 0.12;
      haloRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshBasicMaterial
          color={def.color}
          transparent
          opacity={0.32}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.06, 18, 18]} />
        <meshBasicMaterial color={def.color} transparent opacity={0.95} />
      </mesh>
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.085}
        color="#e7f6ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#020412"
        material-toneMapped={false}
      >
        {def.label}
      </Text>
    </group>
  );
}

// ── Energy beams from core to nodes ─────────────────────────────────────────

const BEAM_COUNT = 3;
const BEAM_DURATION = 1.1;

function EnergyBeams() {
  const refs = React.useRef<(THREE.Line | null)[]>([]);
  const beamsRef = React.useRef(
    Array.from({ length: BEAM_COUNT }, (_, i) => ({
      target: i % knowledgeNodes.length,
      start: -i * 0.4,
    }))
  );
  const tmp = React.useRef(new THREE.Vector3());
  const tmp2 = React.useRef(new THREE.Vector3());

  const geometries = React.useMemo(
    () =>
      Array.from({ length: BEAM_COUNT }, () => {
        const g = new THREE.BufferGeometry();
        const positions = new Float32Array(2 * 3);
        g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return g;
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    beamsRef.current.forEach((beam, i) => {
      const elapsed = t - beam.start;
      let progress = elapsed / BEAM_DURATION;
      if (progress >= 1) {
        // pick a new random node, ensure different from current
        let next = Math.floor(Math.random() * knowledgeNodes.length);
        if (next === beam.target) next = (next + 1) % knowledgeNodes.length;
        beam.target = next;
        beam.start = t;
        progress = 0;
      }

      const node = knowledgeNodes[beam.target];
      nodePosition(node, t, tmp.current);
      tmp2.current.set(0, 0, 0).lerp(tmp.current, 0.6 + 0.4 * progress);

      const line = refs.current[i];
      if (!line) return;
      const positions = (line.geometry as THREE.BufferGeometry).attributes
        .position as THREE.BufferAttribute;
      positions.setXYZ(0, 0, 0, 0);
      positions.setXYZ(1, tmp.current.x, tmp.current.y, tmp.current.z);
      positions.needsUpdate = true;

      const m = line.material as THREE.LineBasicMaterial;
      const fade = Math.sin(progress * Math.PI);
      m.opacity = fade * 0.85;
    });
  });

  return (
    <>
      {geometries.map((geom, i) => {
        const node = knowledgeNodes[beamsRef.current[i].target];
        return (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <primitive
            // eslint-disable-next-line react/no-unknown-property
            object={
              new THREE.Line(
                geom,
                new THREE.LineBasicMaterial({
                  color: new THREE.Color(node.color),
                  transparent: true,
                  opacity: 0,
                  depthWrite: false,
                  blending: THREE.AdditiveBlending,
                  linewidth: 1,
                })
              )
            }
            ref={(el: THREE.Line | null) => {
              refs.current[i] = el;
            }}
            key={i}
          />
        );
      })}
    </>
  );
}

// ── Pulse waves emanating from center ──────────────────────────────────────

function PulseWaves() {
  const refs = React.useRef<(THREE.Mesh | null)[]>([]);
  const offsets = React.useMemo(() => [0, 1.3, 2.6], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = ((t + offsets[i]) % 4) / 4;
      const scale = 0.4 + phase * 2.6;
      mesh.scale.setScalar(scale);
      const m = mesh.material as THREE.MeshBasicMaterial;
      m.opacity = (1 - phase) * 0.35;
    });
  });

  return (
    <>
      {offsets.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[1, 0.012, 16, 96]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

// ── Orbital rings (kept) ────────────────────────────────────────────────────

function OrbitalRing({
  radius,
  speed,
  tilt,
  color,
  particleCount = 80,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
  particleCount?: number;
}) {
  const ref = React.useRef<THREE.Group>(null!);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const a = (i / particleCount) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      arr[i * 3 + 2] = Math.sin(a) * radius;
    }
    return arr;
  }, [radius, particleCount]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={ref} rotation={tilt}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={color}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.005, 16, 200]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── Particle clouds ─────────────────────────────────────────────────────────

function ParticleCloud() {
  const count = 500;
  const ref = React.useRef<THREE.Points>(null!);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 1.6;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#cbd5f5"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function StarField() {
  const count = 700;
  const ref = React.useRef<THREE.Points>(null!);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.012;
      const m = ref.current.material as THREE.PointsMaterial;
      m.opacity = 0.45 + Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#94a3b8"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Public component ───────────────────────────────────────────────────────

export function AICoreScene({
  className,
  height = 480,
}: {
  className?: string;
  height?: number;
}) {
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
        style={{
          height,
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.32), transparent 65%)",
        }}
        aria-hidden
      />
    );
  }

  return (
    <div className={className} style={{ height }} aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.6, 5.4], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight
          position={[3, 3, 3]}
          intensity={1.2}
          color={new THREE.Color("#60a5fa")}
        />
        <pointLight
          position={[-3, -2, 2]}
          intensity={0.85}
          color={new THREE.Color("#a855f7")}
        />

        <StarField />
        <ParticleCloud />

        <OuterCage />
        <CoreWireframe />
        <CoreSphere />
        <InnerCore />

        <PulseWaves />

        <OrbitalRing
          radius={1.7}
          speed={0.45}
          tilt={[0.3, 0, 0.1]}
          color="#22d3ee"
          particleCount={130}
        />
        <OrbitalRing
          radius={2.15}
          speed={-0.28}
          tilt={[-0.4, 0.5, 0]}
          color="#a855f7"
          particleCount={100}
        />
        <OrbitalRing
          radius={2.6}
          speed={0.18}
          tilt={[0.2, -0.3, 0.4]}
          color="#3b82f6"
          particleCount={70}
        />

        {knowledgeNodes.map((def, i) => (
          <KnowledgeNode key={i} def={def} />
        ))}

        <EnergyBeams />
      </Canvas>
    </div>
  );
}
