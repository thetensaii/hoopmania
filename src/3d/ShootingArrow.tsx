import { type RefObject } from "react"
import { DoubleSide, type Mesh, type Vector3 } from "three"

type Props = {
  arrowRef: RefObject<Mesh | null>
  position: Vector3
}

export const ShootingArrow = ({ arrowRef, position }: Props) => {

  return (
    <group ref={arrowRef} position={position} visible={false}>
      <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 20]} />
        <meshBasicMaterial color={"blue"} side={DoubleSide} />
      </mesh>
    </group>
  )
}