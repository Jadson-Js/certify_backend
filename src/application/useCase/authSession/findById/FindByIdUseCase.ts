import { inject, injectable } from 'inversify';
import { TYPES_AUTH_SESSION } from '../../../../infra/container/types.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IFindAuthSessionByIdUseCase } from './IFindByIdUseCase.js';
import type {
  IFindAuthSessionByIdInputDTO,
  IFindAuthSessionByIdOutputDTO,
} from '../../../../infra/api/dtos/authSession/IFindById.js';
import { NotFoundError } from '../../../../shared/error/AppError.js';
import { toDTO } from './mapper.js';

@injectable()
export class FindAuthSessionByIdUseCase implements IFindAuthSessionByIdUseCase {
  constructor(
    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,
  ) {}

  async execute(
    params: IFindAuthSessionByIdInputDTO,
  ): Promise<IFindAuthSessionByIdOutputDTO> {
    const authSession = await this.authSessionRepository.findById(params);

    if (!authSession) {
      throw new NotFoundError(`Auth Session not found by id ${params.id}`);
    }

    return toDTO(authSession);
  }
}
