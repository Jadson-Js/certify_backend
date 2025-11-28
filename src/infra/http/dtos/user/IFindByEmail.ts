export interface IFindByEmailInputDTO {
  email: string;
}

export interface IFindByEmailOutputDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}
