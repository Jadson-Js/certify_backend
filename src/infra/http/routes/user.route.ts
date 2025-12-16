import { inject, injectable } from 'inversify';
import {
  TYPES_AUTH,
  TYPES_MIDDLEWARE,
  TYPES_USER,
} from '../../container/types.js';
import type { AuthController } from '../controllers/auth.controller.js';
import { Router } from 'express';
import {
  loginSchema,
  signupSchema,
  tokenSchema,
} from '../middlewares/zod/auth.schema.js';
import { validate } from '../middlewares/validate.js';
import { type IEnsureAuthenticated } from '../middlewares/ensureAuthentticated.js';
import { suspendSchema } from '../middlewares/zod/user.schema.js';
import type { UserController } from '../controllers/user.controller.js';

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES_USER.IUserController)
    private readonly userController: UserController,
  ) {}

  execute() {
    const router = Router();

    router.post(
      '/suspend',
      validate(suspendSchema, 'body'),
      this.userController.suspend.bind(this.userController),
    );

    return router;
  }
}
