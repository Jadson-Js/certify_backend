import type { ISignupOutputUseCase } from '../../useCase/auth/signup/ISignupUseCase.js';

export function signupPresenter(data: ISignupOutputUseCase) {
  return {
    id: data.id,
  };
}
