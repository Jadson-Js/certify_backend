import { UserRepositoryPostgres } from "../../database/postgresql/repositories/user.repository.postgres.js";
import { FindAllUseCase } from "../../../application/useCase/users/findAll/FindAllUseCase.js";
import { CreateUseCase } from "../../../application/useCase/users/create/CreateUseCase.js";
import { DeleteAllUseCase } from "../../../application/useCase/users/deleteAll/DeleteAllUsersUseCase.js";
import { UserController } from "../../http/controllers/user.controller.js";
import { UserRoutes } from "../../http/routes/user.route.js";
import { FindByIdUseCase } from "../../../application/useCase/users/findUserById/FindByIdUseCase.js";
import { TYPES_USER } from "../types.js";
import { ContainerModule } from "inversify";
import { FindByEmailUseCase } from "../../../application/useCase/users/findUserByEmail/FindByEmailUseCase.js";

export const userModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_USER.IUserRepository)
    .to(UserRepositoryPostgres)
    .inSingletonScope();

  // USE_CASES
  container
    .bind(TYPES_USER.IFindAllUseCase)
    .to(FindAllUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.IFindByIdUseCase)
    .to(FindByIdUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.IFindByEmailUseCase)
    .to(FindByEmailUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.ICreateUseCase)
    .to(CreateUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_USER.IDeleteAllUseCase)
    .to(DeleteAllUseCase)
    .inSingletonScope();

  // CONTROLLERS
  container
    .bind(TYPES_USER.UserController)
    .to(UserController)
    .inSingletonScope();

  // ROUTES
  container.bind(TYPES_USER.UserRoutes).to(UserRoutes).inSingletonScope();
});
