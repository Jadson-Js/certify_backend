import type { ICreateAuthSessionInputDTO } from '../../infra/api/dtos/authSession/ICreate.js';
import type { IDeleteAuthSessionByIdInputDTO } from '../../infra/api/dtos/authSession/IDeleteById.js';
import type { IFindAuthSessionByIdInputDTO } from '../../infra/api/dtos/authSession/IFindById.js';
import type { IAuthSessionEntity } from '../entities/authSession.entity.js';

export interface IAuthSessionRepository {
  findById(
    params: IFindAuthSessionByIdInputDTO,
  ): Promise<IAuthSessionEntity | null>;
  create(params: ICreateAuthSessionInputDTO): Promise<IAuthSessionEntity>;
  deleteById(params: IDeleteAuthSessionByIdInputDTO): Promise<null>;
}
