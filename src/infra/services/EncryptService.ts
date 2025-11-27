import bcrypt from "bcryptjs";
import type { IEncryptService } from "../../domain/services/IEncryptService.js";

export class EncryptService implements IEncryptService {
  private readonly SALT_ROUNDS = 10;

  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.SALT_ROUNDS);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
