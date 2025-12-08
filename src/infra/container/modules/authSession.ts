import { CreateAuthSessionUseCase } from '../../../application/useCase/authSession/create/CreateUseCase.js';
import { DeleteAuthSessionByIdUseCase } from '../../../application/useCase/authSession/deleteById/DeleteByIdUseCase.js';
import { FindAuthSessionByIdUseCase } from '../../../application/useCase/authSession/findById/FindByIdUseCase.js';
import { AuthSessionRepositoryPostgres } from '../../database/postgresql/repositories/authSession.repository.postgres.js';
import { TYPES_AUTH_SESSION } from '../types.js';
import { ContainerModule } from 'inversify';

export const authSessionModule = new ContainerModule((container) => {
  // REPOSITORIES
  container
    .bind(TYPES_AUTH_SESSION.IAuthSessionRepository)
    .to(AuthSessionRepositoryPostgres)
    .inSingletonScope();

  // USE_CASES
  container
    .bind(TYPES_AUTH_SESSION.IFindAuthSessionByIdUseCase)
    .to(FindAuthSessionByIdUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_AUTH_SESSION.ICreateAuthSessionUseCase)
    .to(CreateAuthSessionUseCase)
    .inSingletonScope();
  container
    .bind(TYPES_AUTH_SESSION.IDeleteAuthSessionByIdUseCase)
    .to(DeleteAuthSessionByIdUseCase)
    .inSingletonScope();
});
