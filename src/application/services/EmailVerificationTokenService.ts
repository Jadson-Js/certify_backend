import { inject, injectable } from 'inversify';
import { createHash, randomBytes } from 'crypto';
import { TYPES_EMAIL_VERIFICATION_TOKEN } from '../../infra/container/types.js';
import type { IEmailVerificationTokenRepository } from '../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { EmailVerificationTokenEntity } from '../../domain/entities/emailVerificationToken.entity.js';
import { ConflictError, NotFoundError } from '../../shared/error/AppError.js';

export interface IEmailVerificationTokenService {
    generate(): {
        token: string;
        tokenHash: string;
        expiresAt: Date;
    };

    validate(token: string): Promise<EmailVerificationTokenEntity>;
}

@injectable()
export class EmailVerificationTokenService implements IEmailVerificationTokenService {
    constructor(
        @inject(TYPES_EMAIL_VERIFICATION_TOKEN.IEmailVerificationTokenRepository)
        private readonly tokenRepository: IEmailVerificationTokenRepository,
    ) { }

    generate() {
        const token = randomBytes(32).toString('hex');
        const tokenHash = createHash('sha256').update(token).digest('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        return { token, tokenHash, expiresAt };
    }

    async validate(token: string): Promise<EmailVerificationTokenEntity> {
        const tokenHash = createHash('sha256').update(token).digest('hex');

        const emailVerification = await this.tokenRepository.findByHashToken(tokenHash);

        if (!emailVerification) {
            throw new NotFoundError('Token not found');
        }

        if (emailVerification.isExpired()) {
            throw new ConflictError('Token verification expired');
        }

        return emailVerification;
    }
}
