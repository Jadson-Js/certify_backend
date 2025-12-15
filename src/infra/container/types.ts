export const TYPES_USER = {
  // Repositories
  IUserRepository: Symbol.for('IUserRepository'),
};

export const TYPES_AUTH = {
  // Use Cases
  ISignupUseCase: Symbol.for('ISignupUseCase'),
  ILoginUseCase: Symbol.for('ILoginUseCase'),
  ITokenUseCase: Symbol.for('ITokenUseCase'),
  ILogoutUseCase: Symbol.for('ILogoutUseCase'),

  // Controllers
  AuthController: Symbol.for('AuthController'),

  // Routes
  AuthRoutes: Symbol.for('AuthRoutes'),
};

export const TYPES_AUTH_SESSION = {
  // Repositories
  IAuthSessionRepository: Symbol.for('IAuthSessionRepository'),
};

export const TYPES_SERVICE = {
  IJwtService: Symbol.for('IJwtService'),
  IEncryptService: Symbol.for('IEncryptService'),
  IAuthSessionService: Symbol.for('IAuthSessionService'),
};

export const TYPES_MIDDLEWARE = {
  IEnsureAuthenticated: Symbol.for('IEnsureAuthenticated'),
};
