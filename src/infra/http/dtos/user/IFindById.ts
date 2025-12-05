export interface IFindUserByIdInputDTO {
  id: string;
}

export interface IFindUserByIdOutputDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}
