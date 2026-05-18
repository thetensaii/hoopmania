import { css } from "../../styled-system/css"
import { useGamePhase } from "../hooks/useGamePhase"
import { PostGameOverlay } from "./PostGameOverlay"
import { MainOverlay } from "./MainOverlay"

const style = css({
  position: 'absolute',
  top: '[0]',
  left: '[0]',
  w: 'full',
  h: 'full',
  pointerEvents: 'none',
  ['& *']: {
    pointerEvents: 'auto'
  },
})


export const UI = () => {
  const { isGameReady, isGameEnded } = useGamePhase()

  return <div className={style}>
    <MainOverlay visible={isGameReady} />
    <PostGameOverlay visible={isGameEnded} />
  </div>
}