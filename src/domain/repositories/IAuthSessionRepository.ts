import type { ICreateAuthSessionInputDTO } from '../../infra/api/dtos/authSession/ICreate.js';
import type { IAuthSessionEntity } from '../entities/authSession.entity.js';

export interface IAuthSessionRepository {
  create(params: ICreateAuthSessionInputDTO): Promise<IAuthSessionEntity>;
}
