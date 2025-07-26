import { create } from 'zustand'

interface GameState {
  score: number,
  increaseScore: () => void
}

export const useGameState = create<GameState>((set) => ({
  score: 0,
  increaseScore: () => set((state) => ({ score: state.score + 1 })),
}))
