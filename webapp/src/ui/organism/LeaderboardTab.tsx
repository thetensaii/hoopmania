import type { ReactNode } from "react"
import { useGetLeaderboard } from "../../hooks/useGetLeaderboard"
import { Button } from "../atom/Button"
import { MenuContainer } from "../atom/MenuContainer"
import { Title } from "../atom/Title"
import { Table } from "../molecule/Table"
import { css } from "../../../styled-system/css"
import type { ColumnDef } from "@tanstack/react-table"
import type { Game } from "../../domain/Game"

type Props = {
  onBackButtonClick: () => void
}

type Leader = Game & { rank: number }

const columns: ColumnDef<Leader>[] = [
  { accessorKey: 'rank', header: 'Rank' },
  { accessorKey: 'player', header: 'Player' },
  { accessorKey: 'score', header: 'Score' },
]

export const LeaderboardTab = ({ onBackButtonClick }: Props) => {
  const { isPending, isError, data } = useGetLeaderboard()

  let component: ReactNode = null
  if (isPending) {
    component = <p>Loading..</p>
  } else if (isError) {
    component = <p>Une erreur est survenue.</p>
  } else {
    const leaders: Leader[] = data.map((l, i) => ({ ...l, rank: i + 1 }))
    component = <Table data={leaders} columns={columns} />
  }


  return (
    <MenuContainer>
      <Title>LEADERBOARD</Title>
      {component}
      <div className={css({ w: 'full', mt: '[1rem]' })}>
        <Button visual='secondary' onClick={onBackButtonClick}>BACK</Button>
      </div>
    </MenuContainer>
  )
}