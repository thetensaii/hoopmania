import { useFrame } from "@react-three/fiber"
import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { type RefObject } from "react"
import type { Vector3 } from "three"
import { useResetBallPosition } from "../hooks/useResetBallPosition"

const ballDiameter_M = 0.05

type BallProps = {
  ballRef: RefObject<RapierRigidBody | null>
  initialPosition: Vector3
}


export const Ball = ({ ballRef, initialPosition }: BallProps) => {
  const resetBallPosition = useResetBallPosition(ballRef)

  useFrame(() => {
    if (ballRef.current) {
      const position = ballRef.current.translation()
      if (position.y < -2 || position.z > 10) {
        resetBallPosition()
      }
    }
  })

  return (
    <RigidBody ref={ballRef} colliders="ball" position={initialPosition} lockTranslations >
      <mesh>
        <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
        <meshStandardMaterial color="#F88158" />
      </mesh>
    </RigidBody>
  )
}