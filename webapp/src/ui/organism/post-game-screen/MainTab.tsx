import { css } from "../../../../styled-system/css"
import { useGameState } from "../../../stores/GameState"
import { usePostGameScreenState } from "../../../stores/PostGameScreenState"
import { Button } from "../../atom/Button"
import { Logo } from "../../atom/Logo"
import { MenuContainer } from "../../atom/MenuContainer"

export const MainTab = () => {
  const { hasSharedScore, setTab, resetScreen } = usePostGameScreenState()
  const startNewGame = useGameState((state) => state.startNewGame)
  const score = useGameState((state) => state.score)

  const handlePlayClick = () => {
    startNewGame()
    resetScreen()
  }

  return (
    <MenuContainer>
      <Logo />
      <p className={css({ textAlign: 'center', fontSize: "2rem" })}>FINAL SCORE</p>
      <p className={css({ textAlign: 'center', fontSize: "4rem" })}>{score}</p>
      {!hasSharedScore &&
        <div className={css({ w: 'full', mb: "1rem" })}>
          <Button visual='secondary' onClick={() => setTab('shareScore')}>Share my score</Button>
        </div>
      }
      <div className={css({ w: 'full', mb: "1rem" })}>
        <Button visual='secondary' onClick={() => setTab('leaderboard')}>Leaderboard</Button>
      </div>
      <Button size='big' animation='pulse' onClick={handlePlayClick}>PLAY</Button>
    </MenuContainer >
  )
}