import { inject, injectable } from "inversify";
import type { ICreateUseCase } from "./ICreateUseCase.js";
import { TYPES } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type {
  ICreateInputDTO,
  ICreateOutputDTO,
} from "../../../../infra/http/dtos/user/ICreate.js";
import { toDTO } from "./mapper.js";

@injectable()
export class CreateUseCase implements ICreateUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: ICreateInputDTO): Promise<ICreateOutputDTO> {
    const user = await this.userRepository.create(params);

    return toDTO(user);
  }
}
