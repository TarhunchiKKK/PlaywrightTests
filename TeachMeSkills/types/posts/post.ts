import { z } from 'zod';

export const PostSchema = z.object({
    id: z.number().int(),
    image: z.string(),
    text: z.string().min(200),
    date: z.string().date(),
    lesson_num: z.number().int(),
    title: z.string().max(250),
    description: z.string().min(50),
    author: z.number().int(),
});

export type Post = z.infer<typeof PostSchema>;
