import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { type RefObject } from "react";
import { DoubleSide } from "three";

const basketDiameter_M = 0.07
const backboardLength_M = 0.183
const backboardHeight_M = 0.110

type BasketProps = {
  ref: RefObject<RapierRigidBody | null>
  onBucket: () => void
}

export const Basket = ({ ref, onBucket }: BasketProps) => {

  useFrame((state) => {
    if (ref.current) {
      ref.current.setNextKinematicTranslation({ x: 1.5 * Math.sin(state.clock.getElapsedTime()), y: -0.6, z: 1 });
    }
  })

  const handleBucket = () => {
    onBucket()
  }

  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders="trimesh" position={[0, -0.6, 1]}>
      <group >
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[basketDiameter_M * 10 / 2, 0.02]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh position={[0, backboardHeight_M * 10 / 2, basketDiameter_M * 10 / 2]}>
          <planeGeometry args={[backboardLength_M * 10, backboardHeight_M * 10]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>

        <CuboidCollider args={[basketDiameter_M / 2, 0.1, basketDiameter_M / 2]} position={[0, -0.3, 0]} onCollisionEnter={handleBucket} />
      </group>
    </RigidBody>
  )
}