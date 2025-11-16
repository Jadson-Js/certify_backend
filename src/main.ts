import "reflect-metadata";
import { createServer } from "./infra/http/server.js";
import { createUserRoutes } from "./infra/http/routes/user.route.js";
import { container } from "./infra/container/inversify.config.js";

import { UserController } from "./infra/http/controllers/user.controller.js";
import { TYPES } from "./infra/container/types.js";
import { env } from "./environments/const.js";

async function bootstrap() {
  const userController = container.get<UserController>(TYPES.UserController);
  const userRoutes = createUserRoutes(userController);
  const server = createServer(userRoutes);

  server.listen(env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${env.PORT}`);
  });
}

bootstrap();
