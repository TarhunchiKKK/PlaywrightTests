import { z } from 'zod';

export const PostRequestSchema = z.object({
    image: z.string(),
    text: z.string().min(200),
    date: z.string().date(),
    lesson_num: z.number().int(),
    title: z.string().max(250),
    description: z.string().min(50),
    author: z.number().int(),
});

export type PostRequest = z.infer<typeof PostRequestSchema>;
