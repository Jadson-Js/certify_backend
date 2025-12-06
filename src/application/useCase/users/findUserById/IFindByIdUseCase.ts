import type {
  IFindUserByIdInputDTO,
  IFindUserByIdOutputDTO,
} from '../../../../infra/api/dtos/user/IFindById.js';

export interface IFindUserByIdUseCase {
  execute(params: IFindUserByIdInputDTO): Promise<IFindUserByIdOutputDTO>;
}
