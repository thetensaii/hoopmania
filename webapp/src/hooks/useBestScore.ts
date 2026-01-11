import { useInjection } from "inversify-react"
import { useGameState } from "../stores/GameState"
import { UnauthenticatedBestScoreService } from "../domain/UnauthenticatedBestScoreService"
import { useAuth } from "./auth/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthenticatedBestScoreService } from "../domain/AuthenticatedBestScoreService"

export const useBestScore = () => {
  const setBestScore = useGameState((state) => state.setBestScore)
  const { isConnected } = useAuth()
  const authenticatedBestScoreService = useInjection<AuthenticatedBestScoreService>(AuthenticatedBestScoreService)
  const unauthenticatedBestScoreService = useInjection<UnauthenticatedBestScoreService>(UnauthenticatedBestScoreService)
  const queryClient = useQueryClient()

  const saveBestScoreMutation = useMutation({
    mutationFn: async (newBestScore: number) => {
      await unauthenticatedBestScoreService.saveBestScore(newBestScore)
    }
  })

  const loadBestScore = async (isConnected: boolean) => {
    const bestScore = await queryClient.fetchQuery({
      queryKey: ['bestGame'], queryFn: async () => {
        if (isConnected) return authenticatedBestScoreService.findBestScore()
        return unauthenticatedBestScoreService.findBestScore()
      }
    })

    if (bestScore) {
      setBestScore(Number(bestScore))
    }
  }

  const saveBestScore = async (newBestScore: number) => {
    setBestScore(newBestScore)
    if (!isConnected) {
      await saveBestScoreMutation.mutateAsync(newBestScore)
    }
  }

  return { loadBestScore, saveBestScore }
}