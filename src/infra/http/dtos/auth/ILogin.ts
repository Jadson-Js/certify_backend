export interface ILoginInputDTO {
  email: string;
  password: string;
}

export interface ILoginOutputDTO {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  access_token: string;
}
