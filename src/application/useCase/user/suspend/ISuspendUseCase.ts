import type { ICATEGORY_USER_SUSPENDED } from '../../../../domain/entities/UserSuspended.entity.js';

export interface ISuspendUserInputUseCase {
  userId: string;
  category: ICATEGORY_USER_SUSPENDED;
  details: string;
}

export interface ISuspendUserOutputUseCase {
  suspendedId: string;
}

export interface ISuspendUserUseCase {
  execute(params: ISuspendUserInputUseCase): Promise<void>;
}
