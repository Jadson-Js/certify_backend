import { inject, injectable } from "inversify";
import { UserEntity } from "../../../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../../../domain/repositories/user.repository.js";
import type { IFindAllUsersOutputDTO } from "./findAllUsers.dto.js";
import { TYPES } from "../../../../infra/container/types.js";

@injectable()
export class FindAllUsersUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IFindAllUsersOutputDTO[]> {
    const users: UserEntity[] = await this.userRepository.findAllUsers();

    const mapper: IFindAllUsersOutputDTO[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    }));

    return mapper;
  }
}
