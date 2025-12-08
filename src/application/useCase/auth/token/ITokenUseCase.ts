import type {
  ITokenInputDTO,
  ITokenOutputDTO,
} from '../../../../infra/api/dtos/auth/IToken.js';

export interface ITokenUseCase {
  execute(params: ITokenInputDTO): Promise<ITokenOutputDTO>;
}
