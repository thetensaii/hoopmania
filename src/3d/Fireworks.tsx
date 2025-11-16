import { SRGBColorSpace, TextureLoader } from "three"
import { useFireworksState } from "../FireworksState"
import { Firework } from "./Firework/Firework"
import { useLoader } from "@react-three/fiber"

export const Fireworks = () => {
  const { fireworks } = useFireworksState()
  const fireworkTexture = useLoader(TextureLoader, './particles/firework.png')
  fireworkTexture.colorSpace = SRGBColorSpace

  return (
    <>
      {fireworks.map((f) => <Firework key={f.id} position={f.position} texture={fireworkTexture} lifeTimeInMs={f.lifeTimeInMs} onAnimationEnd={f.destroy} />)}
    </>
  )
}