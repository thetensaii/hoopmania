import { useFrame } from "@react-three/fiber"
import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { type RefObject } from "react"

const ballDiameter_M = 0.05

type BallProps = {
  ref: RefObject<RapierRigidBody | null>
}


export const Ball = ({ ref }: BallProps) => {

  useFrame(() => {
    if (ref.current) {
      const position = ref.current.translation()
      if (position.y < -2 || position.z > 5) {
        ref.current.lockTranslations(true, false)
        ref.current.setTranslation({ x: 0, y: -1, z: -3 }, false)
        ref.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
        ref.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
      }
    }
  })

  const handleClick = () => {
    if (ref.current) {
      ref.current.lockTranslations(false, true)
      ref.current.applyImpulse({ x: 0, y: 0.4, z: 0.3 }, true);
    }
  }

  return (
    <RigidBody ref={ref} colliders="ball" lockTranslations position={[0, -1, -3]}>
      <mesh onClick={handleClick}>
        <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
        <meshStandardMaterial color="#F88158" />
      </mesh>
    </RigidBody>
  )
}