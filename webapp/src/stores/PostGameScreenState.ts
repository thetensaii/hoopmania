import { create } from 'zustand'

type PostGameScreenTab = 'main' | 'leaderboard'

interface PostGameScreenState {
  tab: PostGameScreenTab
  setTab: (tab: PostGameScreenTab) => void
}

export const usePostGameScreenState = create<PostGameScreenState>((set) => ({
  tab: 'main',
  setTab: (tab) => set({ tab })
}))
