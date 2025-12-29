import { inject, injectable } from 'inversify';
import {
  TYPES_EMAIL_VERIFICATION_TOKEN,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type {
  ISignupInputUseCase,
  ISignupOutputUseCase,
  ISignupUseCase,
} from './ISignupUseCase.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IEmailService } from '../../../../domain/services/IEmailService.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { IEmailVerificationTokenService } from '../../../services/EmailVerificationTokenService.js';
import { emailRender } from '../../../../infra/services/email/emailRender.js';

@injectable()
export class SignupUseCase implements ISignupUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_SERVICE.IEncryptService)
    private readonly encryptService: IEncryptService,

    @inject(TYPES_SERVICE.IEmailService)
    private readonly emailService: IEmailService,

    @inject(TYPES_EMAIL_VERIFICATION_TOKEN.IEmailVerificationTokenRepository)
    private readonly emailVerificationTokenRepository: IEmailVerificationTokenRepository,

    @inject(TYPES_SERVICE.IEmailVerificationTokenService)
    private readonly emailVerificationTokenService: IEmailVerificationTokenService,
  ) { }

  async execute(params: ISignupInputUseCase): Promise<ISignupOutputUseCase> {
    const { name, email, password } = params;
    const passwordHash = await this.encryptService.hash(password);

    const { token, expiresAt, tokenHash } =
      this.emailVerificationTokenService.generate();

    // ✅ ATOMIC: User and Token created together in a transaction
    const { user } = await this.userRepository.createUserWithVerificationToken({
      user: {
        name,
        email,
        passwordHash,
      },
      token: {
        tokenHash,
        expiresAt,
      },
    });

    // Email is sent AFTER the transaction (doesn't affect atomicity)
    await this.sendEmailToken(name, email, token);

    return user;
  }

  private async sendEmailToken(name: string, email: string, token: string) {
    const url = 'http://localhost:3000/api/v1/auth/email/' + token;
    await this.emailService.send({
      to: email,
      subject: 'Confirm Email',
      html: emailRender('CONFIRM_EMAIL', { name, url }),
    });
  }
}
