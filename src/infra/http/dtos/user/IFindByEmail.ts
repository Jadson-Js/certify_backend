export interface IFindUserByEmailInputDTO {
  email: string;
}

export interface IFindUserByEmailOutputDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}
