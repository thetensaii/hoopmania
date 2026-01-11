import { inject, injectable } from "inversify";
import type { AuthenticatedBestScoreService } from "../domain/AuthenticatedBestScoreService";
import { ApiClient } from "./ApiClient";
import { Game } from "../domain/Game";

@injectable()
export class ApiAuthenticatedBestScoreService implements AuthenticatedBestScoreService {
  constructor(@inject(ApiClient) private readonly apiClient: ApiClient) {}

  public async findBestScore(): Promise<number | null> {
    const res = await this.apiClient.get('/game/best')

    if (!res.ok) {
      throw new Error('[ApiAuthenticatedBestScoreService] - Error when loading best game')
    }

    const { data } = await res.json()
    const bestGame = Game.optional().parse(data)

    return bestGame?.score ?? null;

  }
}