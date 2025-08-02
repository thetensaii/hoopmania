import { useFrame } from "@react-three/fiber"
import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { type RefObject } from "react"
import type { Vector3 } from "three"

const ballDiameter_M = 0.05

type BallProps = {
  ref: RefObject<RapierRigidBody | null>
  initialPosition: Vector3
}


export const Ball = ({ ref, initialPosition }: BallProps) => {

  useFrame(() => {
    if (ref.current) {
      const position = ref.current.translation()
      if (position.y < -2 || position.z > 10) {
        ref.current.lockTranslations(true, false)
        ref.current.setTranslation(initialPosition, false)
        ref.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
        ref.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
      }
    }
  })

  return (
    <RigidBody ref={ref} colliders="ball" position={initialPosition} lockTranslations >
      <mesh>
        <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
        <meshStandardMaterial color="#F88158" />
      </mesh>
    </RigidBody>
  )
}