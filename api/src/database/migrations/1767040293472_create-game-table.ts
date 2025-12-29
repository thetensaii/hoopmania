import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('game')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('player_name', 'text', (col) => col.notNull())
    .addColumn('score', 'integer', (col) => col.notNull())
    .addColumn('time', 'integer', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
}
