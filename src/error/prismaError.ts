import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "../../generated/prisma/internal/prismaNamespace.js";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "./AppError.js";

export function prismaError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    console.error(`Prisma known request error: ${error.code}`);

    if (error.code === "P2002") {
      const target = (error.meta as { target: string[] })?.target;
      console.error(`The field '${target}' is already in use.`);
      throw new ConflictError(`The field '${target}' is already in use.`);
    }

    if (error.code === "P2025") {
      console.error("Record not found.");
      throw new NotFoundError(
        "The resource you tried to modify does not exist.",
      );
    }
  } else if (error instanceof PrismaClientValidationError) {
    console.error("Prisma validation error:", error.message);
    throw new BadRequestError(
      "Invalid data. Please check the required fields.",
    );
  } else {
    console.error("An unexpected error occurred:", error);
    throw new InternalServerError("Could not complete the operation.");
  }
}
