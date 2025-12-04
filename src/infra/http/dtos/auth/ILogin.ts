export interface ILoginInputDTO {
  email: string;
  password: string;
}

export interface ILoginOutputDTO {
  id: string;
  name: string;
  email: string;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  access_token: string;
}
