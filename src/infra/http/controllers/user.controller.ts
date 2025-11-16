import { inject, injectable } from "inversify";
// Assumindo que você usa Express
import type { Request, Response } from "express";
import { TYPES } from "../../container/types.js";
import type { IFindAllUsersUseCase } from "../../../application/useCase/users/findAllUsers/IFindAllUsers.js";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.IFindAllUsersUseCase)
    private readonly findAllUsersUseCase: IFindAllUsersUseCase,
  ) {}

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
