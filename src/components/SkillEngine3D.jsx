import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'

function EngineCore({ reducedMotion }) {
  const core = useRef(null)
  const ring = useRef(null)
  const elapsed = useRef(0)

  useFrame((state, delta) => {
    if (reducedMotion) return
    elapsed.current += delta
    if (core.current) {
      core.current.rotation.y += delta * 0.28
      core.current.position.y = Math.sin(elapsed.current * 1.4) * 0.045
    }
    if (ring.current) ring.current.rotation.z -= delta * 0.18
    state.camera.position.x += (state.pointer.x * 0.16 - state.camera.position.x) * 0.025
    state.camera.position.y += (state.pointer.y * 0.12 - state.camera.position.y) * 0.025
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={core}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.78, 0.94, 1.65, 8, 1]} />
          <meshStandardMaterial color="#5524A8" roughness={0.24} metalness={0.42} emissive="#39116f" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[0, 1.12, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.72, 0.42, 8, 1]} />
          <meshStandardMaterial color="#7d42c2" roughness={0.22} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow>
          <cylinderGeometry args={[0.95, 0.72, 0.24, 8, 1]} />
          <meshStandardMaterial color="#ffc928" roughness={0.28} metalness={0.32} emissive="#ffc928" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 0.18, 0.79]}>
          <boxGeometry args={[0.68, 0.66, 0.12]} />
          <meshStandardMaterial color="#ffc928" emissive="#ffbd23" emissiveIntensity={1.4} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.18, 0.87]}>
          <torusGeometry args={[0.19, 0.035, 10, 32]} />
          <meshStandardMaterial color="#fff2b8" emissive="#fff2b8" emissiveIntensity={1.1} />
        </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.5, 0.18, 0]}>
        <torusGeometry args={[1.24, 0.045, 12, 96]} />
        <meshStandardMaterial color="#ffc928" emissive="#ffc928" emissiveIntensity={0.8} metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, -0.35, 0]}>
        <torusGeometry args={[1.38, 0.018, 8, 96]} />
        <meshStandardMaterial color="#bb8cf0" emissive="#8d4be2" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[-1.02, 0.08, 0]} castShadow>
        <boxGeometry args={[0.17, 0.65, 0.22]} />
        <meshStandardMaterial color="#ffc928" emissive="#ffc928" emissiveIntensity={0.55} metalness={0.35} />
      </mesh>
      <mesh position={[1.02, 0.08, 0]} castShadow>
        <boxGeometry args={[0.17, 0.65, 0.22]} />
        <meshStandardMaterial color="#ffc928" emissive="#ffc928" emissiveIntensity={0.55} metalness={0.35} />
      </mesh>
      <mesh position={[0, -1.12, 0]}>
        <cylinderGeometry args={[0.55, 0.8, 0.16, 8]} />
        <meshStandardMaterial color="#43147e" metalness={0.45} roughness={0.28} />
      </mesh>
    </group>
  )
}

function SkillModule({ position, color, size = 0.22, reducedMotion }) {
  const ref = useRef(null)
  const elapsed = useRef(0)
  useFrame((_, delta) => {
    if (reducedMotion) return
    elapsed.current += delta
    if (ref.current) {
      ref.current.rotation.y = Math.sin(elapsed.current * 0.65 + position[0]) * 0.22
      ref.current.position.y = position[1] + Math.sin(elapsed.current * 1.4 + position[0]) * 0.09
    }
  })

  return (
    <mesh ref={ref} position={position} castShadow>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial color={color} roughness={0.24} metalness={0.25} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  )
}

function SkillOrb({ reducedMotion }) {
  const orbit = useRef(null)
  const orb = useRef(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (reducedMotion) return
    elapsed.current += delta
    if (orbit.current) orbit.current.rotation.y += delta * 0.24
    if (orb.current) orb.current.position.y = Math.sin(elapsed.current * 1.2) * 0.07
  })

  return (
    <group position={[1.55, 1.25, -0.2]}>
      <mesh ref={orb}>
        <sphereGeometry args={[0.38, 32, 24]} />
        <meshPhysicalMaterial color="#8c57c9" roughness={0.14} metalness={0.18} transparent opacity={0.82} clearcoat={1} clearcoatRoughness={0.12} emissive="#5524a8" emissiveIntensity={0.24} />
      </mesh>
      <mesh ref={orbit} rotation={[0.9, 0.2, 0.25]}>
        <torusGeometry args={[0.56, 0.025, 10, 64]} />
        <meshStandardMaterial color="#ffc928" metalness={0.72} roughness={0.2} emissive="#ffc928" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0.38, 0.2, 0.1]}>
        <icosahedronGeometry args={[0.075, 1]} />
        <meshStandardMaterial color="#fff2b8" emissive="#ffc928" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

function Scene({ reducedMotion }) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <pointLight position={[3, 4, 4]} intensity={32} color="#fff0b0" />
      <pointLight position={[-3, 1, -2]} intensity={22} color="#9b66ed" />
      <EngineCore reducedMotion={reducedMotion} />
      <SkillOrb reducedMotion={reducedMotion} />
      <SkillModule position={[-1.75, 1.15, 0.15]} color="#ffc928" size={0.2} reducedMotion={reducedMotion} />
      <SkillModule position={[1.85, 0.65, 0.1]} color="#b77df1" size={0.24} reducedMotion={reducedMotion} />
      <SkillModule position={[-1.55, -1.2, -0.2]} color="#8d4be2" size={0.17} reducedMotion={reducedMotion} />
      <SkillModule position={[1.5, -1.3, 0.2]} color="#ffc928" size={0.16} reducedMotion={reducedMotion} />
    </>
  )
}

export default function SkillEngine3D({ reducedMotion = false }) {
  return (
    <Canvas
      className="skill-engine-canvas"
      camera={{ position: [0, 0, 5.3], fov: 38 }}
      dpr={[1, 1.4]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      fallback={<div className="engine-canvas-fallback" aria-hidden="true"><span>&lt;/&gt;</span></div>}
    >
      <Suspense fallback={null}>
        <Scene reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  )
}
