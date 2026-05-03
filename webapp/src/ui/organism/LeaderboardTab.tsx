import type { ReactNode } from "react"
import { useGetLeaderboard } from "../../hooks/useGetLeaderboard"
import { Button } from "../atom/Button"
import { MenuContainer } from "../atom/MenuContainer"
import { Table } from "../molecule/Table"
import { css } from "../../../styled-system/css"
import type { ColumnDef } from "@tanstack/react-table"
import type { Game } from "../../domain/Game"
import { Typography } from "../atom/Typography"

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
      <Typography component="h1" variant="heading1">LEADERBOARD</Typography>
      {component}
      <div className={css({ w: 'full', mt: 'md' })}>
        <Button onClick={onBackButtonClick}>BACK</Button>
      </div>
    </MenuContainer>
  )
}