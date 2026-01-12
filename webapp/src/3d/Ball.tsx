import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { type RefObject } from "react"
import type { Vector3 } from "three"
import { resetBallPosition } from "./utils/ballActionsFunctions"
import { useFrame } from "@react-three/fiber"

const ballDiameter_M = 0.05

type BallProps = {
  rigidBodyRef: RefObject<RapierRigidBody | null>
  isShootingRef: RefObject<boolean>
  initialPosition: Vector3
}

export const Ball = ({ rigidBodyRef, isShootingRef, initialPosition }: BallProps) => {

  useFrame(() => {
    if (rigidBodyRef.current) {
      const position = rigidBodyRef.current.translation()
      if (position.y < -2 || position.z > 10) {
        resetBallPosition(rigidBodyRef, isShootingRef)
      }
    }
  })

  return (
    <RigidBody ref={rigidBodyRef} colliders="ball" position={initialPosition} lockTranslations>
      <mesh>
        <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
        <meshStandardMaterial color="#F88158" />
      </mesh>
    </RigidBody>
  )
}