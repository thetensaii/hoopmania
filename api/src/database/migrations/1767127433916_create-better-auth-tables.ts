import { type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  const trx = await db.startTransaction().execute()

  try {
    await trx.schema
      .createTable('user')
      .addColumn('id', 'text', (col) => col.primaryKey())
      .addColumn('name', 'text', (col) => col.notNull())
      .addColumn('email', 'text', (col) => col.notNull())
      .addColumn('emailVerified', 'boolean', (col) => col.notNull())
      .addColumn('image', 'text')
      .addColumn('createdAt', 'text', (col) => col.notNull())
      .addColumn('updatedAt', 'text', (col) => col.notNull())
      .execute()

    await trx.schema
      .createTable('session')
      .addColumn('id', 'text', (col) => col.primaryKey())
      .addColumn('userId', 'text', (col) => col.references('user.id'))
      .addColumn('token', 'text', (col) => col.notNull())
      .addColumn('expiresAt', 'text', (col) => col.notNull())
      .addColumn('ipAddress', 'text')
      .addColumn('userAgent', 'text')
      .addColumn('createdAt', 'text', (col) => col.notNull())
      .addColumn('updatedAt', 'text', (col) => col.notNull())
      .execute()

    await trx.schema
      .createTable('account')
      .addColumn('id', 'text', (col) => col.primaryKey())
      .addColumn('userId', 'text', (col) => col.references('user.id'))
      .addColumn('accountId', 'text', (col) => col.notNull())
      .addColumn('providerId', 'text', (col) => col.notNull())
      .addColumn('accessToken', 'text')
      .addColumn('refreshToken', 'text')
      .addColumn('accessTokenExpiresAt', 'text')
      .addColumn('refreshTokenExpiresAt', 'text')
      .addColumn('scope', 'text')
      .addColumn('idToken', 'text')
      .addColumn('password', 'text')
      .addColumn('createdAt', 'text', (col) => col.notNull())
      .addColumn('updatedAt', 'text', (col) => col.notNull())
      .execute()

    await trx.schema
      .createTable('verification')
      .addColumn('id', 'text', (col) => col.primaryKey())
      .addColumn('identifier', 'text', (col) => col.notNull())
      .addColumn('value', 'text', (col) => col.notNull())
      .addColumn('expiresAt', 'text', (col) => col.notNull())
      .addColumn('createdAt', 'text', (col) => col.notNull())
      .addColumn('updatedAt', 'text', (col) => col.notNull())
      .execute()


    await trx.commit().execute()
  } catch (e) {
    await trx.rollback().execute()
  }
}

export async function down(db: Kysely<any>): Promise<void> {
}
