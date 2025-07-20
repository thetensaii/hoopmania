const ballDiameter_M = 0.05

export const Ball = () => {

  return (
    <mesh position={[0, -1, -3]}>
      <sphereGeometry args={[ballDiameter_M * 10 / 2]} />
      <meshStandardMaterial color="#F88158" />
    </mesh>
  )
}