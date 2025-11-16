import { inject, injectable } from "inversify";
import type { IUserRepository } from "../../../../domain/repositories/user.repository.js";
import type {
  IFindAllUsersUseCase,
  IFindAllUsersOutputDTO,
} from "./IFindAllUsers.js";
import { TYPES } from "../../../../infra/container/types.js";
import { toDTO } from "./mapper.js";

@injectable()
export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IFindAllUsersOutputDTO[]> {
    const users = await this.userRepository.findAllUsers();

    return toDTO(users);
  }
}
