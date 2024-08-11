import { z } from 'zod';

export const UserRequestSchema = z.object({
    username: z
        .string()
        .regex(/^[\w.@+-]+$/)
        .max(150),
});

export type UserRequest = z.infer<typeof UserRequestSchema>;
