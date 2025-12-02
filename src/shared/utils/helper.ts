import type { Response } from "express";

export function ok<t>(
  res: Response,
  statusCode: number,
  message?: string,
  data?: t,
) {
  return res.status(statusCode).json({
    message,
    data,
  });
}
