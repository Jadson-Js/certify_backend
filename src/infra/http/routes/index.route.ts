import { Router } from "express";
import { UserRoutes } from "./user.route.js";
import type { Container } from "inversify";
import { TYPES } from "../../container/types.js";

export function setupRoutes(container: Container) {
  const router = Router();

  const userRoutes = container.get<UserRoutes>(TYPES.UserRoutes);

  router.use("/users", userRoutes.execute());

  return router;
}
