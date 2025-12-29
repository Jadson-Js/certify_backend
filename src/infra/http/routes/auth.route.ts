import { inject, injectable } from 'inversify';
import { TYPES_AUTH, TYPES_MIDDLEWARE } from '../../container/types.js';
import type { AuthController } from '../controllers/auth.controller.js';
import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { type IEnsureAuthenticated } from '../middlewares/ensureAuthentticated.js';
import { loginSchema, resetPasswordSchema, sendResetPasswordEmailSchema, signupSchema, verifyEmailTokenSchema } from '../schemas/auth.schemas.js';

@injectable()
export class AuthRoutes {
  constructor(
    @inject(TYPES_AUTH.AuthController)
    private readonly authController: AuthController,

    @inject(TYPES_MIDDLEWARE.IEnsureAuthenticated)
    private readonly ensureAuthenticated: IEnsureAuthenticated,
  ) { }

  execute() {
    const router = Router();

    router.post(
      '/signup',
      validate(signupSchema, 'body'),
      this.authController.signup.bind(this.authController),
    );

    router.post(
      '/login',
      validate(loginSchema, 'body'),
      this.authController.login.bind(this.authController),
    );

    router.post(
      '/refresh-token',
      this.ensureAuthenticated.authRefresh.bind(this.ensureAuthenticated),
      this.authController.token.bind(this.authController),
    );

    router.post(
      '/logout',
      this.ensureAuthenticated.authRefresh.bind(this.ensureAuthenticated),
      this.authController.logout.bind(this.authController),
    );

    router.post(
      '/send-reset-password',
      validate(sendResetPasswordEmailSchema
        , 'body'),
      this.authController.sendEmailToResetPassword.bind(this.authController),
    );

    router.post(
      '/reset-password',
      validate(resetPasswordSchema, 'body'),
      this.authController.resetPassword.bind(this.authController),
    );

    router.post(
      '/email/verify',
      validate(verifyEmailTokenSchema, 'body'),
      this.authController.verifyEmailToken.bind(this.authController),
    );

    return router;
  }
}
