import { injectable } from "inversify";
import type { UnauthenticatedPlayerNameService } from "../domain/UnauthenticatedPlayerNameService";


const PLAYER_NAME_KEY = 'playerName'

@injectable()
export class LocalUnauthenticatedPlayerNameService implements UnauthenticatedPlayerNameService {
  public async findPlayerName(): Promise<string | null> {
    const playerName = window.localStorage.getItem(PLAYER_NAME_KEY)

    return playerName
  }

  public async savePlayerName(newPlayerName: string): Promise<void> {
    window.localStorage.setItem(PLAYER_NAME_KEY, newPlayerName)
  }
}