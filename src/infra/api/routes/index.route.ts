import { Router } from 'express';
import type { Container } from 'inversify';
import type { UserRoutes } from './user.route.js';
import { TYPES_AUTH, TYPES_USER } from '../../container/types.js';
import type { AuthRoutes } from './auth.route.js';

export function setupRoutes(container: Container) {
  const router = Router();

  const userRoutes = container.get<UserRoutes>(TYPES_USER.UserRoutes);
  const authRoutes = container.get<AuthRoutes>(TYPES_AUTH.AuthRoutes);

  router.use('/users', userRoutes.execute());
  router.use('/auth', authRoutes.execute());

  return router;
}
