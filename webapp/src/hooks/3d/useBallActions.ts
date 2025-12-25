import type { RapierRigidBody } from "@react-three/rapier"
import type { RefObject } from "react"
import { Vector3 } from "three"
import { useGameState } from "../../GameState"
import type { PointerDirection } from "./useShootingArrowActions"

export const BALL_INITIAL_POS = new Vector3(0, -1, 2)

export const useBallActions = (ballRef: RefObject<RapierRigidBody | null>) => {
  const setIsShooting = useGameState((state) => state.setIsShooting)
  const resetBallPosition = () => {
    if (ballRef.current) {
      ballRef.current.lockTranslations(true, false)
      ballRef.current.setTranslation(BALL_INITIAL_POS, false)
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
      ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)

      setIsShooting(false)
    }
  }

  const shootBall = ({ x, y }: PointerDirection) => {
    if (ballRef.current) {
      setIsShooting(true)

      ballRef.current.lockTranslations(false, true)
      ballRef.current.applyImpulse({ x: x, y: y, z: 0.3 }, true);
    }
  }

  return { resetBallPosition, shootBall }
}