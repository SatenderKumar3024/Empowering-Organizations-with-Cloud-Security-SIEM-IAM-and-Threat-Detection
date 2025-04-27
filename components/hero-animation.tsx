"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useTheme } from "next-themes"
import { Color } from "three"

function Shield() {
  const { theme } = useTheme()
  const meshRef = useRef(null)
  const particlesRef = useRef(null)

  // Use a shield-like shape
  const geometry = useRef({
    positions: [] as number[],
    colors: [] as number[],
  })

  useEffect(() => {
    // Create points for a shield
    const particleCount = 1500
    const positions = []
    const colors = []
    const primaryColor = theme === "dark" ? new Color("#4facfe") : new Color("#3b82f6")
    const secondaryColor = theme === "dark" ? new Color("#00f2fe") : new Color("#818cf8")

    for (let i = 0; i < particleCount; i++) {
      // Shield-like shape
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1) * 0.8 // Constrain to shield shape

      // Create shield with a bit of randomness
      const r = 2 + Math.random() * 0.3

      // Convert to Cartesian coordinates with shield shape
      let x = r * Math.sin(phi) * Math.cos(theta) * 0.8
      let y = r * Math.sin(phi) * Math.sin(theta) * 0.8
      let z = r * Math.cos(phi)

      // Make it more shield-like by flattening the bottom
      if (z < -0.5) {
        z = -0.5 - Math.pow(Math.abs(z + 0.5), 2) * 0.5
      }

      // Add some noise to break perfect symmetry
      x += (Math.random() - 0.5) * 0.1
      y += (Math.random() - 0.5) * 0.1
      z += (Math.random() - 0.5) * 0.1

      positions.push(x, y, z)

      // Color gradient from top to bottom
      const color = new Color().lerpColors(primaryColor, secondaryColor, (z + 2) / 4)
      colors.push(color.r, color.g, color.b)
    }

    geometry.current = {
      positions,
      colors,
    }
  }, [theme])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const mainColor = theme === "dark" ? "#60a5fa" : "#3b82f6"
  const emissiveColor = theme === "dark" ? "#312e81" : "#dbeafe"

  return (
    <>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color={mainColor}
          emissive={emissiveColor}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Particles around the shield */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={geometry.current.positions.length / 3}
            array={new Float32Array(geometry.current.positions)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={geometry.current.colors.length / 3}
            array={new Float32Array(geometry.current.colors)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
      </points>
    </>
  )
}

export function HeroAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Shield />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
