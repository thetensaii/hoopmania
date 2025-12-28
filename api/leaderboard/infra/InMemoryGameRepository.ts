import { injectable } from "inversify";
import { Game } from "../domain/Game";
import { GameRepository } from "../domain/GameRepository";

const games: Game[] = []

@injectable()
export class InMemoryGameRepository implements GameRepository {

  public async save(game: Game): Promise<void> {
    games.push(game)
  }

  public async getAll(): Promise<Game[]> {
    return [...games]
  }
}