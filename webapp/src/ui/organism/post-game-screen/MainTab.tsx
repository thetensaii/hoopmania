import { css } from "../../../../styled-system/css"
import { useGameState } from "../../../stores/GameState"
import { usePostGameScreenState } from "../../../stores/PostGameScreenState"
import { Button } from "../../atom/Button"
import { Logo } from "../../atom/Logo"
import { MenuContainer } from "../../atom/MenuContainer"

export const MainTab = () => {
  const setTab = usePostGameScreenState((state) => state.setTab)
  const startNewGame = useGameState((state) => state.startNewGame)
  const score = useGameState((state) => state.score)

  return (
    <MenuContainer>
      <Logo />
      <p className={css({ textAlign: 'center', fontSize: "2rem" })}>FINAL SCORE</p>
      <p className={css({ textAlign: 'center', fontSize: "4rem" })}>{score}</p>
      <div className={css({ w: 'full', mb: "1rem" })}>
        <Button visual='secondary' onClick={() => setTab('leaderboard')}>Leaderboard</Button>
      </div>
      <Button size='big' animation='pulse' onClick={startNewGame}>PLAY</Button>
    </MenuContainer >
  )
}