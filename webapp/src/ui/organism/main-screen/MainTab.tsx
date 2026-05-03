import { track } from "@plausible-analytics/tracker"
import { css } from "../../../../styled-system/css"
import { useAuth } from "../../../hooks/auth/useAuth"
import { useStartNewGameFn } from "../../../hooks/useStartNewGameFn"
import { useAuthState } from "../../../stores/AuthState"
import { useGameState } from "../../../stores/GameState"
import { useMainScreenState } from "../../../stores/MainScreenState"
import { Button } from "../../atom/Button"
import { DiscordLogo } from "../../atom/icons/DiscordLogo"
import { MenuContainer } from "../../atom/MenuContainer"
import { Typography } from "../../atom/Typography"

export const MainTab = () => {
  const setTab = useMainScreenState((state) => state.setTab)
  const startNewGame = useStartNewGameFn()
  const bestScore = useGameState((state) => state.bestScore)
  const isAuthenticated = useAuthState((state) => state.isAuthenticated)
  const { signOut, signInWithDiscord } = useAuth()

  return (
    <MenuContainer styles={css.raw({ gap: '1rem' })}>
      <Typography component="h1" variant="heading1">HOOPMANIA</Typography>
      {bestScore !== undefined &&
        <div>
          <Typography variant="heading3" css={{ textAlign: "center" }}>BEST SCORE</Typography>
          <Typography variant="heading2" css={{ textAlign: "center" }}>{bestScore}</Typography>
        </div>
      }
      <Button onClick={() => {
        setTab('leaderboard')
        track("check-leaderboard", {})
      }}>Leaderboard</Button>
      {isAuthenticated ?
        <>
          <Button onClick={() => {
            setTab('lastGames')
            track("check-last-games", {})
          }}>Last Games</Button>
          <Button onClick={signOut}>Sign Out</Button>
        </> :
        <Button onClick={signInWithDiscord}><DiscordLogo /> Sign in with discord</Button>
      }
      <Button visual="accent" size='big' animation='pulse' onClick={() => startNewGame(true)}>PLAY</Button>
    </MenuContainer >
  )
}