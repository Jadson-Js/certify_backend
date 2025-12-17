import type {
  ICATEGORY_USER_SUSPENSION,
  IUserSuspensionEntity,
} from '../entities/userSuspension.entity.js';

export interface ICreateUserSuspensionInputRepository {
  userId: string;
  category: ICATEGORY_USER_SUSPENSION;
  details: string;
}

export interface IUserSuspensionRepository {
  create(
    params: ICreateUserSuspensionInputRepository,
  ): Promise<IUserSuspensionEntity>;
}
