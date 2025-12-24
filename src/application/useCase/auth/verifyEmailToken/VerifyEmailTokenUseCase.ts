import { inject, injectable } from 'inversify';
import {
  TYPES_EMAIL_VERIFICATION_TOKEN,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';

import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import { createHash } from 'crypto';
import {
  ConflictError,
  NotFoundError,
} from '../../../../shared/error/AppError.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import type {
  IVerifyEmailTokenInputUseCase,
  IVerifyEmailTokenUseCase,
} from './IVerifyEmailTokenUseCase.js';

@injectable()
export class VerifyEmailTokenUseCase implements IVerifyEmailTokenUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_EMAIL_VERIFICATION_TOKEN.IEmailVerificationTokenRepository)
    private readonly emailVerificationTokenRepository: IEmailVerificationTokenRepository,
  ) {}

  async execute(params: IVerifyEmailTokenInputUseCase): Promise<null> {
    const { token } = params;
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const emailVerification =
      await this.emailVerificationTokenRepository.findByHashToken(tokenHash);

    if (!emailVerification) throw new NotFoundError('Token not found');
    if (new Date(emailVerification.expiresAt) < new Date())
      throw new ConflictError('Token verification expiried');

    await this.userRepository.updateVerifiedAtById({
      id: emailVerification.userId,
      verifiedAt: new Date(),
    });

    await this.emailVerificationTokenRepository.deleteById(
      emailVerification.id,
    );

    return null;
  }
}
