import { ContainerModule } from "inversify";
import { LoginUseCase } from "../../../application/useCase/auth/login/LoginUseCase.js";
import { SignupUseCase } from "../../../application/useCase/auth/signup/SignupUseCase.js";
import { EncryptService } from "../../services/EncryptService.js";
import { JwtService } from "../../services/JwtService.js";
import { TYPES_AUTH } from "../types.js";
import { AuthRoutes } from "../../http/routes/auth.route.js";
import { AuthController } from "../../http/controllers/auth.controller.js";

export const authModule = new ContainerModule((container) => {
  // SERVICES
  container.bind(TYPES_AUTH.IJwtService).to(JwtService).inSingletonScope();
  container
    .bind(TYPES_AUTH.IEncryptService)
    .to(EncryptService)
    .inSingletonScope();

  // USE_CASES
  container
    .bind(TYPES_AUTH.ISignupUseCase)
    .to(SignupUseCase)
    .inSingletonScope();
  container.bind(TYPES_AUTH.ILoginUseCase).to(LoginUseCase).inSingletonScope();

  // CONTROLLERS
  container
    .bind(TYPES_AUTH.AuthController)
    .to(AuthController)
    .inSingletonScope();

  // ROUTES
  container.bind(TYPES_AUTH.AuthRoutes).to(AuthRoutes).inSingletonScope();
});
