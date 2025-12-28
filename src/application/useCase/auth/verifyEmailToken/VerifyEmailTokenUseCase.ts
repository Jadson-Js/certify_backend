import { inject, injectable } from 'inversify';
import {
  TYPES_EMAIL_VERIFICATION_TOKEN,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';

import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { ITokenValidationService } from '../../../../domain/services/ITokenValidationService.js';
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

    @inject(TYPES_SERVICE.ITokenValidationService)
    private readonly tokenValidationService: ITokenValidationService,
  ) { }

  async execute(params: IVerifyEmailTokenInputUseCase): Promise<null> {
    const { token } = params;

    const emailVerification = await this.tokenValidationService.validateToken(token);

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
