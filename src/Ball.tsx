// import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const ballDiameter_M = 0.05

export const Ball = () => {
  const ballRef = useRef<Mesh>(null)

  // useFrame((state) => {
  //   // console.log(state.camera.position)
  //   if (ballRef.current) {
  //     // ballRef.current.position.x = 2 * Math.sin(state.clock.getElapsedTime());
  //   }
  // })

  return (
    <mesh ref={ballRef} position={[0, -1, -3]}>
      <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
      <meshStandardMaterial color="#F88158" />
    </mesh>
  )
}