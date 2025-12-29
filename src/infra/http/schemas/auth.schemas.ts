import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
}).strict();

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
}).strict();

export const verifyEmailTokenSchema = z.object({
    token: z.string().min(1, 'Token is required'),
}).strict();

export const sendResetPasswordEmailSchema = z.object({
    email: z.string().email('Invalid email address'),
}).strict();

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
}).strict();
