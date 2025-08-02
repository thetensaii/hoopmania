import { useIsGameEnded } from "../hooks/useIsGameEnded"
import { useIsGamePlaying } from "../hooks/useIsGamePlaying"
import { useIsGameReady } from "../hooks/useIsGameReady"
import { EndingScreen } from "./EndingScreen"
import { PlayingScreen } from "./PlayingScreen"
import { ReadyScreen } from "./ReadyScreen"

export const UI = () => {
  const isGameEnded = useIsGameEnded()
  const isGameReady = useIsGameReady()
  const isGamePlaying = useIsGamePlaying()

  return <div id="ui-container" className={isGameReady || isGameEnded ? "active" : ""}>
    {isGamePlaying && <PlayingScreen />}
    {isGameReady && <ReadyScreen />}
    {isGameEnded && <EndingScreen />}
  </div>
}