import { z } from 'zod';

export const SendEmailResetSchema = z.object({
    email: z.string(),
});

export type SendEmailReset = z.infer<typeof SendEmailResetSchema>;
