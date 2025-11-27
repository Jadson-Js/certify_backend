import { inject, injectable } from "inversify";
import type { IDeleteAllUseCase } from "./IDeleteAllUsers.js";
import { TYPES } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";

@injectable()
export class DeleteAllUseCase implements IDeleteAllUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<null> {
    await this.userRepository.deleteAll();

    return null;
  }
}
