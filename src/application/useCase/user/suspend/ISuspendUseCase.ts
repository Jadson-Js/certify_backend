import type { ICATEGORY_USER_SUSPENSION } from '../../../../domain/entities/userSuspension.entity.js';

export interface ISuspendUserInputUseCase {
  userId: string;
  category: ICATEGORY_USER_SUSPENSION;
  details: string;
}

export interface ISuspendUserOutputUseCase {
  suspensionId: string;
}

export interface ISuspendUserUseCase {
  execute(params: ISuspendUserInputUseCase): Promise<void>;
}
