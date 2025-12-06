import 'reflect-metadata';

import { createServer } from './infra/api/server.js';
import { env } from './shared/environments/constants.js';
import { setupRoutes } from './infra/api/routes/index.route.js';
import { container } from './infra/container/inversify.config.js';

async function bootstrap() {
  const routes = setupRoutes(container);

  const server = createServer(routes);

  server.listen(env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${env.PORT}`);
  });
}

bootstrap();
