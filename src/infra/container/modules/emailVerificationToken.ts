import { ContainerModule } from 'inversify';
import { EmailVerificationTokenRepositoryPostgres } from '../../database/postgresql/repositories/EmailVerificationToken.repository.postgres.js';
import { TYPES_EMAIL_VERIFICATION_TOKEN } from '../types.js';

export const emailVerificationTokenModule = new ContainerModule((container) => {
    // REPOSITORIES
    container
        .bind(TYPES_EMAIL_VERIFICATION_TOKEN.IEmailVerificationTokenRepository)
        .to(EmailVerificationTokenRepositoryPostgres)
        .inSingletonScope();
});
