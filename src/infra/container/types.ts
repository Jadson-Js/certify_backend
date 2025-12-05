export const TYPES_USER = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),

  // Use Cases
  IFindAllUsersUseCase: Symbol.for("IFindAllUsersUseCase"),
  IFindUserByIdUseCase: Symbol.for("IFindUserByIdUseCase"),
  IFindUserByEmailUseCase: Symbol.for("IFindUserByEmailUseCase"),
  ICreateUserUseCase: Symbol.for("ICreateUserUseCase"),
  IDeleteAllUsersUseCase: Symbol.for("IDeleteAllUsersUseCase"),

  // Controllers
  UserController: Symbol.for("UserController"),

  // Routes
  UserRoutes: Symbol.for("UserRoutes"),
};

export const TYPES_AUTH = {
  // Services
  IJwtService: Symbol.for("IJwtService"),
  IEncryptService: Symbol.for("IEncryptService"),

  // Use Cases
  ISignupUseCase: Symbol.for("ISignupUseCase"),
  ILoginUseCase: Symbol.for("ILoginUseCase"),

  // Controllers
  AuthController: Symbol.for("AuthController"),

  // Routes
  AuthRoutes: Symbol.for("AuthRoutes"),
};

export const TYPES_AUTH_SESSION = {
  // Repositories
  IAuthSessionRepository: Symbol.for("IAuthSessionRepository"),

  // Use Cases
  ICreateAuthSessionUseCase: Symbol.for("ICreateAuthSessionUseCase"),
};
