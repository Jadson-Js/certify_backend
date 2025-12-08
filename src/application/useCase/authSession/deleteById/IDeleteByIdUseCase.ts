import type { IDeleteAuthSessionByIdInputDTO } from '../../../../infra/api/dtos/authSession/IDeleteById.js';

export interface IDeleteAuthSessionByIdUseCase {
  execute(params: IDeleteAuthSessionByIdInputDTO): Promise<null>;
}
