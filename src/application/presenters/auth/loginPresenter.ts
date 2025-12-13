import type { ILoginOutputUseCase } from '../../useCase/auth/login/ILoginUseCase.js';

export function loginPresenter(data: ILoginOutputUseCase) {
  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}
