import { inject, injectable } from "inversify";
import { ApiClient } from "./ApiClient";
import type { LeaderboardService } from "../domain/LeaderboardService";
import { Game } from "../domain/Game";

@injectable()
export class ApiLeaderboardService implements LeaderboardService {

  constructor(@inject(ApiClient) private readonly apiClient: ApiClient) {}

  public async getLeaders(): Promise<Game[]> {
    const res = await this.apiClient.get('/leaders')
    if (!res.ok) {
      throw new Error('[ApiLeaderboardService] - Error when retrieving leaders')
    }

    const { data } = await res.json()
    const leaders = Game.array().parse(data)

    return leaders
  }
}