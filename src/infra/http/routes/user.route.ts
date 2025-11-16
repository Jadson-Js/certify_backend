import { Router } from "express";
import { type UserController } from "../controllers/user.controller.js";

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  router.get("/", (req, res) => userController.findAll(req, res));

  return router;
}
