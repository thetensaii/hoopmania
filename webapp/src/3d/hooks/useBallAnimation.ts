import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import type { RefObject } from "react"
import { MeshStandardMaterial, type Mesh } from "three"

export const useBallAnimation = (ballMeshRef: RefObject<Mesh | null>) => {

  const { contextSafe } = useGSAP()

  const triggerShootAnimation = contextSafe(() => {
    if (ballMeshRef.current?.material instanceof MeshStandardMaterial) {
      gsap.to(ballMeshRef.current.material, {
        emissiveIntensity: 8,
        duration: 0.5,
        ease: "none",
      })
    }
  })

  const resetShootAnimation = () => {
    if (ballMeshRef.current?.material instanceof MeshStandardMaterial) {
      ballMeshRef.current.material.emissiveIntensity = 3
    }
  }

  return {
    shoot: {
      trigger: triggerShootAnimation,
      reset: resetShootAnimation
    }
  }
}