import type { RefObject } from 'react'
import type { Object3D } from 'three'
import { create } from 'zustand'


interface SceneObjectsStore {
  ballMesh?: RefObject<Object3D | null>
  setBallMesh: (mesh: RefObject<Object3D | null>) => void
  shootingArrowMesh?: RefObject<Object3D | null>
  setShootingArrowMesh: (mesh: RefObject<Object3D | null>) => void
}

export const useSceneObjectsStore = create<SceneObjectsStore>((set) => ({
  setBallMesh: (mesh) => set({ ballMesh: mesh }),
  setShootingArrowMesh: (mesh) => set({ shootingArrowMesh: mesh }),
}))
