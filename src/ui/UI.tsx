import { useGamePhase } from "../hooks/useGamePhase"
import { EndingScreen } from "./EndingScreen"
import { PlayingScreen } from "./PlayingScreen"
import { ReadyScreen } from "./ReadyScreen"

export const UI = () => {
  const { isGameReady, isGamePlaying, isGameEnded } = useGamePhase()

  return <div id="ui-container" className={isGameReady || isGameEnded ? "active" : ""}>
    {isGamePlaying && <PlayingScreen />}
    {isGameReady && <ReadyScreen />}
    {isGameEnded && <EndingScreen />}
  </div>
}