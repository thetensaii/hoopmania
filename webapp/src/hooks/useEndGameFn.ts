import { useGameState } from "../GameState"
import { useBestScore } from "./useBestScore"

export const useEndGameFn = () => {
  const endGame = useGameState((state) => state.endGame)
  const score = useGameState((state) => state.score)
  const bestScore = useGameState((state) => state.bestScore)
  const { saveBestScore } = useBestScore()

  return () => {
    endGame()
    if (!bestScore || score > bestScore) {
      saveBestScore(score)
    }
  }
}