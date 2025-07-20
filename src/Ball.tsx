import { useFrame } from "@react-three/fiber"
import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { useRef } from "react"

const ballDiameter_M = 0.05

export const Ball = () => {

  const ballRef = useRef<RapierRigidBody>(null)

  useFrame(() => {
    if (ballRef.current) {
      const position = ballRef.current.translation()
      if (position.y < -2 || position.z > 5) {
        ballRef.current.lockTranslations(true, false)
        ballRef.current.setTranslation({ x: 0, y: -1, z: -3 }, false)
        ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
        ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
      }
    }
  })

  const handleClick = () => {
    if (ballRef.current) {
      ballRef.current.lockTranslations(false, true)
      ballRef.current.applyImpulse({ x: 0, y: 0.4, z: 0.3 }, true);
    }
  }

  return (
    <RigidBody ref={ballRef} colliders="ball" lockTranslations position={[0, -1, -3]}>
      <mesh onClick={handleClick}>
        <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
        <meshStandardMaterial color="#F88158" />
      </mesh>
    </RigidBody>
  )
}