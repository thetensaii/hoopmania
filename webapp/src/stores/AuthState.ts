import { create } from 'zustand'

type User = {
  name: string
}

interface AuthState {
  user?: User
  isAuthenticated: boolean
  connect: (user: User) => void
  disconnect: () => void
}

export const useAuthState = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),
  connect: (user: User) => set(() => ({ user, isAuthenticated: true })),
  disconnect: () => set(() => ({ user: undefined, isAuthenticated: false }))
}))
