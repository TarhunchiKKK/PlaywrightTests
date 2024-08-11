import { z } from 'zod';
import { UserSchema } from './user';

export const PaginatedUserListSchema = z.object({
    count: z.number().nullable(),
    next: z.string().nullable(),
    previosu: z.string().nullable(),
    result: z.array(UserSchema),
});

export type PaginatedUserList = z.infer<typeof PaginatedUserListSchema>;
