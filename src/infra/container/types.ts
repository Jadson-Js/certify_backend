export const TYPES = {
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
