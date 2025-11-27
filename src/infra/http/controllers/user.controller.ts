import { inject, injectable } from "inversify";
import type { IFindAllUseCase } from "../../../application/useCase/users/findAll/IFindAll.js";
import { TYPES_USER } from "../../container/types.js";
import type { ICreateUseCase } from "../../../application/useCase/users/create/ICreateUseCase.js";
import type { IDeleteAllUseCase } from "../../../application/useCase/users/deleteAll/IDeleteAllUsers.js";
import { BadRequestError } from "../../../shared/error/AppError.js";
import type { Request, Response } from "express";
import type { IFindByIdUseCase } from "../../../application/useCase/users/findUserById/IFindByIdUseCase.js";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES_USER.IFindAllUseCase)
    private readonly findAllUseCase: IFindAllUseCase,

    @inject(TYPES_USER.IFindByIdUseCase)
    private readonly findByIdUseCase: IFindByIdUseCase,

    @inject(TYPES_USER.ICreateUseCase)
    private readonly createUseCase: ICreateUseCase,

    @inject(TYPES_USER.IDeleteAllUseCase)
    private readonly deleteAllUseCase: IDeleteAllUseCase,
  ) {}

  async findAll(req: Request, res: Response) {
    try {
      const response = await this.findAllUseCase.execute();
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new BadRequestError();
      }

      const response = await this.findByIdUseCase.execute({ id });
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await this.createUseCase.execute(input);

    return res.status(201).json(response);
  }

  async deleteAll(req: Request, res: Response) {
    await this.deleteAllUseCase.execute();

    return res.status(200).json();
  }
}
