import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../shared/error/AppError.js";
import { JwtService } from "../../services/JwtService.js";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new UnauthorizedError("Missing authorization header");

  const token = authHeader.split(" ")[1];
  if (!token) throw new UnauthorizedError("Missing authorization header");

  const jwtService = new JwtService();
  const decoded = jwtService.verifyAccess(token);

  req.user = { id: decoded.id as string };
  next();
}
