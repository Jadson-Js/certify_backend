import { inject, injectable } from "inversify";
import type { IFindAllUseCase } from "./IFindAll.js";
import { TYPES_USER } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type { IFindAllOutputDTO } from "../../../../infra/http/dtos/user/IFindAll.js";
import { toDTO } from "./mapper.js";

@injectable()
export class FindAllUseCase implements IFindAllUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IFindAllOutputDTO[]> {
    const users = await this.userRepository.findAll();

    return toDTO(users);
  }
}
