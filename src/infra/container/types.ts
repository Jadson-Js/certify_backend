export const TYPES_USER = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),

  // Use Cases
  IFindAllUseCase: Symbol.for("IFindAllUseCase"),
  IFindByIdUseCase: Symbol.for("IFindByIdUseCase"),
  ICreateUseCase: Symbol.for("ICreateUseCase"),
  IDeleteAllUseCase: Symbol.for("IDeleteAllUseCase"),

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
