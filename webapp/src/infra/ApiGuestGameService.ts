import { inject, injectable } from "inversify";
import type { Game } from "../domain/Game";
import type { GuestGameService } from "../domain/GuestGameService";
import { ApiClient } from "./ApiClient";

@injectable()
export class ApiGuestGameService implements GuestGameService {
  constructor(@inject(ApiClient) private readonly apiClient: ApiClient) {}

  public async shareGame(newGame: Game): Promise<void> {
    const res = await this.apiClient.post('/game', newGame)
    if (!res.ok) {
      throw new Error('[ApiGuestGameService] - Error when sharing game')
    }
  }
}