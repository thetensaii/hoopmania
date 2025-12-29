import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import { GameTable } from './models/Game.js'

export const dialect = new SqliteDialect({
  database: new SQLite(':memory:'),
})

export interface Database {
  game: GameTable
}

export const db = new Kysely<Database>({
  dialect,
})

