import type { ThreeEvent } from "@react-three/fiber"
import { DoubleSide, Vector3 } from "three"

type ShootingPlanProps = {
  position: Vector3
  onShoot: (x: number, y: number) => void
}

export const ShootingPlane = ({ position, onShoot }: ShootingPlanProps) => {

  const handleShoot = (event: ThreeEvent<PointerEvent>) => {
    const x = -((event.uv?.x ?? 0.5) - 0.5) * 1.5
    const y = Math.max((event.uv?.y ?? 0.5) - 0.5, 0.02) * 1.5

    onShoot(x, y)
  }

  return <mesh position={position} rotation={[0, Math.PI, 0]} scale={5} onPointerUp={handleShoot}>
    <planeGeometry />
    <meshBasicMaterial color={"red"} side={DoubleSide} wireframe />
  </mesh>
}