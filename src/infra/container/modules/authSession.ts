import { AuthSessionRepositoryPostgres } from '../../database/postgresql/repositories/AuthSession.repository.postgres.js';
import { TYPES_AUTH_SESSION } from '../types.js';
import { ContainerModule } from 'inversify';

export const authSessionModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_AUTH_SESSION.IAuthSessionRepository)
    .to(AuthSessionRepositoryPostgres)
    .inSingletonScope();
});
