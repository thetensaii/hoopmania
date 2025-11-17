import { Color, Group, RawShaderMaterial, Texture, Vector2, Vector3 } from "three"
import fireworkVertex from './shaders/firework.vert'
import fireworkFragment from './shaders/firework.frag'
import { useMemo, useRef } from "react"
import { useThree } from "@react-three/fiber"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { createFireworkAttributes } from "./CreateFireworkAttributes"
import { Html } from "@react-three/drei"

type Props = {
  position: Vector3
  texture: Texture
  lifeTimeInMs: number
  onAnimationEnd: () => void
}


export const Firework = ({ position, texture, lifeTimeInMs, onAnimationEnd }: Props) => {
  const materialRef = useRef<RawShaderMaterial>(null)
  const scoreGroupRef = useRef<Group>(null)
  const { positionsArray, sizesArray, timeMultipliersArray } = useMemo(() => createFireworkAttributes(200 + Math.floor(200 * Math.random())), [])
  const color = useMemo(() => {
    return new Color().setHSL(Math.random(), 1, 0.7)
  }, [])
  const size = useThree((state) => state.size)

  useGSAP(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current.uniforms.uProgress, { value: 1, duration: lifeTimeInMs / 1_000, ease: 'none', onComplete: onAnimationEnd })
    }
    if (scoreGroupRef.current) {
      gsap.to(scoreGroupRef.current.position, { y: 0.5, duration: lifeTimeInMs / 1_000 })
    }
  })

  return (
    <points position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positionsArray, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizesArray, 1]} />
        <bufferAttribute attach="attributes-aTimeMultiplier" args={[timeMultipliersArray, 1]} />
      </bufferGeometry>
      <rawShaderMaterial
        ref={materialRef}
        vertexShader={fireworkVertex}
        fragmentShader={fireworkFragment}
        transparent
        depthWrite={false}
      >
        <uniform attach="uniforms-uProgress" value={0} />
        <uniform attach="uniforms-uSize" value={0.7} />
        <uniform attach="uniforms-uResolution" value={new Vector2(size.width * window.devicePixelRatio, size.height * window.devicePixelRatio)} />
        <uniform attach="uniforms-uTexture" value={texture} />
        <uniform attach="uniforms-uColor" value={color} />
      </rawShaderMaterial>
      <group ref={scoreGroupRef}>
        <Html scale={10}>
          <div style={{ fontSize: '2rem', transform: 'translateX(-50%)' }}>+1</div>
        </Html>
      </group>
    </points>
  )
}