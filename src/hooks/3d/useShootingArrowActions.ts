import type { ThreeEvent } from "@react-three/fiber";
import type { RefObject } from "react";
import { Vector3, type Mesh } from "three";

export type PointerDirection = { x: number, y: number }
export const getPointerDirection = (event: ThreeEvent<PointerEvent>): PointerDirection => {
  const x = -((event.uv?.x ?? 0.5) - 0.5) * 1.5
  const y = Math.max((event.uv?.y ?? 0.5) - 0.5, 0.02) * 1.5

  return { x, y }
}


type Props = {
  arrowRef: RefObject<Mesh | null>,
  ballPosition: Vector3
}

export const useShootingArrowActions = ({ arrowRef, ballPosition }: Props) => {
  const displayArrow = (direction: PointerDirection) => {
    moveArrow(direction)
    if (arrowRef.current) {
      arrowRef.current.visible = true
    }
  }

  const moveArrow = ({ x, y }: PointerDirection) => {
    if (arrowRef.current) {
      arrowRef.current.lookAt(new Vector3(x, y, 0.3).add(ballPosition))
    }
  }

  const hideArrow = () => {
    if (arrowRef.current) {
      arrowRef.current.visible = false
    }
  }

  return {
    displayArrow,
    hideArrow,
    moveArrow
  }
}