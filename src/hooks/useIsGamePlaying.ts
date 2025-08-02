import { useGameState } from "../GameState"

export const useIsGamePlaying = () => {
  const phase = useGameState((state) => state.phase)

  return phase === 'playing'
}