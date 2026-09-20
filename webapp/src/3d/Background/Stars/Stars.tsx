import { useMemo } from "react"
import starVertex from './shaders/star.vert'
import starFragment from './shaders/star.frag'
import { AdditiveBlending, DoubleSide, SRGBColorSpace } from "three"
import { useTexture } from "@react-three/drei"

const COUNT = 200

export const Stars = () => {
  const { vertices, sizes } = useMemo(() => {
    const vertices = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3
      vertices[idx] = Math.random() * 30 - 15;
      vertices[idx + 1] = Math.random() * 20 - 10;
      vertices[idx + 2] = 0;

      sizes[i] = 2 + Math.random() * 15
    }
    return { vertices, sizes }
  }, [])

  const starTexture = useTexture('./particles/firework.png')
  starTexture.colorSpace = SRGBColorSpace

  return (
    <points position={[0, 0, -10]} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[vertices, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <rawShaderMaterial
        vertexShader={starVertex}
        fragmentShader={starFragment}
        side={DoubleSide}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      >
        <uniform attach="uniforms-uTexture" value={starTexture} />
      </rawShaderMaterial>
    </points>
  )
}