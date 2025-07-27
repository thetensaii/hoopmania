import type { ThreeEvent } from "@react-three/fiber"
import { useRef } from "react"
import { DoubleSide, Mesh, Vector3 } from "three"

type ShootingPlanProps = {
  position: Vector3
  onShoot: (x: number, y: number) => void
}

export const ShootingPlane = ({ position, onShoot }: ShootingPlanProps) => {

  const arrowRef = useRef<Mesh>(null)

  const handleShoot = (event: ThreeEvent<PointerEvent>) => {
    hideArrow()
    const x = -((event.uv?.x ?? 0.5) - 0.5) * 1.5
    const y = Math.max((event.uv?.y ?? 0.5) - 0.5, 0.02) * 1.5

    onShoot(x, y)
  }

  const displayArrow = () => {
    if (arrowRef.current) {
      arrowRef.current.visible = true
    }
  }

  const moveArrow = (event: ThreeEvent<PointerEvent>) => {
    const x = -((event.uv?.x ?? 0.5) - 0.5) * 1.5
    const y = Math.max((event.uv?.y ?? 0.5) - 0.5, 0.02) * 1.5

    if (arrowRef.current) {
      arrowRef.current.lookAt(new Vector3(x, y, 0.3).add(position))
    }
  }

  const hideArrow = () => {
    if (arrowRef.current) {
      arrowRef.current.visible = false
    }
  }

  return (
    <>
      <mesh position={position} rotation={[0, Math.PI, 0]} scale={5} onPointerDown={displayArrow} onPointerMove={moveArrow} onPointerUp={handleShoot}>
        <planeGeometry />
        <meshBasicMaterial side={DoubleSide} wireframe />
      </mesh>
      <group ref={arrowRef} position={position} visible={false}>
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1, 20]} />
          <meshBasicMaterial color={"blue"} side={DoubleSide} />
        </mesh>
      </group>
    </>

  )
}