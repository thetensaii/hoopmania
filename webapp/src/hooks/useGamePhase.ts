import { useGameState } from "../stores/GameState"

export const useGamePhase = () => {
  const phase = useGameState((state) => state.phase)

  return {
    isGameReady: phase === 'ready',
    isGamePlaying: phase === 'playing',
    isGameEnded: phase === 'ended'
  }
}