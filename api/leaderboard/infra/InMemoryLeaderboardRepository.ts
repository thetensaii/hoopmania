import { injectable } from "inversify";
import { LeaderboardRepository } from "../domain/LeaderboardRepository";
import { Game } from "../domain/Game";

@injectable()
export class InMemoryLeaderboardRepository implements LeaderboardRepository {
  private leaders: Game[] = []
  public async getLeaders(): Promise<Game[]> {
    return this.leaders
  }
}