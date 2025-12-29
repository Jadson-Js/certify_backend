import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../../../shared/error/AppError.js';
import { JwtService } from '../../services/JwtService.js';
import { inject, injectable } from 'inversify';
import { TYPES_SERVICE } from '../../container/types.js';
import type { IJwtService } from '../../../domain/services/IJwtService.js';

export interface IEnsureAuthenticated {
  authRefresh(req: Request, res: Response, next: NextFunction): null;
  authAccess(req: Request, res: Response, next: NextFunction): null;
}

@injectable()
export class EnsureAuthenticated implements IEnsureAuthenticated {
  constructor(
    @inject(TYPES_SERVICE.IJwtService)
    private readonly jwtService: IJwtService,
  ) {}

  authRefresh(req: Request, res: Response, next: NextFunction): null {
    const token = req.cookies.refreshToken;
    if (!token) throw new UnauthorizedError('Missing refresh token in cookies');

    const decoded = this.jwtService.verifyRefresh(token);

    req.authSession = { id: decoded.authSessionId as string };
    next();
    return null;
  }

  authAccess(req: Request, res: Response, next: NextFunction): null {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedError('Missing authorization header');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedError('Missing authorization header');
    const jwtService = new JwtService();
    const decoded = this.jwtService.verifyAccess(token);

    req.user = { id: decoded.id as string };
    next();
    return null;
  }
}
