import { z } from 'zod';

export const UsernameResetConfirmSchema = z.object({
    new_email: z.string().max(254),
});

export type usernameResetConfirm = z.infer<typeof UsernameResetConfirmSchema>;
