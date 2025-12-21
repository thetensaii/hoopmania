import { create } from 'zustand'

type Phase = "ready" | "playing" | "ended"

interface GameState {
  phase: Phase,
  score: number,
  bestScore?: number,
  isShooting: boolean,
  startTime: number,
  lastBucketTime: number,
  endGame: () => void
  startNewGame: () => void
  scoreBucket: () => void
  setIsShooting: (value: boolean) => void
  setBestScore: (value: number) => void
}

export const useGameState = create<GameState>((set) => ({
  phase: "ready",
  score: 0,
  isShooting: false,
  startTime: Date.now(),
  lastBucketTime: Date.now(),
  startNewGame: () => set(() => ({ phase: 'playing', score: 0, isShooting: false, startTime: Date.now(), lastBucketTime: Date.now() })),
  endGame: () => set(() => ({ phase: 'ended', isShooting: false })),
  scoreBucket: () => set((state) => ({ score: state.score + 1, lastBucketTime: Date.now() })),
  setIsShooting: (value: boolean) => set(() => ({ isShooting: value })),
  setBestScore: (value: number) => set(() => ({ bestScore: value }))
}))
