import { z } from 'zod';

export const PatchedUserRequestSchema = z.object({
    username: z
        .string()
        .regex(/^[\w.@+-]+$/)
        .max(150),
});

export type PatchedUserRequest = z.infer<typeof PatchedUserRequestSchema>;
