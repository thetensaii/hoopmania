import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { type RefObject } from "react"
import type { Mesh, Vector3 } from "three"
import { resetBallPosition } from "./utils/ballActionsFunctions"
import { useFrame } from "@react-three/fiber"
import { useBallAnimation } from "./hooks/useBallAnimation"

const ballDiameter_M = 0.05

type BallProps = {
  rigidBodyRef: RefObject<RapierRigidBody | null>
  meshRef: RefObject<Mesh | null>
  isShootingRef: RefObject<boolean>
  initialPosition: Vector3
}

export const Ball = ({ rigidBodyRef, meshRef, isShootingRef, initialPosition }: BallProps) => {
  const { shoot: ballShootAnimation } = useBallAnimation(meshRef)

  useFrame(() => {
    if (rigidBodyRef.current) {
      const position = rigidBodyRef.current.translation()
      if (position.y < -2 || position.z > 10) {
        resetBallPosition(rigidBodyRef, isShootingRef)
        ballShootAnimation.reset()
      }
    }
  })

  return (
    <RigidBody ref={rigidBodyRef} colliders="ball" position={initialPosition} lockTranslations>
      <mesh ref={meshRef}>
        <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
        <meshStandardMaterial color={"#f9764a"} emissive="#fc4102" emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </RigidBody>
  )
}