import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export const Cube = () => {
  const cubeRef = useRef<Mesh>(null)

  useFrame((_state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 2 * delta;
    }
  })

  return (
    <mesh ref={cubeRef}>
      <boxGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  )
}