import { css } from "../../../../styled-system/css"
import { useAuth } from "../../../hooks/auth/useAuth"
import { useGameState } from "../../../stores/GameState"
import { useMainScreenState } from "../../../stores/MainScreenState"
import { Button } from "../../atom/Button"
import { DiscordLogo } from "../../atom/icons/DiscordLogo"
import { Logo } from "../../atom/Logo"
import { MenuContainer } from "../../atom/MenuContainer"

export const MainTab = () => {
  const setTab = useMainScreenState((state) => state.setTab)
  const startNewGame = useGameState((state) => state.startNewGame)
  const bestScore = useGameState((state) => state.bestScore)
  const { isConnected, signOut, signInWithDiscord } = useAuth()

  return (
    <MenuContainer styles={css.raw({ gap: '1rem' })}>
      <Logo />
      {bestScore !== undefined &&
        <div>
          <p className={css({ textAlign: 'center', fontSize: "2rem" })}>BEST SCORE</p>
          <p className={css({ textAlign: 'center', fontSize: "3rem", fontWeight: 'bolder' })}>{bestScore}</p>
        </div>
      }
      <Button visual='secondary' onClick={() => setTab('leaderboard')}>Leaderboard</Button>
      {isConnected ?
        <>
          <Button visual='secondary' onClick={() => setTab('lastGames')}>Last Games</Button>
          <Button visual='secondary' onClick={signOut}>Sign Out</Button>
        </> :
        <Button visual='secondary' onClick={signInWithDiscord}><DiscordLogo /> Sign in with discord</Button>
      }
      <Button size='big' animation='pulse' onClick={startNewGame}>PLAY</Button>
    </MenuContainer >
  )
}