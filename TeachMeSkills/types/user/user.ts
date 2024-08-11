import { z } from 'zod';

export const UserSchema = z.object({
    username: z
        .string()
        .regex(/^[\w.@+-]+$/)
        .max(150),
    id: z.number(),
    email: z.string(),
});

export type User = z.infer<typeof UserSchema>;
