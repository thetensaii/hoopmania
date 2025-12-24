import { css } from "../../styled-system/css"
import { useGameState } from "../GameState"
import { Button } from "./atom/Button"
import { CenterContainer } from "./atom/CenterContainer"
import { Logo } from "./atom/Logo"
import { MenuContainer } from "./atom/MenuContainer"

export const EndingScreen = () => {
  const startNewGame = useGameState((state) => state.startNewGame)
  const score = useGameState((state) => state.score)

  return (
    <CenterContainer>
      <MenuContainer>
        <Logo />
        <p className={css({ textAlign: 'center', fontSize: "2rem" })}>FINAL SCORE</p>
        <p className={css({ textAlign: 'center', fontSize: "4rem" })}>{score}</p>
        <Button onClick={startNewGame}>PLAY</Button>
      </MenuContainer>
    </CenterContainer>
  )
}