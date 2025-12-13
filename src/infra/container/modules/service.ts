import { ContainerModule } from 'inversify';
import { TYPES_SERVICE } from '../types.js';
import { JwtService } from '../../services/JwtService.js';
import { EncryptService } from '../../services/EncryptService.js';
import { AuthTokenService } from '../../services/AuthTokenService.js';

export const serviceModule = new ContainerModule((container) => {
  container.bind(TYPES_SERVICE.IJwtService).to(JwtService).inSingletonScope();
  container
    .bind(TYPES_SERVICE.IEncryptService)
    .to(EncryptService)
    .inSingletonScope();
  container
    .bind(TYPES_SERVICE.IAuthTokenService)
    .to(AuthTokenService)
    .inSingletonScope();
});
