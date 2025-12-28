import { injectable } from "inversify";
import { Game } from "./Game";

@injectable()
export abstract class GameRepository {
  public abstract save: (game: Game) => Promise<void>
  public abstract getAll: () => Promise<Game[]>
}