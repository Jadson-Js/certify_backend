import type {
  ISignupInputDTO,
  ISignupOutputDTO,
} from '../../../../infra/api/dtos/auth/ISignup.js';

export interface ISignupUseCase {
  execute(params: ISignupInputDTO): Promise<ISignupOutputDTO>;
}
