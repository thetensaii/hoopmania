import type { ThreeEvent } from "@react-three/fiber";
import type { RefObject } from "react";
import { Group, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { DownArrowColor, UpArrowColor } from "../../3d/ShootingArrow";

export type PointerDirection = { x: number, y: number }

const MinYArrowDirection = 0.03
const MaxYArrowDirection = 0.75

export const getPointerDirection = (event: ThreeEvent<PointerEvent>): PointerDirection => {
  const x = -((event.uv?.x ?? 0.5) - 0.5) * 1.5
  const y = Math.max((event.uv?.y ?? 0.5) - 0.5, 0.02) * 1.5

  return { x, y }
}


type Props = {
  arrowGroupRef: RefObject<Group | null>,
  arrowRef: RefObject<Mesh | null>,
  ballPosition: Vector3
}

export const useShootingArrowActions = ({ arrowGroupRef, arrowRef, ballPosition }: Props) => {
  const displayArrow = (direction: PointerDirection) => {
    moveArrow(direction)
    if (arrowGroupRef.current) {
      arrowGroupRef.current.visible = true
    }
  }

  const moveArrow = ({ x, y }: PointerDirection) => {
    if (arrowGroupRef.current && arrowRef.current) {
      arrowGroupRef.current.lookAt(new Vector3(x, y, 0.3).add(ballPosition))
      if (arrowRef.current.material instanceof MeshBasicMaterial) {
        const alpha = (y - MinYArrowDirection) / (MaxYArrowDirection - MinYArrowDirection)
        arrowRef.current.material.color.lerpColors(DownArrowColor, UpArrowColor, alpha)
      }
    }
  }

  const hideArrow = () => {
    if (arrowGroupRef.current) {
      arrowGroupRef.current.visible = false
    }
  }

  return {
    displayArrow,
    hideArrow,
    moveArrow
  }
}