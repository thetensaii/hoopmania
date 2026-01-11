import { injectable } from "inversify";

@injectable()
export abstract class AuthenticatedBestScoreService {
  public abstract findBestScore: () => Promise<number | null>
}