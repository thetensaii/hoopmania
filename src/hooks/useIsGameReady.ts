import { useGameState } from "../GameState"

export const useIsGameReady = () => {
  const phase = useGameState((state) => state.phase)

  return phase === 'ready'
}