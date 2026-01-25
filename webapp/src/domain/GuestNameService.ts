import { injectable } from "inversify";

@injectable()
export abstract class GuestNameService {
  public abstract find: () => Promise<string | null>
  public abstract save: (newName: string) => Promise<void>
}