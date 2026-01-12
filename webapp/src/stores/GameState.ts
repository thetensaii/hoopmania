import { create } from 'zustand'

type Phase = "ready" | "playing" | "ended"

interface GameState {
  phase: Phase,
  score: number,
  bestScore?: number,
  playerName?: string,
  startTime: number,
  lastBucketTime: number,
  endTime: number,
  startNewGame: () => void
  endGame: () => void
  scoreBucket: () => void
  setBestScore: (value: number) => void
  setPlayerName: (value: string) => void
}

export const useGameState = create<GameState>((set) => ({
  phase: "ready",
  score: 0,
  startTime: Date.now(),
  lastBucketTime: Date.now(),
  endTime: Date.now(),
  startNewGame: () => set(() => ({ phase: 'playing', score: 0, startTime: Date.now(), lastBucketTime: Date.now() })),
  endGame: () => set(() => ({ phase: 'ended', endTime: Date.now() })),
  scoreBucket: () => set((state) => ({ score: state.score + 1, lastBucketTime: Date.now() })),
  setBestScore: (value: number) => set(() => ({ bestScore: value })),
  setPlayerName: (value: string) => set(() => ({ playerName: value })),
}))
