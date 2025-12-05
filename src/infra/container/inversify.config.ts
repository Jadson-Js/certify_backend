import { Container } from "inversify";
import { userModule } from "./modules/user.js";
import { authModule } from "./modules/auth.js";
import { authSessionModule } from "./modules/authSession.js";

const container = new Container();

// Carrega os módulos
container.load(userModule);
container.load(authModule);
container.load(authSessionModule);

export { container };
