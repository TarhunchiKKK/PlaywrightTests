import { z } from 'zod';

export const SendEmailResetRequestSchema = z.object({
    email: z.string(),
});

export type SendEmailResetRequest = z.infer<typeof SendEmailResetRequestSchema>;
