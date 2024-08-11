import { z } from 'zod';

export const SetUsernameSchema = z.object({
    current_password: z.string(),
    new_email: z.string().max(254),
});

export type SetUsername = z.infer<typeof SetUsernameSchema>;
