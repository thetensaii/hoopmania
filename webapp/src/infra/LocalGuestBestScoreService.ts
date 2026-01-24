import { injectable } from "inversify";
import type { GuestBestScoreService } from "../domain/GuestBestScoreService";

const BEST_SCORE_KEY = 'bestScore'

@injectable()
export class LocalGuestBestScoreService implements GuestBestScoreService {
  public async findBestScore(): Promise<number | null> {
    const bestScore = window.localStorage.getItem(BEST_SCORE_KEY)

    return bestScore ? Number(bestScore) : null
  }

  public async saveBestScore(newBestScore: number): Promise<void> {
    window.localStorage.setItem(BEST_SCORE_KEY, String(newBestScore))
  }
}