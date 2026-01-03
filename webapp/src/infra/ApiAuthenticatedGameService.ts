import { inject, injectable } from "inversify";
import type { AuthenticatedGameService, AuthenticatedNewGame } from "../domain/AuthenticatedGameService";
import { ApiClient } from "./ApiClient";
import { Game } from "../domain/Game";

@injectable()
export class ApiAuthenticatedGameService implements AuthenticatedGameService {

  constructor(@inject(ApiClient) private readonly apiClient: ApiClient) {}

  public async saveGame(newGame: AuthenticatedNewGame): Promise<void> {
    const res = await this.apiClient.post('/game', newGame)
    if (!res.ok) {
      throw new Error('[ApiAuthenticatedGameService] - Error when saving game')
    }
  }

  public async getLastGames(): Promise<Game[]> {
    const res = await this.apiClient.get('/game/last')
    if (!res.ok) {
      throw new Error('[ApiAuthenticatedGameService] - Error when loading last games')
    }

    const { data } = await res.json()
    const lastGames = Game.array().parse(data)

    return lastGames
  }
}