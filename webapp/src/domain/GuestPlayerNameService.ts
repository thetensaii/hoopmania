import { injectable } from "inversify";

@injectable()
export abstract class GuestPlayerNameService {
  public abstract findPlayerName: () => Promise<string | null>
  public abstract savePlayerName: (newPlayerName: string) => Promise<void>
}