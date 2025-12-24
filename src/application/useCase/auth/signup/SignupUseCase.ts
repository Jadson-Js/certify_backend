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
import { createHash, randomBytes } from 'crypto';
import type { IEmailService } from '../../../../domain/services/IEmailService.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
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
  ) {}

  async execute(params: ISignupInputUseCase): Promise<ISignupOutputUseCase> {
    const { name, email, password } = params;
    const hashPassword = await this.encryptService.hash(password);
    const user = await this.userRepository.create({
      name,
      email,
      passwordHash: hashPassword,
    });

    const { token, expiresAt, tokenHash } = this.generateToken();
    await this.emailVerificationTokenRepository.create({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    await this.sendEmailToken(name, email, token);

    return user;
  }

  private generateToken() {
    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const verificationTokenHash = createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    return {
      token: verificationToken,
      expiresAt: verificationTokenExpiresAt,
      tokenHash: verificationTokenHash,
    };
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
