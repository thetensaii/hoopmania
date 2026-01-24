import { injectable } from "inversify";

@injectable()
export abstract class GuestBestScoreService {
  public abstract findBestScore: () => Promise<number | null>
  public abstract saveBestScore: (newBestScore: number) => Promise<void>
}