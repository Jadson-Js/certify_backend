import * as z from "zod";

export const findUserByIdSchema = z.object({
  id: z.string().min(3).max(255),
});

export const findUserByEmailSchema = z.object({
  email: z.email().min(3).max(255),
});

export const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.email().min(3).max(255),
  password: z.string(),
});
