export interface ILoginInputDTO {
  email: string;
  password: string;
}

export interface ILoginOutputDTO {
  id: string;
  name: string;
  access_token: string;
  refresh_token: string;
}
