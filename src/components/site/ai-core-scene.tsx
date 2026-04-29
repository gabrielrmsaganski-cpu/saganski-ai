"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Vertex shader: noise-based displacement on icosahedron
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vNoise;
  uniform float uTime;
  uniform float uIntensity;

  // Simplex 3D noise (Ashima)
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
    float displacement = (n * 0.18 + n2 * 0.06) * uIntensity;
    vNoise = displacement;
    vec3 displaced = position + normal * displacement;
    vPos = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

// Fragment: fresnel + iridescent gradient
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
    base += fresnel * 0.6 * pulse;
    gl_FragColor = vec4(base, 0.92);
  }
`;

function CoreSphere() {
  const ref = React.useRef<THREE.Mesh>(null!);
  const matRef = React.useRef<THREE.ShaderMaterial>(null!);

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
      uColorA: { value: new THREE.Color("#1d4ed8") },
      uColorB: { value: new THREE.Color("#22d3ee") },
      uColorC: { value: new THREE.Color("#a855f7") },
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uIntensity.value = 0.85 + Math.sin(t * 0.6) * 0.15;
    if (ref.current) {
      ref.current.rotation.y = t * 0.16;
      ref.current.rotation.x = Math.sin(t * 0.22) * 0.18;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.05, 64]} />
      <shaderMaterial
        ref={matRef}
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
      <icosahedronGeometry args={[1.4, 2]} />
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

function ParticleCloud() {
  const count = 400;
  const ref = React.useRef<THREE.Points>(null!);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 1.2;
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
        camera={{ position: [0, 0.4, 4.6], fov: 45 }}
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
          intensity={0.8}
          color={new THREE.Color("#a855f7")}
        />
        <CoreSphere />
        <CoreWireframe />
        <OrbitalRing
          radius={1.85}
          speed={0.45}
          tilt={[0.3, 0, 0.1]}
          color="#22d3ee"
          particleCount={120}
        />
        <OrbitalRing
          radius={2.3}
          speed={-0.28}
          tilt={[-0.4, 0.5, 0]}
          color="#a855f7"
          particleCount={90}
        />
        <OrbitalRing
          radius={2.75}
          speed={0.18}
          tilt={[0.2, -0.3, 0.4]}
          color="#3b82f6"
          particleCount={60}
        />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
