import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export const Cube = () => {
  const cube = useRef<Mesh>(null)
    
  useFrame((_state, delta) => {
    if(cube.current){
      cube.current.rotation.y += 2*delta; 
    }
  })

  return (
    <mesh ref={cube}>
      <boxGeometry />
      <meshBasicMaterial color="blue"/>
    </mesh>
  )
}