import { track } from "@plausible-analytics/tracker"
import { useGameState } from "../stores/GameState"


export const useStartNewGameFn = () => {
  const startNewGame = useGameState((state) => state.startNewGame)

  return (isFirstGame: boolean) => {
    startNewGame()
    if (isFirstGame) {
      track("new-game-launched", {})
    } else {
      track("retry-game-launched", {})
    }
  }
}