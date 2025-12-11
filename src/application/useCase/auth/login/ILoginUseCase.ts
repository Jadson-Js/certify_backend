import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type {
  ILoginInputDTO,
  ILoginOutputDTO,
} from '../../../../infra/api/dtos/auth/ILogin.js';

export interface ILoginUseCase {
  execute(params: ILoginInputDTO): Promise<ILoginOutputDTO>;
}
