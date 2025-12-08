export interface IFindUserByIdInputDTO {
  id: string;
}

export interface IFindUserByIdOutputDTO {
  id: string;
  name: string;
  email: string;
  verified_at: Date | null;
  created_at: Date;
}
