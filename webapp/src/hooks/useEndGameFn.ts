import { useGameState } from "../stores/GameState"
import { useAuth } from "./auth/useAuth"
import { useBestScore } from "./useBestScore"
import { useSaveGame } from "./useSaveGame"

export const useEndGameFn = () => {
  const { isConnected } = useAuth()
  const endGame = useGameState((state) => state.endGame)
  const { score, bestScore, startTime } = useGameState()
  const { saveBestScore } = useBestScore()
  const saveGame = useSaveGame()

  return async () => {
    endGame()

    if (isConnected) {
      const time = Date.now() - startTime
      await saveGame.mutateAsync({ score, time })
    } else if (!bestScore || score > bestScore) {
      saveBestScore(score)
    }
  }
}