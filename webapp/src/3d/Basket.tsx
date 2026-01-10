import { CuboidCollider, MeshCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { type RefObject } from "react";
import { Vector3 } from "three";
import { useBasketActions } from "../hooks/3d/useBasketActions";
import { Html } from "@react-three/drei";
import { css } from "../../styled-system/css";

const basketDiameter_M = 0.07
const backboardLength_M = 0.183
const backboardHeight_M = 0.110

type BasketProps = {
  ref: RefObject<RapierRigidBody | null>
  initialPosition: Vector3
  onBucket: () => void
  score: number
}

export const Basket = ({ ref, initialPosition, onBucket, score }: BasketProps) => {
  useBasketActions(ref)

  const handleBucket = () => {
    onBucket()
  }

  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders={false} position={initialPosition}>
      <group>
        <MeshCollider type='trimesh'>
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry args={[basketDiameter_M * 10 / 2, 0.02]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </MeshCollider>
        <MeshCollider type='trimesh'>
          <mesh position={[0, backboardHeight_M * 10 / 2, -basketDiameter_M * 10 / 2]}>
            <planeGeometry args={[backboardLength_M * 10, backboardHeight_M * 10]} />
            <meshStandardMaterial />
          </mesh>
        </MeshCollider>

        <CuboidCollider args={[basketDiameter_M / 2, 0.1, basketDiameter_M / 2]} position={[0, -0.3, 0]} onIntersectionEnter={handleBucket} sensor={true} />

        <Html
          position={[0, backboardHeight_M * 10 / 2, -basketDiameter_M * 10 / 2]}
          zIndexRange={[0, 0]}
          center
          transform
          occlude='blending'
          wrapperClass={css({
            bg: '[#A9A9A9]',
            pointerEvents: 'none',
            userSelect: 'none',
          })}
          className={css({
            color: 'darkBlue.900',
            fontSize: '1rem'
          })}
        >
          {score}
        </Html>
      </group>
    </RigidBody >
  )
}