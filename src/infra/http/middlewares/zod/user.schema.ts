import * as z from 'zod';
import { CATEGORY_USER_SUSPENDED } from '../../../../domain/entities/userSuspended.entity.js';

export const suspendSchema = z.object({
  userId: z.string().min(3).max(255),
  category: z.enum(CATEGORY_USER_SUSPENDED),
  details: z.string(),
});
