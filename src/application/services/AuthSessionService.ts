import { inject, injectable } from 'inversify';
import { TYPES_AUTH_SESSION, TYPES_SERVICE } from '../../infra/container/types.js';
import type { IAuthSessionRepository } from '../../domain/repositories/IAuthSessionRepository.js';
import type { IJwtService } from '../../domain/services/IJwtService.js';
import type { IEncryptService } from '../../domain/services/IEncryptService.js';
import { extractExpiresAtInToken } from '../../shared/utils/extractExpiresAtInToken.js';
import type { IAuthSessionEntity } from '../../domain/entities/authSession.entity.js';

export interface IAuthSessionService {
    create(
        userId: string,
        authSessionId: string,
        refreshToken: string,
    ): Promise<IAuthSessionEntity>;
}

@injectable()
export class AuthSessionService implements IAuthSessionService {
    constructor(
        @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
        private readonly authSessionRepository: IAuthSessionRepository,

        @inject(TYPES_SERVICE.IJwtService)
        private readonly jwtService: IJwtService,

        @inject(TYPES_SERVICE.IEncryptService)
        private readonly encryptService: IEncryptService,
    ) { }

    async create(
        userId: string,
        authSessionId: string,
        refreshToken: string,
    ): Promise<IAuthSessionEntity> {
        const refreshTokenHashed = await this.encryptService.hash(refreshToken);
        const expiresAtToken = await extractExpiresAtInToken(refreshToken);

        const authSessionTmp = {
            id: authSessionId,
            userId: userId,
            refreshTokenHash: refreshTokenHashed,
            expiresAt: expiresAtToken,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return await this.authSessionRepository.create(authSessionTmp);
    }
}
