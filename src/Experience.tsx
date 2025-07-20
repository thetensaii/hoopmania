import { useThree } from "@react-three/fiber"
import { Ball } from "./Ball"
import { Basket } from "./Basket"
import { Lights } from "./Lights"

export const Experience = () => {
  const camera = useThree((state) => state.camera)
  camera.position.z = -5
  camera.rotation.y = Math.PI

  return <>
    <color args={['#bdedfc']} attach="background" />
    <Lights />
    <Basket />
    <Ball />
  </>
}