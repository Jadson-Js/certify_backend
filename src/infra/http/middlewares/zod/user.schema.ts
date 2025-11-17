import * as z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.email().min(3).max(255),
  password: z.string(),
});
