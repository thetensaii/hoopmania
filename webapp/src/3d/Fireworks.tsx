import { SRGBColorSpace } from "three"
import { useFireworksState } from "../stores/FireworksState"
import { Firework } from "./Firework/Firework"
import { useTexture } from "@react-three/drei"

export const Fireworks = () => {
  const { fireworks } = useFireworksState()
  const fireworkTexture = useTexture('./particles/firework.png')
  fireworkTexture.colorSpace = SRGBColorSpace

  return (
    <>
      {fireworks.map((f) => <Firework key={f.id} position={f.position} texture={fireworkTexture} lifeTimeInMs={f.lifeTimeInMs} onAnimationEnd={f.destroy} />)}
    </>
  )
}