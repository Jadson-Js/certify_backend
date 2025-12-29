import { ContainerModule } from 'inversify';
import { LoginUseCase } from '../../../application/useCase/auth/login/LoginUseCase.js';
import { SignupUseCase } from '../../../application/useCase/auth/signup/SignupUseCase.js';
import { TYPES_AUTH } from '../types.js';
import { AuthRoutes } from '../../http/routes/Auth.route.js';
import { AuthController } from '../../http/controllers/Auth.controller.js';
import { TokenUseCase } from '../../../application/useCase/auth/token/TokenUseCase.js';
import { LogoutUseCase } from '../../../application/useCase/auth/logout/LogoutUseCase.js';
import { VerifyEmailTokenUseCase } from '../../../application/useCase/auth/verifyEmailToken/VerifyEmailTokenUseCase.js';
import { SendResetPasswordEmailUseCase } from '../../../application/useCase/auth/sendResetPasswordEmail/SendResetPasswordEmailUseCase.js';
import { ResetPasswordUseCase } from '../../../application/useCase/auth/resetPassword/ResetPasswordUseCase.js';

export const authModule = new ContainerModule((container) => {
  // USE_CASES
  container
    .bind(TYPES_AUTH.ISignupUseCase)
    .to(SignupUseCase)
    .inSingletonScope();
  container.bind(TYPES_AUTH.ILoginUseCase).to(LoginUseCase).inSingletonScope();
  container.bind(TYPES_AUTH.ITokenUseCase).to(TokenUseCase).inSingletonScope();
  container
    .bind(TYPES_AUTH.ILogoutUseCase)
    .to(LogoutUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_AUTH.IResetPasswordUseCase)
    .to(ResetPasswordUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_AUTH.ISendResetPasswordEmailUseCase)
    .to(SendResetPasswordEmailUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_AUTH.IVerifyEmailTokenUseCase)
    .to(VerifyEmailTokenUseCase)
    .inSingletonScope();

  // CONTROLLERS
  container
    .bind(TYPES_AUTH.AuthController)
    .to(AuthController)
    .inSingletonScope();

  // ROUTES
  container.bind(TYPES_AUTH.AuthRoutes).to(AuthRoutes).inSingletonScope();
});
