import { Container } from "inversify";
import { TYPES } from "./types.js";
import { UserRepositoryPostgres } from "../database/postgresql/repositories/user.repository.postgres.js";
import { FindAllUseCase } from "../../application/useCase/users/findAll/FindAllUseCase.js";
import { CreateUseCase } from "../../application/useCase/users/create/CreateUseCase.js";
import { DeleteAllUseCase } from "../../application/useCase/users/deleteAll/DeleteAllUsersUseCase.js";
import { UserController } from "../http/controllers/user.controller.js";
import { UserRoutes } from "../http/routes/user.route.js";
import { FindByIdUseCase } from "../../application/useCase/users/findUserById/FindByIdUseCase.js";

export const container: Container = new Container();

// REPOSITORIES
container
  .bind(TYPES.IUserRepository)
  .to(UserRepositoryPostgres)
  .inSingletonScope();

// USE_CASES
container.bind(TYPES.IFindAllUseCase).to(FindAllUseCase).inSingletonScope();
container.bind(TYPES.IFindByIdUseCase).to(FindByIdUseCase).inSingletonScope();
container.bind(TYPES.ICreateUseCase).to(CreateUseCase).inSingletonScope();
container.bind(TYPES.IDeleteAllUseCase).to(DeleteAllUseCase).inSingletonScope();

// CONTROLLERS
container.bind(TYPES.UserController).to(UserController).inSingletonScope();

// ROUTES
container.bind(TYPES.UserRoutes).to(UserRoutes).inSingletonScope();
