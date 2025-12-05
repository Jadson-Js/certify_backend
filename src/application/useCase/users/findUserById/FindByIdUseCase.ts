import { inject, injectable } from "inversify";
import type { IFindUserByIdUseCase } from "./IFindByIdUseCase.js";
import { TYPES_USER } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type { IFindUserByIdInputDTO, IFindUserByIdOutputDTO } from "../../../../infra/http/dtos/user/IFindById.js";
import { NotFoundError } from "../../../../shared/error/AppError.js";
import { toDTO } from "./mapper.js";

@injectable()
export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: IFindUserByIdInputDTO): Promise<IFindUserByIdOutputDTO> {
    const users = await this.userRepository.findById(params);

    if (!users) {
      throw new NotFoundError(`User not found by id ${params.id}`);
    }

    return toDTO(users);
  }
}
