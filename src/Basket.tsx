import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, type Mesh } from "three";

const basketDiameter_M = 0.07
const backboardLength_M = 0.183
const backboardHeight_M = 0.110

export const Basket = () => {
  const basketRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (basketRef.current) {
      basketRef.current.position.x = 2 * Math.sin(state.clock.getElapsedTime());
    }
  })

  return (
    <group ref={basketRef} position-y={-0.6} >
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[basketDiameter_M * 10 / 2, 0.02]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[0, backboardHeight_M * 10 / 2, basketDiameter_M * 10 / 2]}>
        <planeGeometry args={[backboardLength_M * 10, backboardHeight_M * 10]} />
        <meshStandardMaterial side={DoubleSide} />
      </mesh>
    </group>
  )
}