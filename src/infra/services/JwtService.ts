import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../../shared/environments/constants.js';
import {
  InternalServerError,
  UnauthorizedError,
} from '../../shared/error/AppError.js';
import type { IJwtService } from '../../domain/services/IJwtService.js';
import { injectable } from 'inversify';

@injectable()
export class JwtService implements IJwtService {
  private readonly JWT_ACCESS_SECRET = env.JWT_ACCESS_SECRET;
  private readonly JWT_ACCESS_EXPIRES = '1d';
  private readonly JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;
  private readonly JWT_REFRESH_EXPIRES = '1d';

  generateAccessToken(payload: { userId: string }): string {
    return this.generateToken(
      payload,
      this.JWT_ACCESS_SECRET,
      this.JWT_ACCESS_EXPIRES,
    );
  }

  generateRefreshToken(payload: { authSessionId: string }): string {
    return this.generateToken(
      payload,
      this.JWT_REFRESH_SECRET,
      this.JWT_REFRESH_EXPIRES,
    );
  }

  verifyAccess(accessToken: string): Record<string, unknown> {
    return this.verifyToken(accessToken, this.JWT_ACCESS_SECRET);
  }

  verifyRefresh(refreshToken: string): Record<string, unknown> {
    return this.verifyToken(refreshToken, this.JWT_REFRESH_SECRET);
  }

  private generateToken(
    payload: Record<string, unknown>,
    secret: string | undefined,
    expiresIn: string | undefined,
  ): string {
    if (!secret || !expiresIn) {
      throw new InternalServerError('JWT configuration is missing');
    }

    const options = { expiresIn } as SignOptions;

    return jwt.sign(payload, secret as string, options);
  }

  private verifyToken(
    token: string,
    secret: string | undefined,
  ): Record<string, unknown> {
    if (!secret) {
      throw new InternalServerError('JWT configuration is missing');
    }

    try {
      return jwt.verify(token, secret) as Record<string, unknown>;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}
