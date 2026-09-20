import { Color, Vector3 } from "three"
import { Grid } from "./Grid"
import { Lights } from "../Lights"

export const Background = () => {
  return (
    <>
      <color args={[new Color(0x100047)]} attach="background" />
      <Lights />
      <Grid position={new Vector3(0, -5.3, -5)} />
    </>
  )
}