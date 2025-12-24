import { css } from "../../styled-system/css"
import { useGameState } from "../GameState"
import { Button } from "./atom/Button"
import { CenterContainer } from "./atom/CenterContainer"
import { Logo } from "./atom/Logo"
import { MenuContainer } from "./atom/MenuContainer"

export const ReadyScreen = () => {
  const startNewGame = useGameState((state) => state.startNewGame)
  const bestScore = useGameState((state) => state.bestScore)

  return (
    <CenterContainer>
      <MenuContainer>
        <Logo />
        {bestScore !== undefined &&
          <div className={css({ mb: '1rem' })}>
            <p className={css({ textAlign: 'center', fontSize: "2rem" })}>BEST SCORE</p>
            <p className={css({ textAlign: 'center', fontSize: "3rem", fontWeight: 'bolder' })}>{bestScore}</p>
          </div>
        }
        <Button onClick={startNewGame}>PLAY</Button>
      </MenuContainer>
    </CenterContainer>
  )
}