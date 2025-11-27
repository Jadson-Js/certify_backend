export interface IFindByIdInputDTO {
  id: string;
}

export interface IFindByIdOutputDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}
