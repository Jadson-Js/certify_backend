export interface ICreateUserInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserOutputDTO {
  id: string;
  name: string;
  email: string;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
