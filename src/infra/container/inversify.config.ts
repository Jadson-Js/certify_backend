import { Container } from "inversify";
import { TYPES_AUTH, TYPES_USER } from "./types.js";
import { UserRepositoryPostgres } from "../database/postgresql/repositories/user.repository.postgres.js";
import { FindAllUseCase } from "../../application/useCase/users/findAll/FindAllUseCase.js";
import { CreateUseCase } from "../../application/useCase/users/create/CreateUseCase.js";
import { DeleteAllUseCase } from "../../application/useCase/users/deleteAll/DeleteAllUsersUseCase.js";
import { UserController } from "../http/controllers/user.controller.js";
import { UserRoutes } from "../http/routes/user.route.js";
import { FindByIdUseCase } from "../../application/useCase/users/findUserById/FindByIdUseCase.js";
import { SignupUseCase } from "../../application/useCase/auth/signup/SignupUseCase.js";
import { AuthController } from "../http/controllers/auth.controller.js";
import { AuthRoutes } from "../http/routes/auth.route.js";
import { JwtService } from "../services/JwtService.js";
import { EncryptService } from "../services/EncryptService.js";

export const container: Container = new Container();

// USER
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
container.bind(TYPES_USER.ICreateUseCase).to(CreateUseCase).inSingletonScope();
container
  .bind(TYPES_USER.IDeleteAllUseCase)
  .to(DeleteAllUseCase)
  .inSingletonScope();

// CONTROLLERS
container.bind(TYPES_USER.UserController).to(UserController).inSingletonScope();

// ROUTES
container.bind(TYPES_USER.UserRoutes).to(UserRoutes).inSingletonScope();
// ------------------------------------------------------------------------------------------ //

// AUTH
// SERVICES
container.bind(TYPES_AUTH.IJwtService).to(JwtService).inSingletonScope();
container
  .bind(TYPES_AUTH.IEncryptService)
  .to(EncryptService)
  .inSingletonScope();

// USE_CASES
container.bind(TYPES_AUTH.ISignupUseCase).to(SignupUseCase).inSingletonScope();

// CONTROLLERS
container.bind(TYPES_AUTH.AuthController).to(AuthController).inSingletonScope();

// ROUTES
container.bind(TYPES_AUTH.AuthRoutes).to(AuthRoutes).inSingletonScope();
// ------------------------------------------------------------------------------------------ //
