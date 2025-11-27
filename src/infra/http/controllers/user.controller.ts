import { inject, injectable } from "inversify";
import type { IFindAllUseCase } from "../../../application/useCase/users/findAll/IFindAll.js";
import { TYPES } from "../../container/types.js";
import type { IFindByIdUseCase } from "../../../application/useCase/users/findById/IFindByIdUseCase.js";
import type { ICreateUseCase } from "../../../application/useCase/users/create/ICreateUseCase.js";
import type { IDeleteAllUseCase } from "../../../application/useCase/users/deleteAll/IDeleteAllUsers.js";
import { BadRequestError } from "../../../shared/error/AppError.js";
import type { Request, Response } from "express";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.IFindAllUseCase)
    private readonly findAllUseCase: IFindAllUseCase,

    @inject(TYPES.IFindByIdUseCase)
    private readonly findByIdUseCase: IFindByIdUseCase,

    @inject(TYPES.ICreateUseCase)
    private readonly createUseCase: ICreateUseCase,

    @inject(TYPES.IDeleteAllUseCase)
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
