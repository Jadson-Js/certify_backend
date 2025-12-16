import { Container } from 'inversify';
import { authModule } from './modules/auth.js';
import { serviceModule } from './modules/service.js';
import { userModule } from './modules/user.js';
import { middlewareModule } from './modules/middleware.js';
import { authSessionModule } from './modules/authSession.js';
import { userSuspensionModule } from './modules/userSuspension.js';

const container = new Container();

// Carrega os módulos
container.load(userModule);
container.load(authModule);
container.load(authSessionModule);
container.load(serviceModule);
container.load(middlewareModule);
container.load(userSuspensionModule);

export { container };
