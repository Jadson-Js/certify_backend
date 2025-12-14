import type { IAuthSessionEntity } from '../entities/authSession.entity.js';

export interface IAuthSessionService {
  create(
    userId: string,
    authSessionId: string,
    refreshToken: string,
  ): Promise<IAuthSessionEntity>;
}
