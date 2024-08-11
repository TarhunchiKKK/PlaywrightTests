import { z } from 'zod';

export const TokenRefreshRequestSchema = z.object({
    refresh: z.string(),
});

export type TokenRefreshRequest = z.infer<typeof TokenRefreshRequestSchema>;
