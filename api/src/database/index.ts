import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import { GameTable } from './models/Game.js'
import { Environment } from '../environment.js'

export const dialect = new SqliteDialect({
  database: new SQLite(Environment.DB_FILENAME),
})

export interface Database {
  game: GameTable
}

export const db = new Kysely<Database>({
  dialect,
})

