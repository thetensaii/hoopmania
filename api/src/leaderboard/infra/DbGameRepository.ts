import { injectable } from "inversify";
import { Game } from "../domain/Game";
import { GameRepository } from "../domain/GameRepository";
import { db } from "../../database";
import { uuid } from "zod";

const games: Game[] = []

@injectable()
export class DbGameRepository implements GameRepository {

  public async save(game: Game): Promise<void> {
    await db
      .insertInto('game')
      .values({
        id: crypto.randomUUID(),
        score: game.score,
        player_name: game.player,
        time: game.time,
        created_at: new Date().toISOString()
      })
      .executeTakeFirst()
  }

  public async getAll(): Promise<Game[]> {
    const dbGames = await db.selectFrom('game').selectAll().execute()

    return dbGames.map((g) => ({ score: g.score, player: g.player_name, time: g.time }))
  }
}