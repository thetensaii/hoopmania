import { css } from "../../styled-system/css"
import { useGamePhase } from "../hooks/useGamePhase"
import { EndingScreen } from "./EndingScreen"
import { PlayingScreen } from "./PlayingScreen"
import { ReadyScreen } from "./ReadyScreen"

const style = css({
  position: 'absolute',
  top: 0,
  left: 0,
  w: 'full',
  h: 'full',
  pointerEvents: 'none',
  ['& *']: {
    pointerEvents: 'auto'
  },
  _active: {
    pointerEvents: 'auto',
    bg: 'darkBlue.900/80',
  }
})

export const UI = () => {
  const { isGameReady, isGamePlaying, isGameEnded } = useGamePhase()

  return <div data-active={!isGamePlaying ? "" : undefined} className={style}>
    {isGamePlaying && <PlayingScreen />}
    {isGameReady && <ReadyScreen />}
    {isGameEnded && <EndingScreen />}
  </div>
}