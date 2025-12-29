import { inject, injectable } from 'inversify';
import {
  TYPES_MIDDLEWARE,
  TYPES_USER,
} from '../../container/types.js';
import { Router } from 'express';

import { validate } from '../middlewares/validate.js';
import { type IEnsureAuthenticated } from '../middlewares/EnsureAuthenticated.js';
import type { UserController } from '../controllers/User.controller.js';
import { suspendUserSchema } from '../schemas/user.schemas.js';

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES_USER.IUserController)
    private readonly userController: UserController,
  ) { }

  execute() {
    const router = Router();

    router.post(
      '/suspend',
      validate(suspendUserSchema, 'body'),
      this.userController.suspendUser.bind(this.userController),
    );

    return router;
  }
}
