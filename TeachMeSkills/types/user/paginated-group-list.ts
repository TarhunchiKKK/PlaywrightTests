import { z } from 'zod';
import { GroupSchema } from './group';

export const PaginatedGroupListSchema = z.object({
    count: z.number().nullable(),
    next: z.string().nullable(),
    previosu: z.string().nullable(),
    result: z.array(GroupSchema),
});

export type PaginatedGroupList = z.infer<typeof PaginatedGroupListSchema>;
