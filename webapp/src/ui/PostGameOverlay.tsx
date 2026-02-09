import type { ReactNode } from "react"
import { usePostGameScreenState } from "../stores/PostGameScreenState"
import { MainTab } from "./organism/post-game-screen/MainTab"
import { LeaderboardTab } from "./organism/LeaderboardTab"
import { ShareScoreTab } from "./organism/post-game-screen/ShareScoreTab"
import { LastGamesTab } from "./organism/LastGamesTab"
import { Overlay } from "./atom/Overlay"
import { SlideTransition } from "./molecule/SlideTransition"

type Props = {
  visible: boolean
}

export const PostGameOverlay = ({ visible }: Props) => {
  const tab = usePostGameScreenState((state) => state.tab)
  const setTab = usePostGameScreenState((state) => state.setTab)
  let component: ReactNode = null

  if (tab === 'main') {
    component = <MainTab />
  } else if (tab === 'leaderboard') {
    component = <LeaderboardTab onBackButtonClick={() => setTab('main')} />
  } else if (tab === 'shareScore') {
    component = <ShareScoreTab />
  } else if (tab === 'lastGames') {
    component = <LastGamesTab onBackButtonClick={() => setTab('main')} />
  }

  return (
    <Overlay visible={visible}>
      <SlideTransition id={tab}>
        {component}
      </SlideTransition>
    </Overlay>
  )
}