import { useMemo, useRef } from "react"
import { DoubleSide, RawShaderMaterial, Uniform } from "three"

import gridVertex from './shaders/grid.vert'
import gridFragment from './shaders/grid.frag'
import { useFrame } from "@react-three/fiber"
import { useGamePhase } from "../../../hooks/useGamePhase"

const WIDTH = 20
const HEIGHT = 7
export const Grid = () => {
  const materialRef = useRef<RawShaderMaterial>(null)
  const { isGamePlaying } = useGamePhase()

  const uniforms = useMemo(() => {
    return {
      uTime: new Uniform<number>(0),
      uWidth: new Uniform<number>(WIDTH),
      uHeight: new Uniform<number>(HEIGHT),
    }
  }, [])


  useFrame(({ clock }) => {
    if (materialRef.current && isGamePlaying) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })


  return (
    <mesh position={[0, -5.3, -5]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[WIDTH, HEIGHT, 100, 2000]} />
      <rawShaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        side={DoubleSide}
        transparent
      >
      </rawShaderMaterial>
    </mesh>
  )
}