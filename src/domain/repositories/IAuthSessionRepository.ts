import type { IAuthSessionEntity } from '../entities/authSession.entity.js';

export interface ICreateAuthSessionInputRepository {
  user_id: string;
  refresh_token_hash: string;
  expires_at: Date;
}

export interface IAuthSessionRepository {
  findById(id: string): Promise<IAuthSessionEntity | null>;
  create(
    params: ICreateAuthSessionInputRepository,
  ): Promise<IAuthSessionEntity>;
  deleteById(id: string): Promise<null>;
}
