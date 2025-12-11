export interface IFindAllUsersOutputUseCase {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface IFindAllUsersUseCase {
  execute(): Promise<IFindAllUsersOutputUseCase[]>;
}
