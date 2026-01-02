import { injectable } from "inversify";
import { Game } from "./Game";
import { User } from "better-auth/types";
import z from "zod";

export const AuthenticatedNewGame = Game.pick({ score: true, time: true })
export type AuthenticatedNewGame = z.infer<typeof AuthenticatedNewGame>;

@injectable()
export abstract class GameRepository {
  public abstract saveUnauthenticated: (game: Game) => Promise<void>
  public abstract saveAuthenticated: (user: User, game: AuthenticatedNewGame) => Promise<void>
  public abstract getAll: () => Promise<Game[]>
}