import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import type { IUserEntity } from "../../../domain/entities/user.entity.js";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: IUserEntity, info: unknown) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        console.log(info);
        return res.status(401).json({
          status: "error",
          message: "Unauthorized: Invalid or expired token",
        });
      }

      req.user = user;
      return next();
    },
  )(req, res, next);
};
