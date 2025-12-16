import { ContainerModule } from 'inversify';
import { UserRepositoryPostgres } from '../../database/postgresql/repositories/User.repository.postgres.js';
import { TYPES_USER } from '../types.js';
import { SuspendUserUseCase } from '../../../application/useCase/user/suspend/SuspendUseCase.js';
import { UserController } from '../../http/controllers/user.controller.js';
import { UserRoutes } from '../../http/routes/user.route.js';

export const userModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_USER.IUserRepository)
    .to(UserRepositoryPostgres)
    .inSingletonScope();

  // USE_CASES
  container
    .bind(TYPES_USER.ISuspendUserUseCase)
    .to(SuspendUserUseCase)
    .inSingletonScope();

  // CONTROLLER
  container
    .bind(TYPES_USER.IUserController)
    .to(UserController)
    .inSingletonScope();

  // ROUTES
  container.bind(TYPES_USER.UserRoutes).to(UserRoutes).inSingletonScope();
});
