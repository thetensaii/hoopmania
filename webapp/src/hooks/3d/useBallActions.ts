import type { RapierRigidBody } from "@react-three/rapier"
import type { RefObject } from "react"
import { Vector3 } from "three"
import { useGameState } from "../../stores/GameState"
import type { PointerDirection } from "./useShootingArrowActions"

export const BALL_INITIAL_POS = new Vector3(0, -1, -2)

export const useBallActions = (ballRigidBodyRef: RefObject<RapierRigidBody | null>) => {
  const setIsShooting = useGameState((state) => state.setIsShooting)
  const resetBallPosition = () => {
    if (ballRigidBodyRef.current) {
      ballRigidBodyRef.current.lockTranslations(true, false)
      ballRigidBodyRef.current.setTranslation(BALL_INITIAL_POS, false)
      ballRigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
      ballRigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)

      setIsShooting(false)
    }
  }

  const shootBall = ({ x, y }: PointerDirection) => {
    if (ballRigidBodyRef.current) {
      setIsShooting(true)

      ballRigidBodyRef.current.lockTranslations(false, true)
      ballRigidBodyRef.current.applyImpulse({ x: x, y: y, z: -0.3 }, true);
    }
  }

  return { resetBallPosition, shootBall }
}