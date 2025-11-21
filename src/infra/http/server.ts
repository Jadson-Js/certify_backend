import express, {
  type NextFunction,
  type Request,
  type Response,
  type Router,
} from "express";
import "express-async-errors";
import { AppError } from "../../shared/error/AppError.js";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "../../../generated/prisma/internal/prismaNamespace.js";

export function createServer(routes: Router) {
  const app = express();
  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/v1", routes);

  // eslint-disable-next-line
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("[Error in application]", error.stack);

    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ status: "error", message: error.message });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = (error.meta as { target: string[] })?.target;
        const message = target
          ? `The field '${target.join(", ")}' is already in use.`
          : "Unique constraint violation.";

        return res.status(409).json({ status: "error", message: message });
      }

      if (error.code === "P2025") {
        return res.status(404).json({
          status: "error",
          message: "The resource you tried to modify does not exist.",
        });
      }
    } else if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({
        status: "error",
        message: "Invalid data. Please check the required fields.",
      });
    }

    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}
