import { ContainerModule } from 'inversify';
import { UserRepositoryPostgres } from '../../database/postgresql/repositories/user.repository.postgres.js';
import { TYPES_USER } from '../types.js';

export const userModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_USER.IUserRepository)
    .to(UserRepositoryPostgres)
    .inSingletonScope();
});
