import SQLite from 'better-sqlite3'
import { CompiledQuery, Kysely, SqliteDialect } from 'kysely'
import { GameTable } from './models/Game.js'
import { Environment } from '../environment.js';
import { UserTable } from './models/User.js';

export const dialect = new SqliteDialect({
  database: new SQLite(Environment.DB_FILENAME),
  onCreateConnection: async connnection => {
    await connnection.executeQuery(CompiledQuery.raw(`PRAGMA foreign_keys = ON`));
  },
})

export interface Database {
  game: GameTable
  user: UserTable
}

export const db = new Kysely<Database>({
  dialect,
})

