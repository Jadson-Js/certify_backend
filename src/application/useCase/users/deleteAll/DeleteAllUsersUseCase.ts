import { inject, injectable } from "inversify";
import type { IDeleteAllUseCase } from "./IDeleteAllUsers.js";
import { TYPES_USER } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";

@injectable()
export class DeleteAllUseCase implements IDeleteAllUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<null> {
    await this.userRepository.deleteAll();

    return null;
  }
}
