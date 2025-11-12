import { DoubleSide, Vector3 } from "three"
import { getPointerDirection, type PointerDirection } from "../hooks/3d/useShootingArrowActions"

type ShootingPlanProps = {
  position: Vector3
  onPointerDown: (direction: PointerDirection) => void
  onPointerMove: (direction: PointerDirection) => void
  onPointerUp: (direction: PointerDirection) => void
}

export const ShootingPlane = ({ position, onPointerDown, onPointerMove, onPointerUp }: ShootingPlanProps) => {

  return (
    <mesh
      position={position}
      rotation={[0, Math.PI, 0]}
      scale={5}
      onPointerDown={(e) => onPointerDown(getPointerDirection(e))}
      onPointerMove={(e) => onPointerMove(getPointerDirection(e))}
      onPointerUp={(e) => onPointerUp(getPointerDirection(e))}
    >
      <planeGeometry />
      <meshBasicMaterial side={DoubleSide} transparent opacity={0} />
    </mesh>
  )
}