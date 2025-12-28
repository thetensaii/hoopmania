import { inject, injectable } from "inversify";
import { LeaderboardRepository } from "../domain/LeaderboardRepository";
import { Game } from "../domain/Game";
import { GameRepository } from "../domain/GameRepository";

@injectable()
export class InMemoryLeaderboardRepository implements LeaderboardRepository {
  constructor(@inject(GameRepository) private readonly gameRepo: GameRepository) {}

  public async getLeaders(): Promise<Game[]> {
    const games = await this.gameRepo.getAll()
    const bestGames = games.sort((a, b) => b.score - a.score).slice(0, 9)

    return bestGames
  }
}