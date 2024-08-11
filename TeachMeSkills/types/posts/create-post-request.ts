import { z } from 'zod';

export const CreatePostRequestSchema = z.object({
    image: z.string(),
    text: z.string().min(200),
    lesson_num: z.number().min(-2147483648).max(2147483647),
    title: z.string().min(250),
    description: z.string().min(50),
});

export type CreatePostRequest = z.infer<typeof CreatePostRequestSchema>;
