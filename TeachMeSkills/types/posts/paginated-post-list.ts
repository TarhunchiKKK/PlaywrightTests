import { z } from 'zod';
import { PostSchema } from './post';

export const PaginatedPostListSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(PostSchema),
});

export type PaginatedPostList = z.infer<typeof PaginatedPostListSchema>;
