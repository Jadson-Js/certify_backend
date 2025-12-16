import * as z from 'zod';
import { CATEGORY_USER_SUSPENSION } from '../../../../domain/entities/userSuspension.entity.js';

export const suspendSchema = z.object({
  userId: z.string().min(3).max(255),
  category: z.enum(CATEGORY_USER_SUSPENSION),
  details: z.string(),
});
