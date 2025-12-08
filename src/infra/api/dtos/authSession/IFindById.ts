export interface IFindAuthSessionByIdInputDTO {
  id: string;
}

export interface IFindAuthSessionByIdOutputDTO {
  id: string;
  user_id: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
