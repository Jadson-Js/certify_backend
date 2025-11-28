import { Container } from "inversify";
import { authModule } from "./modules/auth.js";
import { userModule } from "./modules/user.js";

const container = new Container();

// Carrega os módulos
container.load(authModule);
container.load(userModule);

export { container };
