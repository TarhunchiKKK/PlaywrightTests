import { z } from 'zod';

export const TokenRefreshSchema = z.object({
    access: z.string(),
});

export type TokenRefresh = z.infer<typeof TokenRefreshSchema>;
