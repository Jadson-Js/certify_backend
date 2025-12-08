import { inject, injectable } from 'inversify';
import { TYPES_AUTH_SESSION } from '../../../../infra/container/types.js';
import type { IDeleteAuthSessionByIdInputDTO } from '../../../../infra/api/dtos/authSession/IDeleteById.js';
import type { IDeleteAuthSessionByIdUseCase } from './IDeleteByIdUseCase.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import { NotFoundError } from '../../../../shared/error/AppError.js';

@injectable()
export class DeleteAuthSessionByIdUseCase implements IDeleteAuthSessionByIdUseCase {
  constructor(
    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,
  ) {}

  async execute(params: IDeleteAuthSessionByIdInputDTO): Promise<null> {
    await this.authSessionRepository.deleteById(params);

    return null;
  }
}
