import { inject, injectable } from "inversify";
// Assumindo que você usa Express
import type { Request, Response } from "express";
import { FindAllUsersUseCase } from "../../../application/useCase/users/findAllUsers/FindAllUsersUseCase.js";
import { TYPES } from "../../container/types.js";

@injectable()
export class UserController {
  constructor(
    // O Inversify vai injetar o UseCase aqui
    @inject(TYPES.FindAllUsersUseCase)
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  // Exemplo de método que sua rota chamaria
  async findAll(req: Request, res: Response) {
    try {
      const users = await this.findAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
