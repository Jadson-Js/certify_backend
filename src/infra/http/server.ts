import express, { type Request, type Response, type Router } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';

export function createServer(routes: Router) {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/v1', routes);

  // eslint-disable-next-line
  app.use(errorHandler);

  return app;
}
