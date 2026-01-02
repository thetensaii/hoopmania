import type { Game } from "./Game";

export abstract class LeaderboardService {
  public abstract getLeaders: () => Promise<Game[]>
}