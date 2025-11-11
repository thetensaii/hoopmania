import { create } from 'zustand'

type Phase = "ready" | "playing" | "ended"

interface GameState {
  phase: Phase,
  score: number,
  canShoot: boolean,
  lastBucketTime: number,
  currentTime: number,
  endGame: () => void
  startNewGame: () => void
  scoreBucket: () => void
  updateCurrentTime: () => void
  setCanShoot: (value: boolean) => void
}

export const useGameState = create<GameState>((set) => ({
  phase: "ready",
  score: 0,
  canShoot: false,
  lastBucketTime: Date.now(),
  currentTime: Date.now(),
  startNewGame: () => set(() => ({ phase: 'playing', score: 0, canShoot: true, lastBucketTime: Date.now(), currentTime: Date.now() })),
  endGame: () => set(() => ({ phase: 'ended', canShoot: false })),
  scoreBucket: () => set((state) => ({ score: state.score + 1, lastBucketTime: Date.now() })),
  updateCurrentTime: () => set(() => ({ currentTime: Date.now() })),
  setCanShoot: (value: boolean) => set(() => ({ canShoot: value }))
}))
