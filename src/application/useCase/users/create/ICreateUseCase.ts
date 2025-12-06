import type {
  ICreateUserInputDTO,
  ICreateUserOutputDTO,
} from '../../../../infra/api/dtos/user/ICreate.js';

export interface ICreateUserUseCase {
  execute(params: ICreateUserInputDTO): Promise<ICreateUserOutputDTO>;
}
