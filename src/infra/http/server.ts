import express, { type Request, type Response, type Router } from 'express';
import 'express-async-errors';
import passport from 'passport';
import { errorHandler } from './middlewares/errorHandler.js';

export function createServer(routes: Router) {
  const app = express();
  app.use(express.json());
  app.use(passport.initialize());

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/v1', routes);

  // eslint-disable-next-line
  app.use(errorHandler);

  return app;
}
