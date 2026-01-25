import { injectable } from "inversify";
import type { GuestNameService } from "../domain/GuestNameService";


const GUEST_NAME_KEY = 'guestName'

@injectable()
export class LocalGuestNameService implements GuestNameService {
  public async find(): Promise<string | null> {
    const playerName = window.localStorage.getItem(GUEST_NAME_KEY)

    return playerName
  }

  public async save(newPlayerName: string): Promise<void> {
    window.localStorage.setItem(GUEST_NAME_KEY, newPlayerName)
  }
}