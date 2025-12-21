import { SRGBColorSpace } from "three"
import { useFireworksState } from "../FireworksState"
import { Firework } from "./Firework/Firework"
import { useTexture } from "@react-three/drei"


useTexture.preload('./particles/firework.png');

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