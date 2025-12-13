import type { ITokenOutputUseCase } from '../../useCase/auth/token/ITokenUseCase.js';

export function tokenPresenter(data: ITokenOutputUseCase) {
  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}
