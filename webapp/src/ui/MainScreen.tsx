import { type ReactNode } from "react"
import { MainTab } from "./organism/main-screen/MainTab"
import { LeaderboardTab } from "./organism/LeaderboardTab"
import { useMainScreenState } from "../stores/MainScreenState"
import { LastGamesTab } from "./organism/LastGamesTab"
import { Overlay } from "./atom/Overlay"
import { SlideTransition } from "./molecule/SlideTransition"

type Props = {
  visible: boolean
}

export const MainScreen = ({ visible }: Props) => {
  const tab = useMainScreenState((state) => state.tab)
  const setTab = useMainScreenState((state) => state.setTab)
  let component: ReactNode = null

  if (tab === 'main') {
    component = <MainTab />
  } else if (tab === 'leaderboard') {
    component = <LeaderboardTab onBackButtonClick={() => setTab('main')} />
  } else if (tab === 'lastGames') {
    component = <LastGamesTab onBackButtonClick={() => setTab('main')} />
  }

  return (
    <Overlay visible={visible}>
      <SlideTransition
        id={tab}
      >
        {component}
      </SlideTransition>
    </Overlay>
  )
}