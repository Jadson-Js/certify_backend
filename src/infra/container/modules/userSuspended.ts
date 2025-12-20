import { ContainerModule } from 'inversify';
import { UserSuspendedRepositoryPostgres } from '../../database/postgresql/repositories/UserSuspended.repository.postgres.js';
import { TYPES_USER_SUSPENDED } from '../types.js';
import { SuspendUserUseCase } from '../../../application/useCase/user/suspend/SuspendUseCase.js';

export const userSuspendedModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_USER_SUSPENDED.IUserSuspendedRepository)
    .to(UserSuspendedRepositoryPostgres)
    .inSingletonScope();
});
