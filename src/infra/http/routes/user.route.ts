import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types.js";
import type { UserController } from "../controllers/user.controller.js";
import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  createSchema,
  findByIdSchema,
} from "../middlewares/zod/user.schema.js";

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES.UserController)
    private readonly userController: UserController,
  ) {}

  execute() {
    const router = Router();

    router.get("/", this.userController.findAll.bind(this.userController));

    router.get(
      "/:id",
      validate(findByIdSchema, "params"),
      this.userController.findById.bind(this.userController),
    );

    router.post(
      "/",
      validate(createSchema, "body"),
      this.userController.create.bind(this.userController),
    );

    router.delete("/", this.userController.deleteAll.bind(this.userController));

    return router;
  }
}
