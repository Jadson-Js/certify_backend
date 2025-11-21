import { inject, injectable } from "inversify";
import type { ICreateUserUseCase } from "./ICreateUserUseCase.js";
import { TYPES } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import { toDTO } from "./mapper.js";
import type {
  ICreateUserInputDTO,
  ICreateUserOutputDTO,
} from "../../../../infra/http/dtos/user/ICreateUser.js";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
    const user = await this.userRepository.createUser(params);

    return toDTO(user);
  }
}
