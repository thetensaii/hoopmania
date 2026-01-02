import { inject, injectable } from "inversify";
import type { Game } from "../domain/Game";
import type { UnauthenticatedGameService } from "../domain/UnauthenticatedGameService";
import { ApiClient } from "./ApiClient";

@injectable()
export class ApiUnauthenticatedGameService implements UnauthenticatedGameService {

  constructor(@inject(ApiClient) private readonly apiClient: ApiClient) {}

  public async shareGame(newGame: Game): Promise<void> {
    const res = await this.apiClient.post('/game', newGame)
    if (!res.ok) {
      throw new Error('[ApiUnauthenticatedGameService] - Error when sharing game')
    }
  }
}