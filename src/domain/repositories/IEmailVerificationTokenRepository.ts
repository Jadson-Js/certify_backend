import type { IEmailVerificationTokenEntity } from '../entities/emailVerificationToken.entity.js';

export interface ICreateEmailVerificationTokenInputRepository {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

export interface IEmailVerificationTokenRepository {
  findByHashToken(token: string): Promise<IEmailVerificationTokenEntity | null>;
  create(
    params: ICreateEmailVerificationTokenInputRepository,
  ): Promise<IEmailVerificationTokenEntity>;
  deleteById(id: string): Promise<null>;
}
