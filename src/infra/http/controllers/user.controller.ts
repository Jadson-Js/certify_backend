import { inject, injectable } from 'inversify';
import { TYPES_USER } from '../../container/types.js';
import type { ISuspendUserUseCase } from '../../../application/useCase/user/suspend/ISuspendUseCase.js';
import { ok } from '../../../shared/utils/helper.js';
import type { Request, Response } from 'express';
import { suspendUserSchema } from '../schemas/user.schemas.js';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES_USER.ISuspendUserUseCase)
    private readonly suspendUserUseCase: ISuspendUserUseCase,
  ) { }

  async suspend(req: Request, res: Response) {
    const data = suspendUserSchema.parse(req.body);

    await this.suspendUserUseCase.execute(data);

    return ok(res, 200);
  }
}
