import { ContainerModule } from 'inversify';
import { TYPES_MIDDLEWARE } from '../types.js';
import { EnsureAuthenticated } from '../../http/middlewares/EnsureAuthenticated.js';

export const middlewareModule = new ContainerModule((container) => {
  container
    .bind(TYPES_MIDDLEWARE.IEnsureAuthenticated)
    .to(EnsureAuthenticated)
    .inSingletonScope();
});
