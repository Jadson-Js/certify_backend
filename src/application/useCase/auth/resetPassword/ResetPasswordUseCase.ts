import { inject, injectable } from 'inversify';
import type {
  IResetPasswordInputUseCase,
  IResetPasswordUseCase,
} from './IResetPasswordUseCase.js';
import {
  TYPES_EMAIL_VERIFICATION_TOKEN,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IEmailService } from '../../../../domain/services/IEmailService.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import { createHash, randomBytes } from 'crypto';
import {
  ConflictError,
  NotFoundError,
} from '../../../../shared/error/AppError.js';
import { emailRender } from '../../../../infra/services/email/emailRender.js';

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
  ) {}

  async execute(params: IResetPasswordInputUseCase): Promise<null> {
    const { email } = params;
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundError(`User not found by email: ${email}`);
    if (!user.verifiedAt)
      throw new ConflictError('Email has not yet been verified.');
    if (user.suspendedAt) throw new ConflictError('User has been suspended.');

    const { token, expiresAt, tokenHash } = this.generateToken();
    await this.emailVerificationTokenRepository.create({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    await this.sendEmailToken(user.name, email, token);

    return null;
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
    const url = 'http://localhost:3000/api/v1/auth/reset-password/' + token;
    await this.emailService.send({
      to: email,
      subject: 'Reset Password',
      html: emailRender('RESET_PASSWORD', { name, url }),
    });
  }
}
