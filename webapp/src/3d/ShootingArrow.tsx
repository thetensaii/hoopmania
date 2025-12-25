import { type RefObject } from "react"
import { Color, DoubleSide, Group, type Mesh, type Vector3 } from "three"

type Props = {
  arrowGroupRef: RefObject<Group | null>
  arrowRef: RefObject<Mesh | null>
  position: Vector3
}
export const DownArrowColor = new Color("green")
export const UpArrowColor = new Color("red")

export const ShootingArrow = ({ arrowGroupRef, arrowRef, position }: Props) => {

  return (
    <group ref={arrowGroupRef} position={position} visible={false}>
      <mesh ref={arrowRef} position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 20]} />
        <meshBasicMaterial color={DownArrowColor} side={DoubleSide} />
      </mesh>
    </group>
  )
}