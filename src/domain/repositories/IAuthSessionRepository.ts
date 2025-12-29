import type { IAuthSessionEntity } from '../entities/AuthSession.entity.js';

export interface ICreateAuthSessionInputRepository {
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
}

export interface IAuthSessionRepository {
  findById(id: string): Promise<IAuthSessionEntity | null>;
  create(
    params: ICreateAuthSessionInputRepository,
  ): Promise<IAuthSessionEntity>;
  deleteById(id: string): Promise<null>;
  deleteByUserId(userId: string): Promise<null>;
}
