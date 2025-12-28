import { useGameState } from "../stores/GameState"

const PLAYER_NAME_KEY = 'playerName'
export const usePlayerName = () => {
  const setPlayerName = useGameState((state) => state.setPlayerName)

  const loadPlayerName = () => {
    const playerName = window.localStorage.getItem(PLAYER_NAME_KEY)
    if (playerName) {
      setPlayerName(playerName)
    }
  }

  const savePlayerName = (playerName: string) => {
    setPlayerName(playerName)
    window.localStorage.setItem(PLAYER_NAME_KEY, playerName)
  }

  return { loadPlayerName, savePlayerName }
}