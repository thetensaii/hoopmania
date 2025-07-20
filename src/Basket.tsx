import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { DoubleSide } from "three";

const basketDiameter_M = 0.07
const backboardLength_M = 0.183
const backboardHeight_M = 0.110

export const Basket = () => {
  const basketRef = useRef<RapierRigidBody>(null)

  useFrame((state) => {
    if (basketRef.current) {
      basketRef.current.setNextKinematicTranslation({ x: 1.5 * Math.sin(state.clock.getElapsedTime()), y: -0.6, z: 1 });
    }
  })

  return (
    <RigidBody ref={basketRef} type="kinematicPosition" colliders="trimesh" position={[0, -0.6, 1]}>
      <group >
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[basketDiameter_M * 10 / 2, 0.02]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh position={[0, backboardHeight_M * 10 / 2, basketDiameter_M * 10 / 2]}>
          <planeGeometry args={[backboardLength_M * 10, backboardHeight_M * 10]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
      </group>
    </RigidBody>
  )
}