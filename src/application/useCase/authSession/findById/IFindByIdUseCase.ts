import type {
  IFindAuthSessionByIdInputDTO,
  IFindAuthSessionByIdOutputDTO,
} from '../../../../infra/api/dtos/authSession/IFindById.js';

export interface IFindAuthSessionByIdUseCase {
  execute(
    params: IFindAuthSessionByIdInputDTO,
  ): Promise<IFindAuthSessionByIdOutputDTO>;
}
