import { Router } from "express";
import { type UserController } from "../controllers/user.controller.js";
import { TYPES } from "../../container/types.js";
import { inject, injectable } from "inversify";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../middlewares/zod/user.schema.js";
import passport from "passport";

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES.UserController)
    private readonly userController: UserController,
  ) {}

  execute() {
    const router = Router();

    router.get("/", this.userController.findAllUsers.bind(this.userController));

    router.post(
      "/",
      validate(createUserSchema),
      this.userController.createUser.bind(this.userController),
    );

    router.delete(
      "/",
      passport.authenticate("local", { session: false }),
      this.userController.deleteAllUsers.bind(this.userController),
    );

    return router;
  }
}
