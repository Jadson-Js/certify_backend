import type { EmailVerificationTokenEntity } from '../entities/EmailVerificationToken.entity.js';

export interface ICreateEmailVerificationTokenInputRepository {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

export interface IEmailVerificationTokenRepository {
  findByHashToken(token: string): Promise<EmailVerificationTokenEntity | null>;
  create(
    params: ICreateEmailVerificationTokenInputRepository,
  ): Promise<EmailVerificationTokenEntity>;
  deleteById(id: string): Promise<null>;
}
