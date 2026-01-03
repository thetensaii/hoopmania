import type { ReactNode } from "react"
import { css } from "../../../styled-system/css"
import { useGetLastGames } from "../../hooks/useGetLastGames"
import { Button } from "../atom/Button"
import { MenuContainer } from "../atom/MenuContainer"
import { Title } from "../atom/Title"
import { Table } from "../molecule/Table"
import type { ColumnDef } from "@tanstack/react-table"
import type { Game } from "../../domain/Game"

type Props = {
  onBackButtonClick: () => void
}

const columns: ColumnDef<Game>[] = [
  { accessorKey: 'player', header: 'Player' },
  { accessorKey: 'score', header: 'Score' },
]

export const LastGamesTab = ({ onBackButtonClick }: Props) => {
  const { isPending, isError, data } = useGetLastGames()

  let component: ReactNode = null
  if (isPending) {
    component = <p>Loading..</p>
  } else if (isError) {
    component = <p>Une erreur est survenue.</p>
  } else {
    component = <Table data={data} columns={columns} />
  }

  return (
    <MenuContainer>
      <Title>LAST GAMES</Title>
      {component}
      <div className={css({ w: 'full', mt: '1rem' })}>
        <Button visual='secondary' onClick={onBackButtonClick}>BACK</Button>
      </div>
    </MenuContainer>
  )
}