import { sign, verify, type SignOptions } from "jsonwebtoken";
import type { IAuthService } from "../../domain/services/IAuthService.js";
import { env } from "../../shared/environments/const.js";
import { InternalServerError } from "../../shared/error/AppError.js";

export class AuthService implements IAuthService {
  private readonly JWT_SECRET = env.JWT_SECRET;
  private readonly JWT_EXPIRES = env.JWT_EXPIRES;

  generate(payload: { id: string }): string {
    if (!this.JWT_SECRET || !this.JWT_EXPIRES) {
      throw new InternalServerError();
    }

    const options: SignOptions = {
      expiresIn: this.JWT_EXPIRES as Exclude<
        SignOptions["expiresIn"],
        undefined
      >,
    };

    return sign(payload, this.JWT_SECRET, options);
  }

  verify(token: string): Record<string, unknown> {
    if (!this.JWT_SECRET || !this.JWT_EXPIRES) {
      throw new InternalServerError();
    }

    return verify(token, this.JWT_SECRET) as Record<string, unknown>;
  }
}
