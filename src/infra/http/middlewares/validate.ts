import type { NextFunction, Request, Response } from "express";
import type z from "zod";

export const validate =
  (schema: z.ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.flatten());
    }
    req.body = parsed.data;
    next();
  };
