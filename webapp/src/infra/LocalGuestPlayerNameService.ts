import { injectable } from "inversify";
import type { GuestPlayerNameService } from "../domain/GuestPlayerNameService";


const PLAYER_NAME_KEY = 'playerName'

@injectable()
export class LocalGuestPlayerNameService implements GuestPlayerNameService {
  public async findPlayerName(): Promise<string | null> {
    const playerName = window.localStorage.getItem(PLAYER_NAME_KEY)

    return playerName
  }

  public async savePlayerName(newPlayerName: string): Promise<void> {
    window.localStorage.setItem(PLAYER_NAME_KEY, newPlayerName)
  }
}