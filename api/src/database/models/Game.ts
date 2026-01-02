import {
  ColumnType,
  Insertable,
  Selectable,
} from 'kysely'

export interface GameTable {
  id: string
  user_id: string | null
  unauthenticated_player_name: string | null
  score: number
  time: number
  created_at: ColumnType<Date, string, never>
}

export type Game = Selectable<GameTable>
export type NewGame = Insertable<GameTable>
