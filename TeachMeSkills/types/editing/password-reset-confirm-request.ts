import { z } from 'zod';

export const PasswordResetConfirmRequestSchema = z.object({
    uid: z.string(),
    token: z.string(),
    new_password: z.string(),
});

export type PasswordResetConfirmRequest = z.infer<typeof PasswordResetConfirmRequestSchema>;
