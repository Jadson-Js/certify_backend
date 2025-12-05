import { inject, injectable } from "inversify";
import { TYPES_USER } from "../../../../infra/container/types.js";
import type { IDeleteAllUsersUseCase } from "./IDeleteAllUsers.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";

@injectable()
export class DeleteAllUsersUseCase implements IDeleteAllUsersUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<null> {
    await this.userRepository.deleteAll();

    return null;
  }
}
