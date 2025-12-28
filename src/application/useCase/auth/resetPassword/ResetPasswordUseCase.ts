import { inject, injectable } from 'inversify';
import {
  TYPES_EMAIL_VERIFICATION_TOKEN,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type {
  IResetPasswordInputUseCase,
  IResetPasswordUseCase,
} from './IResetPasswordUseCase.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IEmailService } from '../../../../domain/services/IEmailService.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { ITokenValidationService } from '../../../../domain/services/ITokenValidationService.js';

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_SERVICE.IEncryptService)
    private readonly encryptService: IEncryptService,

    @inject(TYPES_SERVICE.IEmailService)
    private readonly emailService: IEmailService,

    @inject(TYPES_EMAIL_VERIFICATION_TOKEN.IEmailVerificationTokenRepository)
    private readonly emailVerificationTokenRepository: IEmailVerificationTokenRepository,

    @inject(TYPES_SERVICE.ITokenValidationService)
    private readonly tokenValidationService: ITokenValidationService,
  ) {}

  async execute(params: IResetPasswordInputUseCase): Promise<null> {
    const { token, password } = params;
    const passwordHash = await this.encryptService.hash(password);

    const emailVerification =
      await this.tokenValidationService.validateToken(token);

    await this.userRepository.updatePasswordHashById({
      id: emailVerification.userId,
      passwordHash,
    });

    await this.emailVerificationTokenRepository.deleteById(
      emailVerification.id,
    );

    return null;
  }
}
