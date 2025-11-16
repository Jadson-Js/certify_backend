export interface IFindAllUsersOutputDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface IFindAllUsersUseCase {
  execute(): Promise<IFindAllUsersOutputDTO[]>;
}
