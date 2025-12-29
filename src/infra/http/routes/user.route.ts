import { inject, injectable } from 'inversify';
import {
  TYPES_AUTH,
  TYPES_MIDDLEWARE,
  TYPES_USER,
} from '../../container/types.js';
import type { AuthController } from '../controllers/auth.controller.js';
import { Router } from 'express';

import { validate } from '../middlewares/validate.js';
import { type IEnsureAuthenticated } from '../middlewares/ensureAuthentticated.js';
import type { UserController } from '../controllers/user.controller.js';
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
      this.userController.suspend.bind(this.userController),
    );

    return router;
  }
}
