import { CuboidCollider, MeshCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, type RefObject } from "react";
import * as THREE from "three"
import { useBasketActions } from "../hooks/3d/useBasketActions";
import { Html, useTexture, Text3D, Center, } from "@react-three/drei";
import { css } from "../../styled-system/css";
import { useGetTimeLeftInSec } from "../hooks/useGetTimeLeft";

const basketDiameter_M = 0.07
const backboardLength_M = 0.183
const backboardHeight_M = 0.122

type BasketProps = {
  ref: RefObject<RapierRigidBody | null>
  initialPosition: THREE.Vector3
  onBucket: () => void
  score: number
}

export const Basket = ({ ref, initialPosition, onBucket, score }: BasketProps) => {
  useBasketActions(ref)
  const timeLeft = useGetTimeLeftInSec()
  const clockRef = useRef<THREE.Mesh>(null)

  const backboardTexture = useTexture('./textures/backboard.jpg')
  backboardTexture.colorSpace = THREE.SRGBColorSpace

  const handleBucket = () => {
    onBucket()
  }

  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders={false} position={initialPosition}>
      <group>
        <MeshCollider type='trimesh'>
          <mesh rotation-x={Math.PI / 2}>
            <torusGeometry args={[basketDiameter_M * 10 / 2, 0.02]} />
            <meshBasicMaterial color={[5, 0, 0]} />
          </mesh>
        </MeshCollider>

        <group position={[0, backboardHeight_M * 10 / 2, -basketDiameter_M * 10 / 2]}>
          <MeshCollider type='trimesh'>
            <mesh >
              <planeGeometry args={[backboardLength_M * 10, backboardHeight_M * 10]} />
              <meshBasicMaterial color={[0, 0, 12]} transparent alphaMap={backboardTexture} />
            </mesh>
          </MeshCollider>

          <Center position={[0, 1, 0]}>
            <Text3D
              ref={clockRef}
              font={'./fonts/ds_digital/DS-Digital_Normal.json'}
              size={0.5}
              height={0.00000001}
            >
              {timeLeft}
              <meshBasicMaterial color={[5, 0, 0]} />
            </Text3D>
          </Center>
        </group>

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
            fontSize: 'text.body1'
          })}
        >
          {score}
        </Html>
      </group>
    </RigidBody >
  )
}