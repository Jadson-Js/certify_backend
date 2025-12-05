import { inject, injectable } from "inversify";
import { TYPES_AUTH } from "../../container/types.js";
import type { AuthController } from "../controllers/auth.controller.js";
import { Router } from "express";
import { loginSchema, signupSchema } from "../middlewares/zod/auth.schema.js";
import { validate } from "../middlewares/validate.js";

@injectable()
export class AuthRoutes {
  constructor(
    @inject(TYPES_AUTH.AuthController)
    private readonly authController: AuthController,
  ) {}

  execute() {
    const router = Router();

    router.post(
      "/signup",
      validate(signupSchema, "body"),
      this.authController.signup.bind(this.authController),
    );

    router.post(
      "/login",
      validate(loginSchema, "body"),
      this.authController.login.bind(this.authController),
    );

    return router;
  }
}
