import { Container } from 'inversify';
import { authModule } from './modules/auth.js';
import { authSessionModule } from './modules/authSession.js';
import { serviceModule } from './modules/service.js';
import { userModule } from './modules/user.js';

const container = new Container();

// Carrega os módulos
container.load(userModule);
container.load(authModule);
container.load(authSessionModule);
container.load(serviceModule);

export { container };
