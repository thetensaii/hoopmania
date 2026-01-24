import { injectable } from "inversify"
import type { Game } from "./Game"

@injectable()
export abstract class GuestGameService {
  public abstract shareGame: (newGame: Game) => Promise<void>
}