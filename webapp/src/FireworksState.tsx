import type { Vector3 } from 'three'
import { create } from 'zustand'
import { Firework } from './3d/Firework/Firework'

type Firework = {
  id: number,
  position: Vector3,
  lifeTimeInMs: number
  destroy: () => void
}

const FireworkLifeTimeInMs = 1_000

interface FireworksState {
  count: number,
  fireworks: Firework[],
  createFirework: (position: Vector3) => void
}

export const useFireworksState = create<FireworksState>((set, get) => ({
  count: 0,
  fireworks: [],
  createFirework: (position: Vector3) => {
    const id = get().count + 1
    const destroy = () => {
      set((state) => ({ fireworks: state.fireworks.filter(f => f.id !== id) }))
    }
    const firework: Firework = { id, position, lifeTimeInMs: FireworkLifeTimeInMs, destroy }

    set((state) => ({ fireworks: [...state.fireworks, firework], count: id }))
  }
}))
