import { useThree } from "@react-three/fiber"
import { Ball } from "./Ball"
import { Basket } from "./Basket"
import { Lights } from "./Lights"
import { Physics, RapierRigidBody } from "@react-three/rapier"
import { useRef } from "react"

export const Experience = () => {
  const camera = useThree((state) => state.camera)
  camera.position.z = -5
  camera.rotation.y = Math.PI


  const basketRef = useRef<RapierRigidBody>(null)
  const ballRef = useRef<RapierRigidBody>(null)

  const handleBucket = () => {
    if (ballRef.current) {
      ballRef.current.lockTranslations(true, false)
      ballRef.current.setTranslation({ x: 0, y: -1, z: -3 }, false)
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
      ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
    }
  }

  return <>
    <color args={['#bdedfc']} attach="background" />
    <Lights />
    <Physics debug>
      <Basket ref={basketRef} onBucket={handleBucket} />
      <Ball ref={ballRef} />
    </Physics>
  </>
}