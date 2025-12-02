import { inject, injectable } from "inversify";
import type { IFindAllUseCase } from "../../../application/useCase/users/findAll/IFindAll.js";
import { TYPES_USER } from "../../container/types.js";
import type { ICreateUseCase } from "../../../application/useCase/users/create/ICreateUseCase.js";
import type { IDeleteAllUseCase } from "../../../application/useCase/users/deleteAll/IDeleteAllUsers.js";
import { BadRequestError } from "../../../shared/error/AppError.js";
import type { Request, Response } from "express";
import type { IFindByIdUseCase } from "../../../application/useCase/users/findUserById/IFindByIdUseCase.js";
import type { IFindByEmailUseCase } from "../../../application/useCase/users/findUserByEmail/IFindByEmailUseCase.js";
import { ok } from "../../../shared/utils/helper.js";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES_USER.IFindAllUseCase)
    private readonly findAllUseCase: IFindAllUseCase,

    @inject(TYPES_USER.IFindByIdUseCase)
    private readonly findByIdUseCase: IFindByIdUseCase,

    @inject(TYPES_USER.IFindByEmailUseCase)
    private readonly findByEmailUseCase: IFindByEmailUseCase,

    @inject(TYPES_USER.ICreateUseCase)
    private readonly createUseCase: ICreateUseCase,

    @inject(TYPES_USER.IDeleteAllUseCase)
    private readonly deleteAllUseCase: IDeleteAllUseCase,
  ) {}

  async findAll(req: Request, res: Response) {
    const response = await this.findAllUseCase.execute();

    return ok(res, 200, "User found successfully", response);
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) throw new BadRequestError();

    const response = await this.findByIdUseCase.execute({ id });
    return ok(res, 200, "User found successfully", response);
  }

  async findByEmail(req: Request, res: Response) {
    const email = req.params.email;

    if (!email) throw new BadRequestError("Email params is required");

    const response = await this.findByEmailUseCase.execute({ email });
    return ok(res, 200, "User found successfully", response);
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await this.createUseCase.execute(input);

    return ok(res, 201, "User created successfully", response);
  }

  async deleteAll(req: Request, res: Response) {
    await this.deleteAllUseCase.execute();

    return ok(res, 204);
  }
}
