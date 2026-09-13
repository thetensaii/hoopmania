import { CuboidCollider, MeshCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, type RefObject } from "react";
import * as THREE from "three"
import { useBasketActions } from "../hooks/3d/useBasketActions";
import { useTexture, Text3D, Center, } from "@react-three/drei";
import { useGetTimeLeftInSec } from "../hooks/useGetTimeLeft";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'

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
  const hoopMeshRef = useRef<THREE.Mesh>(null)
  const backboardMeshRef = useRef<THREE.Mesh>(null)
  const { contextSafe } = useGSAP()

  const backboardTexture = useTexture('./textures/backboard.jpg')
  backboardTexture.colorSpace = THREE.SRGBColorSpace

  const triggerBucketAnimation = contextSafe(() => {
    if (hoopMeshRef.current?.material instanceof THREE.MeshBasicMaterial) {
      gsap.fromTo(hoopMeshRef.current.material.color, {
        r: 2,
        g: 0,
        b: 0,
      }, {
        r: 8,
        g: 0,
        b: 0,
        duration: 0.5,
        repeat: 1,
        ease: "none",
        yoyo: true
      })
    }
    if (backboardMeshRef.current?.material instanceof THREE.MeshBasicMaterial) {
      gsap.fromTo(backboardMeshRef.current.material.color, {
        r: 0,
        g: 0,
        b: 4,
      }, {
        r: 0,
        g: 4,
        b: 0,
        duration: 0.5,
        repeat: 1,
        ease: "none",
        yoyo: true
      })
    }

  })

  const handleBucket = () => {
    onBucket()
    triggerBucketAnimation()
  }

  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders={false} position={initialPosition}>
      <group>
        <MeshCollider type='trimesh'>
          <mesh ref={hoopMeshRef} rotation-x={Math.PI / 2}>
            <torusGeometry args={[basketDiameter_M * 10 / 2, 0.02]} />
            <meshBasicMaterial color={[2, 0, 0]} />
          </mesh>
        </MeshCollider>

        <group position={[0, backboardHeight_M * 10 / 2, -basketDiameter_M * 10 / 2]}>
          <MeshCollider type='trimesh'>
            <mesh ref={backboardMeshRef}>
              <planeGeometry args={[backboardLength_M * 10, backboardHeight_M * 10]} />
              <meshBasicMaterial color={[0, 0, 4]} transparent alphaMap={backboardTexture} />
            </mesh>
          </MeshCollider>

          <Center position={[0, 1, 0]}>
            <Text3D
              font={'./fonts/ds_digital/DS-Digital_Normal.json'}
              size={0.5}
              height={0.00000001}
            >
              {timeLeft}
              <meshBasicMaterial color={[5, 0, 0]} />
            </Text3D>
          </Center>

          <Center position={[0, 0.3, 0]}>
            <Text3D
              font={'./fonts/ds_digital/DS-Digital_Normal.json'}
              size={0.2}
              height={0.00000001}
            >
              {score}
              <meshBasicMaterial color={[5, 1, 0]} />
            </Text3D>
          </Center>
        </group>

        <CuboidCollider args={[basketDiameter_M / 2, 0.1, basketDiameter_M / 2]} position={[0, -0.3, 0]} onIntersectionEnter={handleBucket} sensor={true} />
      </group>
    </RigidBody >
  )
}