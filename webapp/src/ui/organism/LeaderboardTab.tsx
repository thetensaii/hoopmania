import type { ReactNode } from "react"
import { useGetLeaderboard } from "../../hooks/useGetLeaderboard"
import { Button } from "../atom/Button"
import { MenuContainer } from "../atom/MenuContainer"
import { Title } from "../atom/Title"
import { LeaderboardTable } from "../molecule/LeaderboardTable"
type Props = {
  onBackButtonClick?: () => void
}
export const LeaderboardTab = ({ onBackButtonClick }: Props) => {
  const { isPending, isError, data } = useGetLeaderboard()

  let component: ReactNode = null
  if (isPending) {
    component = <p>Loading..</p>
  } else if (isError) {
    component = <p>Une erreur est survenue.</p>
  } else {
    component = <LeaderboardTable games={data} />
  }


  return (
    <MenuContainer>
      <Title>LEADERBOARD</Title>
      {component}
      <Button visual='secondary' onClick={onBackButtonClick}>BACK</Button>
    </MenuContainer>
  )
}