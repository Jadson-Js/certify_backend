import type { IAuthSessionEntity } from '../entities/authSession.entity.js';

export interface IAuthTokenService {
  createAuthSession(
    userId: string,
    authSessionId: string,
    refreshToken: string,
  ): Promise<IAuthSessionEntity>;
}
