import { ContainerModule } from 'inversify';
import { CreateUserUseCase } from '../../../application/useCase/users/create/CreateUseCase.js';
import { DeleteAllUsersUseCase } from '../../../application/useCase/users/deleteAll/DeleteAllUsersUseCase.js';
import { FindAllUsersUseCase } from '../../../application/useCase/users/findAll/FindAllUseCase.js';
import { FindUserByEmailUseCase } from '../../../application/useCase/users/findUserByEmail/FindByEmailUseCase.js';
import { FindUserByIdUseCase } from '../../../application/useCase/users/findUserById/FindByIdUseCase.js';
import { UserRepositoryPostgres } from '../../database/postgresql/repositories/user.repository.postgres.js';
import { UserController } from '../../api/controllers/user.controller.js';
import { UserRoutes } from '../../api/routes/user.route.js';
import { TYPES_USER } from '../types.js';

export const userModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_USER.IUserRepository)
    .to(UserRepositoryPostgres)
    .inSingletonScope();

  // USE_CASES
  container
    .bind(TYPES_USER.IFindAllUsersUseCase)
    .to(FindAllUsersUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.IFindUserByIdUseCase)
    .to(FindUserByIdUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.IFindUserByEmailUseCase)
    .to(FindUserByEmailUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.ICreateUserUseCase)
    .to(CreateUserUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.IDeleteAllUsersUseCase)
    .to(DeleteAllUsersUseCase)
    .inSingletonScope();

  // CONTROLLERS
  container
    .bind(TYPES_USER.UserController)
    .to(UserController)
    .inSingletonScope();

  // ROUTES
  container.bind(TYPES_USER.UserRoutes).to(UserRoutes).inSingletonScope();
});
