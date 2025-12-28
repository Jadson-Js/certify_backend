import type { IEmailVerificationTokenEntity } from '../entities/emailVerificationToken.entity.js';

export interface ITokenValidationService {
    validateToken(token: string): Promise<IEmailVerificationTokenEntity>;
}
