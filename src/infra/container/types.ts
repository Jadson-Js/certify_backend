export const TYPES_USER = {
  // Repositories
  IUserRepository: Symbol.for('IUserRepository'),

  // UseCase
  ISuspendUserUseCase: Symbol.for('ISuspendUserUseCase'),

  // Controllers
  IUserController: Symbol.for('IUserController'),

  // Routes
  UserRoutes: Symbol.for('UserRoutes'),
};

export const TYPES_AUTH = {
  // Use Cases
  ISignupUseCase: Symbol.for('ISignupUseCase'),
  ILoginUseCase: Symbol.for('ILoginUseCase'),
  ITokenUseCase: Symbol.for('ITokenUseCase'),
  ILogoutUseCase: Symbol.for('ILogoutUseCase'),
  IResetPasswordUseCase: Symbol.for('IResetPasswordUseCase'),
  ISendResetPasswordEmailUseCase: Symbol.for('ISendResetPasswordEmailUseCase'),
  IVerifyEmailTokenUseCase: Symbol.for('IVerifyEmailTokenUseCase'),

  // Controllers
  AuthController: Symbol.for('AuthController'),

  // Routes
  AuthRoutes: Symbol.for('AuthRoutes'),
};

export const TYPES_AUTH_SESSION = {
  // Repositories
  IAuthSessionRepository: Symbol.for('IAuthSessionRepository'),
};

export const TYPES_USER_SUSPENDED = {
  // Repositories
  IUserSuspendedRepository: Symbol.for('IUserSuspendedRepository'),
};

export const TYPES_EMAIL_VERIFICATION_TOKEN = {
  // Repositories
  IEmailVerificationTokenRepository: Symbol.for(
    'IEmailVerificationTokenRepository',
  ),
};

export const TYPES_SERVICE = {
  IJwtService: Symbol.for('IJwtService'),
  IEncryptService: Symbol.for('IEncryptService'),
  IAuthSessionService: Symbol.for('IAuthSessionService'),
  IEmailService: Symbol.for('IEmailService'),
  IEmailVerificationTokenService: Symbol.for('IEmailVerificationTokenService'),
};

export const TYPES_MIDDLEWARE = {
  IEnsureAuthenticated: Symbol.for('IEnsureAuthenticated'),
};
