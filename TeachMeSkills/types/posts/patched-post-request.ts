import { z } from 'zod';

export const PatchedPostRequestSchema = z.object({
    image: z.string().nullable(),
    text: z.string().min(200).nullable(),
    date: z.string().date().nullable(),
    lesson_num: z.number().int().nullable(),
    title: z.string().max(250).nullable(),
    description: z.string().min(50).nullable(),
    author: z.number().int().nullable(),
});

export type PatchedPostRequest = z.infer<typeof PatchedPostRequestSchema>;
