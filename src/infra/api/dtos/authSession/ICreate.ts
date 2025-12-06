export interface ICreateAuthSessionInputDTO {
  user_id: string;
  refresh_token_hash: string;
  expires_at: Date;
}

export interface ICreateAuthSessionOutputDTO {
  id: string;
  user_id: string;
  refresh_token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
