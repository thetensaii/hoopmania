import { useAuthState } from "../stores/AuthState"
import { useGameState } from "../stores/GameState"
import { useBestScore } from "./useBestScore"
import { useSaveGame } from "./useSaveGame"

export const useEndGameFn = () => {
  const isAuthenticated = useAuthState((state) => state.isAuthenticated)
  const endGame = useGameState((state) => state.endGame)
  const { score, bestScore, startTime } = useGameState()
  const { saveBestScore } = useBestScore()
  const saveGame = useSaveGame()

  return async () => {
    endGame()

    if (isAuthenticated) {
      const time = Date.now() - startTime
      await saveGame.mutateAsync({ score, time })
    } else if (!bestScore || score > bestScore) {
      saveBestScore(score)
    }
  }
}