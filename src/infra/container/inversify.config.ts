import { Container } from "inversify";
import { TYPES } from "./types.js";

import { UserRepositoryPostgres } from "../database/postgresql/repositories/user.repository.postgres.js";
import { FindAllUsersUseCase } from "../../application/useCase/users/findAllUsers/FindAllUsersUseCase.js";
import { UserController } from "../http/controllers/user.controller.js";
import { UserRoutes } from "../http/routes/user.route.js";

export const container: Container = new Container();

container
  .bind(TYPES.IUserRepository)
  .to(UserRepositoryPostgres)
  .inSingletonScope();

container
  .bind(TYPES.IFindAllUsersUseCase)
  .to(FindAllUsersUseCase)
  .inSingletonScope();

container.bind(TYPES.UserController).to(UserController).inSingletonScope();

container.bind(TYPES.UserRoutes).to(UserRoutes).inSingletonScope();
