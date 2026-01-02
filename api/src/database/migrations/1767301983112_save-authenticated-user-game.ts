import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  const trx = await db.startTransaction().execute()
  try {
    await trx.schema
      .createTable('new_game')
      .addColumn('id', 'text', (col) => col.primaryKey())
      .addColumn('user_id', 'text', (col) => col.references('user.id'))
      .addColumn('unauthenticated_player_name', 'text')
      .addColumn('score', 'integer', (col) => col.notNull())
      .addColumn('time', 'integer', (col) => col.notNull())
      .addColumn('created_at', 'text', (col) => col.notNull())
      .execute()

    await sql`
      INSERT INTO new_game (id, unauthenticated_player_name, score, time, created_at)
      SELECT id, player_name, score, time, created_at FROM game;
    `.execute(trx)

    await trx.schema
      .dropTable('game')
      .execute()

    await trx.schema
      .alterTable('new_game')
      .renameTo('game')
      .execute()

    await trx.commit().execute()
  } catch (e) {
    await trx.rollback().execute()
  }
}

export async function down(db: Kysely<any>): Promise<void> {
}
