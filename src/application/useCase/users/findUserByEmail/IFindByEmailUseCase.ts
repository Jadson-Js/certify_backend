import type {
  IFindUserByEmailInputDTO,
  IFindUserByEmailOutputDTO,
} from '../../../../infra/api/dtos/user/IFindByEmail.js';

export interface IFindUserByEmailUseCase {
  execute(params: IFindUserByEmailInputDTO): Promise<IFindUserByEmailOutputDTO>;
}
