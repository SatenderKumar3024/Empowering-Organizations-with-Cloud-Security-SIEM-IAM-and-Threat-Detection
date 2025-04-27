"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sphere, Text, Html, useTexture } from "@react-three/drei"
import type * as THREE from "three"
import { useTheme } from "next-themes"

interface ThreatPoint {
  position: [number, number, number]
  scale: number
  color: string
  country: string
  threatType: string
  count: number
}

interface GlobeProps {
  timeFilter: string
}

const ThreatPoints = ({ timeFilter }: GlobeProps) => {
  const pointsRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const [hovered, setHovered] = useState<number | null>(null)
  const [clicked, setClicked] = useState<number | null>(null)

  const threatPoints = useMemo(() => {
    // Number of threat points based on time filter
    const counts = {
      "24h": 30,
      "12h": 20,
      "6h": 12,
      "1h": 5,
    }

    const pointCount = counts[timeFilter as keyof typeof counts] || 30
    const points: ThreatPoint[] = []

    const countries = [
      "United States",
      "China",
      "Russia",
      "North Korea",
      "Iran",
      "Brazil",
      "India",
      "Germany",
      "UK",
      "Japan",
    ]
    const threatTypes = ["Ransomware", "DDoS", "Phishing", "Data Breach", "Malware", "Zero-day", "Supply Chain"]

    for (let i = 0; i < pointCount; i++) {
      // Generate a random position on the sphere
      const phi = Math.acos(-1 + (2 * i) / pointCount)
      const theta = Math.sqrt(pointCount * Math.PI) * phi

      // Convert spherical to cartesian coordinates
      const x = 2.1 * Math.sin(phi) * Math.cos(theta)
      const y = 2.1 * Math.sin(phi) * Math.sin(theta)
      const z = 2.1 * Math.cos(phi)

      // Add some randomness to make it look more natural
      const position: [number, number, number] = [
        x + (Math.random() - 0.5) * 0.5,
        y + (Math.random() - 0.5) * 0.5,
        z + (Math.random() - 0.5) * 0.5,
      ]

      // Random size and color
      const scale = Math.random() * 0.1 + 0.05
      const colors = ["#ff4d4d", "#ffaa00", "#3399ff", "#ff66cc"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Random country and threat type
      const country = countries[Math.floor(Math.random() * countries.length)]
      const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
      const count = Math.floor(Math.random() * 1000) + 100

      points.push({ position, scale, color, country, threatType, count })
    }

    return points
  }, [timeFilter])

  // Animate threat points
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={pointsRef}>
      {threatPoints.map((point, i) => (
        <mesh
          key={i}
          position={point.position}
          onPointerOver={() => setHovered(i)}
          onPointerOut={() => setHovered(null)}
          onClick={() => setClicked(clicked === i ? null : i)}
        >
          <sphereGeometry args={[point.scale, 8, 8]} />
          <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={hovered === i ? 4 : 2} />

          {(hovered === i || clicked === i) && (
            <Html position={[0, point.scale + 0.1, 0]} center style={{ pointerEvents: "none" }}>
              <div className="bg-background/90 backdrop-blur-sm p-2 rounded-md border border-primary/20 shadow-lg text-xs w-48">
                <div className="font-bold text-primary">{point.country}</div>
                <div className="text-muted-foreground">Threat: {point.threatType}</div>
                <div className="text-muted-foreground">Count: {point.count.toLocaleString()}</div>
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </group>
  )
}

const Globe = ({ timeFilter }: GlobeProps) => {
  const globeRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const [hovered, setHovered] = useState(false)

  // Load earth texture
  const earthTexture = useTexture("/assets/3d/texture_earth.jpg")

  const globeColor = theme === "dark" ? "#1a2035" : "#2a3d66"
  const globeEmissive = theme === "dark" ? "#101525" : "#1e2a4a"

  // Animate globe rotation
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Sphere
      ref={globeRef}
      args={[2, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        map={earthTexture}
        color={globeColor}
        emissive={globeEmissive}
        emissiveIntensity={0.2}
        roughness={0.7}
        metalness={0.3}
        transparent
        opacity={0.9}
        wireframe={hovered}
      />
    </Sphere>
  )
}

const GlobeInfo = () => {
  const { camera } = useThree()

  return (
    <group position={[0, 4, 0]}>
      <Text
        position={[0, 0, 0]}
        color="#4facfe"
        fontSize={0.5}
        font="/fonts/Inter_Bold.json"
        anchorX="center"
        anchorY="middle"
      >
        GLOBAL THREAT INTELLIGENCE
      </Text>

      <Html position={[0, -1, 0]} center>
        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border border-primary/20 shadow-lg">
          <div className="text-sm font-bold mb-2">Interact with the globe:</div>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Click and drag to rotate</li>
            <li>• Hover over threat points for details</li>
            <li>• Click a threat point to pin its information</li>
          </ul>
        </div>
      </Html>
    </group>
  )
}

export function ThreeDGlobe({ timeFilter }: GlobeProps) {
  const { theme } = useTheme()
  const ambientLightColor = theme === "dark" ? "#334155" : "#64748b"

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.4} color={ambientLightColor} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a855f7" />

      <Globe timeFilter={timeFilter} />
      <ThreatPoints timeFilter={timeFilter} />
      <GlobeInfo />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        dampingFactor={0.1}
      />
    </Canvas>
  )
}
