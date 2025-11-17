import { Router } from "express";
import { type UserController } from "../controllers/user.controller.js";
import { TYPES } from "../../container/types.js";
import { inject, injectable } from "inversify";

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES.UserController)
    private readonly userController: UserController,
  ) {}

  execute() {
    const router = Router();

    router.get("/", this.userController.findAllUsers.bind(this.userController));
    router.post("/", this.userController.createUser.bind(this.userController));

    return router;
  }
}
