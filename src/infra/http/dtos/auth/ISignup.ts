export interface ISignupInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface ISignupOutputDTO {
  id: string;
  name: string;
  email: string;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
