import type { RapierRigidBody } from "@react-three/rapier"
import type { RefObject } from "react"
import { useGameState } from "../GameState"
import { Vector3 } from "three"

export const ballInitialPosition = new Vector3(0, -1, 2)

export const useResetBallPosition = (ballRef: RefObject<RapierRigidBody | null>) => {

  const setCanShoot = useGameState((state) => state.setCanShoot)
  const resetBallPosition = () => {
    if (ballRef.current) {
      ballRef.current.lockTranslations(true, false)
      ballRef.current.setTranslation(ballInitialPosition, false)
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
      ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)

      setCanShoot(true)
    }
  }

  return resetBallPosition
}