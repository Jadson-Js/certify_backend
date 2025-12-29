import { Router } from 'express';
import type { Container } from 'inversify';
import { TYPES_AUTH, TYPES_USER } from '../../container/types.js';
import type { AuthRoutes } from './Auth.route.js';
import type { UserRoutes } from './User.route.js';

export function setupRoutes(container: Container) {
  const router = Router();

  const authRoutes = container.get<AuthRoutes>(TYPES_AUTH.AuthRoutes);
  const userRoutes = container.get<UserRoutes>(TYPES_USER.UserRoutes);

  router.use('/auth', authRoutes.execute());
  router.use('/user', userRoutes.execute());

  return router;
}
