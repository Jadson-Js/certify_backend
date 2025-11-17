export interface ICreateUserInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserOutputDTO {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
