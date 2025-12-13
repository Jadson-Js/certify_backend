import type { ILoginOutputUseCase } from '../../useCase/auth/login/ILoginUseCase.js';

export function loginPresenter(data: ILoginOutputUseCase) {
  return { user: data.user };
}
