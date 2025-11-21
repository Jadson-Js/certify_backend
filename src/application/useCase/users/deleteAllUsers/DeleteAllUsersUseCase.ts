import { inject, injectable } from "inversify";
import type { IUserRepository } from "../../../../domain/repositories/user.repository.js";
import type { IDeleteAllUsersUseCase } from "./IDeleteAllUsers.js";
import { TYPES } from "../../../../infra/container/types.js";

@injectable()
export class DeleteAllUsersUseCase implements IDeleteAllUsersUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<null> {
    await this.userRepository.deleteAllUsers();

    return null;
  }
}
