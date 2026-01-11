import { injectable } from "inversify";
import type { UnauthenticatedBestScoreService } from "../domain/UnauthenticatedBestScoreService";

const BEST_SCORE_KEY = 'bestScore'

@injectable()
export class LocalUnauthenticatedBestScoreService implements UnauthenticatedBestScoreService {
  public async findBestScore(): Promise<number | null> {
    const bestScore = window.localStorage.getItem(BEST_SCORE_KEY)

    return bestScore ? Number(bestScore) : null
  }

  public async saveBestScore(newBestScore: number): Promise<void> {
    window.localStorage.setItem(BEST_SCORE_KEY, String(newBestScore))
  }
}