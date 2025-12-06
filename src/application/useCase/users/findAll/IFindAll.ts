import type { IFindAllUsersOutputDTO } from '../../../../infra/api/dtos/user/IFindAll.js';

export interface IFindAllUsersUseCase {
  execute(): Promise<IFindAllUsersOutputDTO[]>;
}
