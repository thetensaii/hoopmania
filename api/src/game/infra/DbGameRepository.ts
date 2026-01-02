import { injectable } from "inversify";
import { Game } from "../domain/Game";
import { AuthenticatedNewGame, GameRepository } from "../domain/GameRepository";
import { db } from "../../database";
import { uuid } from "zod";
import { User } from "better-auth/*";

const games: Game[] = []

@injectable()
export class DbGameRepository implements GameRepository {

  public async saveUnauthenticated(game: Game): Promise<void> {
    await db
      .insertInto('game')
      .values({
        id: crypto.randomUUID(),
        score: game.score,
        unauthenticated_player_name: game.player,
        time: game.time,
        created_at: new Date().toISOString()
      })
      .executeTakeFirst()
  }

  public async saveAuthenticated(user: User, game: AuthenticatedNewGame): Promise<void> {
    await db
      .insertInto('game')
      .values({
        id: crypto.randomUUID(),
        user_id: user.id,
        score: game.score,
        time: game.time,
        created_at: new Date().toISOString()
      })
      .executeTakeFirst()
  }

  public async getAll(): Promise<Game[]> {
    const dbGames = await db.selectFrom('game').leftJoin('user', 'user.id', 'game.user_id').select(['score', 'time', 'user.name as userName', 'unauthenticated_player_name']).execute()

    return dbGames.map((g) => ({ score: g.score, player: g.userName ?? g.unauthenticated_player_name ?? '', time: g.time }))
  }
}