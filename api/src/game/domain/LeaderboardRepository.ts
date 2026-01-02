import { injectable } from "inversify";
import { Game } from "./Game";

@injectable()
export abstract class LeaderboardRepository {
  public abstract getLeaders: () => Promise<Game[]>
}