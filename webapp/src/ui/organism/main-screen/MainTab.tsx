import { css } from "../../../../styled-system/css"
import { useGameState } from "../../../stores/GameState"
import { useMainScreenState } from "../../../stores/MainScreenState"
import { Button } from "../../atom/Button"
import { Logo } from "../../atom/Logo"
import { MenuContainer } from "../../atom/MenuContainer"

export const MainTab = () => {
  const setTab = useMainScreenState((state) => state.setTab)
  const startNewGame = useGameState((state) => state.startNewGame)
  const bestScore = useGameState((state) => state.bestScore)

  return (
    <MenuContainer>
      <Logo />
      {bestScore !== undefined &&
        <div className={css({ mb: '1rem' })}>
          <p className={css({ textAlign: 'center', fontSize: "2rem" })}>BEST SCORE</p>
          <p className={css({ textAlign: 'center', fontSize: "3rem", fontWeight: 'bolder' })}>{bestScore}</p>
        </div>
      }
      <div className={css({ w: 'full', mb: "1rem" })}>
        <Button visual='secondary' onClick={() => setTab('leaderboard')}>Leaderboard</Button>
      </div>
      <Button size='big' animation='pulse' onClick={startNewGame}>PLAY</Button>
    </MenuContainer >
  )
}