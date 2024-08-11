import { z } from 'zod';

export const CustomUserCreateRequestSchema = z.object({
    username: z
        .string()
        .regex(/^[\w.@+-]+$/)
        .max(150),
    email: z.string().max(254),
    password: z.string(),
    course_group: z.number().nullable(),
});

export type CustomUserCreateRequest = z.infer<typeof CustomUserCreateRequestSchema>;
