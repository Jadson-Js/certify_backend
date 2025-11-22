import { Container } from "inversify";
import { TYPES } from "./types.js";

import { UserRepositoryPostgres } from "../database/postgresql/repositories/user.repository.postgres.js";
import { FindAllUsersUseCase } from "../../application/useCase/users/findAllUsers/FindAllUsersUseCase.js";
import { UserController } from "../http/controllers/user.controller.js";
import { UserRoutes } from "../http/routes/user.route.js";
import { CreateUserUseCase } from "../../application/useCase/users/createUser/CreateUserUseCase.js";
import { DeleteAllUsersUseCase } from "../../application/useCase/users/deleteAllUsers/DeleteAllUsersUseCase.js";
import { FindUserByIdUseCase } from "../../application/useCase/users/findUserById/FindUserByIdUseCase.js";

export const container: Container = new Container();

// REPOSITORIES
container
  .bind(TYPES.IUserRepository)
  .to(UserRepositoryPostgres)
  .inSingletonScope();

// USE_CASES
container
  .bind(TYPES.IFindAllUsersUseCase)
  .to(FindAllUsersUseCase)
  .inSingletonScope();

container
  .bind(TYPES.IFindUserByIdUseCase)
  .to(FindUserByIdUseCase)
  .inSingletonScope();

container
  .bind(TYPES.ICreateUserUseCase)
  .to(CreateUserUseCase)
  .inSingletonScope();

container
  .bind(TYPES.IDeleteAllUsersUseCase)
  .to(DeleteAllUsersUseCase)
  .inSingletonScope();

// CONTROLLERS
container.bind(TYPES.UserController).to(UserController).inSingletonScope();

// ROUTES
container.bind(TYPES.UserRoutes).to(UserRoutes).inSingletonScope();
