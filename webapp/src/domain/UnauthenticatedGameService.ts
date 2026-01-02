import { injectable } from "inversify"
import type { Game } from "./Game"

@injectable()
export abstract class UnauthenticatedGameService {
  public abstract shareGame: (newGame: Game) => Promise<void>
}