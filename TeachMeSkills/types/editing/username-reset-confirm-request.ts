import { z } from 'zod';

export const UsernameResetConfirmRequestSchema = z.object({
    new_email: z.string().max(254),
});

export type UsernameResetConfirmRequest = z.infer<typeof UsernameResetConfirmRequestSchema>;
