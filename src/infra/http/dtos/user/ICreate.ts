export interface ICreateInputDTO {
  name: string;
  email: string;
  password: string;
}

export interface ICreateOutputDTO {
  id: string;
  name: string;
  email: string;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
