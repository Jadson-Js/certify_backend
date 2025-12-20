import type {
  ICATEGORY_USER_SUSPENDED,
  IUserSuspendedEntity,
} from '../entities/userSuspended.entity.js';

export interface ICreateUserSuspendedInputRepository {
  userId: string;
  category: ICATEGORY_USER_SUSPENDED;
  details: string;
}

export interface IUserSuspendedRepository {
  create(
    params: ICreateUserSuspendedInputRepository,
  ): Promise<IUserSuspendedEntity>;
}
