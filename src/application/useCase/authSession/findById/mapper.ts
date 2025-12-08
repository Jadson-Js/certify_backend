import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';
import type { IFindAuthSessionByIdOutputDTO } from '../../../../infra/api/dtos/authSession/IFindById.js';

export function toDTO(
  authSession: IAuthSessionEntity,
): IFindAuthSessionByIdOutputDTO {
  const mapper = {
    id: authSession.id,
    user_id: authSession.user_id,
    expires_at: authSession.expires_at,
    revoked_at: authSession.revoked_at,
    created_at: authSession.created_at,
    updated_at: authSession.updated_at,
  };

  return mapper;
}
