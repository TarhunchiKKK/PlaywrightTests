import { z } from 'zod';

export const SetPasswordRequestSchema = z.object({
    new_password: z.string(),
    current_password: z.string(),
});

export type SetPasswordRequest = z.infer<typeof SetPasswordRequestSchema>;
