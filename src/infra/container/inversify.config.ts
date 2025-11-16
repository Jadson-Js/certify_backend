import { Container } from "inversify";
import { TYPES } from "./types.js"; // 1. IMPORTE OS TYPES

// Abstração
import type { IUserRepository } from "../../domain/repositories/user.repository.js";

// Implementações
import { UserRepositoryPostgres } from "../database/postgresql/repositories/user.repository.postgres.js";
import { FindAllUsersUseCase } from "../../application/useCase/users/findAllUsers/FindAllUsersUseCase.js";
import { UserController } from "../http/controllers/user.controller.js";

export const container: Container = new Container();

// 2. FAÇA O BIND DA ABSTRAÇÃO (INTERFACE) PARA A IMPLEMENTAÇÃO (CLASSE)
container
  .bind<IUserRepository>(TYPES.IUserRepository) // "Quando alguém pedir IUserRepository..."
  .to(UserRepositoryPostgres) // "...entregue uma instância de UserRepositoryPostgres"
  .inSingletonScope();

// 3. FAÇA O BIND DAS CLASSES CONCRETAS (USE CASES E CONTROLLERS)
container
  .bind(TYPES.FindAllUsersUseCase)
  .to(FindAllUsersUseCase)
  .inSingletonScope();

container.bind(TYPES.UserController).to(UserController).inSingletonScope();
