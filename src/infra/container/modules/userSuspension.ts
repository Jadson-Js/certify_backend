import { ContainerModule } from 'inversify';
import { UserSuspensionRepositoryPostgres } from '../../database/postgresql/repositories/UserSuspension.repository.postgres.js';
import { TYPES_USER_SUSPENSION } from '../types.js';
import { SuspendUserUseCase } from '../../../application/useCase/user/suspend/SuspendUseCase.js';

export const userSuspensionModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_USER_SUSPENSION.IUserSuspensionRepository)
    .to(UserSuspensionRepositoryPostgres)
    .inSingletonScope();
});
