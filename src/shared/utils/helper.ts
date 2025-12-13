import type { Response } from 'express';

export function ok<t>(res: Response, statusCode: number, data?: t) {
  return res.status(statusCode).json(data);
}
