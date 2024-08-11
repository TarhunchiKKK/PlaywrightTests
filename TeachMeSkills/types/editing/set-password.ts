import { z } from 'zod';

export const SetPasswordSchema = z.object({
    new_password: z.string(),
    current_password: z.string(),
});

export type SetPassword = z.infer<typeof SetPasswordSchema>;
