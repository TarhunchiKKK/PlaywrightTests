import { z } from 'zod';

export const CustomUserCreateSchema = z.object({
    id: z.number(),
    username: z
        .string()
        .regex(/^[\w.@+-]+$/)
        .max(150),
    email: z.string().max(254),
    course_group: z.number().nullable(),
});

export type CustomUserCreate = z.infer<typeof CustomUserCreateSchema>;
