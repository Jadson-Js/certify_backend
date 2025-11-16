import "reflect-metadata"; // DEVE SER A PRIMEIRA LINHA

import { createServer } from "./infra/http/server.js";
import { createUserRoutes } from "./infra/http/routes/user.route.js";
import { container } from "./infra/container/inversify.config.js";

import { UserController } from "./infra/http/controllers/user.controller.js";
import { TYPES } from "./infra/container/types.js";

async function bootstrap() {
  // 2. PEÇA AO CONTAINER USANDO O SÍMBOLO
  const userController = container.get<UserController>(TYPES.UserController);

  const userRoutes = createUserRoutes(userController);
  const server = createServer(userRoutes);

  server.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
  });
}

bootstrap();
