import { css } from "../../styled-system/css"
import { useGamePhase } from "../hooks/useGamePhase"
import { PostGameScreen } from "./PostGameScreen"
import { PlayingScreen } from "./PlayingScreen"
import { MainScreen } from "./MainScreen"

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
})


export const UI = () => {
  const { isGameReady, isGamePlaying, isGameEnded } = useGamePhase()

  return <div className={style}>
    <PlayingScreen visible={isGamePlaying} />
    <MainScreen visible={isGameReady} />
    <PostGameScreen visible={isGameEnded} />
  </div>
}