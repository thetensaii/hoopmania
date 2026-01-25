import { useInjection } from "inversify-react"
import { useGameState } from "../stores/GameState"
import { GuestBestScoreService } from "../domain/GuestBestScoreService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthenticatedBestScoreService } from "../domain/AuthenticatedBestScoreService"
import { useAuthState } from "../stores/AuthState"

export const useBestScore = () => {
  const setBestScore = useGameState((state) => state.setBestScore)
  const isAuthenticated = useAuthState((state) => state.isAuthenticated)
  const authenticatedBestScoreService = useInjection<AuthenticatedBestScoreService>(AuthenticatedBestScoreService)
  const guestBestScoreService = useInjection<GuestBestScoreService>(GuestBestScoreService)
  const queryClient = useQueryClient()

  const saveBestScoreMutation = useMutation({
    mutationFn: async (newBestScore: number) => {
      await guestBestScoreService.saveBestScore(newBestScore)
    }
  })

  const loadBestScore = async (isConnected: boolean) => {
    const bestScore = await queryClient.fetchQuery({
      queryKey: ['bestScore'],
      queryFn: async () => {
        if (isConnected) return authenticatedBestScoreService.findBestScore()
        return guestBestScoreService.findBestScore()
      }
    })

    if (bestScore) {
      setBestScore(Number(bestScore))
    }
  }

  const saveBestScore = async (newBestScore: number) => {
    if (!isAuthenticated) {
      await saveBestScoreMutation.mutateAsync(newBestScore)
    }
    setBestScore(newBestScore)
  }

  return { loadBestScore, saveBestScore }
}