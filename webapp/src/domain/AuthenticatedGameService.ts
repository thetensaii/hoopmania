import z from "zod";
import { Game } from "./Game";
import { injectable } from "inversify";

export const AuthenticatedNewGame = Game.pick({ score: true, time: true })
export type AuthenticatedNewGame = z.infer<typeof AuthenticatedNewGame>;

@injectable()
export abstract class AuthenticatedGameService {
  public abstract saveGame: (newGame: AuthenticatedNewGame) => Promise<void>
  public abstract getLastGames: () => Promise<Game[]>
}