import { z } from 'zod';

export const suspendUserSchema = z.object({
    userId: z.uuid('Invalid user ID'),
    category: z.enum(['SUSPECT', 'FRAUD', 'SPAM', 'ABUSE']),
    details: z.string().min(1, 'Details are required'),
}).strict();
