import type { RapierRigidBody } from "@react-three/rapier"
import type { RefObject } from "react"
import { Vector3 } from "three"
import type { PointerDirection } from "../../hooks/3d/useShootingArrowActions"

export const BALL_INITIAL_POS = new Vector3(0, -1, -2)

export const resetBallPosition = (ballRigidBodyRef: RefObject<RapierRigidBody | null>, isShootingRef: RefObject<boolean>) => {
  if (ballRigidBodyRef.current) {
    ballRigidBodyRef.current.lockTranslations(true, false)
    ballRigidBodyRef.current.setTranslation(BALL_INITIAL_POS, false)
    ballRigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
    ballRigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
    isShootingRef.current = false
  }
}
export const shootBall = ({ x, y }: PointerDirection, ballRigidBodyRef: RefObject<RapierRigidBody | null>, isShootingRef: RefObject<boolean>) => {
  if (ballRigidBodyRef.current) {
    isShootingRef.current = true
    ballRigidBodyRef.current.lockTranslations(false, true)
    ballRigidBodyRef.current.applyImpulse({ x: x, y: y, z: -0.3 }, true);
  }
}
