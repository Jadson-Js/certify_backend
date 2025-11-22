import { hash, compare } from "bcryptjs";
import type { IHashService } from "../../domain/services/IHashService.js";

export class HasherService implements IHashService {
  private readonly SALT_ROUNDS = 10;

  async hash(payload: string): Promise<string> {
    return hash(payload, this.SALT_ROUNDS);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
