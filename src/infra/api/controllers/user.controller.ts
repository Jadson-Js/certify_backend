import { inject, injectable } from 'inversify';
import { ok } from '../../../shared/utils/helper.js';
import { TYPES_USER } from '../../container/types.js';
import type { IFindAllUsersUseCase } from '../../../application/useCase/users/findAll/IFindAll.js';
import type { IFindUserByIdUseCase } from '../../../application/useCase/users/findById/IFindByIdUseCase.js';
import type { IFindUserByEmailUseCase } from '../../../application/useCase/users/findByEmail/IFindByEmailUseCase.js';
import type { Request, Response } from 'express';
import { BadRequestError } from '../../../shared/error/AppError.js';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES_USER.IFindAllUsersUseCase)
    private readonly findAllUseCase: IFindAllUsersUseCase,

    @inject(TYPES_USER.IFindUserByIdUseCase)
    private readonly findByIdUseCase: IFindUserByIdUseCase,

    @inject(TYPES_USER.IFindUserByEmailUseCase)
    private readonly findByEmailUseCase: IFindUserByEmailUseCase,
  ) {}

  async findAll(req: Request, res: Response) {
    const response = await this.findAllUseCase.execute();

    return ok(res, 200, 'User found successfully', response);
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) throw new BadRequestError();

    const response = await this.findByIdUseCase.execute({ id });
    return ok(res, 200, 'User found successfully', response);
  }

  async findByEmail(req: Request, res: Response) {
    const email = req.params.email;

    if (!email) throw new BadRequestError('Email params is required');

    const response = await this.findByEmailUseCase.execute({ email });
    return ok(res, 200, 'User found successfully', response);
  }
}
