import { inject, injectable } from "inversify";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type { IFindUserByIdUseCase } from "./iFindUserByIdUseCase.js";
import { TYPES } from "../../../../infra/container/types.js";
import { toDTO } from "./mapper.js";
import type {
  IFindUserByIdInputDTO,
  IFindUserByIdOutputDTO,
} from "../../../../infra/http/dtos/user/IFindUserById.js";
import { NotFoundError } from "../../../../shared/error/AppError.js";

@injectable()
export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    params: IFindUserByIdInputDTO,
  ): Promise<IFindUserByIdOutputDTO> {
    const users = await this.userRepository.findUserById(params);

    if (!users) {
      throw new NotFoundError(`User not found by id ${params.id}`);
    }

    return toDTO(users);
  }
}
