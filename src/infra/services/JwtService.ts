import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../shared/environments/constants.js";
import { InternalServerError } from "../../shared/error/AppError.js";
import type { IJwtService } from "../../domain/services/IJwtService.js";

export class JwtService implements IJwtService {
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

    return jwt.sign(payload, this.JWT_SECRET, options);
  }

  verify(token: string): Record<string, unknown> {
    if (!this.JWT_SECRET || !this.JWT_EXPIRES) {
      throw new InternalServerError();
    }

    return jwt.verify(token, this.JWT_SECRET) as Record<string, unknown>;
  }
}
