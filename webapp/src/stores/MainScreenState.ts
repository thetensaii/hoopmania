import { create } from 'zustand'

type MainScreenTab = 'main' | 'leaderboard'

interface MainScreenState {
  tab: MainScreenTab
  setTab: (tab: MainScreenTab) => void
}

export const useMainScreenState = create<MainScreenState>((set) => ({
  tab: 'main',
  setTab: (tab) => set({ tab })
}))
