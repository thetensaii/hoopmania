import { create } from 'zustand'

type Phase = "ready" | "playing" | "ended"

interface GameState {
  phase: Phase,
  score: number,
  bestScore?: number,
  playerName?: string,
  isShooting: boolean,
  startTime: number,
  lastBucketTime: number,
  endTime: number,
  startNewGame: () => void
  endGame: () => void
  scoreBucket: () => void
  setIsShooting: (value: boolean) => void
  setBestScore: (value: number) => void
  setPlayerName: (value: string) => void
}

export const useGameState = create<GameState>((set) => ({
  phase: "ready",
  score: 0,
  isShooting: false,
  startTime: Date.now(),
  lastBucketTime: Date.now(),
  endTime: Date.now(),
  startNewGame: () => set(() => ({ phase: 'playing', score: 0, isShooting: false, startTime: Date.now(), lastBucketTime: Date.now() })),
  endGame: () => set(() => ({ phase: 'ended', isShooting: false, endTime: Date.now() })),
  scoreBucket: () => set((state) => ({ score: state.score + 1, lastBucketTime: Date.now() })),
  setIsShooting: (value: boolean) => set(() => ({ isShooting: value })),
  setBestScore: (value: number) => set(() => ({ bestScore: value })),
  setPlayerName: (value: string) => set(() => ({ playerName: value })),
}))
