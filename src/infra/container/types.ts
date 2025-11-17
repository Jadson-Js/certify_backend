export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),

  // Use Cases
  IFindAllUsersUseCase: Symbol.for("IFindAllUsersUseCase"),
  ICreateUserUseCase: Symbol.for("ICreateUserUseCase"),

  // Controllers
  UserController: Symbol.for("UserController"),

  // Routes
  UserRoutes: Symbol.for("UserRoutes"),
};
