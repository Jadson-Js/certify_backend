import { inject, injectable } from 'inversify';
import { createHash } from 'crypto';
import type { ITokenValidationService } from '../../domain/services/ITokenValidationService.js';
import { TYPES_EMAIL_VERIFICATION_TOKEN } from '../container/types.js';
import type { IEmailVerificationTokenRepository } from '../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { IEmailVerificationTokenEntity } from '../../domain/entities/emailVerificationToken.entity.js';
import { ConflictError, NotFoundError } from '../../shared/error/AppError.js';

@injectable()
export class TokenValidationService implements ITokenValidationService {
  constructor(
    @inject(TYPES_EMAIL_VERIFICATION_TOKEN.IEmailVerificationTokenRepository)
    private readonly emailVerificationTokenRepository: IEmailVerificationTokenRepository,
  ) {}

  async validateToken(token: string): Promise<IEmailVerificationTokenEntity> {
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const emailVerification =
      await this.emailVerificationTokenRepository.findByHashToken(tokenHash);

    if (!emailVerification) throw new NotFoundError('Token not found');

    if (new Date(emailVerification.expiresAt) < new Date())
      throw new ConflictError('Token verification expired');

    return emailVerification;
  }
}
