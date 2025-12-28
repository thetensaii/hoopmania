import { useGameState } from "../stores/GameState"

const BEST_SCORE_KEY = 'bestScore'
export const useBestScore = () => {
  const setBestScore = useGameState((state) => state.setBestScore)

  const loadBestScore = () => {
    const bestScore = window.localStorage.getItem(BEST_SCORE_KEY)
    if (bestScore) {
      setBestScore(Number(bestScore))
    }
  }

  const saveBestScore = (bestScore: number) => {
    setBestScore(bestScore)
    window.localStorage.setItem(BEST_SCORE_KEY, String(bestScore))
  }

  return { loadBestScore, saveBestScore }
}