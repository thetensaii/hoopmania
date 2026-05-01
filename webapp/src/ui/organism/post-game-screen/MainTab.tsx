import { track } from "@plausible-analytics/tracker"
import { css } from "../../../../styled-system/css"
import { useAuth } from "../../../hooks/auth/useAuth"
import { useStartNewGameFn } from "../../../hooks/useStartNewGameFn"
import { useAuthState } from "../../../stores/AuthState"
import { useGameState } from "../../../stores/GameState"
import { usePostGameScreenState } from "../../../stores/PostGameScreenState"
import { Button } from "../../atom/Button"
import { DiscordLogo } from "../../atom/icons/DiscordLogo"
import { Logo } from "../../atom/Logo"
import { MenuContainer } from "../../atom/MenuContainer"

export const MainTab = () => {
  const { hasSharedScore, setTab, resetScreen } = usePostGameScreenState()
  const startNewGame = useStartNewGameFn()
  const score = useGameState((state) => state.score)
  const isAuthenticated = useAuthState((state) => state.isAuthenticated)
  const { signInWithDiscord } = useAuth()

  const handlePlayClick = () => {
    startNewGame(false)
    resetScreen()
  }

  return (
    <MenuContainer styles={css.raw({ gap: '1rem' })}>
      <Logo />
      <div>
        <p className={css({ textAlign: 'center', fontSize: "2rem" })}>FINAL SCORE</p>
        <p className={css({ textAlign: 'center', fontSize: "4rem" })}>{score}</p>
      </div>
      {(!hasSharedScore && !isAuthenticated) &&
        <Button onClick={() => setTab('shareScore')}>Share my score</Button>
      }
      <Button onClick={() => {
        setTab('leaderboard')
        track("check-leaderboard", {})
      }}>Leaderboard</Button>
      {isAuthenticated && <Button onClick={() => {
        setTab('lastGames')
        track("check-last-games", {})
      }}>Last Games</Button>}
      {!isAuthenticated && <Button onClick={signInWithDiscord}><DiscordLogo />Sign in with discord</Button>}
      <Button visual="accent" size='big' animation='pulse' onClick={handlePlayClick}>PLAY</Button>
    </MenuContainer >
  )
}