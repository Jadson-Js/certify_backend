import type { NextFunction, Request, Response } from "express";
import type z from "zod";

export const validate =
  (schema: z.ZodObject, source: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.flatten());
    }
    req.body = parsed.data;
    next();
  };
