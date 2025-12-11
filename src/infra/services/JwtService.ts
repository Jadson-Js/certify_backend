import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../../shared/environments/constants.js';
import {
  InternalServerError,
  UnauthorizedError,
} from '../../shared/error/AppError.js';
import type { IJwtService } from '../../domain/services/IJwtService.js';

export class JwtService implements IJwtService {
  private readonly JWT_ACCESS_SECRET = env.JWT_ACCESS_SECRET;
  private readonly JWT_ACCESS_EXPIRES = env.JWT_ACCESS_EXPIRES;
  private readonly JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;
  private readonly JWT_REFRESH_EXPIRES = env.JWT_REFRESH_EXPIRES;

  generateAccessToken(payload: { user_id: string }): string {
    if (!this.JWT_ACCESS_SECRET || !this.JWT_ACCESS_EXPIRES) {
      throw new InternalServerError('JWT configuration is missing');
    }

    const options: SignOptions = {
      expiresIn: this.JWT_ACCESS_EXPIRES as Exclude<
        SignOptions['expiresIn'],
        undefined
      >,
    };

    return jwt.sign(payload, this.JWT_ACCESS_SECRET, options);
  }

  generateRefreshToken(payload: { auth_session_id: string }): string {
    if (!this.JWT_REFRESH_SECRET || !this.JWT_REFRESH_EXPIRES) {
      throw new InternalServerError('JWT configuration is missing');
    }

    const options: SignOptions = {
      expiresIn: this.JWT_REFRESH_EXPIRES as Exclude<
        SignOptions['expiresIn'],
        undefined
      >,
    };

    return jwt.sign(payload, this.JWT_REFRESH_SECRET, options);
  }

  verifyAccess(accessToken: string): Record<string, unknown> {
    if (!this.JWT_ACCESS_SECRET || !this.JWT_ACCESS_EXPIRES) {
      throw new InternalServerError('JWT configuration is missing');
    }

    try {
      // Tenta verificar. Se o token estiver errado/expirado, vai pular pro catch
      return jwt.verify(accessToken, this.JWT_ACCESS_SECRET) as Record<
        string,
        unknown
      >;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  verifyRefresh(refreshToken: string): Record<string, unknown> {
    if (!this.JWT_REFRESH_SECRET || !this.JWT_REFRESH_EXPIRES) {
      throw new InternalServerError('JWT configuration is missing');
    }

    try {
      // Tenta verificar. Se o token estiver errado/expirado, vai pular pro catch
      return jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as Record<
        string,
        unknown
      >;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}
