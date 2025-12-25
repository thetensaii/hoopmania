import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import { useState, type RefObject } from "react";
import { Vector3 } from "three";
import { useGamePhase } from "../useGamePhase";
import { useGameState } from "../../GameState";

export const BASKET_INITIAL_POS = new Vector3(0, -0.6, 6)
const BASKET_VELOCITY = 0.001
const BASKET_POS_RANGE = {
  x: {
    min: -1.5,
    max: 1.5
  },
  y: {
    min: -0.6,
    max: 1
  }
}

type Pos = {
  source: Vector3,
  target: Vector3
}
export const useBasketActions = (basketRef: RefObject<RapierRigidBody | null>) => {
  const { isGamePlaying } = useGamePhase()
  const { startTime } = useGameState()
  const [pos, setPos] = useState<Pos>({ source: BASKET_INITIAL_POS, target: new Vector3(-1.5, 1, BASKET_INITIAL_POS.z) })
  const [sourceTime, setSourceTime] = useState<number>(startTime)

  useFrame(() => {
    if (isGamePlaying) {
      moveBasket()
      if (!basketRef.current) return

      const currentPos = basketRef.current.translation()
      if (pos.target.distanceTo(currentPos) < 0.01) {
        setPos(value => ({
          source: value.target,
          target: computeNextBasketPos(value.target)
        }))
        setSourceTime(Date.now())
      }
    }
  })

  const moveBasket = (): void => {
    const sourceCopy = pos.source.clone()
    const targetCopy = pos.target.clone()

    const sourceToTargetVec3 = targetCopy.clone().sub(sourceCopy.clone());
    const sourceToTargetDistance = sourceToTargetVec3.length()

    const targetTimeInMs = sourceToTargetDistance / BASKET_VELOCITY
    const currentTime = Date.now() - sourceTime

    const alpha = Math.min(currentTime / targetTimeInMs, 1)

    sourceCopy.lerp(targetCopy, alpha)

    if (basketRef.current) {
      basketRef.current.setNextKinematicTranslation({ x: sourceCopy.x, y: sourceCopy.y, z: sourceCopy.z });
    }
  }
}

const computeNextBasketPos = (sourcePos: Vector3): Vector3 => {
  const xPos = Math.random() * (BASKET_POS_RANGE.x.max - BASKET_POS_RANGE.x.min) + BASKET_POS_RANGE.x.min
  const yPos = Math.random() * (BASKET_POS_RANGE.y.max - BASKET_POS_RANGE.y.min) + BASKET_POS_RANGE.y.min

  return new Vector3(xPos, yPos, sourcePos.z)
}