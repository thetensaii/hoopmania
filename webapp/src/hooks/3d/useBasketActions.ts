import { useBeforePhysicsStep, type RapierRigidBody } from "@react-three/rapier";
import { useRef, type RefObject } from "react";
import { Vector3 } from "three";
import { useGamePhase } from "../useGamePhase";

export const BASKET_INITIAL_POS = new Vector3(0, -0.6, -6)
const BASKET_VELOCITY = 0.02
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

export const useBasketActions = (basketRef: RefObject<RapierRigidBody | null>) => {
  const { isGamePlaying } = useGamePhase()
  const targetRef = useRef<Vector3>(computeNextBasketTarget())

  useBeforePhysicsStep(() => {
    if (isGamePlaying) {
      moveBasket()

      if (!basketRef.current) return
      const currentPos = basketRef.current.translation()
      if (targetRef.current.distanceTo(currentPos) < 0.05) {
        targetRef.current = computeNextBasketTarget()
      }
    }
  })

  const moveBasket = (): void => {
    if (basketRef.current) {
      const currentPos = basketRef.current.translation()
      const direction = targetRef.current.clone().sub(currentPos).normalize()
      const movement = direction.multiplyScalar(BASKET_VELOCITY)
      const newPos = movement.add(currentPos)

      basketRef.current.setNextKinematicTranslation({ x: newPos.x, y: newPos.y, z: newPos.z });
    }
  }
}

const computeNextBasketTarget = (): Vector3 => {
  const xPos = Math.random() * (BASKET_POS_RANGE.x.max - BASKET_POS_RANGE.x.min) + BASKET_POS_RANGE.x.min
  const yPos = Math.random() * (BASKET_POS_RANGE.y.max - BASKET_POS_RANGE.y.min) + BASKET_POS_RANGE.y.min

  return new Vector3(xPos, yPos, BASKET_INITIAL_POS.z)
}