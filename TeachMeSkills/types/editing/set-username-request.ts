import { z } from 'zod';

export const SetUsernameRequestSchema = z.object({
    current_password: z.string(),
    new_email: z.string().max(254),
});

export type SetUsernameRequest = z.infer<typeof SetUsernameRequestSchema>;
