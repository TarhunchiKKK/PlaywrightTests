import { z } from 'zod';

export const PatchedUserRequestSchema = z.object({
    username: z
        .string()
        .regex(/^[\w.@+-]+$/)
        .max(150)
        .nullable(),
});

export type PatchedUserRequest = z.infer<typeof PatchedUserRequestSchema>;
