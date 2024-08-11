import { z } from 'zod';

export const PasswordResetConfirmSchema = z.object({
    uid: z.string(),
    token: z.string(),
    new_password: z.string(),
});

export type PasswordResetConfirm = z.infer<typeof PasswordResetConfirmSchema>;
