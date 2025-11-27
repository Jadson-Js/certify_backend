import * as z from "zod";

export const findByIdSchema = z.object({
  id: z.string().min(3).max(255),
});

export const createSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.email().min(3).max(255),
  password: z.string(),
});
