import { injectable } from "inversify";

@injectable()
export abstract class UnauthenticatedBestScoreService {
  public abstract findBestScore: () => Promise<number | null>
  public abstract saveBestScore: (newBestScore: number) => Promise<number>
}