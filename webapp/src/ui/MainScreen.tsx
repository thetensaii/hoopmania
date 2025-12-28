
import { CenterContainer } from "./atom/CenterContainer"
import { type ReactNode } from "react"
import { MainTab } from "./organism/main-screen/MainTab"
import { LeaderboardTab } from "./organism/LeaderboardTab"
import { useMainScreenState } from "../stores/MainScreenState"



export const MainScreen = () => {
  const tab = useMainScreenState((state) => state.tab)
  const setTab = useMainScreenState((state) => state.setTab)
  let component: ReactNode = null

  if (tab === 'main') {
    component = <MainTab />
  } else if (tab === 'leaderboard') {
    component = <LeaderboardTab onBackButtonClick={() => setTab('main')} />
  }

  return (
    <CenterContainer>
      {component}
    </CenterContainer>
  )
}