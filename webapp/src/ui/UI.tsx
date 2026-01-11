import { css } from "../../styled-system/css"
import { useGamePhase } from "../hooks/useGamePhase"
import { PostGameScreen } from "./PostGameScreen"
import { PlayingScreen } from "./PlayingScreen"
import { MainScreen } from "./MainScreen"
import { useSuspenseQuery } from "@tanstack/react-query"
import { authClient } from "../auth-client"
import { useBestScore } from "../hooks/useBestScore"
import { usePlayerName } from "../hooks/usePlayerName"
import { useEffect } from "react"

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
  _active: {
    pointerEvents: 'auto',
    bg: 'darkBlue.900/80',
  }
})

let didInit = false

export const UI = () => {
  const result = useSuspenseQuery({
    queryKey: ['authSession'], queryFn: async () => {
      return await authClient.getSession()
    }
  })
  const { loadBestScore } = useBestScore()
  const { loadPlayerName } = usePlayerName()
  const { isGameReady, isGamePlaying, isGameEnded } = useGamePhase()

  useEffect(() => {
    if (!didInit && !result.isLoading)
      (async () => {
        didInit = true
        const isConnected = !!result.data.data?.user
        await loadBestScore(isConnected)
        loadPlayerName()

      })()
  }, [loadBestScore, loadPlayerName, result.isLoading, result.data])

  return <div data-active={!isGamePlaying ? "" : undefined} className={style}>
    {isGamePlaying && <PlayingScreen />}
    {isGameReady && <MainScreen />}
    {isGameEnded && <PostGameScreen />}
  </div>
}