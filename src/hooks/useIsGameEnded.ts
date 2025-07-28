import { useGameState } from "../GameState"

export const useIsGameEnded = () => {
  const phase = useGameState((state) => state.phase)

  return phase === 'ended'
}