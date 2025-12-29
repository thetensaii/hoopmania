import {
  ColumnType,
  Insertable,
  Selectable,
} from 'kysely'

export interface GameTable {
  id: string
  player_name: string
  score: number
  time: number
  created_at: ColumnType<Date, string, never>
}

export type Game = Selectable<GameTable>
export type NewGame = Insertable<GameTable>
