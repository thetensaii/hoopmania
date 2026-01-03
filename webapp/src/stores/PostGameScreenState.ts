import { create } from 'zustand'

type PostGameScreenTab = 'main' | 'leaderboard' | 'shareScore' | 'lastGames'

interface PostGameScreenState {
  tab: PostGameScreenTab
  hasSharedScore: boolean
  setTab: (tab: PostGameScreenTab) => void
  setHasSharedScore: (value: boolean) => void
  resetScreen: () => void
}

export const usePostGameScreenState = create<PostGameScreenState>((set) => ({
  tab: 'main',
  hasSharedScore: false,
  setTab: (tab) => set({ tab }),
  setHasSharedScore: (value) => set({ hasSharedScore: value }),
  resetScreen: () => set({ tab: 'main', hasSharedScore: false })
}))
