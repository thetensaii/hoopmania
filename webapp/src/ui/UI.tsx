import { css } from "../../styled-system/css"
import { useGamePhase } from "../hooks/useGamePhase"
import { PostGameOverlay } from "./PostGameOverlay"
import { HUD } from "./HUD"
import { MainOverlay } from "./MainOverlay"

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
    <HUD visible={isGamePlaying} />
    <MainOverlay visible={isGameReady} />
    <PostGameOverlay visible={isGameEnded} />
  </div>
}