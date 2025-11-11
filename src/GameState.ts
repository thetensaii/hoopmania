import { create } from 'zustand'

type Phase = "ready" | "playing" | "ended"

interface GameState {
  phase: Phase,
  score: number,
  isShooting: boolean,
  lastBucketTime: number,
  currentTime: number,
  endGame: () => void
  startNewGame: () => void
  scoreBucket: () => void
  updateCurrentTime: () => void
  setIsShooting: (value: boolean) => void
}

export const useGameState = create<GameState>((set) => ({
  phase: "ready",
  score: 0,
  isShooting: false,
  lastBucketTime: Date.now(),
  currentTime: Date.now(),
  startNewGame: () => set(() => ({ phase: 'playing', score: 0, isShooting: false, lastBucketTime: Date.now(), currentTime: Date.now() })),
  endGame: () => set(() => ({ phase: 'ended', isShooting: false })),
  scoreBucket: () => set((state) => ({ score: state.score + 1, lastBucketTime: Date.now() })),
  updateCurrentTime: () => set(() => ({ currentTime: Date.now() })),
  setIsShooting: (value: boolean) => set(() => ({ isShooting: value }))
}))
