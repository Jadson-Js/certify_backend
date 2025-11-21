import { inject, injectable } from "inversify";
import type { Request, Response } from "express";
import { TYPES } from "../../container/types.js";
import type { IFindAllUsersUseCase } from "../../../application/useCase/users/findAllUsers/IFindAllUsers.js";
import type { ICreateUserUseCase } from "../../../application/useCase/users/createUser/ICreateUser.js";
import type { IDeleteAllUsersUseCase } from "../../../application/useCase/users/deleteAllUsers/IDeleteAllUsers.js";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.IFindAllUsersUseCase)
    private readonly findAllUsersUseCase: IFindAllUsersUseCase,

    @inject(TYPES.ICreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,

    @inject(TYPES.IDeleteAllUsersUseCase)
    private readonly deleteAllUsersUseCase: IDeleteAllUsersUseCase,
  ) {}

  async findAllUsers(req: Request, res: Response) {
    try {
      const response = await this.findAllUsersUseCase.execute();
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createUser(req: Request, res: Response) {
    const data = req.body;

    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await this.createUserUseCase.execute(input);

    return res.status(201).json(response);
  }

  async deleteAllUsers(req: Request, res: Response) {
    await this.deleteAllUsersUseCase.execute();

    return res.status(200).json();
  }
}
