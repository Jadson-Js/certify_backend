import * as z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.email().min(3).max(255),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.email().min(3).max(255),
  password: z.string(),
});
