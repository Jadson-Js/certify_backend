import { inject, injectable } from 'inversify';
import type {
    ISendResetPasswordEmailInputUseCase,
    ISendResetPasswordEmailUseCase,
} from './ISendResetPasswordEmailUseCase.js';
import {
    TYPES_EMAIL_VERIFICATION_TOKEN,
    TYPES_SERVICE,
    TYPES_USER,
} from '../../../../infra/container/types.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IEmailService } from '../../../../domain/services/IEmailService.js';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { IEmailVerificationTokenService } from '../../../services/EmailVerificationTokenService.js';
import {
    ConflictError,
    NotFoundError,
} from '../../../../shared/error/AppError.js';
import { emailRender } from '../../../../infra/services/email/emailRender.js';

@injectable()
export class SendResetPasswordEmailUseCase implements ISendResetPasswordEmailUseCase {
    constructor(
        @inject(TYPES_USER.IUserRepository)
        private readonly userRepository: IUserRepository,

        @inject(TYPES_SERVICE.IEmailService)
        private readonly emailService: IEmailService,

        @inject(TYPES_EMAIL_VERIFICATION_TOKEN.IEmailVerificationTokenRepository)
        private readonly emailVerificationTokenRepository: IEmailVerificationTokenRepository,

        @inject(TYPES_SERVICE.IEmailVerificationTokenService)
        private readonly emailVerificationTokenService: IEmailVerificationTokenService,
    ) { }

    async execute(params: ISendResetPasswordEmailInputUseCase): Promise<null> {
        const { email } = params;
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError(`User not found by email: ${email}`);

        // Use domain methods for validation
        if (!user.isVerified()) {
            throw new ConflictError('Email has not yet been verified.');
        }
        if (user.isSuspended()) {
            throw new ConflictError('User has been suspended.');
        }

        const { token, expiresAt, tokenHash } = this.emailVerificationTokenService.generate();
        await this.emailVerificationTokenRepository.create({
            userId: user.id,
            tokenHash,
            expiresAt,
        });

        await this.sendEmailToken(user.name, email, token);

        return null;
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
