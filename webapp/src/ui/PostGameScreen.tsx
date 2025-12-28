import type { ReactNode } from "react"
import { usePostGameScreenState } from "../stores/PostGameScreenState"
import { CenterContainer } from "./atom/CenterContainer"
import { MainTab } from "./organism/post-game-screen/MainTab"
import { LeaderboardTab } from "./organism/LeaderboardTab"
import { ShareScoreTab } from "./organism/post-game-screen/ShareScoreTab"

export const PostGameScreen = () => {
  const tab = usePostGameScreenState((state) => state.tab)
  const setTab = usePostGameScreenState((state) => state.setTab)
  let component: ReactNode = null

  if (tab === 'main') {
    component = <MainTab />
  } else if (tab === 'leaderboard') {
    component = <LeaderboardTab onBackButtonClick={() => setTab('main')} />
  } else if (tab === 'shareScore') {
    component = <ShareScoreTab />
  }

  return (
    <CenterContainer>
      {component}
    </CenterContainer>
  )
}