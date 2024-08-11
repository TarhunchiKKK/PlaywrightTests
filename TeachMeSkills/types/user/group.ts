import { z } from 'zod';

export const GroupSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
});

export type Group = z.infer<typeof GroupSchema>;
