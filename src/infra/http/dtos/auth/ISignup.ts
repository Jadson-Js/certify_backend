export interface ISignupInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface ISignupOutputDTO {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
