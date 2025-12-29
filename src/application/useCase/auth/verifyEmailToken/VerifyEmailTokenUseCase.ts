import { inject, injectable } from 'inversify';
import {
  TYPES_EMAIL_VERIFICATION_TOKEN,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';

import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { IEmailVerificationTokenService } from '../../../services/EmailVerificationTokenService.js';
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

    @inject(TYPES_SERVICE.IEmailVerificationTokenService)
    private readonly emailVerificationTokenService: IEmailVerificationTokenService,
  ) { }

  async execute(params: IVerifyEmailTokenInputUseCase): Promise<null> {
    const { token } = params;

    const emailVerification =
      await this.emailVerificationTokenService.validate(token);

    // ✅ ATOMIC: User verified and Token deleted together in a transaction
    await this.userRepository.verifyUserAndDeleteToken({
      userId: emailVerification.userId,
      tokenId: emailVerification.id,
    });

    return null;
  }
}
