export interface ICreateInputDTO {
  id: string;
  user_id: string;
  refresh_token_hash: string;
  expires_at: Date;
}